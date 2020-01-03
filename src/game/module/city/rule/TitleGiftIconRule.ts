class TitleGiftIconRule extends RuleIconBase {

	public constructor(t) {
		super(t)
		this.updateMessage = [MessageDef.ACTIVITY_TITLE_GIFT, MessageDef.ACTIVITY_INFO, MessageDef.ACTIVITY_UPDATE, MessageDef.RECHARGE_UPDATE]
		this.firstTap = true;
	}
	checkShowIcon() {
		let b = Deblocking.Check(DeblockingType.TYPE_145, true) && TitleGiftIconRule.showIcon();
		if (!b)
		{
			if (ViewManager.ins().isShow(TitleGiftWin)) {
				ViewManager.ins().close(TitleGiftWin);
			}
		}	
		return b
	}
	public static showIcon(): boolean{
		let finishList = GameGlobal.RechargeModel.finish;
		if(finishList[81] && finishList[82]){
			return false
		}
		return true
	}
	getEffName(e) {
		return this.DefEffe(e)
	}

	checkShowRedPoint() {
		return false
	}

	tapExecute() {
		// this.firstTap = false;
		ViewManager.ins().open(TitleGiftWin)
	}
}
