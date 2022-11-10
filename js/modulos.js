
// Funções
const playSom = (elemento) => {
    const element = document.querySelector(`#${elemento}`);

    element.play();
};

const stopSom = (elemento) => {
    const element = document.querySelector(`#${elemento}`);

    element.pause();
};

const pular = ({ key }) => {
    if (key === 'ArrowUp') {
        imgMario.classList.add('pular');

        playSom('somPulo');

        setTimeout(() => {
            imgMario.classList.remove('pular');
        }, 500);
    }
};
// document.addEventListener('keydown', pular);

const voar = (evento) => {
    if (evento.key === ' ') {
        imgMario.classList.add('voar');

        imgMario.src = './img/mario-voando.png';

        playSom('somVoar');

        setTimeout(() => {
            imgMario.classList.remove('voar');
            imgMario.src = './img/mario.gif';
        }, 1500);
    }
};
// document.addEventListener('keydown', voar);

const abaixar = ({ key }) => {
    if (key === 'ArrowDown') {
        imgMario.classList.add('abaixar');

        imgMario.src = './img/mario-agachado.png';

        playSom('somAgachado');
    };
};
// document.addEventListener('keydown', abaixar);

const levantar = ({ key }) => {
    if (key === 'ArrowDown') {
        imgMario.classList.remove('abaixar');

        imgMario.src = './img/mario.gif';
    }
};
// document.addEventListener('keyup', levantar);

const limparTexto = () => {
    inputJogador.value = '';
    btnStart.setAttribute('disabled', '');
};

export { playSom, stopSom, pular, voar, abaixar, levantar, limparTexto };

