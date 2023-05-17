import Game from "../utils/Game";
import Bullet from "./Bullet";

export default class SpecialEnemy {
    public x: number;
    public y: number;
    public graphic: number;
    public vector: number = 10;
    readonly SHOOT_PROBABILTY: number = 10;
    private game: Game;
    constructor(graphic: number, x: number, y: number, game: Game) {
        this.graphic = graphic
        this.x = x
        this.y = y
        this.game = game
    }
    updatePosition(): void {
        this.x += this.vector
    }
    shoot(): void {
        let x: number = Math.floor(Math.random() * 100000)
        if (this.SHOOT_PROBABILTY >= x) this.game.bulletList.push(new Bullet(this.graphic + 8, 5, 'enemy', this.x + 12.5, this.y + 25));
    }
}
