import { _decorator, Component, Label, loader, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CallApi')
export class CallApi extends Component {
    @property({
        type:Label
    })
    public label:Label
    public string:string
    async start() {
        await loader.load("https://jsonplaceholder.typicode.com/todos/1", (err, res)=>{
            let gg = JSON.parse(res);
            this.string = gg.title
            this.label.string = this.string
        })
    }

    update(deltaTime: number) {
        
    }
}


