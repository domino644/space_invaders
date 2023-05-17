import CanvasManager from "../utils/CanvasManager";
import AudioManager from "../utils/AudioManager";
import Game from "../utils/Game";
import Bullet from "./Bullet";

export default class Player {
    public x: number;
    readonly PLAYER_WIDTH: number;
    readonly PLAYER_HEIGHT: number;
    readonly PLAYER_GRAPHIC: number = 4;
    readonly MOVE_VELOCITY: number = 3;
    public moveLeft: boolean = false;
    public moveRight: boolean = false;
    private canvasManager: CanvasManager;
    private game: Game;
    private audioManager: AudioManager;
    private audioPlayer: HTMLAudioElement;
    constructor(
        canvasManager: CanvasManager,
        audioManager: AudioManager,
        game: Game
    ) {
        this.canvasManager = canvasManager;
        this.audioManager = audioManager;
        this.audioPlayer = document.getElementById(
            "audio1"
        ) as HTMLAudioElement;
        this.audioManager.load("shoot", this.audioPlayer);
        this.game = game;
        this.PLAYER_HEIGHT = this.canvasManager.getCanvasHeight() * 0.05;
        this.PLAYER_WIDTH = this.canvasManager.getCanvasWidth() * 0.0375;
        let keyPressed: boolean[] = [false, false, false];
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            // const keyName: string = e.key
            // switch (keyName) {
            //     case "ArrowLeft":
            //         keyPressed[0] = true;
            //         break
            //     case "ArrowRight":
            //         keyPressed[1] = true
            //         break
            //     case " ":
            //         keyPressed[2] = true
            //         break
            // }
            // if (keyPressed[0] && keyPressed[2]) {
            //     if (this.x - this.MOVE_VELOCITY >= 0) this.move(-this.MOVE_VELOCITY)
            //     this.shoot()
            // } else if (keyPressed[1] && keyPressed[2]) {
            //     if (this.x + this.MOVE_VELOCITY + this.PLAYER_WIDTH <= this.canvasManager.getCanvasWidth()) this.move(this.MOVE_VELOCITY)
            //     this.shoot()
            // } else if (keyPressed[0]) {
            //     if (this.x - this.MOVE_VELOCITY >= 0) this.move(-this.MOVE_VELOCITY)
            // } else if (keyPressed[1]) {
            //     if (this.x + this.MOVE_VELOCITY + this.PLAYER_WIDTH <= this.canvasManager.getCanvasWidth()) this.move(this.MOVE_VELOCITY)
            // } else if (keyPressed[2]) {
            //     this.shoot()
            // }
            if (e.key == " ") {
                this.shoot();
            } else if (e.key == "ArrowLeft") {
                if (this.x - this.MOVE_VELOCITY >= 0) this.moveLeft = true;
                else this.moveLeft = false;
            } else if (e.key == "ArrowRight") {
                if (
                    this.x + this.MOVE_VELOCITY + this.PLAYER_WIDTH <=
                    this.canvasManager.getCanvasWidth()
                )
                    this.moveRight = true;
                else this.moveRight = false;
            }
        });
        document.addEventListener("keyup", (e: KeyboardEvent) => {
            if (e.key == "ArrowLeft") this.moveLeft = false;
            else if (e.key == "ArrowRight") this.moveRight = false;
        });
        document.addEventListener("keyup", (e: KeyboardEvent) => {
            const keyName: string = e.key;
            switch (keyName) {
                case "ArrowLeft":
                    keyPressed[0] = false;
                    break;
                case "ArrowRight":
                    keyPressed[1] = false;
                    break;
                case " ":
                    keyPressed[2] = false;
                    break;
            }
        });
    }
    shoot(): void {
        if (
            !this.game.bulletList.some(
                (element) => element.type === "player"
            ) &&
            this.game.isPlaying
        ) {
            let bullet: Bullet = new Bullet(
                7,
                -10,
                "player",
                this.x + 0.5 * this.PLAYER_WIDTH,
                this.canvasManager.getCanvasHeight() -
                    2.75 * this.canvasManager.FONTSIZE -
                    this.PLAYER_HEIGHT
            );
            this.game.bulletList.push(bullet);
            this.audioManager.play(this.audioPlayer);
        }
    }
    move(x: number): void {
        this.x += x;
    }
}
