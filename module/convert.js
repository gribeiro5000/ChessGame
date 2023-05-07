import validators from "./validators.js"
import { House } from "../class/House.js"
import get from "./get.js"

function ConvertFenToVector(fen){
    var board = [[]]
    var posX = 0
    var posY = 0
    var color = ``
    for(var pos=0; pos < fen.length; pos++){
        if(fen[pos] == `/`){
            board.push([])
            posX++
            posY = 0
        } else if(parseInt(fen[pos]) >= 1){
            for(var i = 1; i <= parseInt(fen[pos]); i++){
                var house = new House(validators.columnValidator(posY) + validators.lineValidator(posX), `1`)
                posY++
                board[posX].push(house)    
            }
        } else {
            if(validators.pieceColor(fen[pos])){
                color = `white`
            } else {
                color = `black`
            }
            var house = new House(validators.columnValidator(posY) + validators.lineValidator(posX), fen[pos], color)
            posY++
            board[posX].push(house)
        }
    }
    return board
}

function ConvertboardToVector(){
    var housesId = get.getHousesId()
    var board = [[]]
    for(var posX = 0; posX < 8; posX++){
        for(var posY = 0; posY < 8; posY++){
            var house = new House(validators.columnValidator(posY) + validators.lineValidator(posX), get.getNotationByHouseId(housesId[posX][posY]))
            board[posX].push(house)
        }
        if(posX < 7){
            board.push([])
        }
    }
    return board
}

function ConvertVectorToFen(vector){
    var fen = ``
    for(var posX = 0; posX < 8; posX++){
        var freeHouse = 0
        for(var posY = 0; posY < 8; posY++){
            if(vector[posX][posY].notation == `1`){
                while(posY < 8 && vector[posX][posY].notation == `1`){
                    freeHouse += parseInt(vector[posX][posY].notation)
                    if(posY == 7){
                        break
                    } else {
                        posY++
                    }
                }
                fen += freeHouse
                freeHouse = 0                
            } if(vector[posX][posY].notation != `1`) {
                fen += vector[posX][posY].notation
            } if(posY == 7 && posX < 7){
                fen += `/`
            }
        }
    }
    return fen
    console.log(fen)
}

function convertActiveColor(color){
    if(color == `w`)
        return `b`
    if(color == `b`)
        return `w`
}

export default {
    ConvertFenToVector: ConvertFenToVector,
    ConvertVectorToFen: ConvertVectorToFen,
    ConvertboardToVector: ConvertboardToVector,
    convertActiveColor: convertActiveColor
}