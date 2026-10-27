import { useEffect, useState } from 'react';
import { localProjects, sortProjects } from '../data/projects';
import { firebaseConfig, firebaseEnabled, getDb } from './firebase';

const COLLECTION = 'projects';

// guarda a lista entre páginas para não buscar de novo a cada navegação
let cache = null;

// a API REST devolve cada campo com o tipo junto ({ stringValue: '...' }); isto desembrulha
const decode = value => {
  if ('arrayValue' in value) return (value.arrayValue.values ?? []).map(decode);
  if ('mapValue' in value) return decodeFields(value.mapValue.fields ?? {});
  if ('integerValue' in value) return Number(value.integerValue);
  if ('nullValue' in value) return null;
  return Object.values(value)[0];
};

const decodeFields = fields => Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, decode(value)]));

// leitura pública pela API REST: evita baixar o SDK do Firestore para cada visitante
export const fetchProjects = async () => {
  const { projectId, apiKey } = firebaseConfig;
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${COLLECTION}?pageSize=300&key=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Firestore respondeu ${response.status}`);
  const { documents = [] } = await response.json();
  return sortProjects(
    documents.map(document => ({ ...decodeFields(document.fields ?? {}), slug: document.name.split('/').pop() }))
  );
};

// começa com a cópia local e troca pelos dados do Firestore quando eles chegam;
// `ready` diz se a lista já é a definitiva
export const useProjects = () => {
  const [state, setState] = useState(() => ({
    projects: cache ?? sortProjects(localProjects),
    ready: !firebaseEnabled || Boolean(cache),
  }));

  useEffect(() => {
    if (state.ready) return undefined;
    let active = true;
    fetchProjects()
      .then(list => {
        if (list.length) cache = list;
        if (active) setState(current => ({ projects: list.length ? list : current.projects, ready: true }));
      })
      .catch(error => {
        console.warn('Projetos do Firestore indisponíveis, usando a cópia local.', error);
        if (active) setState(current => ({ ...current, ready: true }));
      });
    return () => {
      active = false;
    };
  }, [state.ready]);

  return state;
};

export const clearProjectsCache = () => {
  cache = null;
};

export const saveProject = async project => {
  const db = await getDb();
  const { doc, setDoc } = await import('firebase/firestore');
  const { slug, ...data } = project;
  await setDoc(doc(db, COLLECTION, slug), data);
  clearProjectsCache();
};

export const deleteProject = async slug => {
  const db = await getDb();
  const { doc, deleteDoc } = await import('firebase/firestore');
  await deleteDoc(doc(db, COLLECTION, slug));
  clearProjectsCache();
};
