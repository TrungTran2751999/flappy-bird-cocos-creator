import { _decorator, Component, director, EditBox, Node } from 'cc';
import { GlobalVariable } from './GlobalVariable';
const { ccclass, property } = _decorator;

@ccclass('SetName')
export class SetName extends Component {
    @property({
        type:EditBox
    })
    public nameText:EditBox
    protected onLoad(): void {
        
    }
    onButtonClick(){
        GlobalVariable.player = this.nameText.textLabel.string
        if(!this.nameText.textLabel.string) return;
        director.loadScene("scene")
    }
}


