import Game from "../utils/Game";
import Bullet from "./Bullet";

export default class Enemy {
    public id: number;
    public x: number;
    public y: number;
    public graphic: number;
    public vector: number;
    public shootProbabilty: number = 1;
    private game: Game;
    constructor(
        graphic: number,
        x: number,
        y: number,
        id: number,
        vector: number,
        game: Game
    ) {
        this.graphic = graphic;
        this.x = x;
        this.y = y;
        this.id = id;
        this.game = game;
        this.vector = vector;
        if (this.graphic == 0) this.vector = 10;
    }
    updatePosition(): void {
        this.x += this.vector;
    }
    pushDown(): void {
        this.y += 10;
    }
    shoot(): void {
        let x: number = Math.floor(Math.random() * 100000);
        if (this.shootProbabilty >= x)
            this.game.bulletList.push(
                new Bullet(
                    this.graphic + 8,
                    5,
                    "enemy",
                    this.x + 12.5,
                    this.y + 25
                )
            );
    }
}
