// Importações
import * as conexoes from './conexao.js';
import * as modulos from './modulos.js';

// Elementos Globais
const imgMario = document.querySelector('#img-mario');
const inputJogador = document.querySelector('#inputJogador');
const btnStart = document.querySelector('#btnStart');


// Variáveis Globais
let nomeJogador;
let moedasJogador = 0;
let estrelasJogador = 0;
let tempoJogador = 0;
let pontuacaoJogador = 0;

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
    modulos.playSom('somAbertura');
    inputJogador.addEventListener('input', validarJogador);
};
iniciarJogo();

const start = () => {
    modulos.limparTexto();
    modulos.stopSom('somAbertura');
};