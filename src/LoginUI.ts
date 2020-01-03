class LoginUI extends egret.DisplayObjectContainer {
    private m_Label;
    private m_NewServerLabel;

    constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }

    private onAddToStage(event){
        this.removeEventListener(
            egret.Event.ADDED_TO_STAGE,
            this.onAddToStage,
            this
        )
        var e = new egret.Bitmap()
        ;(e.touchEnabled = !0),
            (e.texture = Main.getInstance().GetImg('_ui_bt_gonggao')),
            (e.y = 80),
            (e.x = 222),
            e.addEventListener(
                egret.TouchEvent.TOUCH_TAP,
                this._OnClickNotice,
                this
            ),
            this.addChild(e),
            this.NewServerBg(),
            this.NewSelServerBg(),
            this.NewStarBtn(),
            this.SetCurServerName(),
            Main.getInstance().NoticeStatus && Main.getInstance().ShowNoticeUI()
    }

    private NewServerBg(){
        var t = new egret.Bitmap()
            ;(t.texture = Main.getInstance().GetImg(
                '_ui_bm_fuwuqimingchengbg@24_0_24_0'
            )),
                (t.scale9Grid = new egret.Rectangle(24, 0, 3, 78)),
                (t.y = 814),
                (t.width = 438),
                (t.x = -219),
                this.addChild(t)
            var e = new egret.TextField()
            ;(e.touchEnabled = !0),
                (e.x = -104),
                (e.y = 840),
                (e.textColor = 63240),
                (e.size = 24),
                (e.text = '最新服'),
                this.addChild(e)
            var i = (this.m_NewServerLabel = new egret.TextField())
            ;(i.touchEnabled = !0),
                (i.x = -11),
                (i.y = 840),
                (i.textColor = 16711422),
                (i.size = 24),
                this.addChild(i)
    }
    private NewSelServerBg(){
        var t = new egret.Bitmap()
        ;(t.texture = Main.getInstance().GetImg(
            '_ui_bm_fuwuqimingchengbg@24_0_24_0'
        )),
            (t.scale9Grid = new egret.Rectangle(24, 0, 3, 78)),
            (t.y = 905),
            (t.x = -219),
            (t.width = 438),
            (t.touchEnabled = !0),
            t.addEventListener(
                egret.TouchEvent.TOUCH_TAP,
                this._OnClickServer,
                this
            ),
            this.addChild(t)
        var e = new egret.Bitmap()
        ;(e.texture = Main.getInstance().GetImg('_ui_icon_tongchang')),
            (e.x = -201),
            (e.y = 928),
            this.addChild(e)
        var i = new egret.Bitmap()
        ;(i.texture = Main.getInstance().GetImg('_ui_bt_dianjixuanfu')),
            (i.x = 97),
            (i.y = 929),
            this.addChild(i)
        var r = (this.m_Label = new egret.TextField())
        ;(r.touchEnabled = !0),
            (r.x = -162),
            (r.y = 931),
            (r.textColor = 16711422),
            (r.size = 24),
            this.addChild(r)
    }
    private NewStarBtn(){
        var t = new egret.Bitmap()
        ;(t.texture = Main.getInstance().GetImg('_ui_bt_kaishiyouxi')),
            (t.touchEnabled = !0),
            (t.x = -176),
            (t.y = 1015),
            this.addChild(t),
            t.addEventListener(
                egret.TouchEvent.TOUCH_TAP,
                this._OnClickLogin,
                this
            )
    }
    
    Close(){
        this.parent && this.parent.removeChild(this)
    }
    private _GetServerName(t){
        return '' + t + '区'
    }
    SetCurServerName(){
        GameServerData.SelectData
            ? ((this.m_NewServerLabel.text = this._GetServerName(
                    GameServerData.MaxId
                )),
                (this.m_Label.text = GameServerData.SelectData.name))
            : ((this.m_Label.text = ''), (this.m_NewServerLabel.text = ''))
    }
    private _OnClickNotice(){
        Main.getInstance().ShowNoticeUI()
    }
    private _OnClickServer(){
        Main.getInstance().ShowServerUI()
    }
    private _OnClickLogin(){
        Main.getInstance().ShowLoadingImg();
        Main.getInstance().StartLoadGame(GameServerData.SelectData)
    }

}