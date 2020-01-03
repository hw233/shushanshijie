class CrossBattleTipPanel extends BaseEuiView {

	public static LAYER_LEVEL = LayerManager.UI_Popup
    /////////////////////////////////////////////////////////////////////////////
    // ForgeMasterTipSkin.exml
    /////////////////////////////////////////////////////////////////////////////
    protected text: eui.Label;
    /////////////////////////////////////////////////////////////////////////////

	public constructor() {
		super()
		this.skinName = "CrossBattleTipSkin"
		this._AddClick(this, this.CloseSelf)
	}

	public OnOpen(...param: any[]) {
		//let forgeType = param[0]
		let str = ""
		switch(param[0]) {
			case 1:
			   str = "与峨眉派阵营战斗时,减伤20%  激活条件：占领峨眉派边城激活"
			break
			case 2:
			   str = "与逍遥派阵营战斗时,减伤20%  激活条件：占领逍遥派边城激活"
			break
			case 3:
			   str = "与昆仑派阵营战斗时,减伤20%  激活条件：占领昆仑派边城激活"
			break
			case 4:
			   str = "Tip:占领守城都阵营的边城  守城者每30秒掉血1%"
			break
		}
		this.text.text = str

	}

	public OnClose() {

	}
}