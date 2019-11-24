class VerticalBot extends Cell {
    constructor(x, y, type, game) {
        super(x, y, type, game, 'red', 1    );
        super.addDanger(new BotDanger())
    }
    tick(t) {
        super.tick(t);
    }
}