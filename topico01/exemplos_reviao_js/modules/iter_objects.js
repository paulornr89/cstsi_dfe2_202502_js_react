export default function objexts() {
    /**
     * É possível iterar as propriedades de um Object
     * usando o método entries() o qual retorna um par de
     * [chave, valor] para cada 'entrada' do Objeto dentro
     * de um FOR com a sintaxe FOR(... OF ...)
     */

    const carro = { marca: 'VW', cor: 'Preto', modelo: 'GOl' };

    for (let itens of Object.entries(carro)) {
    console.log(itens[0]);
    }

    for (let [chave, valor] of Object.entries(carro)) {
    console.log(`atributo: ${chave} | valor: ${valor}`);
    }

}