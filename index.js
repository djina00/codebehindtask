// console.log("Zdravo")
const fs = require('fs');

// Učitaj JSON fajl za grupe
const groupsData = JSON.parse(fs.readFileSync('groups.json', 'utf8'));

// Učitaj JSON fajl za eksibicije
const exhibitionsData = JSON.parse(fs.readFileSync('exibitions.json', 'utf8'));

// Prikaz sadržaja fajlova
console.log('Groups Data:', groupsData);
console.log('Exhibitions Data:', exhibitionsData);

// Implementiraj svoju logiku za simulaciju turnira koristeći učitane podatke
