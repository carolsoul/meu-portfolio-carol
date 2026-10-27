// Configuração do Firebase lida das variáveis de ambiente (veja .env.example).
// O SDK só é carregado sob demanda, para não pesar na primeira visita ao site.
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseEnabled = Boolean(config.apiKey && config.projectId);

export const firebaseConfig = config;

// upload de imagens só existe com o Storage configurado (exige o plano Blaze)
export const storageEnabled = firebaseEnabled && Boolean(config.storageBucket);

let appPromise = null;

const getApp = () => {
  if (!appPromise) {
    appPromise = import('firebase/app').then(({ initializeApp }) => initializeApp(config));
  }
  return appPromise;
};

export const getDb = async () => {
  const [app, { getFirestore }] = await Promise.all([getApp(), import('firebase/firestore')]);
  return getFirestore(app);
};

export const getAuthInstance = async () => {
  const [app, { getAuth }] = await Promise.all([getApp(), import('firebase/auth')]);
  return getAuth(app);
};

export const getStorageInstance = async () => {
  const [app, { getStorage }] = await Promise.all([getApp(), import('firebase/storage')]);
  return getStorage(app);
};
