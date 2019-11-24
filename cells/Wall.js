class Wall extends Cell {
    constructor(x, y, type, game) {
        super(x, y, type, game, '#876040', 1.1);
        this.isWall = true;
        this.isStatic = true;
    }

    renderCell(renderer, context) {
        if (!this.subcells){
            this.subcells = [[0,0,0],[0,0,0],[0,0,0]]
            this.neighbors.forEach(n => {
                if (n.isWall && !(n instanceof Door))
                    return;
                if (this.y>n.y || this.x>n.x) this.subcells[0][0] = 1;
                if (this.y>n.y || this.x<n.x) this.subcells[0][2] = 1;
                if (this.y<n.y || this.x>n.x) this.subcells[2][0] = 1;
                if (this.y<n.y || this.x<n.x) this.subcells[2][2] = 1;
                this.subcells[n.y+1-this.y][n.x+1-this.x] = 1;
            });
            this.neighborsX.forEach(n => {
                if (n.isWall) return;
                this.subcells[n.y+1-this.y][n.x+1-this.x] = 1;
            });
        }
        this.renderSubcells(renderer,context)
    }


    renderSubcells(renderer, context) {
        context.fillStyle = this.color;
        let s = renderer.size;
        let cs = s/3;

        this.subcells.forEach((row, y) => {
            row.forEach((c, x) => {
                c && context.fillRect(
                    this.x*s + cs*x,
                    this.y*s + cs*y
                    ,cs,cs)
            })
        })
    }
}
