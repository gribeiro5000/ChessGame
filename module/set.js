import { Fen } from "../class/Fen.js"
import boardVector from "../objects/boardVector.js"
import create from "./create.js"
import fen from "../objects/fen.js"
import render from "./render.js"

function setFenList(fenString){
    var fenArray = []
    var fenArray = fenString.split(` `)
    var fen = new Fen(fenArray[0], fenArray[1], fenArray[2], fenArray[3], fenArray[4], fenArray[5], fenArray[6], fenString)
    return fen
}

function setCastle(kingHouse, selectedHouse){
    if(kingHouse == `e1` && selectedHouse == `g1`){
        document.getElementById(`h1`).removeChild(document.getElementById(`h1`).firstChild)
        create.createPiece(`R`, `f1`)
        fen.castle = fen.castle.replace(`K`, ``)
        fen.castle = fen.castle.replace(`Q`, ``)
        return true
    } if(kingHouse == `e1` && selectedHouse == `c1`){
        document.getElementById(`a1`).removeChild(document.getElementById(`a1`).firstChild)
        create.createPiece(`R`, `d1`)
        fen.castle = fen.castle.replace(`K`, ``)
        fen.castle = fen.castle.replace(`Q`, ``)
        return true
    } if(kingHouse == `e8` && selectedHouse == `g8`){
        document.getElementById(`h8`).removeChild(document.getElementById(`h8`).firstChild)
        create.createPiece(`r`, `f8`)
        fen.castle = fen.castle.replace(`k`, ``)
        fen.castle = fen.castle.replace(`q`, ``)
        return true
    } if(kingHouse == `e8` && selectedHouse == `c8`){
        document.getElementById(`a8`).removeChild(document.getElementById(`a8`).firstChild)
        create.createPiece(`r`, `d8`)
        fen.castle = fen.castle.replace(`k`, ``)
        fen.castle = fen.castle.replace(`q`, ``)
        return true
    }
}

function promotionPawn(){
    document.getElementById(this.id.substr(1, 2)).removeChild(document.getElementById(this.id.substr(1, 2)).firstChild)
    create.createPiece(this.id[0], this.id.substr(1, 2))
    document.querySelector(`dialog`).close()
    document.querySelector(`dialog`).classList.add(`hide`)
    render.refresh()
}

export default {
    setFenList: setFenList,
    setCastle: setCastle,
    promotionPawn: promotionPawn
}