import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Socket')
export class Socket extends Component {
    public initSocket:WebSocket; 
    private constructor(){
        super();
        this.initSocket = new WebSocket("ws://localhost:3000");
    }
    public static instance:Socket;
    public static getInstance():Socket{
        if(!Socket.instance){
            Socket.instance = new Socket();
        }
        return Socket.instance;
    }
}


