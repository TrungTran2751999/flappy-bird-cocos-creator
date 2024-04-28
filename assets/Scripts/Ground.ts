import { _decorator, Component, EditBox, Node, UI, UITransform, Vec3 } from 'cc';
import { GameCtr } from './GameCtr';
import { Socket } from './Socket';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {

    @property({
        type:Node,
        tooltip: 'Ground 1 is here'
    })
    public ground1:Node;

    @property({
        type:Node,
        tooltip: 'Ground 2 is here'
    })
    public ground2:Node;

    @property({
        type:Node
    })
    public bg:Node;

    public gameSpeed:number
    //Tao ground voi variable
    public groundWidth1:number;
    public groundWidth2:number;
    public bgWidth:number;
    public gameCtrl = new GameCtr;
    public tempStartLocation1 = new Vec3;
    public tempStartLocation2 = new Vec3;

    protected start(): void {
        this.startup();
    }
    startup() {
        this.tempStartLocation1 = this.ground1.getPosition();
        this.tempStartLocation2 = this.ground2.getPosition();
        this.bgWidth = this.bg.getComponent(UITransform).width;
    }
    update(deltaTime: number) {
        this.gameSpeed = this.gameCtrl.gameSpeed;
        this.tempStartLocation1.x -= this.gameSpeed*deltaTime;
        this.tempStartLocation2.x -= this.gameSpeed*deltaTime;
        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
       

        let xGround1 = this.ground1.getPosition().x; 
        let xGround2 = this.ground2.getPosition().x;
        if(xGround1 <= -this.bgWidth){
            this.tempStartLocation1.x = 0;
            this.ground1.setPosition(this.tempStartLocation1);
        }
        if(xGround2 <= 0){
            this.tempStartLocation2.x = 640;
            this.ground2.setPosition(this.tempStartLocation2);
        }
    }
}


