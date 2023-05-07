import render from "./module/render.js";
import convert from "./module/convert.js";
import move from "./module/move.js";
import boardVector from "./objects/boardVector.js"
import fen from "./objects/fen.js"
import testes from "./module/testes.js";
import {Fen} from "./class/Fen.js"
import set from "./module/set.js";
import get from "./module/get.js";
import attackedHouses from "./objects/attackedHouses.js";
import piecesAllowedMoves from "./objects/allowedHouses.js";
import validators from "./module/validators.js";
import create from "./module/create.js";
import { PiecesAllowedMoves } from "./class/PiecesAllowedMoves.js";

var fens = []
var gameIsEnd = false
var gameIsEndStringAlert = ``

update()

function update(){
    fens.push(fen.fenString())
    boardVector.board = convert.ConvertFenToVector(fen.position)
    
    //pega todas as casas que estão sendo atacadas
    attackedHouses[0] = get.getHousesAttackedByBlack()
    attackedHouses[1] = get.getHousesAttackedByWhite()

    //validação se rei está em xeque
    fen.mate = validators.kingIsInCheckValidator()

    //armazena jogadas permitidas na lista "piecesProtectCheckMovements"
    validators.allowedMoves()

    //validação de xeque Mate
    if(fen.mate == `+` && piecesAllowedMoves.length == 0){
        gameIsEnd = true
        if(fen.activeColor == `b`){
            gameIsEndStringAlert = `Xeque-Mate: As brancas ganharam`
        } else {
            gameIsEndStringAlert = `Xeque-Mate: As pretas ganharam`
        }
    }

    //validação de empate por limite de turno
    if(fen.halfmoveClock == 100){
        gameIsEnd = true
        gameIsEndStringAlert = `Empate: 100 movimentos sem captura de peças`
    }

    //validação de empate por falta de material
    for(var posX = 0; posX < boardVector.board.length; posX++){
        for(var posY = 0; posY < boardVector.board[posX].length; posY++){
            if(boardVector.board[posX][posY].notation != `K` || boardVector.board[posX][posY].notation != `k` || boardVector.board[posX][posY].notation != `1`){
                break
            } else if(posX == 7 && posY == 7){
                gameIsEnd = true
                gameIsEndStringAlert = `Empate: Sobraram apenas reis`
            }
        }
    }

    //validação de empate por afogamento
    if(piecesAllowedMoves.length == 0){
        gameIsEnd = true
        if(fen.activeColor == `b`){
            gameIsEndStringAlert = `Empate por Afogamento`
        } else {
            gameIsEndStringAlert = `Empate por Afogamento`
        }
    }

    render.boardRender(boardVector.board)
    render.load(boardVector.board)

    if(gameIsEnd){
        alert(gameIsEndStringAlert)
    }

    //cria o evento drag nas peças que podem se mover
    create.createDragPieces()

    console.log(fen)
    console.log(boardVector.board)
    console.log(piecesAllowedMoves)
}


function colorAlert(){
    if(fen.activeColor == `b`){
        return `É a vez das Pretas`
    } else {
        return `É a vez das Brancas`
    }
}

function colorAlertCheck(){
    if(fen.activeColor == `b`){
        return `O rei preto está em Xeque`
    } else {
        return `O rei branco está em Xeque`
    }
}

export default {
    update: update,
    colorAlert: colorAlert,
    colorAlertCheck: colorAlertCheck
}
