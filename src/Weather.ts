class WeatherBase{
    _runing: boolean;
    _first: boolean;
    timerFrame: number;
    index: number;
    imageList: egret.Texture[];
    private m_Temp;
    constructor(t: any){
        this._runing = !1;
        this._first = !1;
        this.timerFrame = 15e3;
        this.index = 0;
        this.imageList = [];
        this.m_Temp = 0;
        this.index = t;
    }
    playWeather(tex: egret.Texture[]): void{
        ;(this.imageList = tex || []),
            false == this._runing &&
                ((this._runing = !0),
                (this._first = !0),
                this.onWeatherStart(),
                this.timerFrame > 0 || (this.timerFrame = 60),
                egret.startTick(this.weatherUpdateHandler, this),
                (WeatherFactory.weatherRunlist[this.index] = this))
    }
    stopWeather(): void{
        true == this._runing &&
            ((this._runing = !1),
            egret.stopTick(this.weatherUpdateHandler, this),
            this.onWeatherStop(),
            delete WeatherFactory.weatherRunlist[this.index])
    }
    weatherUpdateHandler(time: number): boolean{
        return time > this.m_Temp + this.timerFrame
            ? ((this.m_Temp = time),
                true == this._first
                    ? (this._first = !1)
                    : this.onWeatherUpdate(),
                !1)
            : !1
    }
    onWeatherInit(): void{

    }
    onWeatherStart(): void{

    }
    onWeatherUpdate(): void{

    }
    onWeatherStop(): void{

    }
}

class WeatherFactory {
    static _weatherFlower: any;
    static enabled: boolean = !1;
    static weatherFBList: any[] = [];
    static weatherSceneList: any[] = [];
    static weatherRunlist: {} = {};
    static getFlower(): any{
        var t = egret.MainContext.instance.stage
        return (
            (this._weatherFlower =
                this._weatherFlower || new WeatherFlower()),
            this._weatherFlower.setStageTarget(t),
            this._weatherFlower
        )
    }
}

