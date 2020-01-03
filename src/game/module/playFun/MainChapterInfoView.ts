class MainChapterInfoView extends BaseView implements eui.UIComponent {

	/////////////////////////////////////////////////////////////////////////////
    // MainChapterInfoSkin.exml
    /////////////////////////////////////////////////////////////////////////////
    protected chapterInfo: eui.Group;
    protected imgMap: eui.Image;
    protected imgRed: eui.Image;
    protected lbMap: eui.Label;
    protected lbSeat: eui.Label;
    protected groupLine: eui.Group;
    protected labLinerNo: eui.Label;
    protected imgPoint: eui.Image;
    /////////////////////////////////////////////////////////////////////////////

    public static readonly FIGHT_TYPE = 1
    public static readonly CITY_TYPE = 2

    private mType: number

	public constructor() {
		super()
	}

	public childrenCreated() {
        this.imgRed.visible = false

        this._AddClick(this.chapterInfo, this._Onclick)
        //this._AddClick(this.groupLine, this._Onclick)
	}

    public OnOpen(...param) {
        this.mType = param[0]
        this.observe(MessageDef.GUANQIA_CHANGE, this.UpdateContent)
        this.observe(MessageDef.MAIN_CITY_INFO, this.UpdateContent)
        this.UpdateContent()
    }

    public OnClose() {

    }

    public UpdateContent() {
        this.lbSeat.visible = this.mType != MainChapterInfoView.CITY_TYPE
        // this.groupLine.visible = !this.lbSeat.visible
        //this.groupLine.visible = true
        let userFb = GameGlobal.UserFb
        this.lbMap.text = "第" + userFb.guanqiaID + "关"
        this.lbSeat.text = userFb.Desc
        this.imgRed.visible = GameGlobal.UserFb.chapterRewardList.length > 0

        let numsd = Math.floor((Math.random()*10)+1);
        this.labLinerNo.text = `${numsd}线`

        if (this.mType == MainChapterInfoView.FIGHT_TYPE)return

        let info = GameGlobal.CommonRaidModel.mMainCityInfo
        if (!info)return

        this.imgPoint.source = GameGlobal.CommonRaidModel.GetPointSource(info.people)
    }

    public _Onclick(e: egret.TouchEvent) {
        GameGlobal.SoundManager.PlayEffect("btn_mp3");
        ViewManager.ins().open(WorldMapPanel)
		// switch (e.currentTarget) {
        // case this.imgMap:
        //     GameGlobal.SoundManager.PlayEffect("btn_mp3");
        //     ViewManager.ins().open(WorldMapPanel)
        // break
        // case this.groupLine:
        //     GameGlobal.SoundManager.PlayEffect("btn_mp3");
        //     if (this.mType == MainChapterInfoView.FIGHT_TYPE)
        //         return

        //     ViewManager.ins().open(ChangeLinerWin)
        // break
        // }
    }
}