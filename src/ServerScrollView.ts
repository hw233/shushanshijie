class ServerScrollView extends egret.DisplayObjectContainer{
    private m_ScrollView;
    private m_Group;
    private m_ItemCls;
    private m_CacheList;
    private m_Datas;
    private m_Click;
    private m_ThisObject;
    private m_Index;

    constructor(scrollView: egret.ScrollView, itemCls: any, clickFunc: Function, thisObject: any){
        super();
        this.m_CacheList = [];
        this.m_Datas = [];
        this.m_Index = -1;
        this.m_ScrollView = scrollView;
        this.m_Click = clickFunc;
        this.m_ThisObject = thisObject;
        this.m_ScrollView.addEventListener(egret.Event.CHANGE, this.OnChange, this);
        this.m_ItemCls = itemCls;
        this.m_Group = new ServerGroup();
        this.m_Group.width = scrollView.width;
        this.m_Group.height = scrollView.height;
        scrollView.setContent(this.m_Group);
    }

    private GetItme(){
        var t = this.m_CacheList.pop() || new this.m_ItemCls()
        return t
    }

    private OnChange(){
        for (
            var t = this.m_ScrollView.scrollTop,
                e = t + this.m_ScrollView.height,
                i = this.m_ItemCls.Height,
                r = 0;
            r < this.m_Group.numChildren;
        ) {
            var a = this.m_Group.getChildAt(r)
            if (!(a.y < t - i || a.itemIndex >= this.m_Datas.length)) break
            this.m_Group.removeChildAt(r), this.m_CacheList.push(a)
        }
        for (var r = this.m_Group.numChildren - 1; r >= 0; --r) {
            var a = this.m_Group.getChildAt(r)
            if (!(a.y > e || a.itemIndex >= this.m_Datas.length)) break
            this.m_Group.removeChildAt(r), this.m_CacheList.push(a)
        }
        for (;;) {
            var n = this.m_Group.$children[0]
            if (null == n) {
                if (!this._AddItem(0, -1)) break
            } else {
                if (!(n.y >= t)) break
                if (!this._AddItem(n.itemIndex - 1, -1)) break
            }
        }
        for (;;) {
            var s = this.m_Group.$children[this.m_Group.numChildren - 1]
            if (null == s) break
            if (!(s.y <= t + this.m_ScrollView.height - i)) break
            if (!this._AddItem(s.itemIndex + 1, 1)) break
        }
    }

    private _ItemClick(t){
        var e = t.target
        this.SelectIndex(e.itemIndex)
    }

    public GetSelectIndex(){
        return this.m_Index
    }

    public SelectIndex(t){
        this.m_Index = t
        for (var e = 0; e < this.m_Group.numChildren; ++e) {
            var i = this.m_Group.getChildAt(e)
            i.light && (i.light.visible = t == i.itemIndex)
        }
        this.m_Click &&
            this.m_ThisObject &&
            this.m_Click.call(this.m_ThisObject, t)
    }

    private _AddItem(t, e){
        if (null == this.m_Datas[t]) return !1
        var i = this.GetItme()
        return (
            i.addEventListener(
                egret.TouchEvent.TOUCH_TAP,
                this._ItemClick,
                this
            ),
            (i.itemIndex = t),
            (i.y = this.m_ItemCls.Height * t),
            i.SetData(this.m_Datas[t]),
            -1 == e
                ? this.m_Group.addChildAt(i, 0)
                : this.m_Group.addChild(i),
            !0
        )
    }

    public GetData(t){
        return this.m_Datas[t]
    }

    public SetDatas(t){
        this.m_Datas = t;
        this.m_Group.height = t.length * this.m_ItemCls.Height;
        0 == this.m_ScrollView.scrollTop ? this.OnChange() : (this.m_ScrollView.scrollTop = 0)
        for (var e = 0; e < this.m_Group.numChildren; ++e){
            this.m_Group.getChildAt(e).SetData(t[e])
        }
    }
}