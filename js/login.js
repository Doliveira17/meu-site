const form = document.getElementById('form-login');
const toggleLink = document.getElementById('toggle-form');
const formTitle = document.getElementById('form-title');
const btnSubmit = document.getElementById('btn-submit');
const msg = document.getElementById('msg');
const inputNome = document.getElementById('nome');
const inputSenha = document.getElementById('senha');
const toggleSenhaBtn = document.getElementById('toggle-senha');

let isLogin = true;

// Toggle mostrar/esconder senha
toggleSenhaBtn.addEventListener('click', () => {
  if (inputSenha.type === 'password') {
    inputSenha.type = 'text';
    toggleSenhaBtn.textContent = '🙈';
  } else {
    inputSenha.type = 'password';
    toggleSenhaBtn.textContent = '👁️';
  }
});

// Hash SHA-256 da senha
async function hashSenha(senha) {
  const msgBuffer = new TextEncoder().encode(senha);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

function validarNome(nome) {
  return nome.length >= 3 && nome.trim() === nome;
}

function validarSenha(senha) {
  return senha.length >= 6 && /\d/.test(senha) && /[a-zA-Z]/.test(senha);
}

function getUsuarios() {
  const data = localStorage.getItem('usuarios');
  return data ? JSON.parse(data) : [];
}

function salvarUsuarios(usuarios) {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

toggleLink.addEventListener('click', () => {
  if (isLogin) {
    formTitle.textContent = 'Cadastrar Novo Usuário';
    btnSubmit.textContent = 'Cadastrar';
    toggleLink.textContent = 'Já tenho login';
  } else {
    formTitle.textContent = 'Login';
    btnSubmit.textContent = 'Entrar';
    toggleLink.textContent = 'Criar novo login';
  }
  msg.textContent = '';
  isLogin = !isLogin;
  inputNome.focus();
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = inputNome.value.trim();
  const senha = inputSenha.value;

  if (!validarNome(nome)) {
    msg.style.color = '#ff3333';
    msg.textContent = 'Nome deve ter ao menos 3 caracteres e não ter espaços nas bordas.';
    return;
  }

  if (!validarSenha(senha)) {
    msg.style.color = '#ff3333';
    msg.textContent = 'Senha deve ter mínimo 6 caracteres, com letras e números.';
    return;
  }

  btnSubmit.disabled = true;
  msg.style.color = '#ffaa00';
  msg.textContent = 'Processando...';

  const senhaHash = await hashSenha(senha);
  let usuarios = getUsuarios();

  if (isLogin) {
    const usuario = usuarios.find(u => u.nome === nome && u.senha === senhaHash);
    if (usuario) {
      msg.style.color = '#00ff00';
      msg.textContent = `Bem-vindo, ${nome}! Redirecionando...`;
      localStorage.setItem('usuarioLogado', nome);

      // Enviar o acesso para o Google Apps Script
    const nomeUsuario = localStorage.getItem('usuarioLogado') || 'Anônimo';
fetch(`https://script.google.com/macros/s/AKfycby7jt3eLyNFNaLG3nbsHvrATSAB5ls7q0i6ifMoGdWXdlTycfbX_okBxfxsEMJ8TpToBA/exec?nome=${encodeURIComponent(nomeUsuario)}`)
  .then(() => console.log("Acesso registrado com sucesso"))
  .catch(err => console.error("Erro ao registrar acesso:", err));



      setTimeout(() => window.location.href = 'inicio.html', 1000);
    } else {
      msg.style.color = '#ff3333';
      msg.textContent = 'Usuário ou senha incorretos.';
      inputSenha.value = '';
      inputSenha.focus();
    }
  } else {
    if (usuarios.some(u => u.nome === nome)) {
      msg.style.color = '#ff3333';
      msg.textContent = 'Nome de usuário já existe.';
      inputNome.focus();
    } else {
      usuarios.push({ nome, senha: senhaHash });
      salvarUsuarios(usuarios);
      msg.style.color = '#00ff00';
      msg.textContent = 'Usuário cadastrado! Agora faça login.';
      form.reset();
      toggleLink.click();
    }
  }

  btnSubmit.disabled = false;
});
