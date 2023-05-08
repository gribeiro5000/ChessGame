import get from "./get.js"
import boardVector from "../objects/boardVector.js"
import fen from "../objects/fen.js"
import attackedHouses from "../objects/attackedHouses.js"

function predictPieceAttack(pieceId){
    var houses = []
    if(pieceId[0] == `p` || pieceId[0] == `P`){
        houses = predictPawnAttack(pieceId)
        return houses
    } if(pieceId[0] == `q` || pieceId[0] == `Q`){
        houses = predictQueen(pieceId)
        return houses
    } if(pieceId[0] == `r` || pieceId[0] == `R`){
        houses = predictRook(pieceId)
        return houses
    } if(pieceId[0] == `k` || pieceId[0] == `K`){
        houses = predictKing(pieceId)
        return houses
    } if(pieceId[0] == `b` || pieceId[0] == `B`){
        houses = predictBishop(pieceId)
        return houses
    } if(pieceId[0] == `n` || pieceId[0] == `N`){
        houses = predictKnight(pieceId)
        return houses
    } if(pieceId[0] == `1` || pieceId[0] == `1`){
        return houses
    }
}

function predictHousesAttack(pieceId){
    var houses = []
    if(pieceId[0] == `p` || pieceId[0] == `P`){
        houses = predictPawnAttackHouse(pieceId)
        return houses
    } if(pieceId[0] == `q` || pieceId[0] == `Q`){
        houses = predictQueen(pieceId)
        return houses
    } if(pieceId[0] == `r` || pieceId[0] == `R`){
        houses = predictRook(pieceId)
        return houses
    } if(pieceId[0] == `k` || pieceId[0] == `K`){
        houses = predictKing(pieceId)
        return houses
    } if(pieceId[0] == `b` || pieceId[0] == `B`){
        houses = predictBishop(pieceId)
        return houses
    } if(pieceId[0] == `n` || pieceId[0] == `N`){
        houses = predictKnight(pieceId)
        return houses
    } if(pieceId[0] == `1` || pieceId[0] == `1`){
        return houses
    }
}

function predictPieceMove(pieceId){
    var houses = []
    if(pieceId[0] == `p` || pieceId[0] == `P`){
        houses = predictPawnMove(pieceId)
        return houses
    } else {
        return houses
    }
}

function predictPawnMove(pieceId){
    var houses = []

    var posX = get.getLineVectorByHouse(pieceId.substr(1, 2))
    var posY = get.getColumnVectorByHouse(pieceId.substr(1, 2))

    //move
    if(pieceId[0] == `P` && posX == 6){
        houses.push(...moveUp(posX, posY, boardVector.board, 2))
    } if(pieceId[0] == `p` && posX == 1){
        houses.push(...moveDown(posX, posY, boardVector.board, 2))
    } if(pieceId[0] == `P` && posX != 6){
        houses.push(...moveUp(posX, posY, boardVector.board, 1))
    } if(pieceId[0] == `p` && posX != 1){
        houses.push(...moveDown(posX, posY, boardVector.board, 1))
    }
    

    return houses
}

function predictPawnAttack(pieceId){
    var houses = []

    var posX = get.getLineVectorByHouse(pieceId.substr(1, 2))
    var posY = get.getColumnVectorByHouse(pieceId.substr(1, 2))

    if(posY + 1 < boardVector.board[posX].length){
        if(pieceId[0] == `P` && boardVector.board[posX - 1][posY + 1].notation != `1`){
            houses.push(...captureUpRight(posX, posY, boardVector.board, 1))
        } else if(pieceId[0] == `P` && boardVector.board[posX - 1][posY + 1].house == fen.enPassant){
            houses.push(...captureUpRight(posX, posY, boardVector.board, 1))
        }
        if(pieceId[0] == `p` && boardVector.board[posX + 1][posY + 1].notation != `1`){
            houses.push(...captureDownRight(posX, posY, boardVector.board, 1))
        } else if(pieceId[0] == `p` && boardVector.board[posX + 1][posY + 1].house == fen.enPassant){
            houses.push(...captureDownRight(posX, posY, boardVector.board, 1))
        }
    } if(posY - 1 >= 0) {
        if(pieceId[0] == `P` && boardVector.board[posX - 1][posY - 1].notation != `1`){
            houses.push(...captureUpLeft(posX, posY, boardVector.board, 1))
        } else if(pieceId[0] == `P` && boardVector.board[posX - 1][posY - 1].house == fen.enPassant){
            houses.push(...captureUpLeft(posX, posY, boardVector.board, 1))
        }
        if(pieceId[0] == `p` && boardVector.board[posX + 1][posY - 1].notation != `1`){
            houses.push(...captureDownLeft(posX, posY, boardVector.board, 1))
        } else if(pieceId[0] == `p` && boardVector.board[posX + 1][posY - 1].house == fen.enPassant){
            houses.push(...captureDownLeft(posX, posY, boardVector.board, 1))
        }
    }

    return houses
}

