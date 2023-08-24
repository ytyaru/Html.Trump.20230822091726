class Card {
    constructor() { // back, joker(r,b,w), suit+num
        this.back = 0
        this.joker = 0
        this.suit = 0
        this.number = 0
        this.value = 0
        this.char = '🂠'
        this.codePoint = 
    }
}
class Suit {
    constructor() {
        this.id = 0
        this.char = '♥'
        this.name = 'hart'
    }
}
class Num {
    constructor() {
        this.id = 11
        this.char = 'Ｊ' // 🔟⑩
        this.name = 'jack'
    }
}
class SuitNumCard {
    constructor(suit, num) {
        this.suit = suit
        this.num = num
        this.char = '🂡'
    }
    get Char() {

    }
    #getAceCp() {

    }
}
const Suits = Object.freeze({
    Spade: new Suit(1, '♠', 'Spade'),
    Hart: new Suit(2, '♥', 'Hart'),
    Diamond: new Suit(3, '♦', 'Diamond'),
    Club: new Suit(4, '♣', 'Club'),
})
const Nums = Object.freeze({
    1: new Num(1, 'A', 'Ace'),
    2: new Num(2, '2', 'Two'),
    3: new (3, '3', 'Three'),
    4: new (4, '4', 'Four'),
    5: new (5, '5', 'Five'),
    6: new (6, '6', 'Six'),
    7: new (7, '7', 'Seven'),
    8: new (8, '8', 'Eight'),
    9: new (9, '9', 'Nine'),
    10: new (10, '10', 'Ten'),
    11: new (11, 'J', 'Jack'),
    12: new (12, 'Q', 'Queen'),
    13: new (13, 'K', 'King'),
})
const Jokers = Object.freeze({
    Red: 1,
    Black: 2,
    White: 3,
})


function getCard(suit, number) { // -1:back, 0:joker, 1〜4:♠♥♦♣,   number:0〜2(Red/black/white), 1〜13(A〜K)
    if (Type.isInt(suit)) {
        if (-1===suit) { return '🂠' }
        else if (0===suit || 14===number) { return getJoker(number) } // JOKER
        else if (1<=suit && suit<=4) { return getSuitCard(getSuitCardAceCp(getSuitId(suit)), number) } // ♤♡♢♧ ♠♥♦♣
        else { throw new Error('引数値不正。suit(-1:back, 0:joker, 1〜4:♠♥♦♣), number(joker:0〜2(Red/black/white), suit:1〜13(A〜K))') }
    }
    else if (Type.isStr(suit)) { return getCardFromName(suit, number) }
    else { throw new Error('引数型不正。suitは整数値か文字列のみ受け付けます。') }
}
function getJoker(color) {
    switch (color) {
        case 0:
        case 'r':
        case 'R':
        case 'red':
        case 'RED': return '🂿' // RED
        case 1:
        case 'b':
        case 'B':
        case 'black':
        case 'Black':
        case 'BLACK': return '🃏' // BLACK
        case 2:
        case 'w':
        case 'W':
        case 'white':
        case 'White':
        case 'WHITE': return '🃟' // WHITE
        default: throw new Error('Jokerは0〜2またはRED/BLACK/WHITEの引数のみ受け付けます。')
    }
}
function getSuitId(name) {
    switch (name) {
        case -1:
        case 'b':
        case 'B':
        case 'back':
        case 'Back':
        case 'BACK': return -1
        case 0:
        case 'j':
        case 'J':
        case 'joker':
        case 'Joker':
        case 'JOKER': return 0
        case 1:
        case 's':
        case 'S':
        case 'spade':
        case 'Spade':
        case 'SPADE': return 1
        case 2:
        case 'h':
        case 'H':
        case 'hart':
        case 'Hart':
        case 'HART': return 2
        case 3:
        case 'd':
        case 'D':
        case 'diamond':
        case 'Diamond':
        case 'DIAMOND': return 3
        case 4:
        case 'c':
        case 'C':
        case 'club':
        case 'Club':
        case 'CLUB': return 4
        default: throw new Error('')
    }
}
function getCardFromName(name, number) {
    switch (name) {
        case 'b':
        case 'B':
        case 'back':
        case 'Back':
        case 'BACK': return '🂠'
        case 'rj':
        case 'RJ':
        case 'RedJoker':
        case 'red-joker':
        case 'RED_JOKER': return '🂿'
        case 'bj':
        case 'BJ':
        case 'BlackJoker':
        case 'black-joker':
        case 'BLACK_JOKER': return '🃏'
        case 'wj':
        case 'WJ':
        case 'WhiteJoker':
        case 'white-joker':
        case 'WHITE_JOKER': return '🃟'
        case 's':
        case 'S':
        case 'spade':
        case 'Spade':
        case 'SPADE': return getSuitCard(getSuitCardAceCp(1), number)
        case 'h':
        case 'H':
        case 'hart':
        case 'Hart':
        case 'HART': return getSuitCard(getSuitCardAceCp(2), number)
        case 3:
        case 'd':
        case 'D':
        case 'diamond':
        case 'Diamond':
        case 'DIAMOND': return getSuitCard(getSuitCardAceCp(3), number)
        case 'c':
        case 'C':
        case 'club':
        case 'Club':
        case 'CLUB': return getSuitCard(getSuitCardAceCp(4), number)
        default: throw new Error('引数値不正。suit(B:back, RJ/BJ/WJ:Joker, S/H/D/C:♠♥♦♣), number(1〜13:A〜K)')
    }
}
function getSuitCardAceCp(suitId) {
    switch(suitId) {
        case 1: return 0x1F0A1
        case 2: return 0x1F0B1
        case 3: return 0x1F0C1
        case 4: return 0x1F0D1
        default: throw new Error('スートカードのAのコードポイントを取得するには引数1〜4であるべきです。')
    }
}
function getSuitCard(aceCp, number) {
    if (number < 1 || 13 < number) { throw new Error('スートカードの絵文字を取得するには引数numberは1〜13であるべきです。') }
    if (11 < number) { number += 1 } // JとQの間にあるC(🂬)を飛ばす
    return String.fromCodePoint(aceCp + number - 1) // A + 1〜13 - 1
}

/*
function getNumberId(name) {
    switch (number) {
        case 'a':
        case 'A': return 1
        case 'a':
        case 'A': return 1
        case 'B':
        case 'back':
        case 'Back':
        case 'BACK': return -1
        case 'j':
        case 'J':
        case 'joker':
        case 'Joker':
        case 'JOKER': return 0
        case 's':
        case 'S':
        case 'spade':
        case 'Spade':
        case 'SPADE': return 1
        case 'h':
        case 'H':
        case 'hart':
        case 'Hart':
        case 'HART': return 2
        case 'd':
        case 'D':
        case 'diamond':
        case 'Diamond':
        case 'DIAMOND': return 3
        case 'c':
        case 'C':
        case 'club':
        case 'Club':
        case 'CLUB': return 4
        default: throw new Error('引数不正。suit(B:back, RJ/BJ/WJ:Joker, S/H/D/C:♠♥♦♣), number(1〜13:A〜K)')
    }
}
*/
