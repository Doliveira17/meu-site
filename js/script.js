// Pega o nome do usuário logado no localStorage
const usuarioNomeSpan = document.getElementById('usuario-nome');
const btnLogout = document.getElementById('btn-logout');

function redirecionarLogin() {
  window.location.href = 'index.html'; // Ajuste o nome se necessário
}

function verificarUsuarioLogado() {
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  if (!usuarioLogado) {
    // Se não tem usuário logado, redireciona para login
    redirecionarLogin();
  } else {
    usuarioNomeSpan.textContent = usuarioLogado;
  }
}

// Logout limpa a sessão e redireciona para login
btnLogout.addEventListener('click', () => {
  localStorage.removeItem('usuarioLogado');
  redirecionarLogin();
});

window.onload = verificarUsuarioLogado;
const body = document.body;
const btnTema = document.getElementById('btn-toggle-tema');

function aplicarTema(tema) {
  if (tema === 'dark') {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
}

const temaSalvo = localStorage.getItem('tema') || 'light';
aplicarTema(temaSalvo);

if (btnTema) {
  btnTema.addEventListener('click', () => {
    const novoTema = body.classList.contains('dark') ? 'light' : 'dark';
    aplicarTema(novoTema);
    localStorage.setItem('tema', novoTema);
  });
}
