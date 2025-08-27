// src/router.js

// Importamos o módulo inteiro para ter acesso a ambas as funções (render e init)
import * as login from './views/loginView.js';
import * as cadastro from './views/cadastroView.js';
// Importe outras views aqui...

const routes = {
  '/': login,
  '/cadastro': cadastro
  // '/menu-doador': menuDoador
};

const appDiv = document.getElementById('app');

export function router() {
  const path = window.location.pathname || '/';

  // Encontra o MÓDULO da view correspondente
  const viewModule = routes[path];

  if (viewModule) {
    // 1. Renderiza o HTML da view
    appDiv.innerHTML = viewModule.render();
    
    // 2. Se a view tiver uma função init, a executa
    if (viewModule.init) {
      viewModule.init();
    }
  } else {
    appDiv.innerHTML = `<h1>404 - Página Não Encontrada</h1>`;
  }
};