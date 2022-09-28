module.exports = class Adventurer {
    constructor(name, x, y, orientation, movements){
        this.name = name
        this.x = x;
        this.y = y;
        this.orientation = orientation;
        this.movements = movements;
        this.nbTreasures = 0;
        this.canGetTreasure = true;
    }

    getName(){
        return this.name;
    }

    xPosition(){
        return this.x;
    }

    yPosition(){
        return this.y;
    }

    getOrientation(){
        return this.orientation;
    }

    getMovements(){
        return this.movements;
    }

    getCanGetTreasure(){
        return this.canGetTreasure;
    }

    addTreasure(){
        this.nbTreasures  +=1;
    }

    getNbTreasures(){
        return this.nbTreasures;
    }

    move(matrix){
        this.canGetTreasure = false;
        let movement = this.movements.charAt(0);

        if(movement == 'A'){
            matrix = this.goForward(matrix);
            var newSequence = this.movements.substring(1);
            this.movements = newSequence 
        }
        else if(movement == 'G'){
            this.turnLeft();
            var newSequence = this.movements.substring(1);
            this.movements = newSequence 
        } 
        else if(movement == 'D'){
            this.turnRight();
            var newSequence = this.movements.substring(1);
            this.movements = newSequence  
        }
        else if(movement.length != 0){
            throw new Error("le mouvement n'est pas reconnu");
        }
        return matrix;
    }

    goForward(matrix){
        
        if(this.orientation === 'N' && this.y-1 >= 0){
            if(matrix[this.y-1][this.x] != 'M' && matrix[this.y-1][this.x].charAt(0) != 'A'){
                matrix[this.y][this.x] = '.';
                this.y -=1;
                matrix[this.y][this.x] = `A(${this.name})`;
                this.canGetTreasure = true;
            }
        }
        else if(this.orientation ==='S' && this.y+1 < matrix.length){
            if(matrix[this.y+1][this.x] != 'M' && matrix[this.y+1][this.x].charAt(0) != 'A'){ 
                matrix[this.y][this.x] = '.';
                this.y +=1;
                matrix[this.y][this.x] = `A(${this.name})`;
                this.canGetTreasure = true;
            }
        }
        else if(this.orientation ==='O' && this.x-1 >= 0){
            if(matrix[this.y][this.x-1] != 'M' && matrix[this.y][this.x-1].charAt(0) != 'A'){
                matrix[this.y][this.x] = '.';
                this.x -=1;
                matrix[this.y][this.x] = `A(${this.name})`;
                this.canGetTreasure = true;
            }
        }
        else if(this.orientation ==='E' && this.x+1 < matrix[0].length){
            if(matrix[this.y][this.x+1] != 'M' && matrix[this.y][this.x+1].charAt(0) != 'A'){
                matrix[this.y][this.x] = '.';
                this.x +=1;
                matrix[this.y][this.x] = `A(${this.name})`;
                this.canGetTreasure = true;
            }
        }
        return matrix;
    }

    turnLeft(){
        switch(this.orientation){
            case 'N':
                this.orientation = 'O';
                break;
            case 'O':
                this.orientation = 'S';
                break;
            case 'S':
                this.orientation = 'E';
                break;
            case 'E':
                this.orientation = 'N';
                break;
        }
    }

    turnRight(){
        switch(this.orientation){
            case 'N':
                this.orientation = 'E';
                break;
            case 'E':
                this.orientation = 'S';
                break;
            case 'S':
                this.orientation = 'O';
                break;
            case 'O':
                this.orientation = 'N';
                break;
        }
    }

    toString(){
        return `A - ${this.name} - ${this.x} - ${this.y} - ${this.orientation} - ${this.nbTreasures}`;
    }
}