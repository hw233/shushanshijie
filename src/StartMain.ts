class StartMain {

    public static instance: StartMain

    public mIsPauseApp = false

    public constructor() {
        StartMain.instance = this
        LocationProperty.init();
        GameSocket.ins()
        this.Init()
    }

    public static RunGame() {
        new StartMain;
    }

    private Init() {
        // //注入自定义的素材解析器
        // egret.MainContext.instance.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        // egret.MainContext.instance.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        Sproto.SprotoCore.Init();
        Sproto.SprotoSender.Init(new C2sProtocol().GetProtocol());
        Sproto.SprotoReceiver.Init(new S2cProtocol().GetProtocol());
        GameGlobal.initModule()
        ResVersionManager.ins();
        RedPointMgr.Init()
        ResMgr.Init()
        ResMgr.GmInit()
        StartMain.LoadResVersionComplate()
    }

    // 开始加载资源文件
    static LoadResVersionComplate() {
        ResourceUtils.ins().addConfig("resource/default.res.json", window["RES_URL"]);
        ResourceUtils.ins().loadConfig(StartMain.instance.onConfigComplete, StartMain.instance);
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    public onConfigComplete() {
        Main.getInstance().UpdateLoadingUI(false, "加载主题文件", 1, 1, 5000)
        var theme = new eui.Theme("resource/default.thm.json", egret.MainContext.instance.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }

    /**
     * 主题文件加载完成
     */
    public onThemeLoadComplete() {
        // RES.destroyRes("resource/default.thm.json")
        var gameApp = new GameApp(() => {
            Main.getInstance().UpdateLoadingUI(false, "进入游戏", 1, 1, 5)
            // 加载完成连接游戏服务器
            console.log("加载完成连接游戏服务器");
            GameSocket.ins().login(Main.getInstance().mConnectServerData.ip)
        });
    }
    // 控制声音
    static kzmusic(str:boolean){
        FuncOpenModel.SetData(FuncOpenModel.SAVE_SYSTEM_SETTING_SY, str)
        GameGlobal.SoundManager.SetBgOn(!FuncOpenModel.HasSaveData(FuncOpenModel.SAVE_SYSTEM_SETTING_SY))
    }

}




