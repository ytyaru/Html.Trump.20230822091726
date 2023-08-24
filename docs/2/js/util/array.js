Array.prototype.shuffle = function() { // https://qiita.com/pure-adachi/items/77fdf665ff6e5ea22128
    for (let i=this.length; 1<i; i--) {
        const k = Math.floor(Math.random() * i);
        [this[k], this[i - 1]] = [this[i - 1], this[k]];
    }
}

