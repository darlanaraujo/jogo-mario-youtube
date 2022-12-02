// Importações
import * as conexoes from './conexao.js';
import * as modulos from './modulos.js';

// Elementos Globais
const inputJogador = document.querySelector('#inputJogador');
const btnStart = document.querySelector('#btnStart');
const modal = document.querySelector('#modal');
const modalLogin = document.querySelector('#modalLogin');
const txtNomeJogador = document.querySelector('#txtNomeJogador');
const sleep = document.querySelector('#sleep');
const txtSleep = document.querySelector('#txtSleep');
const cenario = document.querySelector('#cenario');
const txtTempo = document.querySelector('#txtTempo');
const imgTubo = document.querySelector('#imgTubo');
const imgBala = document.querySelector('#imgBala');
const imgMoedas = document.querySelectorAll('#imgMoeda');
const imgEstrelas = document.querySelectorAll('#imgEstrela');
const txtMoedas = document.querySelector('#txtMoedas');
const txtEstrelas = document.querySelector('#txtEstrelas');

// Variáveis Globais
let nomeJogador;
let moedasJogador = 0;
let estrelasJogador = 0;
let tempoJogador = 0;
let pontuacaoJogador = 0;

let tempoTime;
let tempoMoverElementos;
let tempoPegarElementos;

// Funções
const validarJogador = ({ target }) => {
    // console.log(target.value);

    if (target.value.length > 2) {
        btnStart.removeAttribute('disabled');

        nomeJogador = target.value.trim().toUpperCase();

        btnStart.addEventListener('click', start);

        document.addEventListener('keydown', ({ key }) => {
            if (key === 'Enter' && target.value.length > 2) {
                start();
            }
        });

    } else {
        btnStart.setAttribute('disabled', '');
    }

};

const iniciarJogo = () => {
    // modulos.playSom('somAbertura');
    inputJogador.addEventListener('input', validarJogador);
};
iniciarJogo();

const start = () => {
    modulos.limparTexto();
    modulos.stopSom('somAbertura');
    // modulos.playSom('somPrincipal');
    document.addEventListener('keydown', modulos.pular);
    document.addEventListener('keydown', modulos.voar);
    document.addEventListener('keydown', modulos.abaixar);
    document.addEventListener('keyup', modulos.levantar);

    modal.classList.remove('habilitar');
    modalLogin.classList.remove('active');

    txtNomeJogador.innerHTML = nomeJogador;

    sleep.classList.add('active');

    const tempoSleep = setInterval(() => {
        let cont = txtSleep.innerHTML;
        cont--;
        txtSleep.innerHTML = cont;
    }, 1000);

    setTimeout(() => {
        sleep.classList.remove('active');
        cenario.classList.add('start');
        clearInterval(tempoSleep);
        modulos.imgMario.src = './img/mario.gif';
        time();

        moverElementos(imgTubo);
        moverElementos(imgBala, 1.5);

        pegarElementos();
        controlePartida();

    }, 6000);
};

const time = () => {
    tempoTime = setInterval(() => {
        tempoJogador = txtTempo.innerHTML;
        tempoJogador++;
        txtTempo.innerHTML = tempoJogador;
    }, 1000);
};

const moverElementos = (elemento, retardo = 0) => {
    tempoMoverElementos = setInterval(() => {
        if (tempoJogador <= 10) {
            elemento.style.animation = `mover-elementos 3s infinite linear ${retardo}s`;
        } else if (tempoJogador <= 20) {
            elemento.style.animation = `mover-elementos 2.5s infinite linear ${retardo}s`;
        } else if (tempoJogador <= 30) {
            elemento.style.animation = `mover-elementos 2s infinite linear ${retardo}s`;
        } else if (tempoJogador > 40) {
            elemento.style.animation = `mover-elementos 1.2s infinite linear ${retardo}s`;
        }
    }, 1);
};



const pegarElementos = () => {
    tempoPegarElementos = setInterval(() => {
        let posicaoMarioBottom = window.getComputedStyle(modulos.imgMario).bottom.replace('px', '');

        let posicaoMarioTop = modulos.imgMario.offsetTop;

        imgMoedas.forEach((item, index) => {
            let posicaoMoedaLeft = item.offsetLeft;

            if (posicaoMarioBottom >= 170 && posicaoMarioBottom <= 200 && posicaoMoedaLeft <= 150) {
                moedasJogador++;

                txtMoedas.innerHTML = moedasJogador;

                item.style.display = 'none';

                modulos.playSom('somMoeda');

                setTimeout(() => {
                    item.style.display = 'block';
                }, 100);

            }

        });

        imgEstrelas.forEach((item) => {
            let posicaoEstrelaLeft = item.offsetLeft;

            if (posicaoMarioTop <= 250 && posicaoMarioTop >= 120 && posicaoEstrelaLeft <= 350 && posicaoEstrelaLeft >= 200) {
                estrelasJogador++;

                txtEstrelas.innerHTML = estrelasJogador;

                item.style.display = 'none';

                modulos.playSom('somMoeda');

                setTimeout(() => {
                    item.style.display = 'block';
                }, 100);
            }

        });

    }, 250);
};


const controlePartida = () => {
    const loopControlePartida = setInterval(() => {
        const posicaoTuboLeft = imgTubo.offsetLeft;
        const posicaoBalaLeft = imgBala.offsetLeft;
        const alturaMario = modulos.imgMario.offsetHeight;

        const posicaoMarioBottom = window.getComputedStyle(modulos.imgMario).bottom.replace('px', '');

        if (posicaoTuboLeft <= 120 && posicaoTuboLeft >= 50 && posicaoMarioBottom <= 110) {
            imgTubo.style.animation = 'none';
            imgTubo.style.left = `${posicaoTuboLeft}px`;

            modulos.imgMario.style.animation = 'none';
            modulos.imgMario.style.bottom = `${posicaoMarioBottom}px`;

            modulos.imgMario.src = './img/mario-game-over.png';
            modulos.imgMario.style.width = '71px';
            modulos.imgMario.style.left = '50px';

            modulos.playSom('somPerdeu');

            clearInterval(loopControlePartida);
            clearInterval(tempoTime);
            clearInterval(tempoMoverElementos);
            clearInterval(tempoPegarElementos);
        }

        if (posicaoBalaLeft <= 120 && posicaoBalaLeft >= 50 && posicaoMarioBottom <= 110 && alturaMario >= 100) {
            imgBala.style.animation = 'none';
            imgBala.style.left = `${posicaoBalaLeft}px`;

            modulos.imgMario.style.animation = 'none';
            modulos.imgMario.style.bottom = `${posicaoMarioBottom}px`;

            modulos.imgMario.src = './img/mario-game-over.png';
            modulos.imgMario.style.width = '71px';
            modulos.imgMario.style.left = '70px';

            modulos.playSom('somPerdeu');

            clearInterval(loopControlePartida);
            clearInterval(tempoTime);
            clearInterval(tempoMoverElementos);
            clearInterval(tempoPegarElementos);
        }

    }, 10);
};