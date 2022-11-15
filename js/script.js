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

// Variáveis Globais
let nomeJogador;
let moedasJogador = 0;
let estrelasJogador = 0;
let tempoJogador = 0;
let pontuacaoJogador = 0;

let tempoTime;

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
    }, 6000);
};

const time = () => {
    tempoTime = setInterval(() => {
        tempoJogador = txtTempo.innerHTML;
        tempoJogador ++;
        txtTempo.innerHTML = tempoJogador;
    }, 1000);
};

