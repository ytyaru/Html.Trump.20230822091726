class Card {
    static fromId(id) {
        if (0===id) { return '🂠' } // BACK
        else if (1<=id && id<=52) { return this.fromSuitNum(...this.#suitNum(id)) } // SUIT Spade,Hart,Diamond,Club  NUM 1〜13
        else if (53===id) { return '🂿' } // RED JOKER
        else if (54===id) { return '🃏' } // BLACK JOKER
        else if (55===id) { return '🃟' } // WHITE JOKER
        else { throw new Error('引数idは0〜55までの整数値です。') }
    }
    static #suitNum(id) {
        if (1 <= id && id <= 52) {
            const suitId = Math.floor((id - 1) / 13) + 1
            const num = id - ((suitId - 1) * 13)
            console.debug(id, [suitId, num])
            return [suitId, num]
        }
        else if (0 === id) { return [0,0] } // suit,num不明（裏面）
        else if (53 <= id && id <= 55) { return [-1,-1] } // suitなし（Joker）
        else { return [-2,-2] } // 不正ID
    }
    static fromName(name) {
        switch(name) {
            case 'B': return '🂠' // Back
            case 'JR': return '🂿' // Joker Red
            case 'JB': return '🃏' // Joker Black
            case 'JW': return '🃟' // Joker White
        }
        const suit = name[0]
        const num = parseInt(name.slice(1))
        if (num < 1|| 13 < num) { throw new Error('数は1〜13の整数値であるべきです。') }
        return this.fromSuitNum(suit, num)
    }
    static #getSuitId(suit) {
        if (Type.isInt(suit)) {
            if (suit < 1 || 4 < suit) { throw new Error('引数suitは整数1〜4であるべきです。') }
            return suit
        }
        else if (Type.isStr(suit)) {
            switch(suit) {
                case 'S': return 1
                case 'H': return 2
                case 'D': return 3
                case 'C': return 4
                default: throw new Error('引数suitは文字列S,H,D,Cのいずれかであるべきです。')
            }
        }
        else { throw new Error('引数suitは文字列S,H,D,Cまたは整数1〜4のいずれかであるべきです。') }
    }
    static #getSuitAceCp(suit) { return 0x1F0A1 + (16 * (this.#getSuitId(suit) - 1)) } // suitId=0〜4(Spade,Hart,Diamond,Club)
    static fromSuitNum(suit, num) { return String.fromCodePoint(this.#getSuitAceCp(suit) + ((11<num) ? num+1 : num) - 1) } // A+1〜13-1（JとQの間にあるCを飛ばす）
    constructor(id, isFace=true) { // back(B), joker(JR,JB,JW), suit+num（S1,H1,D1,C1）
        this.id = id
        this.isFace = isFace
        this.codePoint = 0x00
        this.char = Card.fromId(this.id)
    }
    faceUp() { this.isFace = true } // 表にして置く
    faceDown() { this.isFace = false } // 裏にして置く
    // IDからsuit,numを算出する
    get Suit() { return this.SuitNum[0] }
    // IDからNumを算出する
    get Num() { return this.SuitNum[1] }
    get SuitNum() { return Card.#suitNum(this.id) }
    get Id() { return this.id }
    get Char() { return (this.isFace) ? this.char : '🂠' }
    /*
    { // -2:不正ID, -1:suitなし(Joker), 0:suit不明(裏面), 1〜4:Spade,Hart,Diamond,Club
        if (1 <= this.id && this.id <= 52) {
            const suitId = Math.floor(this.id / 13) + 1
            const num = (this.id % 13) + 1
            return [suitId, num]
        }
        else if (0 === this.id) { return [0,0] } // suit,num不明（裏面）
        else if (53 <= this.id && this.id <= 55) { return [-1,-1] } // suitなし（Joker）
        else { return [-2,-2] } // 不正ID
    }
    */
}

