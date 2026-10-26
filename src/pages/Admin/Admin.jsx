import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firebaseEnabled, getAuthInstance, getStorageInstance, storageEnabled } from '../../lib/firebase';
import { deleteProject, fetchProjects, saveProject } from '../../lib/projects';
import { localProjects } from '../../data/projects';
import { usePageTitle } from '../../lib/usePageTitle';
import styles from './Admin.module.css';

const EMPTY = {
  slug: '',
  title: '',
  category: '',
  summary: '',
  description: '',
  role: '',
  stack: '',
  results: '',
  liveUrl: '',
  repoUrl: '',
  image: '',
  featured: false,
  order: 10,
};

// "The Bush." vira "the-bush"
const slugify = text =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// listas viram texto no formulário (stack separada por vírgula, um resultado por linha) e voltam ao salvar
const toForm = project => ({
  ...EMPTY,
  ...project,
  stack: (project.stack ?? []).join(', '),
  results: (project.results ?? []).join('\n'),
});

const fromForm = form => ({
  ...form,
  slug: form.slug || slugify(form.title),
  stack: form.stack
    .split(',')
    .map(item => item.trim())
    .filter(Boolean),
  results: form.results
    .split('\n')
    .map(item => item.trim())
    .filter(Boolean),
  order: Number(form.order) || 0,
});

const errorMessage = error => {
  const code = error?.code ?? '';
  if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')) {
    return 'E-mail ou senha incorretos.';
  }
  if (code.includes('permission-denied') || code.includes('unauthorized')) {
    return 'Sem permissão. Confira se o seu UID está nas regras do Firestore e do Storage.';
  }
  return error?.message ?? 'Algo deu errado.';
};

const Admin = () => {
  usePageTitle('Admin');
  const [user, setUser] = useState(undefined);

  // a página não deve aparecer em buscadores
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  useEffect(() => {
    if (!firebaseEnabled) return undefined;
    let unsubscribe = () => {};
    getAuthInstance().then(async auth => {
      const { onAuthStateChanged } = await import('firebase/auth');
      unsubscribe = onAuthStateChanged(auth, setUser);
    });
    return () => unsubscribe();
  }, []);

  if (!firebaseEnabled) {
    return (
      <Shell>
        <h1 className={styles.title}>Admin</h1>
        <p className={styles.note}>
          O Firebase ainda não está configurado. Siga o passo a passo em <code>docs/admin.md</code> e preencha as
          variáveis <code>VITE_FIREBASE_*</code>.
        </p>
      </Shell>
    );
  }

  if (user === undefined) return <Shell />;

  return <Shell user={user}>{user ? <Dashboard user={user} /> : <Login />}</Shell>;
};

