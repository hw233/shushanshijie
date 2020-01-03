class MainScene extends BaseScene {

    /**
     * 进入Scene调用
     */
	public onEnter() {
		super.onEnter();
		console.log("进入Scene调用")
		if(window["TYPE_NUM"] == 1){
			GlobalInitMyCls.InitCls();
		}
		ViewManager.ins().open(GameSceneView);
		ViewManager.ins().open(MainTopPanel);
		ViewManager.ins().open(MainTop2Panel);
		ViewManager.ins().open(MainBottomPanel);
		ViewManager.ins().open(TipsView);
	}
}