// Só funções para aplicar e alternar tema

function aplicarTema() {
  const tema = localStorage.getItem('tema') || 'claro';
  if (tema === 'escuro') {
    document.body.classList.add('tema-escuro');
  } else {
    document.body.classList.remove('tema-escuro');
  }
}

function toggleTema() {
  const temaAtual = localStorage.getItem('tema') || 'claro';
  const novoTema = temaAtual === 'claro' ? 'escuro' : 'claro';
  localStorage.setItem('tema', novoTema);
  aplicarTema();
}

// Aplica o tema na carga da página
window.addEventListener('DOMContentLoaded', aplicarTema);
