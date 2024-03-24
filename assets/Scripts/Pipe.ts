import { _decorator, Component, Node, Vec3, screen, find, UITransform,} from 'cc';
import { GameCtr } from './GameCtr';
const { ccclass, property } = _decorator;
const random = (min,max)=>{
    return Math.random()*(max-min)+min;
}
@ccclass('Pipe')
export class Pipe extends Component {
    @property({
        type:Node
    })
    public topPipe:Node
    @property({
        type:Node
    })
    public bottomPipe:Node
    public tempStartLocationUp:Vec3 = new Vec3(0,0,0)
    public tempStartLocationDown:Vec3 = new Vec3(0,0,0)
    public scene = screen.windowSize;
    public game;
    public pipeSpeed:number
    public tempSpeed:number

    isPass:boolean

    protected onLoad(): void {
        this.game = find("GameCtrl").getComponent("GameCtrl")
        this.pipeSpeed = this.game.pipeSpeed;
        this.initPos();
        this.isPass = false
    }
    initPos(){
        this.tempStartLocationUp.x = this.topPipe.getComponent(UITransform).width + this.scene.width
        this.tempStartLocationDown.x = this.topPipe.getComponent(UITransform).width + this.scene.width
        let gap = random(90, 100);
        let topHeight = random(0, 450);
        this.tempStartLocationUp.y = topHeight;
        this.tempStartLocationDown.y = (topHeight-(gap*10));
        
        this.topPipe.setPosition(this.tempStartLocationUp);
        this.bottomPipe.setPosition(this.tempStartLocationDown);
    }
    protected update(dt: number): void {
        this.tempSpeed = this.pipeSpeed*dt;

        this.tempStartLocationUp = this.topPipe.position;
        this.tempStartLocationDown = this.bottomPipe.position;

        this.tempStartLocationUp.x -= this.tempSpeed;
        this.tempStartLocationDown.x -= this.tempSpeed;

        this.topPipe.setPosition(this.tempStartLocationUp);
        this.bottomPipe.setPosition(this.tempStartLocationDown);

        if(this.isPass==false && this.topPipe.position.x <= 0){
            this.isPass = true;
            this.game.passPipe();
        }
        if(this.topPipe.position.x < (0-this.scene.width)){
            this.game.createPipe();
            this.destroy();
        }
    }
}


