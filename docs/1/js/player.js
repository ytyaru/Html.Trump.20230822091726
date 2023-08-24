class Player {
    constructor(name) {
        this.icon = ''
        this.name = name
        this.hands = []
    }
    get Name() { return this.name }
    get Hands() { return this.hands }
    draw(id) { this.hands.push(id); this.hands.sort(); }
    //pullOut() { return this.hands[0] } // 戦略アルゴリズムによって出す手を決定する
    pullOut() { return this.hands.shift() } // 戦略アルゴリズムによって出す手を決定する
}
