export const exemploString = () => {
  const texto1 = 'olá'; //Criação literal com ""
  const texto2 = "mundo's"; //Criação literal com ''
  const mensagem = String(texto1 + ' ' + texto2); //Objeto Global

  console.log('1' + 1); //Imprime 11
  console.log(texto1 + ' ' + texto2);
  console.log(mensagem);

  //Templates Literals
  console.log(`O programa diz: ${mensagem}`);
  console.log(`O valor de PI é ${(Math.PI ** 2).toFixed(2)}`);

  let reais = 1013;
  let cotacao = 4.13;
  console.log(`${reais} Reais equivalem a ${reais / cotacao} Dolars!`);

  //formatando o Number
  console.log(
    `${reais} Reais equivalem a ${(reais / cotacao).toFixed(2)} Dólars!`
  );
  console.log('TESTE RODOU');
};