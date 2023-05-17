import AudioManager from "./utils/AudioManager";
import CanvasManager from "./utils/CanvasManager";
import Game from './utils/Game'


const audioManager = new AudioManager()
const canvasManager = new CanvasManager();
new Game(canvasManager, audioManager)