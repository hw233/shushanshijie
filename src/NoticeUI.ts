class NoticeUI extends egret.DisplayObjectContainer {
    private bg;
    private m_Label;
    constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }
    private onAddToStage(event){
        this.removeEventListener(
            egret.Event.ADDED_TO_STAGE,
            this.onAddToStage,
            this
        ),
            (this.bg = new egret.Bitmap()),
            (this.bg.alpha = 0.5),
            (this.bg.x = -4),
            (this.bg.y = -4),
            (this.bg.texture = Main.getInstance().GetImg('_ui_black')),
            (this.bg.scale9Grid = new egret.Rectangle(4, 4, 46, 46)),
            (this.bg.touchEnabled = !0),
            this.addChild(this.bg),
            this.onResize()
        var e = new egret.Bitmap()
        ;(e.texture = Main.getInstance().GetImg('_ui_sbm_001@120_120_120_120')),
            (e.y = 101),
            (e.height = 1066),
            (e.width = 700),
            (e.x = -e.width >> 1),
            (e.scale9Grid = new egret.Rectangle(123, 121, 25, 21)),
            this.addChild(e)
        var i = new egret.Bitmap()
        ;(i.texture = Main.getInstance().GetImg('_ui_sbm_003@258_0_255_0')),
            (i.scale9Grid = new egret.Rectangle(258, 0, 3, 79)),
            (i.y = 95),
            (i.x = -317),
            (i.width = 621),
            this.addChild(i)
        var r = new egret.Bitmap()
        ;(r.texture = Main.getInstance().GetImg('_ui_bm_gonggao')),
            (r.x = -50),
            (r.y = 115),
            this.addChild(r)
        var a = new egret.Bitmap()
        ;(a.texture = Main.getInstance().GetImg('_ui_sbm_002@20_9_20_9')),
            (a.x = -323),
            (a.y = 189),
            (a.height = 842),
            (a.width = 640),
            (a.scale9Grid = new egret.Rectangle(21, 10, 1, 1)),
            this.addChild(a)
        var n = new egret.Bitmap()
        ;(n.touchEnabled = !0),
            n.addEventListener(
                egret.TouchEvent.TOUCH_TAP,
                this._OnClickClose,
                this
            ),
            (n.texture = Main.getInstance().GetImg('_ui_bt_008_up')),
            (n.x = 282),
            (n.y = 91),
            this.addChild(n)
        var s = new egret.Bitmap()
        ;(s.touchEnabled = !0),
            s.addEventListener(
                egret.TouchEvent.TOUCH_TAP,
                this._OnClickClose,
                this
            ),
            (s.texture = Main.getInstance().GetImg('_ui_bt_007_up')),
            (s.x = 247),
            (s.y = 1052),
            this.addChild(s)
        var o = new egret.ScrollView()
        ;(o.x = a.x + 20),
            (o.y = a.y + 20),
            (o.width = a.width - 35),
            (o.height = a.height - 40),
            this.addChild(o)
        var h = new egret.DisplayObjectContainer()
        ;(this.m_Label = new egret.TextField()),
            (this.m_Label.y = 2),
            (this.m_Label.width = o.width),
            (this.m_Label.size = 30),
            (this.m_Label.textColor = ServerUI.COLOR),
            (this.m_Label.text = ''),
            h.addChild(this.m_Label),
            o.setContent(h),
            HttpHelper.GetNotice(this.UpdateNotice, this)
    }
    private UpdateNotice(data){
        var e = JSON.parse(data.currentTarget.response)
        1 == e.result && null != e.data && (this.m_Label.text = e.data)
    }
    private _OnClickClose(){
        this.Close()
    }
    private Close(){
        this.parent && this.parent.removeChild(this)
    }
    private onResize(){
        this.bg &&
            ((this.bg.x =
                -4 - (egret.MainContext.instance.stage.stageWidth >> 1)),
            (this.bg.y = -Main.getInstance().mUIGroupYPos),
            (this.bg.width =
                1.2 * egret.MainContext.instance.stage.stageWidth),
            (this.bg.height =
                1.2 * egret.MainContext.instance.stage.stageHeight))
    }
}