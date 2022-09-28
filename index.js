const FileManager = require('./src/services/FileManager');
const Carte = require('./src/CarteAuTresor');


const fileManager = new FileManager();
const carte = new Carte(fileManager.getArgumentsAsArray());

carte.initMap(); 
carte.launchGame();

fileManager.writeOutputFile(carte.getArguments(), carte.getAdventurers(), carte.getTreasures());