class FenXiangReward extends BaseEuiView{

    public static LAYER_LEVEL = LayerManager.UI_FullScreen_Popup ;

    /////////////////////////////////////////////////////////////////////////////
    // FenXiangRewardsSkin.exml
    /////////////////////////////////////////////////////////////////////////////
    protected itemName: eui.Label;
    /////////////////////////////////////////////////////////////////////////////

    public constructor(){
        super()
        this.skinName = "FenXiangRewardsSkin" ;

        this.itemName.text = "恭喜获得4888绑元(っ•̀ω•́)っ" ;

    }

    public ChangeText (a: string){
        this.itemName.text = a ;

    }


    public Timer = setTimeout(() => {
            ViewManager.ins().close(this) ;
        }, 2000);

}