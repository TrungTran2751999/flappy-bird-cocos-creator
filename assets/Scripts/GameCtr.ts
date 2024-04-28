import { _decorator, CCFloat, Collider2D, Component, Contact2DType, director, EventKeyboard, Input, input, instantiate, IPhysics2DContact, KeyCode, Label, loader, Node, Prefab } from 'cc';
import { Ground } from './Ground';
import { Bird } from './Bird';
import { Pipe } from './Pipe';
import { GlobalVariable } from './GlobalVariable';
import { Socket } from './Socket';
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
        type:Prefab
    })
    public pipePrePabs:Prefab
    @property({
        type:Node
    })
    public nodePre:Node
    @property({
        type:Label
    })
    public nameLabel:Label
    public socket:Socket

    protected onLoad(): void {
        this.initListener();
        this.nameLabel.string = GlobalVariable.player
        this.socket = Socket.getInstance();
        this.socket.initSocket.addEventListener("open", ()=>{
            this.socket.initSocket.send(
            `{"type": "joined","name" :"${this.nameLabel.string}", "isShared":true}`)
        });

        this.socket.initSocket.addEventListener("message", (event)=>{
            try{
                let result = JSON.parse(event.data);
                console.log(result)
            }catch{
                console.log(event.data)
            }
        });
    }
    initListener(){
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        this.node.on(Node.EventType.MOUSE_DOWN, ()=>{
            this.bird.fly();
        })
    }
    onKeyDown(event:EventKeyboard){
        switch (event.keyCode){
            case KeyCode.KEY_A:{
                // let prefabs = instantiate(this.pipePrePabs)
                // this.nodePre.addChild(prefabs);
            }
        }
    }
    impactGroundPipe(){
        let collider = this.bird.getComponent(Collider2D)
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }
    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if(otherCollider.group==2){
                    // will be called once when two colliders begin to contact
            director.pause()
            director.loadScene("prescene")
        }
    }
    private i:number = 0
    protected update(dt: number): void {
        this.impactGroundPipe();
        if(this.i>=200){
            let prefabs = instantiate(this.pipePrePabs)
            this.nodePre.addChild(prefabs);
            this.i=0;
        }
        this.i+=dt
        this.i++
    }
}


