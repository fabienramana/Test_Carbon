const Adventurer = require('./model/Adventurer');
const Treasure = require('./model/Treasure');
const SecurityRules = require('./services/SecurityRules');

module.exports = class CarteAuTresor{
    constructor(args){
        this.args = args;
        this.matrix = [];
        this.treasures = [];
        this.adventurers = [];
        this.securityRules = new SecurityRules();
    }

    displayMatrix(){
        console.log(this.matrix);
        console.log("\n");
    }

    getArguments(){
        return this.args;
    }

    getAdventurers(){
        return this.adventurers;
    }

    getTreasures(){
        return this.treasures;
    }

    initMap(){
    
            for(var i in this.args){
                let splittedArg = this.securityRules.checkIfFormatIsValid(this.args[i], this.matrix);
                switch(splittedArg[0].charAt(0)){
                    case 'C':
                        this.createAndPopulateMap(splittedArg[2], splittedArg[1]);
                        break;
                    case 'M':
                        this.createMountain(splittedArg);
                        break;
                    case 'T':
                        this.createTreasure(splittedArg);
                        break;
                    case 'A':
                        this.createAdventurer(splittedArg);
                        break;
                    case '#':
                        break;
                    default:
                        throw new Error(`Le paramètre ${splittedArg[0].charAt(0)} n'est pas traité`);
                }
            }
            this.displayMatrix();
    }

    launchGame(){
        var flagOut = 1;
        var flagNoMovementsLeftForAll = 0;
        
        while(flagOut == 1){
            flagNoMovementsLeftForAll = 0;
            this.adventurers.forEach(adventurer => {
                this.matrix = adventurer.move(this.matrix);
                this.treasures.forEach(treasure => {
                    if(adventurer.xPosition() == treasure.xPosition() && adventurer.yPosition() == treasure.yPosition() && adventurer.getCanGetTreasure()){
                        if(treasure.getNbTreasures() >0){
                            adventurer.addTreasure();
                            treasure.removeOne();
                        }
                    }
                    else{
                        this.matrix = treasure.updateTreasure(this.matrix);
                    }
                })
                if(adventurer.getMovements().length == 0){
                    flagNoMovementsLeftForAll +=1;
                }
                if(flagNoMovementsLeftForAll == this.adventurers.length){
                    flagOut = 0;
                }
            })
            this.displayMatrix();
        }   
    
    }

    createAndPopulateMap(x, y){
        var matrix = [];
        
        for(let i=0;i<x;i++){
            matrix.push([]);
            for(let j=0;j<y;j++){
                matrix[i].push([]);
                matrix[i][j] = '.'
            }
        }
        this.matrix = matrix;
    }

    createMountain(splittedArg){
        let xMountain = splittedArg[1];
        let yMountain = splittedArg[2];

        this.securityRules.checkIfPlaceIsEmpty(xMountain, yMountain, this.matrix);
    
        this.matrix[yMountain][xMountain] = 'M';
    }
    
    createTreasure(splittedArg){
        let xTreasure = splittedArg[1];
        let yTreasure = splittedArg[2];
        let nbTreasures = splittedArg[3];

        this.securityRules.checkIfPlaceIsEmpty(xTreasure, yTreasure, this.matrix);

        let treasure = new Treasure(xTreasure, yTreasure, nbTreasures);
        this.treasures.push(treasure);
        this.matrix[yTreasure][xTreasure] = `T(${splittedArg[3]})`;
    }
    
    createAdventurer(splittedArg){
        let name = splittedArg[1];
        let xPosition = splittedArg[2];
        let yPosition = splittedArg[3];
        let orientation = splittedArg[4];
        let movements = splittedArg[5];

        this.securityRules.checkIfPlaceIsEmpty(xPosition, yPosition, this.matrix);

        let adventurer = new Adventurer(name.trim(), xPosition, yPosition, orientation.trim(), movements);
        this.adventurers.push(adventurer);
    
        this.matrix[yPosition][xPosition] = `A(${name})`;
    }
}