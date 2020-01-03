class ZuojiGiftIconRule extends RuleIconBase {

	public constructor(t) {
		super(t)
		this.updateMessage = [MessageDef.ACTIVITY_ZUOJI_GIFT, MessageDef.ACTIVITY_INFO, MessageDef.ACTIVITY_UPDATE, MessageDef.RECHARGE_UPDATE]
		this.firstTap = true;
	}
	checkShowIcon() {
		let b = Deblocking.Check(DeblockingType.TYPE_147, true) && ZuojiGiftIconRule.showIcon();
		if (!b)
		{
			if (ViewManager.ins().isShow(ZuojiGiftWin)) {
				ViewManager.ins().close(ZuojiGiftWin);
			}
		}	
		return b
	}
	public static showIcon(): boolean
	{
		let finishList = GameGlobal.RechargeModel.finish;
		if(finishList[80]){
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
		this.firstTap = false;
		ViewManager.ins().open(ZuojiGiftWin)
	}
}
