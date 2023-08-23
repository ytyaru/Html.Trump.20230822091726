class Game {
    constructor(rules, players) {
        this.rules = rules
        this.players = players
        this.stages = []
        this.values = []
        this.points = []
    }
    start() {
        this.#make()
        this.#show()
        this.#init()
        this.#play()
        this.#result()
    }
    #make() { // rule, player, deck 作成
        this.rule = {}
        this.rule.deck = {}
        this.rule.deck.withJoker = true
        this.rule.round = 3
        this.rule.hand = 3
        this.rule.thinkSec = [10, 5, 3]
        this.deck = new Deck(this.rule.deck.count, this.rule.deck.withJoker)
        this.players = [new Player('A'), new Player('B'), new Player('C'), new Player('D')]
    }
    #show() { // rule, player, deck 表示
        console.log(this.rule)
        console.log(this.players)
    }
    #init() { // 初期処理
        this.deck.shuffle()
        this.#deal()
    }
    #deal() {
        for (let h=0; h<this.rule.hand; h++) {
            for (let p=0; p<this.players.length; p++) {
                this.players[p].Hands.push(this.deck.shift())
            }
        }
        for (let p=0; p<this.players.length; p++) {
            console.log(`${p} ${this.players[p].Name}`, this.players[p].Hands)
        }
    }
    #play() { // ゲーム
        for (let r=0; r<this.rule.round; r++) {
            console.log(`${r+1} Round`)
            // thinkSec秒だけキー入力待受する
            // 手
            const stage = this.players.map(p=>p.pullOut())
            console.log(stage)
            this.stages.push(stage)
            this.#calc(stage)
            console.log(stage)
            this.#judge(stage)
            //console.log(this.stages[r].map(s=>Card.fromId(s).Char))
            console.log(stage.map(s=>Card.fromId(s)))
            console.log(this.values[r])
            console.log(this.points[r])
        }
    }
    #calc(stage) { // 点数計算
        const values = []
        for (let s=0; s<stage.length; s++) {
            const num = Card.fromId(stage[s]).Num
            // Round rule によって条件判定＆増減
            const value = num
            this.values.push(value)
        }
        return values
    }
    #judge(stage) {
        const maxIdx = stage.indexOf(Math.max(stage));
        if (1===stage.some(v=>v===maxIdx).length) { // win/lose
            this.points[maxIdx] = 1
        } else { } // draw
    }
    #result() {

    }
}

// phase
// 作成(rule,player) Make
// 表示(rule,player) Show 勝利条件
// ゲーム初期処理
//   山札シャッフル
//   手札配布
// 勝負(3〜5 round) 
//   Round数表示
//   手札選択（キー入力受付or戦略アルゴリズム）
//   手札確定（制限時間）
//   点数計算
//   勝敗判定
//   総点計算
//   順位表示
// 結果() Result
//   参加者の順位、総点を表示する
//   
