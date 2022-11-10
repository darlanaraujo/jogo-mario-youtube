const setBanco = (banco) => {
    localStorage.setItem('bd-mario', banco);
};

const getBanco = () => {
    return JSON.parse(localStorage.getItem('bd-mario')) ?? [];
};


const bancoTemp = (nome, moedas, estrelas, tempo, pontuacao) => {

    let banco = getBanco(); // <-- Array

    let dados = {
        nomeJogador: nome,
        moedasJogador: moedas,
        estrelasJogador: estrelas,
        tempoJogador: tempo,
        pontuacaoJogador: pontuacao
    };

    banco.unshift(dados);

    setBanco(JSON.stringify(banco));
};

export { setBanco, getBanco, bancoTemp };