function predictPawnAttackHouse(pieceId){
    var houses = []

    var posX = get.getLineVectorByHouse(pieceId.substr(1, 2))
    var posY = get.getColumnVectorByHouse(pieceId.substr(1, 2))

    if(posY + 1 < boardVector.board[posX].length){
        if(pieceId[0] == `P`){
            houses.push(...captureUpRight(posX, posY, boardVector.board, 1))
        }
        
        if(pieceId[0] == `p`){
            houses.push(...captureDownRight(posX, posY, boardVector.board, 1))
        }
    } if(posY - 1 >= 0) {
        if(pieceId[0] == `P`){
            houses.push(...captureUpLeft(posX, posY, boardVector.board, 1))
        }
        
        if(pieceId[0] == `p`){
            houses.push(...captureDownLeft(posX, posY, boardVector.board, 1))
        }
    }

    return houses
}

function predictQueen(pieceId){
    var houses = []
    var posX = get.getLineVectorByHouse(pieceId.substr(1, 2))
    var posY = get.getColumnVectorByHouse(pieceId.substr(1, 2))
    houses.push(...captureUp(posX, posY, boardVector.board, 8))
    houses.push(...captureDown(posX, posY, boardVector.board, 8))
    houses.push(...captureLeft(posX, posY, boardVector.board, 8))
    houses.push(...captureRight(posX, posY, boardVector.board, 8))
    houses.push(...captureUpRight(posX, posY, boardVector.board, 8))
    houses.push(...captureUpLeft(posX, posY, boardVector.board, 8))
    houses.push(...captureDownRight(posX, posY, boardVector.board, 8))
    houses.push(...captureDownLeft(posX, posY, boardVector.board, 8))
    return houses
}

