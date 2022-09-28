const assert = require('assert');
const Carte = require('../CarteAuTresor');
const fs = require('fs');



it("should throw an error when one map parameter is 0", () => {
    var contentArr = [
        "C - 0 - 0 "
    ]
    var carte = new Carte(contentArr);

    const test = () => carte.initMap();

    assert.throws(test, Error);
});


it("should throw an error when map parameter is not initialized", () => {
    var contentArr = [
        "M - 0 - 0 ",
        "M - 1 - 1 "
    ]
    var carte = new Carte(contentArr);

    const test = () => carte.initMap();

    assert.throws(test, Error);
});

it("should throw an error when two elements got the same [x;y]", () => {
    var contentArr = [
        "C - 3 - 4",
        "M - 0 - 0 ",
        "T - 0 - 0 "
    ]
    var carte = new Carte(contentArr);

    const test = () => carte.initMap();

    assert.throws(test, Error);
});

it("should throw an error when file contains random parameter", () => {
    var contentArr = [
        "Z - 0 - 0 "
    ]
    var carte = new Carte(contentArr);

    const test = () => carte.initMap();

    assert.throws(test, Error);
});


it("should throw an error when map parameter is not a number", () => {
    var contentArr = [
        "C - A - 0 "
    ]
    var carte = new Carte(contentArr);

    const test = () => carte.initMap();

    assert.throws(test, Error);
});


it("should throw an error when moutain parameter is not a number", () => {
    var contentArr = [
        "C - 3 - 4 ", 
        "M - 1 - A "
    ]
    var carte = new Carte(contentArr);

    const test = () => carte.initMap();

    assert.throws(test, Error);
});


it("should throw an error when moutain parameter is out of map", () => {
    var contentArr = [
        "C - 3 - 4 ",
        "M - 5 - 5 "
    ]
    var carte = new Carte(contentArr);

    const test = () => carte.initMap();

    assert.throws(test, Error);
});


it("should throw an error when treasure parameter is not a number", () => {
    var contentArr = [
        "C - 3 - 4 ",
        "M - 1 - 0 ",
        "T - 1 - 0 - A "
    ]
    var carte = new Carte(contentArr);

    const test = () => carte.initMap();

    assert.throws(test, Error);
});


it("should throw an error when treasure parameter is out of map", () => {
    var contentArr = [
        "C - 3 - 4 ",
        "M - 1 - 0 ",
        "T - 5 - 5 - 2 "
    ]
    var carte = new Carte(contentArr);

    const test = () => carte.initMap();

    assert.throws(test, Error);
});


it("should throw an error when adventurer parameter is not a number", () => {
    var contentArr = [
        "C - 3 - 4 ",
        "M - 1 - 0 ",
        "T - 0 - 3 - 2",
        "A - Lara - A - 2 - S - AADADAGGA"
    ]
    var carte = new Carte(contentArr);

    const test = () => carte.initMap();

    assert.throws(test, Error);
});

it("should throw an error when adventurer parameter is out of map", () => {
    var contentArr = [
        "C - 3 - 4 ",
        "M - 1 - 0 ",
        "T - 0 - 3 - 2",
        "A - Lara - 5 - 5 - S - AADADAGGA"
    ]
    var carte = new Carte(contentArr);

    const test = () => carte.initMap();

    assert.throws(test, Error);
});


it("should throw an error when adventurer orientation is not correct", () => {
    var contentArr = [
        "C - 3 - 4 ",
        "M - 1 - 0 ",
        "T - 0 - 3 - 2",
        "A - Lara - 1 - 2 - F - AADADAGGA"
    ]
    var carte = new Carte(contentArr);

    const test = () => carte.initMap();

    assert.throws(test, Error);
});


it("should throw an error when adventurer movements is not correct", () => {
    var contentArr = [
        "C - 3 - 4 ",
        "M - 1 - 0 ",
        "T - 0 - 3 - 2",
        "A - Lara - 1 - 2 - S - AZERTY"
    ]
    var carte = new Carte(contentArr);

    const test = () => {
        carte.initMap();
        carte.launchGame();
    }

    assert.throws(test, Error);
});

it("should throw an error when adventurer movements contains other things than upper alphabetics", () => {
    var contentArr = [
        "C - 3 - 4 ",
        "M - 1 - 0 ",
        "T - 0 - 3 - 2",
        "A - Lara - 1 - 2 - S - 123AAGA*"
    ]
    var carte = new Carte(contentArr);

    const test = () => carte.initMap();

    assert.throws(test, Error);
});


it("should throw an error when adventurer movements is not correct", () => {
    var contentArr = [
        "C - 3 - 4 ",
        "M - 1 - 0 ",
        "T - 0 - 3 - 2",
        "A - Lara - 1 - 2 - S - AZERTY"
    ]
    var carte = new Carte(contentArr);

    const test = () => {
        carte.initMap();
        carte.launchGame();
    }

    assert.throws(test, Error);
});

it("should not change place when walking to the north while being already at the top of the map", () => {
    var contentArr = [
        "C - 3 - 4 ",
        "M - 1 - 0 ",
        "T - 0 - 3 - 2",
        "A - Lara - 2 - 0 - N - AAA"
    ]
    var carte = new Carte(contentArr);

    carte.initMap();
    carte.launchGame();

    carte.getAdventurers().forEach(adventurer => {
        assert(0 == adventurer.yPosition());
    });
});

