const brawlers = [
  {
    id: 1,
    nome: "Inferno Rex",
    raridade: "Lendário 🔥",
    descricao: "Um guerreiro das profundezas vulcânicas. Especialista em dano em área.",
    imagem: "img/img1.jpg",
    tema: "fire-theme"
  },
  {
    id: 2,
    nome: "Cyber Mia",
    raridade: "Épico 💜",
    descricao: "Ágil e letal, Mia hackeia sistemas e atordoa inimigos com lasers.",
    imagem: "img/img2.jpg",
    tema: "tech-theme"
  },
  {
    id: 3,
    nome: "Capitão Trovão",
    raridade: "Raro ⚡",
    descricao: "Comandante da tempestade, dispara raios em área com precisão elétrica.",
    imagem: "img/img3.jpg",
    tema: "storm-theme"
  },
  {
    id: 4,
    nome: "Sombra V",
    raridade: "Mítico 🖤",
    descricao: "Uma assassina silenciosa, aparece nas sombras e elimina inimigos com agilidade.",
    imagem: "img/brawlers/4.png",
    tema: "dark-theme"
  },
  {
    id: 5,
    nome: "Funky Joe",
    raridade: "Super Raro 💿",
    descricao: "Mestre da dança de rua, derrota inimigos com ondas de som e groove.",
    imagem: "img/brawlers/5.png",
    tema: "funk-theme"
  },
  {
    id: 6,
    nome: "Neve",
    raridade: "Raro ❄️",
    descricao: "Controla o frio e congela os oponentes com sua calma absoluta.",
    imagem: "img/brawlers/6.png",
    tema: "ice-theme"
  },
  {
    id: 7,
    nome: "Tempestina",
    raridade: "Épico 🌪️",
    descricao: "Domina o vento e cria tornados para repelir ataques.",
    imagem: "img/brawlers/7.png",
    tema: "wind-theme"
  },
  {
    id: 8,
    nome: "Blast",
    raridade: "Lendário 💥",
    descricao: "Especialista em explosivos, causa dano massivo com bombas teleguiadas.",
    imagem: "img/brawlers/8.png",
    tema: "explosion-theme"
  },
  {
    id: 9,
    nome: "Z3-R0",
    raridade: "Mítico 🤖",
    descricao: "Androide veloz, dispara projéteis de energia com precisão cirúrgica.",
    imagem: "img/brawlers/9.png",
    tema: "cyber-theme"
  }
];

function getBrawlerId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}

function carregarBrawler() {
  const id = getBrawlerId();
  const brawler = brawlers.find(b => b.id === id);

  if (!brawler) {
    document.body.innerHTML = "<h2 style='text-align:center;margin-top:50px;'>Brawler não encontrado.</h2>";
    return;
  }

  document.getElementById("brawler-name").textContent = brawler.nome;
  document.getElementById("brawler-rarity").textContent = `Raridade: ${brawler.raridade}`;
  document.getElementById("brawler-desc").textContent = brawler.descricao;
  document.getElementById("brawler-img").src = brawler.imagem;
  document.body.classList.add(brawler.tema);
}

carregarBrawler();
