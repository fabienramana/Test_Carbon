module.exports = class Treasure{
    constructor(x, y, nbTreasures){
        this.x = x;
        this.y = y;
        this.nbTreasures = nbTreasures;
    }

    xPosition(){
        return this.x;
    }

    yPosition(){
        return this.y;
    }

    getNbTreasures(){
        return this.nbTreasures;
    }

    removeOne(){
        this.nbTreasures -=1;
    }

    updateTreasure(matrix){
        if(matrix[this.y][this.x].charAt(0) != 'A'){
            matrix[this.y][this.x] = `T(${this.nbTreasures})`;
        }
        return matrix;
    }

    toString(){
        return `T - ${this.x} - ${this.y} - ${this.nbTreasures}`;
    }
}
