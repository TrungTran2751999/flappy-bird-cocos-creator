import { _decorator, CCFloat, Component, Input, input, Node } from 'cc';
import { Ground } from './Ground';
import { Bird } from './Bird';
import { PipePools } from './PipePools';
const { ccclass, property } = _decorator;

@ccclass('GameCtr')
export class GameCtr extends Component {
    @property({
        type:Ground
    })
    public ground:Ground;
    @property({
        type:CCFloat
    })
    public gameSpeed:number = 300;
    @property({
        type:CCFloat
    })
    public pipeSpeed:number = 300;
    @property({
        type:Bird
    })
    public bird:Bird;
    @property({
        type:PipePools
    })
    public pipeQueue:PipePools
    onLoad(): void {
        this.initListener();
    }
    initListener(){
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        this.node.on(Node.EventType.TOUCH_START, ()=>{
            this.bird.fly();
        })
    }
    onKeyDown(){

    }
    startGame(){

    }
    passPipe(){

    }
    createPool(){
        this.pipeQueue.addPool();
    }
}


