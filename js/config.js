window.addEventListener('DOMContentLoaded', () => {
  const inputNome = document.getElementById('input-nome');
  const btnAlterarNome = document.getElementById('btn-alterar-nome');
  const msgNome = document.getElementById('msg-nome');
  const btnToggleTema = document.getElementById('btn-toggle-tema');
  const btnLogout = document.getElementById('btn-logout');

  // Carrega nome atual
  if (inputNome) {
    inputNome.value = localStorage.getItem('usuarioLogado') || '';
  }

  // Alterar nome
  if (btnAlterarNome) {
    btnAlterarNome.onclick = () => {
      const novoNome = inputNome.value.trim();
      if (!novoNome) {
        msgNome.textContent = 'Digite um nome válido.';
        msgNome.style.color = 'red';
        return;
      }
      localStorage.setItem('usuarioLogado', novoNome);
      msgNome.textContent = 'Nome atualizado!';
      msgNome.style.color = 'limegreen';
    };
  }

  // Tema
  function aplicarTema() {
    const tema = localStorage.getItem('tema') || 'claro';
    if (tema === 'escuro') {
      document.body.classList.add('tema-escuro');
    } else {
      document.body.classList.remove('tema-escuro');
    }
  }

  if (btnToggleTema) {
    btnToggleTema.onclick = () => {
      const temaAtual = localStorage.getItem('tema') || 'claro';
      const novoTema = temaAtual === 'claro' ? 'escuro' : 'claro';
      localStorage.setItem('tema', novoTema);
      aplicarTema();
    };
  }

  aplicarTema();

  // Logout
  if (btnLogout) {
    btnLogout.onclick = () => {
      localStorage.removeItem('usuarioLogado');
      window.location.href = 'login.html';
    };
  }
});
