const fs = require('fs');


module.exports = class FileManager{
    
    getArgumentsAsArray(){
        const inputFile = "./resources/input.txt";
    
        var arrayOfArgs = fs.readFileSync(inputFile).toString().split("\n");
        return arrayOfArgs;
    }
    
    writeOutputFile(args, adventurers, treasures){
    
        const outputFile = "./resources/output.txt";
    
        var content = ''
        for(var i in args){
            if(args[i].charAt(0) == 'C'){
                content += args[i] + '\n';
            }
            else if(args[i].charAt(0) == 'M'){
                content += args[i] + '\n';
            }
        }

        treasures.forEach(treasure =>{
            content += treasure.toString() + '\n';
        });
    
        adventurers.forEach(adventurer => {
            content += adventurer.toString() + '\n';
        });
        
        try{
            fs.writeFileSync(outputFile, content);
        }
        catch(err){
            console.error(err);
        } 
    }
}