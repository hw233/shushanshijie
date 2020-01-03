class CommonLoading extends eui.Component{
	public static shared:CommonLoading;
	public static Shared(){
		if(CommonLoading.shared == null){
			CommonLoading.shared = new CommonLoading();
		}
		return CommonLoading.shared;
	}
	public static instance;
	public msg;
    private r1:eui.Rect;
    private r2:eui.Rect;
	private r3:eui.Rect;
	private r4:eui.Rect;
	private r5:eui.Rect;
	private timer:egret.Timer;
	private fn;
	public constructor() {
		super();
		CommonLoading.shared = this;
		this.skinName = 'common_loading';
		// Util.sety(this);
	}

	public init(msg,time)
	{	this.alpha = 1;
		this.msg = msg;
		this.timerFun();
		this.timer = new egret.Timer(1200,0);
		this.timer.start();
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFun,this);
		if(time > 0){
			let that = this;
			setTimeout(function() {
				that.onClose();
			}, time);
		}
		// this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this); 
		// this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseTst,this); 
	}

	private timerFun(){
		egret.Tween.get(this.r1,).to({fillAlpha:0.9},200).call(()=>{
			this.r1.fillAlpha = 0.2;
			egret.Tween.get(this.r2).to({fillAlpha:0.9},200).call(()=>{
				this.r2.fillAlpha = 0.2;
				egret.Tween.get(this.r3).to({fillAlpha:0.9},200).call(()=>{
					this.r3.fillAlpha = 0.2;
					egret.Tween.get(this.r4).to({fillAlpha:0.9},200).call(()=>{
						this.r4.fillAlpha = 0.2;
						egret.Tween.get(this.r5).to({fillAlpha:0.9},200).call(()=>{
							this.r5.fillAlpha = 0.2;
						});
					});
				});
			});
		});
	}
	public onClose(){
		let that = this;
		egret.Tween.get(that).to({alpha:0},300).call(()=>{
			that.timer.stop();
			if(that.parent)that.parent.removeChild(that);
		});
    }

}