function predictKing(pieceId){
    var houses = []
    var posX = get.getLineVectorByHouse(pieceId.substr(1, 2))
    var posY = get.getColumnVectorByHouse(pieceId.substr(1, 2))
    houses.push(...captureUp(posX, posY, boardVector.board, 1))
    houses.push(...captureDown(posX, posY, boardVector.board, 1))
    houses.push(...captureUpRight(posX, posY, boardVector.board, 1))
    houses.push(...captureUpLeft(posX, posY, boardVector.board, 1))
    houses.push(...captureDownRight(posX, posY, boardVector.board, 1))
    houses.push(...captureDownLeft(posX, posY, boardVector.board, 1))

    //castle
    if(boardVector.board[posX][posY].color == `white`){

        if(fen.castle.indexOf(`Q`) != -1 && 
        boardVector.board[posX][posY - 1].notation == `1` && attackedHouses[0].indexOf(boardVector.board[posX][posY - 1].house) == -1 &&
        boardVector.board[posX][posY - 2].notation == `1` && attackedHouses[0].indexOf(boardVector.board[posX][posY - 2].house) == -1 &&
        boardVector.board[posX][posY - 3].notation == `1` && attackedHouses[0].indexOf(boardVector.board[posX][posY - 3].house) == -1){
            houses.push(...captureLeft(posX, posY, boardVector.board, 2))
        } else {
            houses.push(...captureLeft(posX, posY, boardVector.board, 1))
        }
        if(fen.castle.indexOf(`K`) != -1 && 
        boardVector.board[posX][posY + 1].notation == `1` && attackedHouses[0].indexOf(boardVector.board[posX][posY + 1].house) == -1 && 
        boardVector.board[posX][posY + 2].notation == `1` && attackedHouses[0].indexOf(boardVector.board[posX][posY + 2].house) == -1){
            houses.push(...captureRight(posX, posY, boardVector.board, 2))
        } else{
            houses.push(...captureRight(posX, posY, boardVector.board, 1))
        }
    }if(boardVector.board[posX][posY].color == `black`){
        if(fen.castle.indexOf(`q`) != -1 && 
        boardVector.board[posX][posY - 1].notation == `1` && attackedHouses[1].indexOf(boardVector.board[posX][posY - 1].house) == -1 &&
        boardVector.board[posX][posY - 2].notation == `1` && attackedHouses[1].indexOf(boardVector.board[posX][posY - 2].house) == -1 &&
        boardVector.board[posX][posY - 3].notation == `1` && attackedHouses[1].indexOf(boardVector.board[posX][posY - 3].house) == -1){
            houses.push(...captureLeft(posX, posY, boardVector.board, 2))
        } else {
            houses.push(...captureLeft(posX, posY, boardVector.board, 1))
        }
        if(fen.castle.indexOf(`k`) != -1 &&
        boardVector.board[posX][posY + 1].notation == `1` && attackedHouses[0].indexOf(boardVector.board[posX][posY + 1].house) == -1 &&
        boardVector.board[posX][posY + 2].notation == `1` && attackedHouses[0].indexOf(boardVector.board[posX][posY + 2].house) == -1){
            houses.push(...captureRight(posX, posY, boardVector.board, 2))
        } else{
            houses.push(...captureRight(posX, posY, boardVector.board, 1))
        }
    }

    return houses
}

function predictBishop(pieceId){
    var houses = []
    var posX = get.getLineVectorByHouse(pieceId.substr(1, 2))
    var posY = get.getColumnVectorByHouse(pieceId.substr(1, 2))
    houses.push(...captureUpRight(posX, posY, boardVector.board, 8))
    houses.push(...captureUpLeft(posX, posY, boardVector.board, 8))
    houses.push(...captureDownRight(posX, posY, boardVector.board, 8))
    houses.push(...captureDownLeft(posX, posY, boardVector.board, 8))
    return houses
}

function predictKnight(pieceId){
    var houses = []
    var posX = get.getLineVectorByHouse(pieceId.substr(1, 2))
    var posY = get.getColumnVectorByHouse(pieceId.substr(1, 2))
    houses.push(...captureLUp(posX, posY, boardVector.board))
    houses.push(...captureLDown(posX, posY, boardVector.board))
    return houses
}

function predictRook(pieceId){
    var houses = []
    var posX = get.getLineVectorByHouse(pieceId.substr(1, 2))
    var posY = get.getColumnVectorByHouse(pieceId.substr(1, 2))
    houses.push(...captureUp(posX, posY, boardVector.board, 8))
    houses.push(...captureDown(posX, posY, boardVector.board, 8))
    houses.push(...captureLeft(posX, posY, boardVector.board, 8))
    houses.push(...captureRight(posX, posY, boardVector.board, 8))
    return houses
}



function moveUp(posX, posY, vector, numberHouses){
    var houses = []
    for(var i = 1; i <= numberHouses; i++){
        if(posX - i >= 0){
            if(vector[(posX - i)][posY].notation == `1`){
                houses.push(vector[(posX - i)][posY].house)
            } else {
                break
            }
        }
    }
    return houses
}

function moveDown(posX, posY, vector, numberHouses){
    var houses = []
    for(var i = 1; i <= numberHouses; i++){
        if(posX + i < vector.length){
            if(vector[(posX + i)][posY].notation == `1`){
                houses.push(vector[(posX + i)][posY].house)
            } else {
                break
            }
        }
    }
    return houses
}

