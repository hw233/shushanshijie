/**
 * 福利公告
 */
class FuliNoticePanel extends BaseEuiView
{
	//skinName
	//FuliLvNoticeSkin.exml

	public static LAYER_LEVEL = LayerManager.UI_Main;
	
    // FuliLvNoticeSkin.exml
    /////////////////////////////////////////////////////////////////////////////
    protected lbNotice: eui.Label;
    /////////////////////////////////////////////////////////////////////////////



	public constructor()
    {
        super()
        this.skinName = "FuliLvNoticeSkin";
    }
	public childrenCreated() 
    {

    }
	public OnOpen()
    {
		this.UpdateContent()
	}
    public UpdateContent() 
    {
        //let strText = GlobalConfig.ins().NoticeConfig[1].notice || ""
        let strText = "欢迎莅临游戏，有您更精彩！";
        this.lbNotice.textFlow = TextFlowMaker.generateTextFlow(strText);
	}
   

}