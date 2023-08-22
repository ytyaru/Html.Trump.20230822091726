class Player {
    constructor() {
        this.icon = ''
        this.name = ''
        this.hands = []
    }
    draw(id) { this.hands.push(id); this.hands.sort(); }
    pullOut() { return this.hands[0] } // 戦略アルゴリズムによって出す手を決定する
}
