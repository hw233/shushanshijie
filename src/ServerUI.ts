class ServerUI extends egret.DisplayObjectContainer{
    private bg;
    private m_LeftScrollView;
    private m_RightScrollView;
    private PlayerInfo;
    public static COLOR = 7024650;
    constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(t){
        this.removeEventListener(
            egret.Event.ADDED_TO_STAGE,
            this.onAddToStage,
            this
        ),
            (this.bg = new egret.Bitmap()),
            (this.bg.alpha = 0.5),
            (this.bg.x = -4),
            (this.bg.y = -4),
            (this.bg.texture = RES.getRes('_ui_black')),
            (this.bg.scale9Grid = new egret.Rectangle(4, 4, 46, 46)),
            (this.bg.touchEnabled = !0),
            this.addChild(this.bg),
            this.onResize()
        var e = new egret.Bitmap();
        (e.texture = RES.getRes('_ui_sbm_001@120_120_120_120')),
            (e.y = 101),
            (e.height = 1066),
            (e.width = 700),
            (e.x = -e.width >> 1),
            (e.scale9Grid = new egret.Rectangle(123, 121, 25, 21)),
            this.addChild(e)
        var i = new egret.Bitmap();
        (i.texture = RES.getRes('_ui_sbm_003@258_0_255_0')),
            (i.scale9Grid = new egret.Rectangle(258, 0, 3, 79)),
            (i.y = 95),
            (i.x = -317),
            (i.width = 621),
            this.addChild(i)
        var r = new egret.Bitmap();
        (r.texture = RES.getRes('_ui_sbm_002@20_9_20_9')),
            (r.x = -323),
            (r.y = 189),
            (r.height = 842),
            (r.width = 217),
            (r.scale9Grid = new egret.Rectangle(21, 10, 1, 1)),
            this.addChild(r)
        var a = new egret.Bitmap();
        (a.texture = RES.getRes('_ui_sbm_002@20_9_20_9')),
            (a.x = -100),
            (a.y = 189),
            (a.height = 842),
            (a.width = 423),
            (a.scale9Grid = new egret.Rectangle(21, 10, 1, 1)),
            this.addChild(a)
        var n = new egret.Bitmap();
        (n.texture = RES.getRes('_ui_cj_bm_fuwuqixuanzhe')),
            (n.x = -93),
            (n.y = 115),
            this.addChild(n)
        var s = new egret.Bitmap()
        ;(s.touchEnabled = !0),
            s.addEventListener(
                egret.TouchEvent.TOUCH_TAP,
                this._OnClickClose,
                this
            ),
            (s.texture = RES.getRes('_ui_bt_008_up')),
            (s.x = 282),
            (s.y = 91),
            this.addChild(s)
        var o = new egret.Bitmap()
        ;(o.touchEnabled = !0),
            o.addEventListener(
                egret.TouchEvent.TOUCH_TAP,
                this._OnClickClose,
                this
            ),
            (o.texture = RES.getRes('_ui_bt_007_up')),
            (o.x = 247),
            (o.y = 1052),
            this.addChild(o)
        var h = new egret.ScrollView()
        ;(h.x = a.x),
            (h.y = a.y + 10),
            (h.width = a.width),
            (h.height = a.height - 20),
            this.addChild(h),
            (this.m_RightScrollView = new ServerScrollView(
                h,
                ServerUIItem2,
                this._RightClick,
                this
            ))
        var _ = new egret.ScrollView()
        ;(_ = new egret.ScrollView()),
            (_.x = r.x + 2),
            (_.y = r.y + 10),
            (_.width = r.width),
            (_.height = r.height - 20),
            this.addChild(_),
            (this.m_LeftScrollView = new ServerScrollView(
                _,
                ServerUIItem1,
                this._LeftClick,
                this
            )),
            this.m_LeftScrollView.SetDatas(GameServerData.PageData),
            this.m_LeftScrollView.SelectIndex(0),
            (GameServerData.Callback = this.DoServerData),
            (GameServerData.ThisObject = this)
    }

    private DoServerData(t){
        var e = GameServerData.PageData[this.m_LeftScrollView.GetSelectIndex()]
        e.index == t && this.m_RightScrollView.SetDatas(e.datas)
    }

    private Close(){
        this.parent && this.parent.removeChild(this),
            (GameServerData.Callback = null),
            (GameServerData.ThisObject = null)
    }

    private _LeftClick(t){
        this.m_RightScrollView.SetDatas(
            GameServerData.PageData[t].datas
        )
    }

    private _RightClick(t){
        Main.getInstance().ShowLoadingImg();
        var e = this.m_RightScrollView.GetData(t)
        let instance = Main.getInstance();
        instance.StartLoadGame(e)
    }

    static IsNewServer(t){
        if(typeof(GameServerData.PageData[0])!="undefined"){
            for (
                var e = GameServerData.PageData[0].datas, i = 0, r = e.length;
                r > i;
                ++i
            )
                if (e[i].id == t) return !1
            return !0
        }
        return !1
    }

    private _OnClickClose(){
        this.Close()
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

class ServerUIItem1 extends egret.DisplayObjectContainer{
    static Width: number = 215;
    static Height: number = 80;
    light: egret.Bitmap;
    itemIndex: number;
    private label;
    constructor(){
        super();
        this.touchEnabled = !0;
        this.touchChildren = !1;
        this.width = ServerUIItem1.Width;
        this.height = ServerUIItem1.Height;
        var r = new egret.Bitmap()
        ;(r.touchEnabled = !1),
            (r.texture = Main.getInstance().GetImg('_ui_bt_fuwuqi02')),
            (r.x = (this.width - r.width) >> 1),
            (r.y = (this.height - r.height) >> 1),
            this.addChild(r)
        var a = (this.light = new egret.Bitmap())
        a.touchEnabled = !1;
        a.texture = Main.getInstance().GetImg('_ui_bt_fuwuqi0');
        a.x = (this.width - a.width) >> 1;
        a.y = (this.height - a.height) >> 1;
        this.addChild(a);
        this.label = new egret.TextField();
        this.label.touchEnabled = !1;
        this.label.size = 30;
        this.label.textColor = ServerUI.COLOR;
        this.label.width = r.width;
        this.label.height = r.height;
        this.label.x = r.x;
        this.label.y = r.y;
        this.label.textAlign = egret.HorizontalAlign.CENTER;
        this.label.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this.label);
    }
    SetData(data: GameServerPageData): void{
        this.label.text = data.name;
    };
}

class ServerUIItem2 extends egret.DisplayObjectContainer{
    static Width: number = 423;
    static Height: number = 131;
    itemIndex: number;
    flagImg: egret.Bitmap;
    hotImg: egret.Bitmap;
    headImg: egret.Bitmap;
    private label;
    Desc: GameServerDescData;
    playername: egret.TextField;
    kuangImg: egret.Bitmap;
    constructor(){
        super();
        this.touchEnabled = !0;
        this.touchChildren = !1;
        this.width = ServerUIItem2.Width;
        this.height = ServerUIItem2.Height;
        var r = new egret.Bitmap();
        r.touchEnabled = !1;
        r.texture = Main.getInstance().GetImg('_ui_bm_fuwuqibg@60_54_58_58');
        r.width = this.width - 20;
        r.height = this.height - 10;
        r.scale9Grid = new egret.Rectangle(60, 54, 3, 3);
        r.x = (this.width - r.width) >> 1;
        r.y = (this.height - r.height) >> 1;
        this.addChild(r);
        this.label = new egret.TextField();
        this.label.touchEnabled = !1;
        this.label.size = 30;
        this.label.textColor = ServerUI.COLOR;
        this.label.height = r.height;
        this.label.x = 80;
        this.label.y = r.y;
        this.label.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this.label);
        this.flagImg = new egret.Bitmap();
        this.flagImg.touchEnabled = !1;
        this.addChild(this.flagImg);
        this.hotImg = new egret.Bitmap();
        this.hotImg.touchEnabled = !1;
        this.hotImg.x = 30;
        this.hotImg.y = 50;
        this.addChild(this.hotImg);
        this.headImg = new egret.Bitmap();
        this.headImg.touchEnabled = !1;
        this.headImg.width = 81;
        this.headImg.height = 81;
        this.headImg.x = 305;
        this.headImg.y = 15;
        this.headImg.texture = null
        this.headImg.visible = !1;
        this.addChild(this.headImg);
        this.playername = new egret.TextField();
        this.playername.touchEnabled = !1;
        this.playername.size = 18;
        this.playername.textColor = ServerUI.COLOR;
        this.playername.height = r.height;
        this.playername.x = 300;
        this.playername.y = r.y + 100;
        this.playername.width = 92;
        this.playername.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.playername);
        this.kuangImg = new egret.Bitmap();
        this.kuangImg.texture = Main.getInstance().GetImg('_ui_bm_touxiangkuang');
        this.kuangImg.width = 92;
        this.kuangImg.height = 92;
        this.kuangImg.x = 300;
        this.kuangImg.y = 10;
        this.kuangImg.visible = false;
        this.addChild(this.kuangImg);
    }
    SetData(data: GameServerDescData): void{
        ;(this.Desc = data), (this.label.text = data.name)
        var e = data.GetStatus()
        ;(this.flagImg.x = 11),
            (this.flagImg.y = 6),
            (this.flagImg.visible = !0),
            e
                ? ((this.flagImg.texture = Main.getInstance().GetImg(
                        1 == e ? '_ui_bm_xin' : '_ui_bm_hot'
                    )),
                    (this.hotImg.texture = Main.getInstance().GetImg(
                        '_ui_icon_tongchang'
                    )))
                : ((this.flagImg.texture = Main.getInstance().GetImg(
                        '_ui_bm_weihuzhong'
                    )),
                    (this.hotImg.texture = Main.getInstance().GetImg(
                        '_ui_icon_weihu'
                    ))),
            this.SetHeadData()
    }
    SetHeadData(): void{
        for (
            var t = this.Desc.ip,
                e = Main.getInstance().playerServerData.data.recent,
                i = !1,
                r = 0;
            r < e.length;
            r++
        ) {
            var a = e[r]
            if (t == a.addr) {
                var n = a.job || 1,
                    s = a.sex || 0
                ;(this.headImg.texture = Main.getInstance().GetImg(
                    'head' + n + s
                )),
                    (this.playername.text = a.name),
                    (this.kuangImg.visible = !0),
                    (this.headImg.visible = !0),
                    (i = !0)
                break
            }
        }
        i ||
            ((this.kuangImg.visible = !1),
            (this.headImg.visible = !1),
            (this.playername.text = ''))
    }
}