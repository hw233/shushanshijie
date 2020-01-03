class MainTopPanel extends BaseEuiView {

    public static LAYER_LEVEL = LayerManager.UI_USER_INFO;

	/////////////////////////////////////////////////////////////////////////////
    // MainTopPanelSkin.exml
    /////////////////////////////////////////////////////////////////////////////
    public god: eui.Button;
    protected yb: eui.Button;
    public byb: eui.Button;
    /////////////////////////////////////////////////////////////////////////////
	protected expBar: eui.ProgressBar;
    protected expBarLabel: eui.Label;

	public constructor() {
		super();
	}
	public destoryView() { }


	initUI() {
		super.initUI()
		this.skinName = "MainTopPanelSkin";
		this.touchEnabled = false;

		this.expBar.slideDuration = 0;
		this.expBar.labelDisplay.visible = false
		this.expBar.labelDisplay = this.expBarLabel

		this._AddClick(this.god, this.onClick)
		this._AddClick(this.yb, this.onClick)
		this._AddClick(this.byb, this.onClick)
	}

	initData() {
		this.updateData()
	}

	OnOpen(...param: any[]) {

		this.observe(MessageDef.INIT_ACTOR, this._DoExpInit)

		this.observe(MessageDef.GOLD_CHANGE, this.initData)
		this.observe(MessageDef.YB_CHANGE, this.initData)
		this.observe(MessageDef.BYB_CHANGE, this.initData)
		this.observe(MessageDef.postInitActorInfo, this.updateData)
		this.initData()

		this.observe(MessageDef.EXP_CHANGE, this._DoExpChange);
		this.observe(MessageDef.LEVEL_CHANGE, this._DoExpChange);
		this._DoExpInit()
	}

	private _DoExpInit() {
		let expConfig = GlobalConfig.ins().ExpConfig[GameGlobal.actorModel.level]
		if (!expConfig) {
			return
		}
		var maxExp = expConfig.exp;
		this.expBar.maximum = maxExp;
		this.expBar.value = GameGlobal.actorModel.exp
	}

	private _DoExpChange() {
		let expConfig = GlobalConfig.ins().ExpConfig[GameGlobal.actorModel.level]
		if (!expConfig) {
			return
		}
		var maxExp = expConfig.exp;
		egret.Tween.removeTweens(this.expBar);
		var tween = egret.Tween.get(this.expBar);
		if (this.expBar.maximum != maxExp) {
			tween.to({ "value": this.expBar.maximum }, 500).wait(200).call(() => {
				this.expBar.maximum = maxExp;
				this.expBar.value = 0;
				this._DoExpChange();
			}, this);
			return;
		}
		else {
			tween.to({ "value": GameGlobal.actorModel.exp }, 500);
		}
	}

	updateData() {
		this.god.label = CommonUtils.overLength(GameGlobal.actorModel.gold);
		if (GameGlobal.actorModel.yb >= 100000000) {
			this.yb.label = CommonUtils.overLength(GameGlobal.actorModel.yb);
		} else {
			this.yb.label = GameGlobal.actorModel.yb + "";
		}
		if (GameGlobal.actorModel.byb >= 100000000) {
			this.byb.label = CommonUtils.overLength(GameGlobal.actorModel.byb);
		} else {
			this.byb.label = GameGlobal.actorModel.byb + "";
		}
	}

	onClick(e) {
		switch (e.currentTarget) {
			case this.god:
				ViewManager.ins().open(ExchangeMoneyWin);
				break;
			case this.yb:
			    RechargeWin.Open();
				break;
			case this.byb:
				(<ShopGoodsWarn>ViewManager.ins().open(ShopGoodsWarn)).setData(MoneyConst.byb, 1);
				break;
		}
	};
}
