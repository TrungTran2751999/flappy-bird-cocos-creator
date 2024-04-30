import { _decorator, CCFloat, Collider2D, Component, Contact2DType, director, EventKeyboard, Input, input, instantiate, IPhysics2DContact, KeyCode, Label, loader, Node, Prefab, Vec3 } from 'cc';
import { Ground } from './Ground';
import { Bird } from './Bird';
import { Pipe } from './Pipe';
import { GlobalVariable } from './GlobalVariable';
import { Socket } from './Socket';
import { AnotherPlayer } from './AnotherPlayer';
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
    @property({
        type:Prefab
    })
    public anotherPlayer:Prefab
    @property({
        type:Node
    })
    public listAnotherPlayer:Node
    public socket:Socket
    public init:boolean = true
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
                //lay cac player khac dang nhap vao
                if(result.type=="joined"){
                    let instanceOtherPlayer = instantiate(this.anotherPlayer)
                    let anotherPlayer = instanceOtherPlayer.getComponent(AnotherPlayer)
                    anotherPlayer.labelName.string = result.name
                    if(result.name!==this.nameLabel.string){
                        this.listAnotherPlayer.addChild(instanceOtherPlayer)
                    }
                }
                //lay list player da vao san khi moi dang nhap
                if(result.type=="server"){
                   for(let i=0; i<result.listPlayer?.length; i++){
                    let instanceOtherPlayer = instantiate(this.anotherPlayer)
                    let anotherPlayer = instanceOtherPlayer.getComponent(AnotherPlayer)
                    anotherPlayer.labelName.string = result.listPlayer[i].name
                    this.listAnotherPlayer.addChild(instanceOtherPlayer)
                   }
                }
                //lay player dang xuat
                if(result.type == "exit"){
                    let listPlayer = this.listAnotherPlayer.children;
                    for(let i=0; i<listPlayer.length; i++){
                        let anotherPlayer = listPlayer[i].getComponent(AnotherPlayer);
                        if(anotherPlayer.labelName.string==result.name){
                            listPlayer[i].destroy();
                        }
                    }
                }
                // lay chuyen dong cua cac player
                if(result?.type=="position"){
                    let listPlayer = this.listAnotherPlayer.children;
                    for(let i=0; i<listPlayer.length; i++){
                        let anotherPlayer = listPlayer[i].getComponent(AnotherPlayer);
                        let animation = anotherPlayer.birdAnimation;
                        if(anotherPlayer.labelName.string == result.name){
                            let positionCurrent = new Vec3(result.x, result.y, result.z);
                            listPlayer[i].setPosition(positionCurrent);
                            if(result.repeatAnmate==10){
                                animation.play();
                            }
                            if(result.repeatAnmate==10) this.z = 0
                            //anotherPlayer.fly();
                        }
                    }
                }
                if(this.init){
                    this.bird.resetBird()
                    this.init = false
                }
            }catch(e){
                console.log(event.data)
                console.log(e)
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
    private z:number = 0
    protected update(dt: number): void {
        let positionOfBird = this.bird.birdLocation
        let pos = {
            isShared: true,
            type: "position",
            name: this.nameLabel.string,
            x: positionOfBird.x,
            y: positionOfBird.y,
            z: positionOfBird.z,
            repeatAnmate: this.z++
        }
        this.socket.initSocket.send(JSON.stringify(pos))
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


