class Tactics {
    constractor(rules, players, deck, stages, values, points) {
        this.rules = rules
        this.players = players
        this.deck = deck
        this.stages = stages
        this.values = values
        this.points = points
    }
    shift(r, p) { return this.players[p].Hands.shift() } // r:roundNum, p:playerIdx
    pop(r, p) { return this.players[p].Hands.pop() } // r:roundNum, p:playerIdx
    random(r, p) { return this.players[p].Hands.pop() } // r:roundNum, p:playerIdx
}
