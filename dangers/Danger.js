class Danger {
    constructor(id) {
        this.id = id;
    }

    tickDanger(cell, t){}

    renderDanger(renderer, context, x, y){}

    checkDeath() {
        return true;
    }

}
