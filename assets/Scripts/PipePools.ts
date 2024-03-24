import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
import { Pipe } from './Pipe';
const { ccclass, property } = _decorator;

@ccclass('PipePools')
export class PipePools extends Component {
    @property({
        type:Prefab
    })
    public prefabPipes = null;
    @property({
        type:Node
    })
    public pipePoolHome:Node;
    public pool = new NodePool;
    public createPipe:Node;
    initPool(){
        let initCount = 3;
        for(let i=0; i<initCount; i++){
            this.createPipe = instantiate(this.prefabPipes);
            if(i==0){
                this.pipePoolHome.addChild(this.createPipe)
            }else{
                this.pool.put(this.createPipe);
            }
        }
    }
    addPool(){
        if(this.pool.size() > 0){
            this.createPipe = this.pool.get();
        }else{
            this.createPipe = instantiate(this.prefabPipes);
        }
    }
    resetPool(){
        this.pipePoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }
}


