class HavingSkillTipPanel extends BaseEuiView {

    public static LAYER_LEVEL = LayerManager.UI_Popup

    /////////////////////////////////////////////////////////////////////////////
    // HavingSkillTipSkin.exml
    /////////////////////////////////////////////////////////////////////////////
    protected descTxt: eui.Label;
    /////////////////////////////////////////////////////////////////////////////


	public constructor() {
		super()
		this.skinName = "HavingSkillTipSkin"
		this._AddClick(this, this.CloseSelf)
	}

	public OnOpen(...param: any[]) {
		/**1 童姥， 2 天神 */
		let type = param[0];
		let str = '';
		if(1 == type) {
			str = '被动武功是由童姥头饰洗出武功后获得';
		}
		else if(2 == type) {
			str = '被动武功是由天神突破天赋武功后获得';
		}
		this.descTxt.text = str;
	}
}