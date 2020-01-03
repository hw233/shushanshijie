class CreateRoleUI extends egret.DisplayObjectContainer{
    private m_ServerData;
    private m_Textures;
    private m_IsRandom;
    private m_TweenList;
    private m_Random;
    private m_GoBtn;
    private m_TextField;
    private m_CurImgIndex;
    private m_Index;
    private m_Job;
    private m_Sex;
    private timeLabel;
    private sex1;
    private sex2;
    private sel1;
    private sel2;
    private roleGroup0;
    private roleGroup1;
    private roleImg0;
    private roleImg1;
    private mSelImg;
    private time;
    private m_CheckName;
    private m_CheckIndex;
    private m_LastTime;
    public static circOut(t: number): number{
        return Math.sqrt(1 - --t * t);
    };
    private static SetDownState(obj){
        var e = obj.y,
            i = obj.x
        obj.addEventListener(
            egret.TouchEvent.TOUCH_BEGIN,
            function() {
                ;(this.y = e + 4), (this.x = i + 4)
            },
            obj
        ),
            obj.addEventListener(
                egret.TouchEvent.TOUCH_CANCEL,
                function() {
                    ;(this.y = e), (this.x = i)
                },
                obj
            ),
            obj.addEventListener(
                egret.TouchEvent.TOUCH_END,
                function() {
                    ;(this.y = e), (this.x = i)
                },
                obj
            ),
            obj.addEventListener(
                egret.TouchEvent.TOUCH_MOVE,
                function() {
                    ;(this.y = e), (this.x = i)
                },
                obj
            )
    }
    constructor(serverData: GameServerDescData){
        super();
        this.m_Textures = [
            {
                path: window["RES_URL"] + 'resource/assets/game_start/create/ui_cjjs_bm_juese.png',
                data: null
            },
            {
                path: window["RES_URL"] + 'resource/assets/game_start/create/ui_cjjs_bm_nvjuese.png',
                data: null
            },
            {
                path: window["RES_URL"] + 'resource/assets/game_start/create/ui_cjjs_xianzhu_nan.png',
                data: null
            },
            {
                path: window["RES_URL"] + 'resource/assets/game_start/create/ui_cjjs_xianzhu_nv.png',
                data: null
            },
            {
                path: window["RES_URL"] + 'resource/assets/game_start/create/ui_cjjs_mozhu_nan.png',
                data: null
            },
            {
                path: window["RES_URL"] + 'resource/assets/game_start/create/ui_cjjs_mozhu_nv.png',
                data: null
            }
        ]
        this.m_IsRandom = !0;
        this.m_TweenList = [];
        this.m_CurImgIndex = 1;
        this.m_Index = -1;
        this.m_Job = 1;
        this.m_Sex = 0;
        this.mSelImg = [];
        this.time = 6e4;
        this.m_CheckName = null;
        this.m_CheckIndex = null;
        this.m_LastTime = 0;
        this.m_ServerData = serverData;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private m_CreateThm1(){
        var t = this,
            i = new egret.Bitmap()
        ;(i.texture = RES.getRes('_ui_bm_mingzibg@20_19_19_19')),
            (i.y = 1021),
            (i.x = -146),
            (i.width = 292),
            (i.height = 74),
            (i.scale9Grid = new egret.Rectangle(20, 19, 3, 3)),
            this.addChild(i),
            (this.roleGroup0 = new egret.DisplayObjectContainer()),
            (this.roleGroup0.y = 808),
            (this.roleGroup0.x = 0),
            (this.roleGroup0.width = 0),
            (this.roleGroup0.height = 0),
            this.addChild(this.roleGroup0),
            (this.roleImg0 = new egret.Bitmap()),
            this.roleGroup0.addChild(this.roleImg0),
            (this.roleGroup1 = new egret.DisplayObjectContainer()),
            (this.roleGroup1.y = 808),
            (this.roleGroup1.x = 0),
            (this.roleGroup1.width = 0),
            (this.roleGroup1.height = 0),
            this.addChild(this.roleGroup1),
            (this.roleImg1 = new egret.Bitmap()),
            this.roleGroup1.addChild(this.roleImg1)
        var r = new egret.Bitmap()
        ;(r.texture = RES.getRes('_ui_cjjs_bm_wenbenbg')),
            (r.y = 812),
            (r.x = -192),
            this.addChild(r)
        var a = new egret.TextField()
        ;(a.touchEnabled = !1),
            (a.size = 26),
            (a.textColor = 5907985),
            (a.text = '请选择种族'),
            (a.bold = !0),
            (a.width = 229),
            (a.x = -114),
            (a.y = 830),
            (a.textAlign = egret.HorizontalAlign.CENTER),
            (a.verticalAlign = egret.VerticalAlign.MIDDLE),
            this.addChild(a)
        var n = new egret.TextField()
        ;(n.touchEnabled = !1),
            (n.size = 26),
            (n.textColor = 15873847),
            (this.timeLabel = n),
            (n.text = '60s后自动进入服务器'),
            (n.bold = !0),
            (n.width = 342),
            (n.x = -171),
            (n.y = 1224),
            (n.textAlign = egret.HorizontalAlign.CENTER),
            (n.verticalAlign = egret.VerticalAlign.MIDDLE),
            this.addChild(n)
        var s = new egret.Bitmap()
        ;(s.touchEnabled = !0),
            (s.texture = RES.getRes('_ui_bt_nan')),
            (this.sex1 = s),
            (s.x = 174),
            (s.y = 1015),
            this.addChild(s),
            s.addEventListener(
                egret.TouchEvent.TOUCH_TAP,
                function() {
                    ;(t.m_Sex = 0), this.UpdateSel()
                },
                this
            ),
            CreateRoleUI.SetDownState(s)
        var o = new egret.Bitmap()
        ;(o.touchEnabled = !0),
            (this.sex2 = o),
            (o.texture = RES.getRes('_ui_bt_nv')),
            (o.x = 269),
            (o.y = 1015),
            this.addChild(o),
            o.addEventListener(
                egret.TouchEvent.TOUCH_TAP,
                function() {
                    ;(t.m_Sex = 1), this.UpdateSel()
                },
                this
            ),
            CreateRoleUI.SetDownState(o)
        var h = new egret.Bitmap()
        ;(this.sel1 = h),
            (h.texture = RES.getRes('_ui_cjjs_bm_gou')),
            (h.touchEnabled = !1),
            (h.x = 207),
            (h.y = 1058),
            this.addChild(h)
        var _ = new egret.Bitmap()
        ;(this.sel2 = _),
            (_.texture = RES.getRes('_ui_cjjs_bm_gou')),
            (h.touchEnabled = !1),
            (_.x = 304),
            (_.y = 1058),
            this.addChild(_)
    }

    private AddSelGroup(){
        var t = this,
            i = new egret.DisplayObjectContainer()
        ;(i.x = 0), (i.y = 872), (i.width = 0), this.addChild(i)
        var r = new egret.Bitmap()
        ;(r.touchEnabled = !0),
            (r.texture = RES.getRes('_ui_icon_renzhu')),
            (r.x = -202),
            (r.y = -4),
            r.addEventListener(
                egret.TouchEvent.TOUCH_TAP,
                function() {
                    this.Select(0)
                },
                this
            ),
            i.addChild(r),
            CreateRoleUI.SetDownState(r)
        var a = new egret.Bitmap()
        ;(a.touchEnabled = !0),
            (a.texture = RES.getRes('_ui_icon_xianzhu')),
            (a.x = -63),
            (a.y = -4),
            a.addEventListener(
                egret.TouchEvent.TOUCH_TAP,
                function() {
                    this.Select(1)
                },
                this
            ),
            i.addChild(a),
            CreateRoleUI.SetDownState(a)
        var n = new egret.Bitmap()
        ;(n.touchEnabled = !0),
            (n.texture = RES.getRes('_ui_icon_mozhu')),
            (n.x = 77),
            (n.y = -4),
            n.addEventListener(
                egret.TouchEvent.TOUCH_TAP,
                function() {
                    this.Select(2)
                },
                this
            ),
            i.addChild(n),
            CreateRoleUI.SetDownState(n)
        var s = new egret.Bitmap()
        ;(s.texture = RES.getRes('_ui_cjjs_bm_renzu')),
            (s.x = -169),
            (s.y = 982),
            this.addChild(s)
        var o = new egret.Bitmap()
        ;(o.texture = RES.getRes('_ui_cjjs_bm_xianzu')),
            (o.x = -28),
            (o.y = 982),
            this.addChild(o)
        var h = new egret.Bitmap()
        ;(h.texture = RES.getRes('_ui_cjjs_bm_mozu')),
            (h.x = 109),
            (h.y = 982),
            this.addChild(h)
        var _ = new egret.DisplayObjectContainer()
        ;(_.x = 0), (_.y = 882), (_.width = 0), this.addChild(_)
        var d = new egret.Bitmap()
        ;(d.texture = RES.getRes('_ui_cjjs_bm_xuanzhongxiaoguo')),
            (d.x = -243),
            (d.y = -48),
            _.addChild(d),
            (this.mSelImg[0] = d)
        var l = new egret.Bitmap()
        ;(l.texture = RES.getRes('_ui_cjjs_bm_xuanzhongxiaoguo')),
            (l.x = -105),
            (l.y = -48),
            _.addChild(l),
            (this.mSelImg[1] = l)
        var g = new egret.Bitmap()
        ;(g.texture = RES.getRes('_ui_cjjs_bm_xuanzhongxiaoguo')),
            (g.x = 35),
            (g.y = -48),
            _.addChild(g),
            (this.mSelImg[2] = g)
    }

    private onAddToStage(t){
        var i = this
        this.removeEventListener(
            egret.Event.ADDED_TO_STAGE,
            this.onAddToStage,
            this
        )
        var r = new egret.Bitmap()
        ;(r.x = -360),
            (r.texture = RES.getRes('_ui_cjjs_bm_ditu')),
            this.addChild(r),
            this.m_CreateThm1(),
            this.AddSelGroup(),
            (this.m_TextField = new egret.TextField()),
            (this.m_TextField.touchEnabled = !0),
            (this.m_TextField.name = ''),
            (this.m_TextField.size = 24),
            (this.m_TextField.textColor = ServerUI.COLOR),
            (this.m_TextField.textAlign = egret.HorizontalAlign.CENTER),
            (this.m_TextField.verticalAlign = egret.VerticalAlign.MIDDLE),
            (this.m_TextField.x = -96),
            (this.m_TextField.y = 1032),
            (this.m_TextField.width = 195),
            (this.m_TextField.height = 52),
            (this.m_TextField.type = egret.TextFieldType.INPUT),
            this.addChild(this.m_TextField),
            this.m_TextField.addEventListener(
                egret.TouchEvent.FOCUS_IN,
                this._DoFocus,
                this
            )
        var a = (this.m_Random = new egret.Bitmap())
        ;(a.touchEnabled = !0),
            this.m_Random.addEventListener(
                egret.TouchEvent.TOUCH_TAP,
                this.DoRandom,
                this
            ),
            (a.texture = RES.getRes('_ui_bm_touzi')),
            (a.y = 1025),
            (a.x = 78),
            this.addChild(a),
            CreateRoleUI.SetDownState(a)
        var n = (this.m_GoBtn = new egret.Bitmap())
        ;(n.touchEnabled = !0),
            this.m_GoBtn.addEventListener(
                egret.TouchEvent.TOUCH_TAP,
                this._DoGo,
                this
            ),
            (n.texture = RES.getRes('_ui_bt_kaishiyouxi')),
            (n.y = 1105),
            (n.x = -176),
            this.addChild(n),
            CreateRoleUI.SetDownState(n)
        var s = new egret.Bitmap()
        ;(s.touchEnabled = !0),
            (s.texture = RES.getRes('_ui_bt_jiantou')),
            (s.x = -341),
            (s.y = 618),
            s.addEventListener(
                egret.TouchEvent.TOUCH_TAP,
                function() {
                    i.UpdateIndex(i.m_Index - 1)
                },
                this
            ),
            this.addChild(s),
            CreateRoleUI.SetDownState(s)
        var o = new egret.Bitmap()
        ;(o.touchEnabled = !0),
            (o.texture = RES.getRes('_ui_bt_jiantou')),
            (o.x = 341),
            (o.y = 618),
            (o.scaleX = -1),
            o.addEventListener(
                egret.TouchEvent.TOUCH_TAP,
                function() {
                    i.UpdateIndex(i.m_Index + 1)
                },
                this
            ),
            this.addChild(o),
            CreateRoleUI.SetDownState(o),
            this.Select(1),
            (this.m_LastTime = egret.getTimer()),
            egret.startTick(this.Update, this)
        for (
            var h = [
                    '_ui_xzjs_h1',
                    '_ui_xzjs_h2',
                    '_ui_xzjs_h3',
                    ,
                    '_ui_xzjs_h4'
                ],
                _ = [],
                d = 0,
                l = h;
            d < l.length;
            d++
        ) {
            var g = l[d]
            _.push(RES.getRes(g))
        }
        WeatherFactory.getFlower().playWeather(_)
    }

    private _DoFocus(){
        this.m_IsRandom = !1;
    }

    private UpdateIndex(t){
        0 > t && (t = 5),
            t > 5 && (t = 0),
            (this.m_Sex = t % 2),
            (this.m_Job = Math.floor(t / 2) + 1),
            this.UpdateSel()
    }

    private DoRandom(){
        ;(this.m_IsRandom = !1), this._DoRandom()
    }

    private _DoRandom(){
        HttpHelper.GetRandomName(
            this.m_ServerData.id,
            this.m_Sex,
            this._DoRandomName,
            this
        )
    }

    private _DoGo(){
        var t = this
        this.time = 0
        var e = this.m_TextField.text
        return null == e || '' == e
            ? void console.log('名称不能为空')
            : ((this.m_CheckName = e),
                (this.m_CheckIndex = this.m_Index),
                void Main.getInstance().ConnectServer(
                    this.m_ServerData,
                    function() {
                      
                    }
                ))
    }


    private _Go(t){
        var e = JSON.parse(t.currentTarget.response)
        if (200 == e.status)
            if (0 == e.data.result) {
                var i = (Main.getInstance().mCreateRoleData = {crn: null, crji: null})
                i.crn = this.m_CheckName
                var r = this.m_CheckIndex
                ;(i.crji = r), Main.getInstance().ShowLoadingUI()
            } else {
                var a =
                    [
                        '',
                        '角色不存在',
                        '重复创建角色',
                        '创建角色失败',
                        '性别职业错误',
                        '角色名称重复',
                        '角色名含特殊字符',
                        '角色名过长',
                        '角色名含有屏蔽字',
                        '角色名称重复'
                    ][e.data.result] || '名称错误'
                console.log(a)
            }
    }

    private _DoRandomName(t){
        var t = JSON.parse(t.currentTarget.response)
        200 == t.status && 1 == t.result && (this.m_TextField.text = t.data)
    }

    private Select(t){
        console.log("选择种族111111111111111111111111111111")
        ;(this.m_Job = t + 1), this.UpdateSel()
    }

    private UpdateSel(){
        var t = this.m_Index
        this.m_Index = 2 * (this.m_Job - 1) + this.m_Sex
        for (var e = this.m_Job - 1, i = 0; i < this.mSelImg.length; i++)
            this.mSelImg[i].visible = i == e
        ;(this.sel1.visible = 0 == this.m_Sex),
            (this.sel2.visible = 1 == this.m_Sex)
        var r =
            (this['roleImg' + this.m_CurImgIndex],
            this['roleGroup' + this.m_CurImgIndex])
        if (t != this.m_Index) {
            var a = this.m_Index > t ? -1 : 1,
                n = 600
            this.AddTween(r, { x: a * n, alpha: 0 }, 350),
                (this.m_CurImgIndex = (this.m_CurImgIndex + 1) % 2)
            var s = this['roleGroup' + this.m_CurImgIndex]
            this._LoadTexture(this.m_Index),
                (s.x = -1 * a * n),
                (s.alpha = 0),
                this.AddTween(s, { x: 0, alpha: 1 }, 350),
                this.m_IsRandom && this._DoRandom()
        }
    }

    private _LoadTexture(t){
        RES.getResByUrl(
            this.m_Textures[t].path,
            this._Loaded,
            this,
            RES.ResourceItem.TYPE_IMAGE
        )
    }

    private _Loaded(t, e){
        if (t)
            for (var i = 0; i < this.m_Textures.length; ++i)
                if (this.m_Textures[i].path == e) {
                    var r = this['roleImg' + this.m_CurImgIndex]
                    ;(r.texture = t),
                        (r.x = -(t.textureWidth >> 1)),
                        (r.y = -t.textureHeight)
                    break
                }
    }

    private Close(){
        if ((egret.stopTick(this.Update, this), this.parent)) {
            this.parent.removeChild(this)
            for (var t = 0, e = this.m_Textures; t < e.length; t++) {
                var i = e[t]
                RES.destroyRes(i.path)
            }
        }
        WeatherFactory.getFlower().stopWeather()
    }

    private AddTween(t, e, i){
        for (var r = this.m_TweenList.length - 1; r >= 0; r--) {
            var a = this.m_TweenList[r]
            a.target == t && this.m_TweenList.splice(r, 1)
        }
        var n = {}
        for (var s in e) n[s] = { prop: e[s], startProp: t[s] }
        this.m_TweenList.push({ time: 0, duration: i, target: t, prop: n })
    }

    private Update(t){
        if (this.parent && this.$stage) {
            var i = t - this.m_LastTime
            if (
                ((this.m_LastTime = t),
                this.time > 0 && (this.time -= i) <= 0)
            )
                return void this._DoGo()
            this.timeLabel.text =
                Math.floor(Math.max(0.001 * this.time, 0)) +
                's后自动进入服务器'
            for (var r = this.m_TweenList.length - 1; r >= 0; r--) {
                var a = this.m_TweenList[r]
                a.time += i
                var n = CreateRoleUI.circOut(a.time / a.duration)
                a.time >= a.duration &&
                    ((n = 1), this.m_TweenList.splice(r, 1))
                for (var s in a.prop) {
                    var o = a.prop[s],
                        h = o.startProp + (o.prop - o.startProp) * n
                    a.target[s] = h
                }
            }
            return !1
        }
    }

    private circOut(t){
        return Math.sqrt(1 - --t * t)
    }


}