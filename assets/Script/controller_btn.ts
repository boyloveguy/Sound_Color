import GameOver from "./game_over";
import GameMgr from "./public-mgr";

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

    @property(cc.Node)
    popup: cc.Node = null

    colorBtn: String[] = ['green_btn', 'red_btn', 'yellow_btn', 'blue_btn']
    score: number = 0;
    i: number = 0;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    randomColorBtn() {
        let random = Math.floor(Math.random() * this.colorBtn.length);
        let getColorBtn = this.colorBtn[random]
        switch (getColorBtn) {
            case 'green_btn':
                GameMgr.getColorRandom.push('green_btn')
                break;
            case 'red_btn':
                GameMgr.getColorRandom.push('red_btn')
                break;
            case 'yellow_btn':
                GameMgr.getColorRandom.push('yellow_btn')
                break;
            case 'blue_btn':
                GameMgr.getColorRandom.push('blue_btn')
        }
    }

    async runRandomColorBtn(colorBtns) {
        this.greenBtn.off(cc.Node.EventType.TOUCH_END, this.gainColorBtn, this);
            this.redBtn.off(cc.Node.EventType.TOUCH_END, this.gainColorBtn, this);
            this.yellowBtn.off(cc.Node.EventType.TOUCH_END, this.gainColorBtn, this);
            this.blueBtn.off(cc.Node.EventType.TOUCH_END, this.gainColorBtn, this);
        let i = 0
        await this.schedule(() => {
            switch (colorBtns[i]) {
                case 'green_btn':
                    this.greenBtn.getComponent(cc.Animation).play();
                    cc.audioEngine.playMusic(this.doNote, false);
                    break;
                case 'red_btn':
                    this.redBtn.getComponent(cc.Animation).play();
                    cc.audioEngine.playMusic(this.reNote, false);
                    break;
                case 'yellow_btn':
                    this.yellowBtn.getComponent(cc.Animation).play();
                    cc.audioEngine.playMusic(this.miNote, false);
                    break;
                case 'blue_btn':
                    this.blueBtn.getComponent(cc.Animation).play();
                    cc.audioEngine.playMusic(this.faNote, false);
            }
            if (i < GameMgr.getColorRandom.length - 1) {
                i++
            }
        }, 1.5, GameMgr.getColorRandom.length - 1);
        setTimeout(()=>{
            this.greenBtn.on(cc.Node.EventType.TOUCH_END, this.gainColorBtn, this);
            this.redBtn.on(cc.Node.EventType.TOUCH_END, this.gainColorBtn, this);
            this.yellowBtn.on(cc.Node.EventType.TOUCH_END, this.gainColorBtn, this);
            this.blueBtn.on(cc.Node.EventType.TOUCH_END, this.gainColorBtn, this);
        }, 1.5*1000*GameMgr.getColorRandom.length - 1)
    }

    gainColorBtn(event) {
        switch (event.currentTarget.name) {
            case 'green_btn':
                this.greenBtn.getComponent(cc.Animation).play();
                cc.audioEngine.playMusic(this.doNote, false);
                break;
            case 'red_btn':
                this.redBtn.getComponent(cc.Animation).play();
                cc.audioEngine.playMusic(this.reNote, false);
                break;
            case 'yellow_btn':
                this.yellowBtn.getComponent(cc.Animation).play();
                cc.audioEngine.playMusic(this.miNote, false);
                break;
            case 'blue_btn':
                this.blueBtn.getComponent(cc.Animation).play();
                cc.audioEngine.playMusic(this.faNote, false);
        }
        this.compareColorBtn(event.currentTarget.name)
    }

    compareColorBtn(clickName) {
        if(GameMgr.getColorRandom[this.i] == clickName){
            GameMgr.isColorBtn = true
            if(this.i < GameMgr.getColorRandom.length-1 && GameMgr.isColorBtn == true){
                this.i++
            }else{
                GameMgr.isColorBtn == false
                this.i = 0
                this.countScores()
            }
        }else{
            this.popup.getComponent(GameOver).gameOver()
        }
    }

    countScores(){
        this.score += 1;
        this.scoreLabel.getComponent(cc.Label).string = 'Score: ' + this.score.toString();
        this.randomColorBtn();
        this.runRandomColorBtn(GameMgr.getColorRandom);
        GameMgr.score = this.score;
    }


    async start() {
        this.randomColorBtn();
        await this.runRandomColorBtn(GameMgr.getColorRandom);
        setTimeout(() => {
            this.greenBtn.on(cc.Node.EventType.TOUCH_END, this.gainColorBtn, this);
            this.redBtn.on(cc.Node.EventType.TOUCH_END, this.gainColorBtn, this);
            this.yellowBtn.on(cc.Node.EventType.TOUCH_END, this.gainColorBtn, this);
            this.blueBtn.on(cc.Node.EventType.TOUCH_END, this.gainColorBtn, this);
        }, 2000)
    }

    update(dt) { }
}
