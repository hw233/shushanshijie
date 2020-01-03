interface GetPlayerServerInfoData {
    data: {
        player: {
            username: string;
            gm_level: number;
            lid: string;
        };
        maxid: number;
        ns: number;
        new_sever_name: string;
        lpage: {
            version: number;
            status: number;
            sid: number;
            addr: string;
        }[];
        recent: {
            job: number;
            sex: number;
            name: string;
            time: number;
            status: number;
            sid: number;
            version: number;
            addr: string;
        }[];
        currenthe:{}[];
        currententer:string;
    };
    result_msg: string;
    status_msg: string;
    status: number;
    result: number;
}

class Main extends eui.UILayer {

    private static instance: Main;
    public isnew:number = 0; //是否此账号第一次来玩这个游戏

    public static getInstance(){
        return Main.instance;
    }

    private sheet;
    private m_CurLoadGroup = [];
    playerServerData: GetPlayerServerInfoData;
    mConnectServerData: GameServerDescData;
    mCreateRoleData: {
        crn: string;
        crji: number;
    };
    mLoadResGroup01 = {};
    mLoadResGroup02 = {
        "_ui_cjjs_bm_ditu": window["RES_URL"] +'resource/assets/game_start/_ui_cjjs_bm_ditu.jpg'
    };
    mLoadResGroup03 = {
        "_notice_res": window["RES_URL"] + 'resource/assets/game_start/_notice_res.json'
    };
    mLoadResGroup04 = {
        "_notice_res": window["RES_URL"] +'resource/assets/game_start/_notice_res.json'
    };
    mLoadResGroup05 = {
        "ui_xzfwq_p_show": window["RES_URL"] +'resource/assets/game_start/ui_xzfwq_p_show.jpg'
    };
    mToken: string;
    UserName: string;
    NoticeStatus: number;
    GmLevel: number;
    lid: string;
    public mIsPauseApp = false;
    public mUIGroupYPos = 0;
    private m_LoadingImg;
    private m_TimeOutId = null;
    private m_HasLoading = !0;
    private m_ConCallback = null;
    private m_CreateRoleData;
    private m_UIGroup: egret.DisplayObjectContainer;
    private m_NextStepType = -1;
    // private m_CreateRolViewData = [CreateRoleUI, 'CreateRoleUI'];
    private m_BGImg;
    private _bg;
    //断线重连次数
	public reloginCount: number = 0;
    private loginData: any;

    private nativeRecent: any;

    private loadNativeRecent(){
        // let recent = egret.localStorage.getItem("nativeRecent");
        // let arr = [];
        // if(recent && typeof(recent) == "string"){
        //     if(recent.length > 0){
        //         recent.replace("[","");
        //         recent.replace("]","");
        //         let a = recent.split(",");
        //         arr = a.map(Number);
        //     }
        // }
        // this.nativeRecent = arr;
        this.nativeRecent = [203, 204, 205, 206]
    }
    public get rencent(){
        return this.nativeRecent;
    }
    private setRecent(data){
        console.log("选择的服务器信息",data)
        let exist = false;
        let id = data.id || data.sid;
        for(let i = 0; i < this.nativeRecent.length; i++){
            if(id == this.nativeRecent[i]){
                this.nativeRecent.splice(i,1);
                this.nativeRecent.unshift(id);
                exist = true;
            }
        }
        if(!exist){
            if(this.nativeRecent.length >= 10){
                this.nativeRecent.pop();
            }
            this.nativeRecent.unshift(id);
        }
        egret.localStorage.setItem("nativeRecent", this.nativeRecent);
    }

    public static $GetThmPath(str: string, thmId: number): string{
        if (thmId) {
            var i = str.split('game_start')
            return i[0] + 'game_start/thm' + thmId + i[1]
        }
        return str
    }

