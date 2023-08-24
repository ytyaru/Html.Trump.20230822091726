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
        this.stages = []
        this.values = []
        this.points = []
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
            //const stage = this.players.map(p=>p.pullOut())
            const stage = this.players.map(p=>new Card(p.pullOut()))
            console.log(stage)
            this.stages.push(stage)
            this.#calc(stage)
            console.log(stage)
            this.#judge(r, this.values[r])
            //console.log(this.stages[r].map(s=>Card.fromId(s).Char))
            //console.log(stage.map(s=>Card.fromId(s)))
            console.log(stage.map(c=>c.Char))
            console.log(this.values[r])
            console.log(this.points[r])
        }
    }
    #calc(stage) { // 点数計算
        const values = []
        for (let s=0; s<stage.length; s++) {
            //const card = new Card(stage[s])
            //const num = Card.fromId(stage[s]).Num
            //console.log(card)
            console.log(stage[s])
            // Round rule によって条件判定＆増減
            //const value = card.Num
            const value = stage[s].Num
            values.push(value)
        }
        this.values.push(values)
        return values
    }
    #judge(r) {
        this.points.push([0,0,0,0])
        const values = this.values[r]
        const maxIdx = values.indexOf(Math.max(...values));
        console.log(values, maxIdx, Math.max(...values))
        // rule によって判定＆増減
        if (1===values.filter(v=>v===values[maxIdx]).length) { // win/lose
            this.points[r][maxIdx] = 1
        } else { } // draw
    }
    /*
    #judge(stage) {
        const maxIdx = stage.indexOf(Math.max(stage));
        if (1===stage.some(v=>v===maxIdx).length) { // win/lose
            this.points[maxIdx] = 1
        } else { } // draw
    }
    */
    #result() {
        console.log(`Result`)
        const winpoints = []
        for (let p=0; p<this.players.length; p++) { winpoints.push(0) }
        for (let p=0; p<this.players.length; p++) {
            for (let r=0; r<this.rule.round; r++) { winpoints[p] += this.points[r][p] }
        }
        console.log(winpoints)

        const maxIdx = winpoints.indexOf(Math.max(...winpoints));
        console.log(winpoints, maxIdx, Math.max(...winpoints))
        // rule によって判定＆増減
        if (1===winpoints.filter(v=>v===winpoints[maxIdx]).length) { // win/lose
            console.log(`Winner [${maxIdx}] ${this.players[maxIdx].Name}`)
        } else { console.log(`Draw`) } // draw

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
