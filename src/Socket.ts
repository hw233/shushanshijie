class Socket{
    private static instance = new Socket();
    public static ins(){
        return Socket.instance;
    }
    /** 连接中 */
    public static STATUS_CONNECTING = 1;
    /** 检验中 */
    public static STATUS_CHECKING = 2;
    /** 连接生效 */
    public static STATUS_COMMUNICATION = 3;
    /** 关闭连接 */
    public static STATUS_DISCONNECT = 4;

    public connected: boolean;
    public UpdateStateEvent: Function;
    private _host: number;
    private _port: string;
    public proxy: {
        onSocketConnected: Function;
        onSocketRead: Function;
        onSocketClose: Function;
        onFinishCheck: Function;
    };
    private _socketStatus;
    private recvPack;
    private m_PreHeartBeat;
    private m_ServerTimeCounter;
    private m_HeartBeat;
    private socket_;

    private constructor(){
        this._socketStatus = 0;
        this.recvPack = new egret.ByteArray();
        this.m_PreHeartBeat = 0;
        this.m_ServerTimeCounter = 5;
        this.m_HeartBeat = new egret.ByteArray(new Uint8Array([17, 1, 4, 1, 199]));
        this.newSocket();
    }

    private newSocket(){
        if(this.socket_){
            this.socket_.removeEventListener(egret.Event.CONNECT, this.onSocketConnected, this);
            this.socket_.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.socket_.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketRead, this);
            this.socket_.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.connectError, this);
        }
        this.socket_ = new egret.WebSocket();
        this.socket_.type = egret.WebSocket.TYPE_BINARY;
        this.socket_.addEventListener(egret.Event.CONNECT, this.onSocketConnected, this);
        this.socket_.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.socket_.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketRead, this);
        this.socket_.addEventListener(egret.IOErrorEvent.IO_ERROR, this.connectError, this);
    }

    private connectError(){
         console.log('网络中断')//, window.connectError && window.connectError();
    }

    public connect(e, i){
        this.updateStatus(Socket.STATUS_CONNECTING),
                (this._host = e),
                (this._port = i),
                this.Connect(e, i)
    }

    private Connect(e, i){
        console.log(i)
        var r = this
        this.newSocket()
        var a = ''
        if ('https:' == location.href.substr(0, 6) || window["IS_SSL"] == 1) {
            a = 'wss://' + e + ':50000/' + i + '/'
        } else a = 'ws://' + e + ':' + i
        this.socket_.connectByUrl(a),
            console.log('connect to ' + e + ' ,port: ' + i + ' !'),
            window.setTimeout(function() {
                r._socketStatus == Socket.STATUS_CONNECTING &&
                    (console.log('连接超时'), r.close())
            }, 1e4)
    }

    public close(){
        console.log('close socket！ip:' + this._host + ' port:' + this._port);
        this.socket_ && this.socket_.close();
        this.updateStatus(Socket.STATUS_DISCONNECT);
        egret.stopTick(this._SendHeartBeat, this);
    }

    public GetSocketState(){
        return this._socketStatus
    }

    private onSocketConnected(e){
        console.log('与服务器连接成功！ip:' + this._host + ' port:' + this._port)
        this.connected = true
        this.updateStatus(Socket.STATUS_CHECKING)
        egret.stopTick(this._SendHeartBeat, this)
        egret.startTick(this._SendHeartBeat, this)
        this.proxy && this.proxy.onSocketConnected()
    }

    private onSocketRead(t){
        if (this.proxy) {
            var e = this.recvPack,
                i = this.socket_
            i._readByte.position = 0
            var r = i._readByte.bytesAvailable
            i.readBytes(e, 0),
                this.proxy.onSocketRead(
                    new Uint8Array(e.buffer.slice(0, r))
                )
        }
    }

    private onSocketClose(e){
        console.log('与服务器的断开连接！ip:' + this._host + ' port:' + this._port)
        var i = this._socketStatus
        this.updateStatus(Socket.STATUS_DISCONNECT),
            this.proxy && this.proxy.onSocketClose(i)
    }

    public updateStatus(t){
        if (this._socketStatus != t) {
            var e = this._socketStatus
            ;(this._socketStatus = t), this.onFinishCheck(t, e)
        }
    }

    private onFinishCheck(e, i){
         e == Socket.STATUS_COMMUNICATION
            ? console.log(
                    '与服务器建立通信成功！ip:' +
                        this._host +
                        ' port:' +
                        this._port
                )
            : e == Socket.STATUS_CHECKING || e == Socket.STATUS_DISCONNECT,
            this.UpdateStateEvent && this.UpdateStateEvent(e),
            this.proxy && this.proxy.onFinishCheck(e, i)
    }

    private _SendHeartBeat(t){
        return (
            t > this.m_PreHeartBeat + 2e4 &&
                ((this.m_PreHeartBeat = t),
                this.sendPack(this.m_HeartBeat)),
            !1
        )
    }

    public sendPack(t){
        if (null == t || 0 == t.length)
            throw new egret.error('数据不能为空！')
        this.socket_ && this.socket_.connected
            ? this.socket_.writeBytes(t)
            : console.error('not connect')
    }

    get host(){
        return this._host;
    }

    get port(){
        return this._port;
    }

}
