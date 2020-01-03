class ServerGroup extends egret.DisplayObjectContainer{
    constructor(){
        super();
        this.touchEnabled = !0;
    }

    public $hitTest(e, i){
        var r = super.$hitTest.call(this, e, i)
        if (r) return r
        if (!this.$visible || !this.touchEnabled) return null
        var a = this.globalToLocal(e, i, egret.$TempPoint),
            n = egret.$TempRectangle.setTo(0, 0, this.width, this.height),
            s = this.$scrollRect
        return (
            s && ((n.x = s.x), (n.y = s.y)),
            n.contains(a.x, a.y) ? this : null
        )
    }
}