import { useEffect, useRef, useState } from 'react';
import styles from './CopyEmail.module.css';

// para quem usa webmail e não tem programa de e-mail configurado para o mailto:
const copyText = async text => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // navegadores sem a API de clipboard (ou fora de https)
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  const ok = document.execCommand('copy');
  field.remove();
  if (!ok) throw new Error('copy failed');
};

const CopyEmail = ({ email }) => {
  const [status, setStatus] = useState('idle');
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await copyText(email);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('idle'), 2400);
  };

  const label = status === 'copied' ? 'E-mail copiado' : status === 'failed' ? email : 'Copiar e-mail';

  return (
    <button type="button" className={`pill pill-ghost ${styles.button}`} onClick={copy}>
      <span aria-live="polite">{label}</span>
    </button>
  );
};

export default CopyEmail;
