module.exports = class SecurityRules{


    checkIfFormatIsValid(arg, matrix){
        var splittedArg = arg.split('-');
        var firstCharacter = arg.charAt(0);
        let xMap ='';
        let yMap ='';
        switch(firstCharacter){
            case 'C':
                let longueur = parseInt(splittedArg[1]);
                let largeur = parseInt(splittedArg[2]);
                if(isNaN(longueur) || isNaN(largeur)){
                    throw new Error(`ERREUR: un des paramètre de la carte n'est pas un nombre : ${longueur} ; ${largeur}`)
                }
                if(longueur <= 0 || largeur <= 0){
                    throw new Error(`ERREUR: les dimensions de la carte doivent etre supérieures à 0 : ${longueur} ; ${largeur}`);
                }
                splittedArg[1] = longueur;
                splittedArg[2] = largeur;
                break;
            case 'M':
                this.checkIfMapExists(matrix);
                xMap = matrix.length;
                yMap = matrix[0].length;
                let xMountain = parseInt(splittedArg[1]);
                let yMountain = parseInt(splittedArg[2]);
                if(isNaN(xMountain) || isNaN(yMountain)){
                    throw new Error(`ERREUR: un des paramètres de la montagne n'est pas un nombre : ${xMountain} ; ${yMountain}`)
                }
                if(xMountain > xMap || yMountain > yMap){
                    throw new Error("ERREUR: les parametres de la montagne sont en dehors de la carte");
                }
                splittedArg[1] = xMountain;
                splittedArg[2] = yMountain;
                break;
            case 'T':
                this.checkIfMapExists(matrix);
                xMap = matrix.length;
                yMap = matrix[0].length;
                let xTreasure = parseInt(splittedArg[1]);
                let yTreasure = parseInt(splittedArg[2]);
                let nbTreasure = parseInt(splittedArg[3]);
                if(isNaN(xTreasure) || isNaN(yTreasure) || isNaN(nbTreasure)){
                    throw new Error(`ERREUR: un des paramètre du trésor n'est pas un nombre : ${xTreasure} ; ${yTreasure} et nb Tresor: ${nbTreasure}`);
                }
                if(xTreasure > xMap || yTreasure > yMap){
                    throw new Error("ERREUR: les parametres du trésor sont en dehors de la carte");
                }
                splittedArg[1] = xTreasure;
                splittedArg[2] = yTreasure;
                splittedArg[3] = nbTreasure;
                break;
            case 'A':
                this.checkIfMapExists(matrix);
                xMap = matrix.length;
                yMap = matrix[0].length;
                let name = splittedArg[1];
                let xAdventurer = parseInt(splittedArg[2]);
                let yAdventurer = parseInt(splittedArg[3]);
                let orientation = splittedArg[4];
                let movements = splittedArg[5];
                if(isNaN(xAdventurer) || isNaN(yAdventurer)){
                    throw new Error(`ERREUR: un des paramètre de l'aventurier n'est pas un nombre : ${xAdventurer} ; ${yAdventurer}`);
                }
                if(xAdventurer > xMap || yAdventurer > yMap){
                    throw new Error("ERREUR: les coordonnées de l'aventurier sont en dehors de la carte");
                }
                if(orientation.trim() !== "N" && orientation.trim() !== "E" && orientation.trim() !== "O" && orientation.trim() !== "S"){
                    throw new Error(`ERREUR: l'orientation de l'aventurier n'est pas correcte : ${orientation}`);
                }
                var regexOnlyUpperCaseAlphabetics = /^[A-Z]+\D$/;
                if(!regexOnlyUpperCaseAlphabetics.test(movements.trim())){
                    throw new Error(`ERREUR: la séquence de mouvement de l'aventurier n'est pas correcte : ${movements}`);
                }
                splittedArg[1] = name.trim();
                splittedArg[2] = xAdventurer;
                splittedArg[3] = yAdventurer;
                splittedArg[4] = orientation.trim();
                splittedArg[5] = movements.trim();
                break;
            case '#':
                break;
            default:
                throw new Error(`ERREUR: Le paramètre ${firstCharacter} n'est pas traité`);
    
        }
        return splittedArg;

     }

     checkIfMapExists(matrix){   
        if(matrix.length == 0){
            throw new Error("ERREUR: Le paramètre C n'est pas initialisé");
        }
    }

    checkIfPlaceIsEmpty(x, y, matrix){
        if(matrix[y][x] != '.'){
            throw new Error(`ERREUR: Les coordonnées ${x} ; ${y} sont deja occupées`);
        }
    }

}