function captureUp(posX, posY, vector, numberHouses){
    var houses = []
    for(var i = 1; i <= numberHouses; i++){
        if(posX - i >= 0){
            if(vector[posX - i][posY].notation == `1`){
                houses.push(vector[posX - i][posY].house)
            } else if(vector[posX - i][posY].color != vector[posX][posY].color){
                houses.push(vector[posX - i][posY].house)
                break
            } else if(vector[posX - i][posY].color == vector[posX][posY].color){
                break
            }
        }
    }
    return houses
}

function captureDown(posX, posY, vector, numberHouses){
    var houses = []
    for(var i = 1; i <= numberHouses; i++){
        if(posX + i < vector.length){
            if(vector[(posX + i)][posY].notation == `1`){
                houses.push(vector[(posX + i)][posY].house)
            } else if(vector[(posX + i)][posY].color != vector[posX][posY].color){
                houses.push(vector[(posX + i)][posY].house)
                break
            } else if(vector[(posX + i)][posY].color == vector[posX][posY].color){
                break
            }
        }
    }
    return houses
}

function captureLeft(posX, posY, vector, numberHouses){
    var houses = []
    for(var i = 1; i <= numberHouses; i++){
        if(posY - i >= 0){
            if(vector[posX][posY- i].notation == `1`){
                houses.push(vector[posX][posY - i].house)
            } else if(vector[posX][posY - i].color != vector[posX][posY].color){
                houses.push(vector[posX][posY - i].house)
                break
            } else if(vector[posX][posY - i].color == vector[posX][posY].color){
                break
            }
        }
    }
    return houses
}

function captureRight(posX, posY, vector, numberHouses){
    var houses = []
    for(var i = 1; i <= numberHouses; i++){
        if(posY + i < vector[posX].length){
            if(vector[posX][posY + i].notation == `1`){
                houses.push(vector[posX][posY + i].house)
            } else if(vector[posX][posY + i].color != vector[posX][posY].color){
                houses.push(vector[posX][posY + i].house)
                break
            } else if (vector[posX][posY + i].color == vector[posX][posY].color){
                break
            }
        }
    }
    return houses
}

function captureUpRight(posX, posY, vector, numberHouses){
    var houses = []
    for(var i = 1; i <= numberHouses; i++){
        if(posX - i >= 0 && posY + i < vector[posX].length){
            if(vector[posX - i][posY + i].notation == `1`){
                houses.push(vector[posX - i][posY + i].house)
            } else if(vector[posX - i][posY + i].color != vector[posX][posY].color){
                houses.push(vector[posX - i][posY + i].house)
                break
            } else if(vector[posX - i][posY + i].color == vector[posX][posY].color){
                break
            }
        }
    }
    return houses
}

function captureUpLeft(posX, posY, vector, numberHouses){
    var houses = []
    for(var i = 1; i <= numberHouses; i++){
        if(posX - i >= 0 && posY - i >= 0){
            if(vector[posX - i][posY - i].notation == `1`){
                houses.push(vector[posX - i][posY - i].house)
            } else if(vector[posX - i][posY - i].color != vector[posX][posY].color){
                houses.push(vector[posX - i][posY - i].house)
                break
            } else if(vector[posX - i][posY - i].color == vector[posX][posY].color){
                break
            }
        }
    }
    return houses
}

function captureDownRight(posX, posY, vector, numberHouses){
    var houses = []
    for(var i = 1; i <= numberHouses; i++){
        if(posX + i < vector.length && posY + i < vector[posX].length){
            if(vector[posX + i][posY + i].notation == `1`){
                houses.push(vector[posX + i][posY + i].house)
            } else if(vector[posX + i][posY + i].color != vector[posX][posY].color){
                houses.push(vector[posX + i][posY + i].house)
                break
            } else if(vector[posX + i][posY + i].color == vector[posX][posY].color){
                break
            }
        }
    }
    return houses
}

function captureDownLeft(posX, posY, vector, numberHouses){
    var houses = []
    for(var i = 1; i <= numberHouses; i++){
        if(posX + i < vector.length && posY - i >= 0){
            if(vector[posX + i][posY - i].notation == `1`){
                houses.push(vector[posX + i][posY - i].house)
            } else if(vector[posX + i][posY - i].color != vector[posX][posY].color){
                houses.push(vector[posX + i][posY - i].house)
                break
            } else if(vector[posX + i][posY - i].color == vector[posX][posY].color){
                break
            }
        }
    }
    return houses
}