class WeatherFlower extends WeatherBase {
    MAX_COUNT: number;
    r_P_List: RainLine[];
    r_R_List: any[];
    r_Max: number;
    r_L_Delay: number;
    r_L_Last_Time: number;
    r_R_Delay: number;
    r_R_Last_Time: number;
    s_C_Delay: number;
    s_C_Last_Time: number;
    timerFrame: number;
    stageTarget: any;
    _lastTime: any;
    constructor(){
        super(1);
        this.MAX_COUNT = 10;
        this.r_P_List = [];
        this.r_R_List = [];
        this.r_Max = 7;
        this.r_L_Delay = 500;
        this.r_L_Last_Time = 0;
        this.r_R_Delay = 20;
        this.r_R_Last_Time = 0;
        this.s_C_Delay = 300;
        this.s_C_Last_Time = 0;
        this.timerFrame = 30;
    }
    setStageTarget(t: any): void{
        this.stageTarget = t;
    }
    onWeatherStart(): void{
        if (
            ((this.r_Max = 8),
            (this._lastTime = egret.getTimer()),
            0 == this.r_P_List.length && 0 == this.r_R_List.length)
        )
            for (var t, e = 0; e < this.MAX_COUNT; e++)
                (t = new RainLine()),
                    (t.autoRotation = !1),
                    this.r_P_List.push(t)
    }
    onWeatherUpdate(): void{
        var t
        if (null != this.imageList && 0 != this.imageList.length) {
            var e = egret.getTimer()
            if (
                (this.r_Max != this.MAX_COUNT &&
                    e - this._lastTime >= 1e3 &&
                    ((this.r_Max += 1),
                    this.r_Max > this.MAX_COUNT &&
                        (this.r_Max = this.MAX_COUNT),
                    (this._lastTime = e)),
                this.r_R_List.length < this.r_Max &&
                    this.r_P_List.length > 0 &&
                    e - this.r_L_Last_Time > this.r_L_Delay)
            ) {
                ;(this.r_L_Last_Time = e),
                    (t = this.r_P_List.shift()),
                    (t.visible = !0),
                    (t.type = 0),
                    (t.texture = this.imageList[
                        (10 * Math.random()) % 3 << 0
                    ])
                var i = egret.MainContext.instance.stage
                ;(t.x = i.stageWidth * Math.random() + 1),
                    (t.y = 20 * Math.random() + 5),
                    (t.sy = t.y),
                    (t.targety =
                        i.stageHeight / 2 +
                        (i.stageHeight / 2) * Math.random()),
                    (t.scaleX = 0),
                    (t.scaleY = 0),
                    (t.sScale = 0.5 * Math.random() + 0.5),
                    (t.alpha = 0),
                    (t.rotationPlus = 1.5 * (2 * Math.random() - 1)),
                    (t.sptx = Math.random() / 20 + 0.01),
                    (t.speedx = Math.random() - Math.random() - 2),
                    (t.speedy = 3 * Math.random() + 3),
                    null == t.parent && this.stageTarget.addChild(t),
                    this.r_R_List.push(t)
            }
            for (var r = 0; r < this.r_R_List.length; r++)
                if (
                    ((t = this.r_R_List[r]),
                    t.update(),
                    (t.rotation += t.rotationPlus),
                    t.isDeath)
                )
                    this.r_R_List.splice(r--, 1),
                        this.r_P_List.push(t),
                        (t.visible = !1)
                else {
                    var a = (t.y - t.sy) / (t.targety - t.sy)
                    0.2 >= a
                        ? ((t.alpha = a / 0.2),
                            (t.scaleX = t.scaleY = t.sScale * t.alpha))
                        : a >= 0.8 &&
                            ((t.alpha = (1 - a) / 0.2),
                            (t.scaleX = t.scaleY = t.sScale * t.alpha))
                }
        }
    }
    onWeatherStop(): void{
        var t, e
        for (t = 0; t < this.r_R_List.length; t++)
            (e = this.r_R_List[t]), (e.visible = !0), this.Remove(e)
        for (t = 0; t < this.r_P_List.length; t++)
            (e = this.r_P_List[t]), (e.visible = !0), this.Remove(e)
        ;(this.r_R_List.length = 0), (this.r_P_List.length = 0)
    }
    private Remove(t){
        t && t.parent && t.parent.removeChild(t);
    }
}

class RainLine extends egret.Bitmap {
    autoRotation: boolean;
    sptx: number;
    speedx: number;
    speedy: number;
    targety: number;
    sy: number;
    down: boolean;
    spt: number;
    touchEnabled: boolean;
    type: any;
    isDeath: any;
    sScale: number;
    rotationPlus: number;

    constructor(){
        super();
        this.autoRotation = !0;
        this.sptx = 0;
        this.speedx = 0;
        this.speedy = 0;
        this.targety = 0;
        this.sy = 0;
        this.down = !0;
        this.spt = 0;
        this.touchEnabled = !1;
        this.sScale = 0;
        this.rotationPlus = 0;
    }
    
    update(): any{
        this.spt += this.sptx
        var t = this.x + this.speedx + 2 * Math.cos(this.spt),
            e = this.y + this.speedy
        if (0 == this.type) {
            if (this.autoRotation) {
                var i =
                    -(180 * Math.atan2(t - this.x, e - this.y)) / Math.PI +
                    90
                this.rotation = i
            }
            if (((this.x = t), (this.y = e), this.down)) {
                if (this.y >= this.targety) return void (this.isDeath = !0)
            } else if (this.y <= this.targety)
                return void (this.isDeath = !0)
        } else if (
            ((this.scaleX += 0.2), (this.scaleY += 0.2), this.scaleX >= 1)
        )
            return void (this.isDeath = !0)
        this.isDeath =
            this.x <= 0 ||
            this.y <= 0 ||
            this.x >= this.stage.stageWidth ||
            this.y >= this.stage.stageHeight
    }
}