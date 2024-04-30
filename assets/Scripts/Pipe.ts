import { _decorator, CCFloat, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

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
    @property({
        type:CCFloat
    })
    public speed:number = 1
    @property({
        type:Node
    })
    public limitPipe:Node

    public initPosTop:Vec3
    public initPosBottom:Vec3
    protected onLoad(): void {
        this.initPosTop = this.topPipe.getPosition()
        this.initPosBottom = this.bottomPipe.getPosition()
    }
    protected update(dt: number): void {
        // this.initPosTop.x -= this.speed*dt
        // this.initPosBottom.x -= this.speed*dt
        // this.topPipe.setPosition(this.initPosTop)
        // this.bottomPipe.setPosition(this.initPosBottom)
        // if(this.topPipe.getPosition().x < this.limitPipe.getPosition().x){
        //     this.node.destroy();
        // }
    }

}


