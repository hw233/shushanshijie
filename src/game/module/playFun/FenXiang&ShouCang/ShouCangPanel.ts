class ShouCangPanel extends BaseEuiView{

    public static LAYER_LEVEL = LayerManager.UI_FullScreen_Popup ;

    /////////////////////////////////////////////////////////////////////////////
    // ShouCangSkin.exml
    /////////////////////////////////////////////////////////////////////////////
    protected ShouCang: eui.Button;
    protected closeBtn: eui.Button;
    /////////////////////////////////////////////////////////////////////////////

    public constructor(){
        super()
        this.skinName = "ShouCangSkin" ; 

        this._AddClick(this.ShouCang , this._onClick ) ;
        this._AddClick(this.closeBtn , this._onClick) ;

    }

    private _onClick(e) {
        switch (e.currentTarget) {
            case this.ShouCang:
                console.log("收藏")
                window["_CollectObj"].func(Main.getInstance().UserName, Main.getInstance().mConnectServerData.id ,GameGlobal.actorModel.actorID); 
                break
            case this.closeBtn:
                ViewManager.ins().close(this)
                break
        }
    }
}