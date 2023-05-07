var fen = {
    position: `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR`,
    activeColor: `w`,
    castle: `KQkq`,
    enPassant: `-`,
    halfmoveClock: 0,
    fullmoveClock: 1,
    mate: `-`,
    fenString: function(){
        return `${this.position} ${this.activeColor} ${this.castle} ${this.enPassant} ${this.halfmoveClock} ${this.fullmoveClock} ${this.mate}`
    }
}

export default fen