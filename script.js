
const produtosLista = document.querySelector('.produtos-lista');
const itensCarrinhoDiv = document.getElementById('itens-carrinho');
const contadorCarrinho = document.getElementById('contador-carrinho');
const totalPrecoSpan = document.getElementById('total');
const finalizarCompraBtn = document.getElementById('finalizar-compra');

const produtos = [
  {
    id: 1,
    nome: "Pacote Efeitos Eletrônicos",
    descricao: "100 efeitos eletrônicos para Octapad e bateria.",
    preco: 39.90,
    imagem: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=80",
    audioPreview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    nome: "Loop Trap Urbano",
    descricao: "50 loops de trap urbano para sua produção.",
    preco: 29.90,
    imagem: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    audioPreview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    nome: "Samples Bass Pesado",
    descricao: "Samples de baixo para beats potentes.",
    preco: 49.90,
    imagem: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    audioPreview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 5,
    nome: "Efeitos Worship",
    descricao: "Pack de efeitos para Kontakt.",
    preco: 29.99,
    imagem: "https://i.ibb.co/VWVz6VZX/Captura-de-tela-2025-06-19-102316.png",
    audioPreview: ""
  }
];

carregarProdutos();

function carregarProdutos() {
  mostrarProdutos();
}

function mostrarProdutos() {
  produtosLista.innerHTML = '';
  produtos.forEach(produto => {
    const produtoDiv = document.createElement('div');
    produtoDiv.classList.add('produto');
    produtoDiv.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" />
      <div class="produto-info">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <div class="preco">R$ ${produto.preco.toFixed(2)}</div>
        ${produto.audioPreview ? `<audio class="audio-preview" controls src="${produto.audioPreview}"></audio>` : ''}
        <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
      </div>
    `;
    produtosLista.appendChild(produtoDiv);
  });
}

let carrinho = [];

function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;
  const itemNoCarrinho = carrinho.find(item => item.id === id);
  if (itemNoCarrinho) {
    itemNoCarrinho.quantidade++;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }
  atualizarCarrinho();
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  contadorCarrinho.textContent = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  if (carrinho.length === 0) {
    itensCarrinhoDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
    finalizarCompraBtn.disabled = true;
    totalPrecoSpan.textContent = '0.00';
    return;
  }

  itensCarrinhoDiv.innerHTML = '';
  carrinho.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item-carrinho');
    itemDiv.innerHTML = `
      <span>${item.nome} x${item.quantidade}</span>
      <span>R$ ${(item.preco * item.quantidade).toFixed(2)} <button onclick="removerDoCarrinho(${item.id})">&times;</button></span>
    `;
    itensCarrinhoDiv.appendChild(itemDiv);
  });

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  totalPrecoSpan.textContent = total.toFixed(2);
  finalizarCompraBtn.disabled = false;
}

finalizarCompraBtn.addEventListener('click', () => {
  alert('Para finalizar a compra, entre em contato pelo WhatsApp: +55 11 91234-5678');
});
