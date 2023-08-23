class Deck { // 山札。52枚＋Joker(Black,White)
    constructor(withJoker=false) {
        this.cards = [...Array(52)].map((_, i) => i + 1)
        if (withJoker) { this.cards.push(54); this.cards.push(55); }
    }
    sort() { this.cards.sort() } // pop, shift
    pop() { return this.cards.pop() }
    shift() { return this.cards.shift() }
    shuffle() { // https://qiita.com/pure-adachi/items/77fdf665ff6e5ea22128
        for (let i=this.cards.length; 1<i; i--) {
            const k = Math.floor(Math.random() * i);
            [this.cards[k], this.cards[i - 1]] = [this.cards[i - 1], this.cards[k]];
        }
    }
    get Cards() { return this.cards }
    get Count() { return this.cards.length }
}
