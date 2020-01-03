class ZuojiGiftWin extends BaseEuiView {
	public static LAYER_LEVEL = LayerManager.UI_Popup
    /////////////////////////////////////////////////////////////////////////////
    // ZuojiGiftSkin.exml
    /////////////////////////////////////////////////////////////////////////////
    protected closeBtn: eui.Button;
    protected powerLabel: PowerLabel;
	protected itemList: eui.List;
    protected btn: eui.Button;
    protected labelDisplay: eui.Label;
    /////////////////////////////////////////////////////////////////////////////


	public constructor() {
		super();
		this.skinName = "ZuojiGiftSkin"
	}

	public childrenCreated() {
		this.itemList.itemRenderer = ItemBaseNotNameAndBg;
		this.itemList.dataProvider = null;
		let config = GameGlobal.Config.ChristmasmonConfig;
		
		this.itemList.dataProvider = new eui.ArrayCollection(config[1][98].reward);
	}

	OnOpen(...param: any[]) {	
		this._AddClick(this.closeBtn, this.CloseSelf);
		this._AddClick(this.btn, this.tap);
		this.observe(MessageDef.ACTIVITY_ZUOJI_GIFT, this.onByComplete); // 
		this.updateContent();
	}

	private onByComplete(index, res){
		console.log("1111111122222222222222222222222")
		if(res == 1){
			UserTips.ins().showTips("坐骑礼包购买成功,请前往邮件领取");
			ViewManager.ins().close(this);
		}else{
			console.log("购买失败")
		}
		this.updateContent();
	}

	updateContent() {
		if(GameGlobal.RechargeModel.finish[80]){
			this.btn.label = "已购买";
			this.btn.enabled = false;
		}else{
			this.btn.label = "立即购买";
			this.btn.enabled = true;
		}
	}

	private tap() {
		GameGlobal.RechargeModel.sendRecharge(80);
	}
}