import GameMgr from "./public-mgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SuggestPopup extends cc.Component {

    @property(cc.Prefab)
    greenBtn: cc.Prefab = null

    @property(cc.Prefab)
    redBtn: cc.Prefab = null

    @property(cc.Prefab)
    yellowBtn: cc.Prefab = null

    @property(cc.Prefab)
    blueBtn: cc.Prefab = null

    @property(cc.Node)
    layout: cc.Node = null

    randX = -200
    randY = 100
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    showPopup() {
        GameMgr.isShowPopup = true
        this.node.active = true
    }

    closePopup() {
        GameMgr.isShowPopup = false
        this.node.active = false
    }

    createNewBtn() {
        let greenBtn = cc.instantiate(this.greenBtn)
        let redBtn = cc.instantiate(this.redBtn)
        let yellowBtn = cc.instantiate(this.yellowBtn)
        let blueBtn = cc.instantiate(this.blueBtn)

        switch (GameMgr.random) {
            case 1:
                this.layout.addChild(greenBtn)
                break;
            case 2:
                redBtn.setParent(this.layout)
                break;
            case 3:
                yellowBtn.setParent(this.layout)
                break;
            case 4:
                blueBtn.setParent(this.layout)
        }
    }

    start() {
        this.node.active = false
    }

    // update (dt) {}
}
