class FenXiangPanle extends BaseEuiView{

    public static LAYER_LEVEL = LayerManager.UI_FullScreen_Popup ;

    /////////////////////////////////////////////////////////////////////////////
    // FenXiangSkin.exml
    /////////////////////////////////////////////////////////////////////////////
    protected FenXiang: eui.Button;
    protected closeBtn: eui.Button;
    /////////////////////////////////////////////////////////////////////////////

    public constructor(){
        super()
        this.skinName = "FenXiangSkin" ;

        this._AddClick(this.FenXiang , this._onClick) ;
        this._AddClick(this.closeBtn , this._onClick) ;

    }
    
    private _onClick(e) {
		switch (e.currentTarget) {
            case this.FenXiang:
                //调用index中_ShareObj的func方法来分享
                console.log("分享")
                //window["_ShareObj"].func(Main.Instance.UserName, Main.Instance.mConnectServerData.id ,GameGlobal.actorModel.actorID);
                let args: any = {}
                // args.game_logo = "";
                // args.show_game = "";
                // args.one_game_info = "";
                args.complete = function(callback){ //args的参数2
                    if(callback.errorno == 0){
                        var request = new egret.HttpRequest();
                        request.responseType = egret.HttpResponseType.TEXT;
                        request.open(window["_URL_API_"]+'/api/game/share?uid='+Main.getInstance().UserName+'&actor_id='+GameGlobal.actorModel.actorID+'&server_id='+Main.getInstance().mConnectServerData.id,egret.HttpMethod.GET);
                        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        request.send();
                        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
                        UserTips.InfoTip("分享成功")
                    }
                    else if (callback.errorno == -1){
                        UserTips.InfoTip("分享失败")
                    }
                    else if (callback.errorno == -2){
                        UserTips.InfoTip("分享取消")
                    }
                };
                window["hgame"].h5game_share(args); 
                break   
			case this.closeBtn:
				ViewManager.ins().close(this)
                // ViewManager.ins().open(FenXiangReward) 测试功能
				break
		}
	}

    private onGetComplete(event:egret.Event) : void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("get data : ",request.response);
        var data = JSON.parse(request.response);
        // if (window["_XqsySDK_"]) {            
        //     if (data.code == 0) {
        //         UserTips.InfoTip("分享成功")
        //     } else {
        //         UserTips.InfoTip("分享成失败")
        //     }
        // } 
    } 
}