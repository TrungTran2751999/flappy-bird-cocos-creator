import { _decorator, Component, Node, Vec3, Animation, tween, Label } from 'cc';
import { Socket } from './Socket';
const { ccclass, property } = _decorator;

@ccclass('AnotherPlayer')
export class AnotherPlayer extends Component {
    public birdAnimation:Animation
    public birdLocation:Vec3
    @property({
        type:Label
    })
    public labelName:Label
    protected onLoad(): void {
        this.resetBird();
        this.birdAnimation = this.getComponent(Animation)
    }
    resetBird(){
        this.birdLocation = new Vec3(0,0,0);
        this.node.setPosition(this.birdLocation);
    }
    fly(){
        this.birdAnimation.stop();
        // tween(this.node.position)
        //     .to(this.jumpDuration, new Vec3(this.node.position.x, this.node.position.y+this.jumpHeight, 0), {easing:"smooth",
        //         onUpdate:(target:Vec3, ratio:number)=>{
        //             this.node.position = target;
        //         }
        //     }).start();
        let pos = {
            type: "position",
            x: this.node.position.x,
            y: this.node.position.y,
            isShared: true
        }
        this.birdAnimation.play();
    }
}