function captureLUp(posX, posY, vector){
    var houses = []
    var pos = [[posX - 2, posY - 1], [posX - 2, posY + 1], [posX - 1, posY - 2], [posX - 1, posY + 2]]
    if(pos[0][0] >= 0 && pos[0][1] >= 0){
        if(vector[pos[0][0]][pos[0][1]].notation == `1`){
            houses.push(vector[pos[0][0]][pos[0][1]].house)
        } else if(vector[pos[0][0]][pos[0][1]].color != vector[posX][posY].color){
            houses.push(vector[pos[0][0]][pos[0][1]].house)
        }
    } if(pos[1][0] >= 0 && pos[1][1] < vector[posX].length){
        if(vector[pos[1][0]][pos[1][1]].notation == `1`){
            houses.push(vector[pos[1][0]][pos[1][1]].house)
        } else if(vector[pos[1][0]][pos[1][1]].color != vector[posX][posY].color){
            houses.push(vector[pos[1][0]][pos[1][1]].house)
        }
    } if(pos[2][0] >= 0 && pos[2][1] >= 0){
        if(vector[pos[2][0]][pos[2][1]].notation == `1`){
            houses.push(vector[pos[2][0]][pos[2][1]].house)
        } else if(vector[pos[2][0]][pos[2][1]].color != vector[posX][posY].color){
            houses.push(vector[pos[2][0]][pos[2][1]].house)
        }
    } if(pos[3][0] >= 0 && pos[3][1] < vector[posX].length){
        if(vector[pos[3][0]][pos[3][1]].notation == `1`){
            houses.push(vector[pos[3][0]][pos[3][1]].house)
        } else if(vector[pos[3][0]][pos[3][1]].color != vector[posX][posY].color){
            houses.push(vector[pos[3][0]][pos[3][1]].house)
        }
    }

    return houses
}

function captureLDown(posX, posY, vector){
    var houses = []
    var pos = [[posX + 2, posY - 1], [posX + 2, posY + 1], [posX + 1, posY - 2], [posX + 1, posY + 2]]
    if(pos[0][0] < vector.length && pos[0][1] >= 0){
        if(vector[pos[0][0]][pos[0][1]].notation == `1`){
            houses.push(vector[pos[0][0]][pos[0][1]].house)
        } else if(vector[pos[0][0]][pos[0][1]].color != vector[posX][posY].color){
            houses.push(vector[pos[0][0]][pos[0][1]].house)
        }
    } if(pos[1][0] < vector.length && pos[1][1] < vector[posX].length){
        if(vector[pos[1][0]][pos[1][1]].notation == `1`){
            houses.push(vector[pos[1][0]][pos[1][1]].house)
        } else if(vector[pos[1][0]][pos[1][1]].color != vector[posX][posY].color){
            houses.push(vector[pos[1][0]][pos[1][1]].house)
        }
    } if(pos[2][0] < vector.length && pos[2][1] >= 0){
        if(vector[pos[2][0]][pos[2][1]].notation == `1`){
            houses.push(vector[pos[2][0]][pos[2][1]].house)
        } else if(vector[pos[2][0]][pos[2][1]].color != vector[posX][posY].color){
            houses.push(vector[pos[2][0]][pos[2][1]].house)
        }
    } if(pos[3][0] < vector.length && pos[3][1] < vector[posX].length){
        if(vector[pos[3][0]][pos[3][1]].notation == `1`){
            houses.push(vector[pos[3][0]][pos[3][1]].house)
        } else if(vector[pos[3][0]][pos[3][1]].color != vector[posX][posY].color){
            houses.push(vector[pos[3][0]][pos[3][1]].house)
        }
    }

    return houses
}

export default {
    moveUp: moveUp,
    predictPieceAttack: predictPieceAttack,
    predictPieceMove: predictPieceMove,
    predictHousesAttack: predictHousesAttack
}