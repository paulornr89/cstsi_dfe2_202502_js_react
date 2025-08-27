// src/main.js

import './style.css';
import { router } from './router.js';

function navigate(path) {
  window.history.pushState({}, '', path);
  router();
}

// Captura cliques em links para navegar via SPA
window.addEventListener('click', e => {
  if (e.target.matches('a')) {
    e.preventDefault();
    navigate(e.target.href);
  }
});

// Roda o roteador quando o usuário navega pelo histórico (botões voltar/avançar do navegador)
window.addEventListener('popstate', router);

// Roda o roteador no carregamento inicial da página
window.addEventListener('DOMContentLoaded', router);