import GameOver from "./game_over";
import GameMgr from "./public-mgr";
import SuggestPopup from "./suggest_popup";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ControllerBtn extends cc.Component {
    @property(cc.Label)
    scoreLabel: cc.Label = null

    @property(cc.Node)
    greenBtn: cc.Node = null

    @property(cc.Node)
    redBtn: cc.Node = null

    @property(cc.Node)
    yellowBtn: cc.Node = null

    @property(cc.Node)
    blueBtn: cc.Node = null

    @property(cc.AudioClip)
    doNote: cc.AudioClip = null

    @property(cc.AudioClip)
    reNote: cc.AudioClip = null

    @property(cc.AudioClip)
    miNote: cc.AudioClip = null

    @property(cc.AudioClip)
    faNote: cc.AudioClip = null

    @property(cc.AudioClip)
    youWinAudio: cc.AudioClip = null

    @property(cc.Node)
    popup: cc.Node = null

    @property(cc.Node)
    startBtn: cc.Node = null

    @property(cc.Node)
    suggestBtn: cc.Node = null

    @property(cc.Node)
    suggestPopup: cc.Node = null

    isRunRandom: boolean = true
    score: number = 0;
    i: number = 0;
    // LIFE-CYCLE CALLBACKS:

    // onLoad() {}

    randomColorBtn() {
        let random = Math.floor(Math.random() * (4-1)+1);
        GameMgr.random = random
        GameMgr.getColorRandom.push(random)
    }

    runRandomColorBtn(colorBtns) {
        this.isRunRandom = true
        setTimeout(() => {
            let i = 0
            this.schedule(() => {
                switch (colorBtns[i]) {
                    case 1://  green
                        this.greenBtn.getComponent(cc.Animation).play();
                        cc.audioEngine.playEffect(this.doNote, false);
                        break;
                    case  2 :
                        this.redBtn.getComponent(cc.Animation).play();
                        cc.audioEngine.playEffect(this.reNote, false);
                        break;
                    case 3:
                        this.yellowBtn.getComponent(cc.Animation).play();
                        cc.audioEngine.playEffect(this.miNote, false);
                        break;
                    case 4:
                        this.blueBtn.getComponent(cc.Animation).play();
                        cc.audioEngine.playEffect(this.faNote, false);
                }
                if (i < GameMgr.getColorRandom.length - 1) {
                    i++
                }
            }, 1, GameMgr.getColorRandom.length - 1);

            setTimeout(() => {
                this.isRunRandom = false
            }, 1000 + 1000 * GameMgr.getColorRandom.length)
        }, 1000)
    }


    gainColorBtn(node, index) {
        if(this.isRunRandom){
            return
        }
        if(GameMgr.isShowPopup){
            return
        }
        switch (index) {
            case '1':
                this.greenBtn.getComponent(cc.Animation).play();
                cc.audioEngine.playEffect(this.doNote, false);
                break;
            case '2':
                this.redBtn.getComponent(cc.Animation).play();
                cc.audioEngine.playEffect(this.reNote, false);
                break;
            case '3':
                this.yellowBtn.getComponent(cc.Animation).play();
                cc.audioEngine.playEffect(this.miNote, false);
                break;
            case '4':
                this.blueBtn.getComponent(cc.Animation).play();
                cc.audioEngine.playEffect(this.faNote, false);
        }
        this.compareColorBtn(index)
    }

    compareColorBtn(clickName) {
        if (GameMgr.getColorRandom[this.i] == clickName) {
            GameMgr.isColorBtn = true
            if (this.i < GameMgr.getColorRandom.length - 1 && GameMgr.isColorBtn == true) {
                this.i++
            } else {
                GameMgr.isColorBtn == false
                this.i = 0
                this.countScores()
            }
        } else {
            this.popup.getComponent(GameOver).gameOver()
            this.scoreLabel.enabled = false
            this.greenBtn.active = false
            this.redBtn.active = false
            this.yellowBtn.active = false
            this.blueBtn.active = false
            this.suggestBtn.active = false
        }
    }

    countScores() {
        this.score += 1;
        this.scoreLabel.getComponent(cc.Label).string = 'Score: ' + this.score.toString();
        this.randomColorBtn();
        this.runRandomColorBtn(GameMgr.getColorRandom);
        this.suggestPopup.getComponent(SuggestPopup).createNewBtn()
        GameMgr.score = this.score;
        setTimeout(() => {
            cc.audioEngine.playEffect(this.youWinAudio, false);
        }, 1000)
    }

    startGame() {
        GameMgr.isStartGame = false
        if (GameMgr.isStartGame == false) {
            this.startBtn.active = false
            this.scoreLabel.enabled = true
            this.greenBtn.active = true
            this.redBtn.active = true
            this.yellowBtn.active = true
            this.blueBtn.active = true
            this.suggestBtn.active = true
            this.randomColorBtn();
            this.runRandomColorBtn(GameMgr.getColorRandom);
            this.suggestPopup.getComponent(SuggestPopup).createNewBtn()
        }
    }
    
    start() {
        
        if (GameMgr.isStartGame == true) {
            this.scoreLabel.enabled = false
            this.greenBtn.active = false
            this.redBtn.active = false
            this.yellowBtn.active = false
            this.blueBtn.active = false
            this.suggestBtn.active = false
            cc.audioEngine.stop(cc.audioEngine.playEffect(this.doNote, false));
            cc.audioEngine.stop(cc.audioEngine.playEffect(this.reNote, false));
            cc.audioEngine.stop(cc.audioEngine.playEffect(this.miNote, false));
            cc.audioEngine.stop(cc.audioEngine.playEffect(this.faNote, false));

        }else{
            this.startBtn.active = false
            this.scoreLabel.enabled = true
            this.greenBtn.active = true
            this.redBtn.active = true
            this.yellowBtn.active = true
            this.blueBtn.active = true
            this.suggestBtn.active = true
            this.randomColorBtn();
            this.runRandomColorBtn(GameMgr.getColorRandom);
            this.suggestPopup.getComponent(SuggestPopup).createNewBtn()
        }
    }

    update(dt) { }
}
