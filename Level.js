class Level {
    constructor(src, game) {
        this.cells = {
            'x': Wall,
            's': Spike,
            '.': Coin,
            'e': Exit,
            'r': Key,
            'R': Door,
            'V': VerticalBot,
            'H': HorizontalBot
        };

        this.map = src.trim()
            .split('\n')
            .map((row, y) =>
                row.trim()
                    .split('')
                    .map((type, x) =>
                        this.createCell(type,x,y, game)));

        this.findNeighbors([[-1,0],[1,0],[0,-1],[0,1]]);
        this.findNeighbors([[-1,-1],[1,1],[1,-1],[-1,1]], true);

        this.height = this.map.length;
        this.width = Math.max(...this.map.map(r => r.length));
        this.staticImage = document.createElement("canvas");

    }

    findNeighbors(neighbors, isDiagonal){

        this.iterateCells(c => {
            neighbors.forEach(xy => {
                try {

                    let cell = this.map[c.y + xy[1]][c.x + xy[0]];
                    if(isDiagonal)
                        cell.neighborsX.push(c);
                    else
                        cell.neighbors.push(c);

                } catch (e) {}
            })
        });
    }

    iterateCells(f) {
        this.map.forEach(r => r.forEach(c => c && f(c)));
    }

    createCell(type, x, y, game) {
        if (type === 'p') this.playerEnter = [x, y];
        return new (this.cells[type] || Cell)(x, y, type, game);
    }
}