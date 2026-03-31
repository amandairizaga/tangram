const peca = document.querySelectorAll('.tangram-imagem');
const caixa = document.getElementById('tangram-caixa');
const btnEsquerda = document.getElementById('btn-gira-esquerda');
const btnDireita = document.getElementById('btn-gira-direita');
const btnAlternar = document.getElementById('btn-alternar-peca'); // Seleciona o novo botão

let pecaSelecionada = null;
let offsetX, offsetY, taArrastando = false;
const versaoAtual = {};
const angulosPecas = {};

function posicaoAleatoria(peca) {
    const caixaRect = caixa.getBoundingClientRect();
    const pecaWidth = peca.offsetWidth;
    const pecaHeight = peca.offsetHeight;

    const randomX = Math.random() * (caixaRect.width - pecaWidth);
    const randomY = Math.random() * (caixaRect.height - pecaHeight);

    peca.style.left = `${randomX}px`;
    peca.style.top = `${randomY}px`;
    peca.style.position = 'absolute';
}

peca.forEach(p => {
    const id = p.id;
    versaoAtual[id] = 1; 
    angulosPecas[id] = 0; // Inicializa o ângulo de cada peça em 0
    posicaoAleatoria(p);
    
  
});

peca.forEach(p => {
    versaoAtual[p.id] = 1; 
    posicaoAleatoria(p);

    p.addEventListener('pointerdown', (e) => {
        pecaSelecionada = e.target;
        pecaSelecionada.setPointerCapture(e.pointerId); // Prende o toque na peça
        
        offsetX = e.clientX - parseFloat(pecaSelecionada.style.left);
        offsetY = e.clientY - parseFloat(pecaSelecionada.style.top);
        taArrastando = true;
        pecaSelecionada.style.cursor = 'grabbing';
    });

    p.addEventListener('pointerup', (e) => {
        if (pecaSelecionada) pecaSelecionada.releasePointerCapture(e.pointerId);
        taArrastando = false;
        if(pecaSelecionada) pecaSelecionada.style.cursor = 'grab';
    });
});

btnEsquerda.addEventListener('click', () => {
    if (pecaSelecionada) {
        const id = pecaSelecionada.id;
        angulosPecas[id] -= 15; // Diminui o ângulo específico daquela peça
        pecaSelecionada.style.transform = `rotate(${angulosPecas[id]}deg)`;
    }
});

btnDireita.addEventListener('click', () => {
    if (pecaSelecionada) {
        const id = pecaSelecionada.id;
        angulosPecas[id] += 15; // Aumenta o ângulo específico daquela peça
        pecaSelecionada.style.transform = `rotate(${angulosPecas[id]}deg)`;
    }
});

document.addEventListener('pointermove', (e) => {
    if (pecaSelecionada && taArrastando) {
        const caixaRect = caixa.getBoundingClientRect();
        let newX = Math.max(0, Math.min(e.clientX - offsetX, caixaRect.width - pecaSelecionada.offsetWidth));
        let newY = Math.max(0, Math.min(e.clientY - offsetY, caixaRect.height - pecaSelecionada.offsetHeight));

        pecaSelecionada.style.left = `${newX}px`;
        pecaSelecionada.style.top = `${newY}px`;
    }
});



btnEsquerda.addEventListener('click', () => {
    if (pecaSelecionada) {
        anguloRotacao -= 15;
        pecaSelecionada.style.transform = `rotate(${anguloRotacao}deg)`;
    }
});

btnDireita.addEventListener('click', () => {
    if (pecaSelecionada) {
        anguloRotacao += 15;
        pecaSelecionada.style.transform = `rotate(${anguloRotacao}deg)`;
    }
});

// Substitui a tecla "C" para o tablet
btnAlternar.addEventListener('click', () => {
    if (pecaSelecionada) {
        const id = pecaSelecionada.id;
        let versao = versaoAtual[id];
        versao = versao < 5 ? versao + 1 : 1;
        versaoAtual[id] = versao;
        pecaSelecionada.src = `img/${id}-${versao.toString().padStart(2, '0')}.svg`;
    }
});
