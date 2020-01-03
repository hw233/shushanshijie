class GameServerData{
    static readonly PAGE_COUNT: number = 20;
    static MaxId: number;
    static NewServerName: string;
    static PageData: GameServerPageData[] = [];
    static SelectData: GameServerDescData = null;
    static Callback: Function = null;
    static ThisObject: any = null;
    static HasRecentSvr(): boolean{
        return GameServerData.PageData &&
            GameServerData.PageData[0] &&
            GameServerData.PageData[0].datas &&
            GameServerData.PageData[0].datas.length
            ? !0
            : !1 
    }
    static Init(maxId: number, /*NewServerName: string,*/ datas: GameServerDescData[], lastList: GameServerDescData[]): void{
        GameServerData.MaxId = maxId
        var a = new GameServerPageData()
        ;(a.name = '最近登录'),
            (a.index = 0),
            (a.datas = datas),
            GameServerData.PageData.push(a)
            let maxNum = maxId;
            let index = 0;
        for (
            var n = Math.max(Math.ceil(maxId / GameServerData.PAGE_COUNT), 1), s = n;
            s >= 1;
            --s
        ) {
            var o = new GameServerPageData()
            ;(o.name =
                (s - 1) * GameServerData.PAGE_COUNT +
                1 +
                ' - ' +
                s * GameServerData.PAGE_COUNT +
                '服'),
                (o.index = s),
                (o.datas = [])
                let num = maxNum % 20;
                if(num == 0){
                    num = 20;
                }
                for(let j = index; j < index + num; j++){
                    o.datas.push(lastList[j])
                }
                maxNum = maxNum - num;
                index = index + num;
                GameServerData.PageData.push(o)
        }
        ;(GameServerData.PageData[1].datas = lastList),
            null != datas && datas.length > 0 && (GameServerData.SelectData = datas[0]),
            null == GameServerData.SelectData &&
                null != lastList &&
                lastList.length > 0 &&
                (GameServerData.SelectData = lastList[0])
    }
    private static _DoPageData(page, event){
        var r = JSON.parse(event.currentTarget.response),
            a = r.data,
            n = []
        for (var s in a) {
            var o = a[s],
                h = GameServerDescData.Get(o)
            h && n.push(h)
        }
        n.sort(function(t, e) {
            return e.id - t.id
        })
        for (var _ = 0, d = GameServerData.PageData; _ < d.length; _++) {
            var l = d[_]
            if (l.index == page) {
                l.datas = n
                break
            }
        }
        GameServerData.Callback && GameServerData.ThisObject && GameServerData.Callback.call(GameServerData.ThisObject, page)
    }

}

class GameServerPageData{
    id: number;
    ip: string;
    index: number;
    name: string;
    datas: GameServerDescData[];
}

class GameServerDescData{
    id: number;
    name: string;
    sname: string;
    ip: string;
    status: number;
    version: number;
    public GetStatus(): number{
        return 1 == this.status || 3 == this.status
            ? 1
            : 2 == this.status || 4 == this.status
            ? 2
            : 0
    }
    public CanEnter(): boolean{
        return this.version
            ? Main.getInstance().GmLevel
                ? !0
                : 1 == this.status || 2 == this.status
            : !1
    }
    public static Get(obj: any, ignore?: boolean): GameServerDescData{
        if (
            (void 0 === ignore && (ignore = !1),
            !ignore && 0 == obj.status && !Main.getInstance().GmLevel)
        )
            return null
        var r = new GameServerDescData()
        return (
            (r.id = obj.sid || obj.id),
            (r.name = obj.name),
            (r.ip = obj.addr || obj.ip),
            (r.status = obj.status),
            (r.version = obj.version),
            r
        )
    }
}