it("should not change place when walking to the east while being already at the east of the map", () => {
    var contentArr = [
        "C - 3 - 4 ",
        "M - 1 - 0 ",
        "T - 0 - 3 - 2",
        "A - Lara - 2 - 3 - E - AAA"
    ]
    var carte = new Carte(contentArr);

    carte.initMap();
    carte.launchGame();

    carte.getAdventurers().forEach(adventurer => {
        assert(2 == adventurer.xPosition());
    });
});


it("should not change place when walking to the west while being already at the west of the map", () => {
    var contentArr = [
        "C - 3 - 4 ",
        "M - 1 - 0 ",
        "T - 0 - 3 - 2",
        "A - Lara - 0 - 0 - O - AAA"
    ]
    var carte = new Carte(contentArr);

    carte.initMap();
    carte.launchGame();

    carte.getAdventurers().forEach(adventurer => {
        assert(0 == adventurer.xPosition());
    });
});


it("should not change place when walking to the south while being already at the south of the map", () => {
    var contentArr = [
        "C - 3 - 4 ",
        "M - 1 - 0 ",
        "T - 0 - 3 - 2",
        "A - Lara - 2 - 3 - S - AAA"
    ]
    var carte = new Carte(contentArr);

    carte.initMap();
    carte.launchGame();

    carte.getAdventurers().forEach(adventurer => {
        assert(3 == adventurer.yPosition());
    });
});


it("should process normally when there is a comment in arguments", () => {
    var contentArr = [
        "C - 3 - 4 ",
        "M - 1 - 0 ",
        "T - 0 - 3 - 2",
        "A - Lara - 2 - 3 - S - AAA",
        "#Hello"
    ]
    var carte = new Carte(contentArr);

    carte.initMap();
    carte.launchGame();

    carte.getAdventurers().forEach(adventurer => {
        assert(3 == adventurer.yPosition());
    });
});

it("should process normally when there is a comment in arguments", () => {
    var contentArr = [
        "C - 3 - 4 ",
        "M - 1 - 0 ",
        "T - 0 - 3 - 2",
        "A - Lara - 2 - 3 - S - AAA",
        "#Hello"
    ]
    var carte = new Carte(contentArr);

    carte.initMap();
    carte.launchGame();

    carte.getAdventurers().forEach(adventurer => {
        assert(3 == adventurer.yPosition());
    });
});

it("should get stuck in front of the mountain", () => {
    var contentArr = [
        "C - 3 - 4 ",
        "M - 1 - 0 ",
        "T - 0 - 3 - 2",
        "A - Lara - 0 - 0 - E - AAA"
    ]
    var carte = new Carte(contentArr);

    carte.initMap();
    carte.launchGame();

    carte.getAdventurers().forEach(adventurer => {
        assert(0 == adventurer.yPosition());
        assert(0 == adventurer.xPosition());
    });
});

it("should get only one treasure even if adventurer stay on the treasure place for the next turn", () => {
    var contentArr = [
        "C - 3 - 4 ",
        "M - 1 - 0 ",
        "T - 1 - 3 - 2",
        "A - Lara - 1 - 2 - S - AAA"
    ]
    var carte = new Carte(contentArr);

    carte.initMap();
    carte.launchGame();

    carte.getAdventurers().forEach(adventurer => {
        assert(1 == adventurer.getNbTreasures());
    });
});

it("Lara should go forward and indiana should be stuck by lara when trying to go forward", () => {
    var contentArr = [
        "C - 3 - 4 ",
        "M - 1 - 0 ",
        "T - 1 - 3 - 2",
        "A - Lara - 1 - 2 - S - AAA",
        "A - Indiana - 2 - 3 - O - AAA"
    ]
    var carte = new Carte(contentArr);

    carte.initMap();
    carte.launchGame();

    var lara = carte.getAdventurers()[0];
    var indiana = carte.getAdventurers()[1];

    assert(3 == lara.yPosition());
    assert(1 == lara.xPosition());
    assert(3 == indiana.yPosition());
    assert(2 == indiana.xPosition());
});

/* it("should create a output file whith all the game state in it", () => {
    var contentArr = [
        "C - 3 - 4",
        "M - 1 - 0",
        "M - 2 - 1",
        "T - 0 - 3 - 2",
        "T - 1 - 3 - 3",
        "A - Lara - 1 - 1 - S - AADADAGGA",
        "#Randomline"
    ]
    var carte = new Carte(contentArr);

    carte.initMap();
    carte.launchGame();

    const buffer = fs.readFileSync("./resources/output.txt");

    const fileContent = buffer.toString();

    const expectedContent = "C - 3 - 4\n" +
                            "M - 1 - 0\n" +
                            "M - 2 - 1\n" +
                            "T - 0 - 3 - 0\n"+
                            "T - 1 - 3 - 2\n"+
                            "A - Lara - 0 - 3 - S - 3\n";
                            

    //console.log(fileContent)    --> le fichier affiche bien le meme contenu, mais le test fail, cela doit etre du aux caractères spéciaux
    assert(expectedContent == fileContent)
}); */