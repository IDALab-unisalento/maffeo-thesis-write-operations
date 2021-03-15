const Iota = require('@iota/core');
const Converter = require('@iota/converter');

//Connessione a un nodo
const iota = Iota.composeAPI({
  provider: 'https://nodes.devnet.iota.org:443'
});

const depth = 3;
const minimumWeightMagnitude = 9;

// Definizione di seed e indirizzo.
// Non necessario che appartengano a qualcuno in questo caso.
const address =
  'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';
const seed =
  'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';

//Definizione del messaggio da inviare (solo caratteri ASCII)
const message = JSON.stringify({"message": "Messaggio di prova IOTA"});

//Conversione del messaggio in tryte
const messageInTrytes = Converter.asciiToTrytes(message);

//si imposta il valore della transazione a 0 e si assegna l'indirizzo
const transfers = [
  {
    value: 0,
    address: address,
    message: messageInTrytes
  }
];

//invio della transazione al nodo
iota
  .prepareTransfers(seed, transfers)
  .then(trytes => {
    return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
  })
  .then(bundle => {
    console.log(bundle[0].hash);
  })
  .catch(err => {
    console.error(err)
  });
