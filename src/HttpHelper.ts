class HttpHelper{
    private static m_Set = {};
    private static getServerAddr(){
        if(window["IS_SSL"]){
            return 'https://' + window["serverUrl"]
        }else{
            return 'http://' + window["serverUrl"]
        }
    }
    static GetPlayerServerInfo(token: string, callback: Function, thisObject: any): void{
        var r = new egret.HttpRequest()
        ;(r.responseType = egret.HttpResponseType.TEXT),
            r.open(HttpHelper.getServerAddr() + window["csport"] +'/api/get_serverinfo.php?token=' + token + '&url=' + window["serverUrl"],egret.HttpMethod.GET),
            r.send(),
            r.addEventListener(egret.Event.COMPLETE, callback, thisObject),
            r.addEventListener(
                egret.IOErrorEvent.IO_ERROR,
                this.Error,
                this
            )
    };

    static GetRandomName(serverid: number, sex: number, callback: Function, thisObject: any): void{
        var a = new egret.HttpRequest()
        ;(a.responseType = egret.HttpResponseType.TEXT),
            a.open(
                HttpHelper.getServerAddr() + '/api/get_random_name.php?platformid=' + '&serverid=' +  serverid + '&sex=' + sex,egret.HttpMethod.GET
            ),
            a.send(),
            a.addEventListener(egret.Event.COMPLETE, callback, thisObject),
            a.addEventListener(
                egret.IOErrorEvent.IO_ERROR,
                this.Error,
                this
            )
    };
    static CheckName(serverid: number, name: string, callback: Function, thisObject: any): void{
        var a = new egret.HttpRequest()
        ;(a.responseType = egret.HttpResponseType.TEXT),
            a.open(
                HttpHelper.getServerAddr() +
                    '/api/check_lock_name.php?platformid=' +
                    window["__CONFIG__"]["__PLATFORM_ID__"] +
                    '&serverid=' +
                    serverid +
                    '&name=' +
                    name,
                egret.HttpMethod.GET
            ),
            a.send(),
            a.addEventListener(egret.Event.COMPLETE, callback, thisObject),
            a.addEventListener(
                egret.IOErrorEvent.IO_ERROR,
                this.Error,
                this
            )
    };
    static GetNotice(callback: Function, thisObject: any): void{
        var i = new egret.HttpRequest()
        ;(i.responseType = egret.HttpResponseType.TEXT),
            i.open(
                HttpHelper.getServerAddr() +
                    '/api/get_total_notice.php?platformid=' +
                    window["__CONFIG__"]["__PLATFORM_ID__"],
                egret.HttpMethod.GET
            ),
            i.send(),
            i.addEventListener(egret.Event.COMPLETE, callback, thisObject),
            i.addEventListener(
                egret.IOErrorEvent.IO_ERROR,
                this.Error,
                this
            )
    };

    private static Error(){
        console.log('请求错误，请稍后重试')
    };
}