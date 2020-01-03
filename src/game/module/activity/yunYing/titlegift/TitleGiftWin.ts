class TitleGiftWin extends BaseEuiView {

	public static LAYER_LEVEL = LayerManager.UI_Popup

	/////////////////////////////////////////////////////////////////////////////
	// TitleGiftSkin.exml
	/////////////////////////////////////////////////////////////////////////////
	protected dialogMask: eui.Component;
	protected dialogCloseBtn: eui.Button;
	protected itemList: eui.List;
	protected chargeBtn: eui.Button;
	protected chargeTxt: eui.Label;
	protected tabBar: eui.TabBar;
	private finishIndex = {81: false, 82: false};
	/////////////////////////////////////////////////////////////////////////////

	public static list: any[] = [];

	public constructor() {
		super()
		this.skinName = 'TitleGiftSkin';
	}

	public childrenCreated() {
		let finishList = GameGlobal.RechargeModel.finish;
		for(let key in this.finishIndex){
			if(finishList[key]){
				this.finishIndex[key] = true;
			}
		}
		this.itemList.itemRenderer = ItemBaseNotName;
		this.itemList.dataProvider = null;
		let config = GameGlobal.Config.ChristmastitleConfig;
		let labels = [];
		TitleGiftWin.list = [];
		if (config) {
			for (let id in config) {
				for(let key in config[id]){
					labels.push(1 == config[id][key].recharge ? '充6元' : '充' + config[id][key].recharge + '元');
					TitleGiftWin.list.push(config[id][key]);
				}
			}
			this.tabBar.dataProvider = new eui.ArrayCollection(labels);
			this.tabBar.selectedIndex = 0;
		}
	}

	private onClick(e: egret.TouchEvent) {
		let rechargeId = 0;
		if(this.tabBar.selectedIndex == 0){
			rechargeId = 81;
		}else{
			rechargeId = 82;
		}
		GameGlobal.RechargeModel.sendRecharge(rechargeId);
	}

	private onItemClick(e: egret.TouchEvent) {
		this.updateContent();
	}

	public OnOpen(...param: any[]) {
		this.AddClick(this.dialogMask, this.CloseSelf);
		this.AddClick(this.dialogCloseBtn, this.CloseSelf);
		this.AddClick(this.chargeBtn, this.onClick);
		this.AddItemClick(this.tabBar, this.onItemClick);
		this.observe(MessageDef.ACTIVITY_TITLE_GIFT, this.onByComplete);
		this.updateContent();
	}

	private onByComplete(index, res){
		if(res){
			UserTips.ins().showTips("称号礼包购买成功,请前往邮件领取");
			ViewManager.ins().close(this);
		}else{
			console.log("购买失败");
		}
		this.updateContent()
	}

	private updateContent() {
		UIHelper.ListRefresh(this.tabBar);
		this.itemList.dataProvider = new eui.ArrayCollection(TitleGiftWin.list[this.tabBar.selectedIndex].reward);
		let arr = [];
		for(let key in this.finishIndex){
			arr.push(this.finishIndex[key]);
		}
		if(arr[this.tabBar.selectedIndex]){
			this.chargeBtn.label = "已购买";
			this.chargeBtn.enabled = false;
		}else{
			this.chargeBtn.label = "立即购买";
			this.chargeBtn.enabled = true;
		}
	}
}