    protected createChildren(): void {
        super.createChildren();
        Main.instance = this;
        this.touchEnabled = false;
        egret.TextField.default_fontFamily = 'SimHei,SimSun,Arial';
        egret.DisplayObject.defaultTouchEnabled = !1; 
        egret.ImageLoader.crossOrigin = 'anonymous'
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        // 注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(e => {
            console.log(e);
        })
    }
    private async runGame() {
        let self = this;
        await self.loadResource()
        this.loadNativeRecent()
        //非H5背景
        if(window['TYPE_NUM']==1){
            this._bg = this.createBitmapByName("wx_game_bg_jpg");
            this._bg.anchorOffsetY = 850;
            this._bg.y = this.stage.stageHeight / 2;
            this.addChild(this._bg);
            window["hideLoading"] = function(){
                self.HideLoadingImg()
            }
            window["showLoading"] = function(){
                self.ShowLoadingImg()
            }
        }
        this.m_UIGroup = new egret.DisplayObjectContainer();
        this.addChild(this.m_UIGroup);
        this._onResize();
        //登入
        if(window['TYPE_NUM']==1){
            this.ShowLoadingImg();
            platform.showShareMenu('','');
            platform.login().then(function(result){
                platform.getUserInfo((720-50)/2,900,100,30,result).then(function(t){
                    if(t.auth){
                        self.loginData = t;
                        self.mToken = t.data;
                        self.isnew = t.isnew;
                        HttpHelper.GetPlayerServerInfo(t.data,self._DoGetPlayerServerInfo,self)
                    }else{
                        console.log("请关闭游戏，重新进入");
                        window["ReloadFunc"]();
                    }
                })
            });
        }else{
            platform.login().then(function(t) {
                self.loginData = t;
                self.mToken = t.data;
                self.isnew = t.isnew;
                HttpHelper.GetPlayerServerInfo(t.data,self._DoGetPlayerServerInfo,self)
                self._CreateScene();
            });
        }
    }

    private async loadResource() {
        try {
            await RES.loadConfig("default.res.json", window["RES_URL"]+"resource/");
            await RES.loadGroup("preload");
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private _LoadSheet(jsonName){
        this.m_CurLoadGroup.push(jsonName);
            let res = RES.getResByUrl(
                jsonName,
                this._OnLoadItem,
                this,
                RES.ResourceItem.TYPE_SHEET
            )
            console.log("获取登录json")
            
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(nextType): void {
        console.log("createGameScene",nextType)
        if (1 == nextType){
            let loginUi= new LoginUI();
            this.m_UIGroup.addChild(loginUi);
            if(this.loginData.showgg == 1){
                var myDate = new Date();
                var days = myDate.getDate();
                var olddays = egret.localStorage.getItem("showgg_days");
                if(this.loginData.daytimes == 1){
                    if(Number(olddays) != days)this.ShowNoticeUI();
                    egret.localStorage.setItem("showgg_days",days.toString());
                }else{
                    this.ShowNoticeUI();
                }
            }
        }
        else if (2 == nextType)
            return console.log("--------------nextType == 2-----------------")
        else if (3 == nextType) this.m_UIGroup.addChild(new ServerUI())
        else if (4 == nextType) this.m_UIGroup.addChild(new NoticeUI())
        else if (5 == nextType) {
            this.removeBg();
            this.m_UIGroup.addChild(new LoadingUI());
            for (var r = this.m_UIGroup.numChildren - 1; r >= 0; --r) {
                var a = this.m_UIGroup.getChildAt(r)
                egret.is(a, 'LoadingUI') || this._CloseView(a)
            }
        }
        this.HideLoadingImg()
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        let parser = new egret.HtmlTextParser();
        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };
        change();
    }

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        let panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }

    public UpdateLoadingUI(t, e, i, r, a){
        for (var n = this.m_UIGroup.numChildren - 1; n >= 0; --n) {
            var s:any = this.m_UIGroup.getChildAt(n)
            if (egret.is(s, 'LoadingUI')) {
                t ? s.UpdateText(e, i, r, a) : s.SetText(e, i, r, a)
                break
            }
        }
    }

    public ShowGame(){
        if (this.m_HasLoading) {
            ;(this.m_HasLoading = null),
                this.HideLoadingImg(),
                (this.m_LoadingImg = null)
            for (var t = this.m_UIGroup.numChildren - 1; t >= 0; --t) {
                var e = this.m_UIGroup.getChildAt(t)
                egret.is(e, 'LoadingUI'), this._CloseView(e)
            }
            for (var i in this.mLoadResGroup01)
                RES.destroyRes(this.mLoadResGroup01[i])
            for (var i in this.mLoadResGroup02)
                RES.destroyRes(this.mLoadResGroup02[i])
            for (var i in this.mLoadResGroup03)
                RES.destroyRes(this.mLoadResGroup03[i])
            for (var i in this.mLoadResGroup04)
                RES.destroyRes(this.mLoadResGroup04[i])
            for (var i in this.mLoadResGroup05)
                RES.destroyRes(this.mLoadResGroup05[i])
            window["__CONFIG__"]["__LOING_BG__"] &&
                RES.destroyRes(window["__CONFIG__"]["__LOING_BG__"]) &&
                console.log('destroy res => ' + window["__CONFIG__"]["__LOING_BG__"])
        }
    }

    private HideLoadingImg(){
        egret.stopTick(this.UpdateLoadingImgAnim, this),
            this.m_TimeOutId &&
                (egret.clearTimeout(this.m_TimeOutId),
                (this.m_TimeOutId = null)),
            this.m_LoadingImg &&
                this.m_LoadingImg.parent &&
                this.m_LoadingImg.parent.removeChild(this.m_LoadingImg)
    }

    private _CloseView(t){
        try {
            t.Close ? t.Close() : console.log('not close func ' + t)
        } catch (e) {
            console.log(e)
        }
    }

    private UpdateLoadingImgAnim(t){
        return (
            this.m_LoadingImg &&
                (this.m_LoadingImg.rotation = Math.floor(0.5 * t) % 360),
            !1
        )
    }

    public ShowLoadingUI(){
        this._CheckUI('LoadingUI') &&
            (this._LoadGroup(this.mLoadResGroup05), this._SetNextStep(5))
    }
    
    private _CheckUI(name){
        if (this.m_CurLoadGroup.length > 0 || -1 != this.m_NextStepType)
            return !1
        for (var e = 0, i = this.$children; e < i.length; e++) {
            var r = i[e]
            if (egret.is(r, name)) return !1
        }
        return !0
    }

    private _LoadGroup(group){
        for (var e in group) this.m_CurLoadGroup.push(group[e])
        for (var e in group) {
            var i = group[e]
            ;-1 != i.indexOf('.json')
                ? RES.getResByUrl(
                        i,
                        this._OnLoadItem,
                        this,
                        RES.ResourceItem.TYPE_SHEET
                    )
                : RES.getResByUrl(
                        i,
                        this._OnLoadItem,
                        this,
                        RES.ResourceItem.TYPE_IMAGE
                    )
        }
    }

    private _OnLoadItem(obj, name){
        for (var i = 0, r = this.m_CurLoadGroup.length; r > i; ++i)
            if (this.m_CurLoadGroup[i] == name) {
                this.m_CurLoadGroup.splice(i, 1)
                break
            }
        console.log('loaded => ' + name),
            this.m_BGImg &&
                name == window["__CONFIG__"]["__LOING_BG__"] &&
                obj &&
                ((this.m_BGImg.texture = name),
                (this.m_BGImg.x = -(name.textureWidth >> 1))),
            this.m_CurLoadGroup.length > 0 || this._CreateScene()
    }

    private _CreateScene(){
        if (!(this.m_CurLoadGroup.length > 0)) {
            if (1 == window["__CONFIG__"]["__START_TYPE__"]) {
                if (
                    (window["__RemoveLoading"] && window["__RemoveLoading"](),
                    this.m_NextStepType < 1)
                )
                    return
            } else {
                if (this.m_NextStepType < 1) return
                window["__RemoveLoading"] && window["__RemoveLoading"]()
            }
            var t = this.m_NextStepType
            ;(this.m_NextStepType = -1), this.createGameScene(t)
        }
    }

    private _SetNextStep(step){
        this.m_NextStepType = step;
        console.log("this.m_NextStepType",this.m_NextStepType);
        this.DoShowLoadingImg();
        this._CreateScene();
    }

    private DoShowLoadingImg(){
        this.m_TimeOutId &&
            (egret.clearTimeout(this.m_TimeOutId),
            (this.m_TimeOutId = null)),
            (this.m_TimeOutId = egret.setTimeout(
                this.ShowLoadingImg,
                this,
                1e3
            ))
    }   

    public ShowLoadingImg(){
        null == this.m_LoadingImg &&
            ((this.m_LoadingImg = new egret.Bitmap()),
            (this.m_LoadingImg.texture = this.GetImg('_start_load_Reel')),
            (this.m_LoadingImg.anchorOffsetX = this.m_LoadingImg.width >> 1),
            (this.m_LoadingImg.anchorOffsetY = this.m_LoadingImg.height >> 1),
            this._onResize()),
            this.m_LoadingImg.parent &&
                this.m_LoadingImg.parent.removeChild(this.m_LoadingImg),
            egret.stopTick(this.UpdateLoadingImgAnim, this),
            egret.startTick(this.UpdateLoadingImgAnim, this),
            this.m_UIGroup.addChild(this.m_LoadingImg)
    }

    private _onResize(){
        this.m_LoadingImg &&
            (this.m_LoadingImg.y =
                egret.MainContext.instance.stage.stageHeight >> 1),
            (this.m_UIGroup.x =
                egret.MainContext.instance.stage.stageWidth >> 1),
            (this.m_UIGroup.y =
                (egret.MainContext.instance.stage.stageHeight - 1280) >> 1),
            (this.mUIGroupYPos = this.m_UIGroup.y)
        for (var t = this.m_UIGroup.numChildren - 1; t >= 0; --t) {
            var e:any = this.m_UIGroup.getChildAt(t)
            e.onResize && e.onResize()
        }
    }

    public GetImg(name: string): egret.Texture{
        // console.log("获取资源",name,RES.getRes(name),1111111111111111111111111111111111111111111111111111)
        return RES.getRes(name)
    }

    public ShowNoticeUI(){
        this._CheckUI('NoticeUI') &&
            (this._LoadGroup(this.mLoadResGroup04), this._SetNextStep(4))
    }

    public ShowServerUI(){
        this._CheckUI('ServerUI') &&
            (this._LoadGroup(this.mLoadResGroup03), this._SetNextStep(3))
    }

    public StartLoadGame(serverData: any){
        var e = this
        if(this.playerServerData.data.currenthe){
            for(let i = 0; i < this.playerServerData.data.currenthe.length; i++){
                if(serverData.id == this.playerServerData.data.currenthe[i]){
                    serverData.ip = this.playerServerData.data.currententer;
                }
            }
        }
        this.setRecent(serverData);
        egret.localStorage.setItem("loginserverid",String(serverData.id || serverData.sid));
        this.ConnectServer(serverData, function() {
            e.ShowLoadingUI()
        })
    }

    public ConnectServer(serverData: any, callback: Function){
        if (this._CheckServerState(serverData)) {
            var i = Socket.ins().GetSocketState()
            if (i == Socket.STATUS_CONNECTING)
                return void console.log('正在连接')
            if (i == Socket.STATUS_CHECKING)
                return (
                    console.log('连接成功'),
                    void (callback ? callback() : console.log('not callback func !'))
                )
            this.DoShowLoadingImg(), (this.mConnectServerData = serverData)
            let ip = serverData.ip || serverData.addr;
            var r = ip.split(':'),
                a = r[0],
                n = r[1]
            ;(this.m_ConCallback = callback),
                (Socket.ins().UpdateStateEvent = this.SocketUpdateState.bind(
                    this
                )),
                Socket.ins().connect(a, Number(n))
        }
    }

    private _CheckServerState(serverData){
        return serverData
            ? serverData.version
                ? (0 == serverData.status || serverData.status > 2) && !this.GmLevel
                    ? (console.log('服务器维护中，请稍后重试！！！'), !1)
                    : !0
                : (console.log('服务器正在维护，请稍后重试！！！'), !1)
            : (console.log('服务器数据为空，请重新登录！！！'), !1)
    }

    public SocketUpdateState(state: number){
        if (state == Socket.STATUS_CHECKING) {
            var e = this.m_ConCallback
            this._ClearConData(),
                e ? e() : console.log('not callback func !!!')
        } else state == Socket.STATUS_DISCONNECT && this._ClearConData()
    }

    private _ClearConData(){
        this.HideLoadingImg(),
            (Socket.ins().UpdateStateEvent = null),
            (this.m_ConCallback = null)
    }

    private _DoGetPlayerServerInfo(event){
        var e = event.currentTarget
        return this._DoParsePlayerServerInfo(e.response)
    }

    private _DoParsePlayerServerInfo(infostr){
        let self = this;
        var e = JSON.parse(infostr)
        if (1 != e.result) return void console.log(e.result_msg)
        var i = function(t) {
                if (!t) return []
                for (var e in t) return t
                return []
            },
            r = e.data.player
        ;(this.UserName = r.username),
            (this.GmLevel = r.gm_level),
            (this.lid = r.lid),
            (this.playerServerData = e),
            (this.NoticeStatus = e.data.ns)
        var a;
        if(e.data.recent.length == 0){
            let arrServer = [];
            let arrExist = [];
            let lpage = e.data.lpage;
            if(this.nativeRecent.length > 0){
                for(let i = this.nativeRecent.length - 1; i >= 0 ; i--){
                    for(let j = lpage.length - 1; j >= 0; j--){
                        let id = lpage[j].id || lpage[j].sid;
                        if(id == this.nativeRecent[i]){
                            arrServer.push(lpage[j]);
                            arrExist[i] = true;
                            break;
                        }else{
                            arrExist[i] = false;
                        }
                    }
                    if(arrExist[i] == false){
                        this.nativeRecent.splice(i, 1);
                    }
                }
                a = i(arrServer);
            }
        }else{
            a = i(e.data.recent);
        }
        a.sort(function(t, e) {
            return e.time - t.time
        })
        for (var n = [], s = 0, o = a; s < o.length; s++) {
            var h = o[s],
                _ = GameServerDescData.Get(h, !0)
            _ && n.push(_)
        }
        var d = [],
            l = i(e.data.lpage)
        l.sort(function(t, e) {
            return e.sid - t.sid
        })
        for (var g = 0, u = l; g < u.length; g++) {
            var h = u[g],
                _ = GameServerDescData.Get(h)
            _ && d.push(_)
        }
        console.log("合区-------",e.data.__HE_SERVER__,e.data.__MIN_LEVER__)
        window["__CONFIG__"]["__MIN_LEVER__"] = e.data.__MIN_LEVER__;
        window["__CONFIG__"]["__HE_SERVER__"] = e.data.__HE_SERVER__;
        console.log("服务器信息",e.data,e.data.lpage.length)
        GameServerData.Init(e.data.maxid, n, d);
        console.log("isnew",this.isnew)
        if(self.isnew != 1){ 
            //没有角色，自动进入最新区
            if(e.data.__NEW_SERVER_ID__){
                self.StartLoadGame(e.data.__NEW_SERVER_ID__) 
            }else{
                self.StartLoadGame(e.data.lpage[0])
            }
        }else{
            self._LoadGroup(this.mLoadResGroup01), this._SetNextStep(1)
        }
    }

    public GetSingleImg(name){
        var e = this.mLoadResGroup02[name]
        return (
            e || (e = this.mLoadResGroup05[name]),
            e || console.error('not name ' + name),
            RES.getRes(e)
        )
    }

    public removeBg(){
        if(this._bg){
            this.removeChild(this._bg);
        }else if(window["TYPE_NUM"] == 0){
            window["__RemoveBg"]();
        }    
    }

    private _DoCheckAdult(rsp: Sproto.people_health_request){
        if(rsp.isadult == 0){
            ViewManager.ins().open(AntiAddiction);
        }
    }
    
}
