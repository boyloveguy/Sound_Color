import GameMgr from "./public-mgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameOver extends cc.Component {

    @property(cc.Label)
    scorePopup: cc.Label = null

    @property(cc.Label)
    highestPopup: cc.Label = null

    @property(cc.AudioClip)
    gameOverAudio: cc.AudioClip = null

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    gameOver(){
        this.node.active = true
        this.scorePopup.getComponent(cc.Label).string = 'Score Current: ' + GameMgr.score.toString();
        let highData = {
            highestScore: GameMgr.score,
        }
        let getScore = JSON.parse(cc.sys.localStorage.getItem('highData'));
        let highScore = 0;
        if (!getScore) {
            cc.sys.localStorage.setItem('highData', JSON.stringify(highData));
            highScore = GameMgr.score;
        } else {
            if (getScore.highestScore < GameMgr.score) {
                cc.sys.localStorage.setItem('highData', JSON.stringify(highData));
                highScore = GameMgr.score;
            } else {
                highScore = getScore.highestScore;
            }
        }
        let getScores = JSON.parse(cc.sys.localStorage.getItem('highData'));
        this.highestPopup.getComponent(cc.Label).string = 'Highest Score: ' + getScores.highestScore.toString();
        cc.audioEngine.playMusic(this.gameOverAudio, false);
        GameMgr.getColorRandom = []
    }

    directorScene(){
        this.node.active = false;
        cc.director.loadScene('Play Screen');
    }

    start () {
        this.node.active = false
    }

    // update (dt) {}
}
