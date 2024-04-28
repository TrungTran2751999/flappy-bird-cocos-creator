import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GlobalVariable')
export  class GlobalVariable extends Component {
    static player:string = "init";
}