const Shell = ({ user, children }) => {
  const logout = async () => {
    const [auth, { signOut }] = await Promise.all([getAuthInstance(), import('firebase/auth')]);
    await signOut(auth);
  };

  return (
    <div className={styles.admin}>
      <header className={styles.bar}>
        <Link to="/" className="link-line">
          ← Ver o site
        </Link>
        {user && (
          <button type="button" className={styles.textButton} onClick={logout}>
            Sair
          </button>
        )}
      </header>
      {children}
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async event => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const [auth, { signInWithEmailAndPassword }] = await Promise.all([getAuthInstance(), import('firebase/auth')]);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  };

  return (
    <form className={styles.login} onSubmit={submit}>
      <h1 className={styles.title}>Entrar</h1>
      <label className={styles.field}>
        <span>E-mail</span>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="username" required />
      </label>
      <label className={styles.field}>
        <span>Senha</span>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </label>
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit" className={`pill ${styles.submit}`} disabled={busy}>
        {busy ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
};

const Dashboard = ({ user }) => {
  const [projects, setProjects] = useState(null);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      setProjects(await fetchProjects());
    } catch (err) {
      setError(errorMessage(err));
      setProjects([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const flash = text => {
    setMessage(text);
    setError('');
  };

  const importLocal = async () => {
    try {
      await Promise.all(localProjects.map(project => saveProject(project)));
      flash('Projetos atuais importados.');
      load();
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  const remove = async project => {
    if (!window.confirm(`Apagar "${project.title}"? Isso não pode ser desfeito.`)) return;
    try {
      await deleteProject(project.slug);
      flash('Projeto apagado.');
      load();
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  const saved = () => {
    setEditing(null);
    flash('Projeto salvo. O site já mostra a versão nova.');
    load();
  };

  if (editing) {
    return <ProjectForm initial={editing} onCancel={() => setEditing(null)} onSaved={saved} />;
  }

  return (
    <section>
      <div className={styles.head}>
        <h1 className={styles.title}>Projetos</h1>
        <button type="button" className="pill" onClick={() => setEditing({ ...EMPTY, isNew: true })}>
          Novo projeto
        </button>
      </div>

      <p className={styles.note}>
        Os projetos marcados como destaque aparecem em &quot;Trabalhos selecionados&quot; (os 3 primeiros pela
        ordem). Todos aparecem em &quot;Todos os projetos&quot;. Seu UID: <code>{user.uid}</code>
      </p>

      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}

      {projects === null && <p className={styles.note}>Carregando...</p>}

      {projects?.length === 0 && (
        <div className={styles.empty}>
          <p>Nenhum projeto no Firestore ainda. O site está usando a cópia que vem no código.</p>
          <button type="button" className="pill" onClick={importLocal}>
            Importar os {localProjects.length} projetos atuais
          </button>
        </div>
      )}

      {projects?.length > 0 && (
        <ul className={styles.list}>
          {projects.map(project => (
            <li key={project.slug} className={styles.row}>
              <span className={styles.order}>{project.order}</span>
              <span className={styles.rowTitle}>
                {project.title}
                {project.featured && <span className={styles.flag}>destaque</span>}
              </span>
              <span className={styles.rowActions}>
                <button type="button" className={styles.textButton} onClick={() => setEditing(toForm(project))}>
                  Editar
                </button>
                <button type="button" className={styles.textButton} onClick={() => remove(project)}>
                  Apagar
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

const ProjectForm = ({ initial, onCancel, onSaved }) => {
  const isNew = Boolean(initial.isNew);
  const [form, setForm] = useState(() => {
    const { isNew: _ignored, ...rest } = initial;
    return rest;
  });
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const set = field => event => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm(current => ({ ...current, [field]: value }));
  };

  const upload = async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const [storage, { ref, uploadBytes, getDownloadURL }] = await Promise.all([
        getStorageInstance(),
        import('firebase/storage'),
      ]);
      const name = `${form.slug || slugify(form.title) || 'projeto'}-${Date.now()}-${file.name}`;
      const fileRef = ref(storage, `projects/${name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setForm(current => ({ ...current, image: url }));
    } catch (err) {
      setError(errorMessage(err));
    }
    setUploading(false);
  };

  const submit = async event => {
    event.preventDefault();
    const project = fromForm(form);
    if (!project.slug) {
      setError('Preencha o título.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await saveProject(project);
      onSaved();
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <h1 className={styles.title}>{isNew ? 'Novo projeto' : `Editar: ${initial.title}`}</h1>

      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Título *</span>
          <input value={form.title} onChange={set('title')} required />
        </label>
        <label className={styles.field}>
          <span>Endereço da página</span>
          <input
            value={isNew ? form.slug : initial.slug}
            onChange={set('slug')}
            placeholder={slugify(form.title) || 'gerado a partir do título'}
            disabled={!isNew}
          />
          <small>/projetos/{(isNew ? form.slug : initial.slug) || slugify(form.title) || '...'}</small>
        </label>
        <label className={styles.field}>
          <span>Categoria *</span>
          <input value={form.category} onChange={set('category')} placeholder="E-commerce full-stack" required />
        </label>
        <label className={styles.field}>
          <span>Ordem</span>
          <input type="number" value={form.order} onChange={set('order')} />
          <small>Menor aparece primeiro.</small>
        </label>
      </div>

      <label className={styles.field}>
        <span>Frase do card *</span>
        <input value={form.summary} onChange={set('summary')} maxLength={140} required />
        <small>Aparece no card. Até 140 caracteres.</small>
      </label>
      <label className={styles.field}>
        <span>Sobre o projeto</span>
        <textarea value={form.description} onChange={set('description')} rows={4} />
      </label>
      <label className={styles.field}>
        <span>Meu papel</span>
        <textarea value={form.role} onChange={set('role')} rows={2} placeholder="Projeto em equipe. Fiz..." />
      </label>

      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Stack</span>
          <textarea value={form.stack} onChange={set('stack')} rows={3} placeholder="React, TypeScript, Node.js" />
          <small>Separe por vírgula.</small>
        </label>
        <label className={styles.field}>
          <span>Resultados</span>
          <textarea value={form.results} onChange={set('results')} rows={3} placeholder={'98 testes com Jest'} />
          <small>Um por linha.</small>
        </label>
        <label className={styles.field}>
          <span>Link do projeto no ar</span>
          <input type="url" value={form.liveUrl} onChange={set('liveUrl')} placeholder="https://" />
        </label>
        <label className={styles.field}>
          <span>Link do código</span>
          <input type="url" value={form.repoUrl} onChange={set('repoUrl')} placeholder="https://github.com/..." />
        </label>
      </div>

      <label className={styles.field}>
        <span>Imagem</span>
        <input value={form.image} onChange={set('image')} placeholder="https://... ou /projects/arquivo.jpg" />
        {storageEnabled ? (
          <input type="file" accept="image/*" onChange={upload} disabled={uploading} className={styles.file} />
        ) : (
          <small>Para enviar arquivos daqui, ative o Firebase Storage (passo opcional em docs/admin.md).</small>
        )}
        {uploading && <small>Enviando imagem...</small>}
      </label>
      {form.image && <img src={form.image} alt="" className={styles.preview} />}

      <label className={styles.check}>
        <input type="checkbox" checked={form.featured} onChange={set('featured')} />
        <span>Mostrar em &quot;Trabalhos selecionados&quot;</span>
      </label>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button type="submit" className={`pill ${styles.submit}`} disabled={busy || uploading}>
          {busy ? 'Salvando...' : 'Salvar'}
        </button>
        <button type="button" className={`pill pill-ghost ${styles.submit}`} onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default Admin;
