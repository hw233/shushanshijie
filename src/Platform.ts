/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {

    getUserInfo(x, y, w, h, code): Promise<any>;

    login(): Promise<any>;

    upgradeRole(datas): Promise<any>

    CreateRole(datas): Promise<any>
    
    PAY(datas): Promise<any>

    showShareMenu(title,imgnum):Promise<any>
}

class DebugPlatform implements Platform {
    async getUserInfo(x, y, w, h, code) {
        return { nickName: "username" }
    }
   
    login() {
        return new Promise((resolve, reject)=>{
            if(window["code"]){
                var request = new egret.HttpRequest();
                request.responseType = egret.HttpResponseType.TEXT;
                request.open("http://"+ window["serverUrl"] + ":8501/api/testlogin.php?type=" + window["TYPE_NUM"] + "&code="+ window["code"] + "&r=" + Math.random());
                request.addEventListener(egret.Event.COMPLETE,function() {
                    console.log(request.response);
                    var s = JSON.parse(request.response);
                    if(s.auth)
                    {
                        console.log("用户登入成功");
                        egret.localStorage.setItem("account",s.data);
                        console.log(s.data)
                        window["__override__"]();
                        resolve(s)
                    }else{
                        if(s.error_code==1){
                            alert(s.msg);
                        }else{
                            console.log("用户不存在");
                        }
                    }
                },this);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR,function() {
                    console.log("登录认证出错");
                },this);
                request.send(); 
            }
        })
    }

    upgradeRole(datas) {
        return new Promise((resolve, reject) => {
             return ""
        })
    }

    CreateRole(datas) {
        return new Promise((resolve, reject) => {
             return ""
        })
    }

    PAY(datas) {
        return new Promise((resolve, reject) => {
             return ""
        })
    }

    async showShareMenu(title,imgnum){
        return true;
    }
}


if (!window.platform) {
    window.platform = new DebugPlatform();
}

declare let platform: Platform;

declare interface Window {

    platform: Platform
}





