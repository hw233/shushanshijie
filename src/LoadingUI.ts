//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends egret.DisplayObjectContainer {
    private m_Textures;
    private bg;
    private blackBg;
    private m_Label;
    private tipx1;
    private tipx2;
    private tipImg;
    private img01;
    private img01Tag;
    private img01W;
    private img02;
    private img02Tag;
    private img02W;
    private label03;
    private imgWidth;
    private str;
    private s1;
    private e1;
    private s2;
    private e2;
    private t;
    private et;
    private pt;
    private preveTime;
    private mt;

    public constructor() {
        super();
        this.m_Textures = [
            {
                path: window["RES_URL"] + 'resource/assets/game_start/res/ui_bm_vip5.png',
                data: null
            }
        ];
        this.tipx1 = -300;
        this.tipx2 = 0;
        this.imgWidth = 486;
        this.str = '';
        this.s1 = 0;
        this.e1 = 0;
        this.s2 = 0;
        this.e2 = 0;
        this.t = 0;
        this.et = 0;
        this.pt = 0;
        this.preveTime = 0;
        this.mt = 0;
        this.createView();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
              
    }

    private textField: egret.TextField;


    private createView(): void {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
        var e = this.bg = new egret.Bitmap();
        e.texture = Main.getInstance().GetSingleImg('ui_xzfwq_p_show');
        e.touchEnabled = !0;
        e.x = -480;
        this.addChild(e);
        this.onResize();
        (this.img01 = this.NewBar(926)),
        (this.img01Tag = new egret.Bitmap()),
        (this.img01Tag.y = 881),
        (this.img01Tag.texture = Main.getInstance().GetImg('_ui_bm_yun')),
        this.addChild(this.img01Tag),
        (this.img01W = this.SetBarValue(this.img01, 0, this.img01Tag)),
        (this.img02 = this.NewBar(1073)),
        (this.img02Tag = new egret.Bitmap()),
        (this.img02Tag.y = 1028),
        (this.img02Tag.texture = Main.getInstance().GetImg('_ui_bm_yun')),
        this.addChild(this.img02Tag),
        (this.img02W = this.SetBarValue(this.img02, 0, this.img02Tag)),
        (this.tipImg = new egret.Bitmap()),
        (this.tipImg.x = 0),
        (this.tipImg.y = 720),
        this.addChild(this.tipImg),
        ServerUI.IsNewServer(Main.getInstance().mConnectServerData.id) &&
            this._LoadTexture(0)
        var i = new egret.TextField()
        ;(i.text = '首次加载时间稍长，请耐心等待'),
            (i.strokeColor = 723971),
            (i.stroke = 1),
            (i.size = 24),
            (i.x = -302),
            (i.y = 980),
            (i.width = 604),
            (i.verticalAlign = egret.VerticalAlign.MIDDLE),
            (i.textAlign = egret.HorizontalAlign.CENTER),
            this.addChild(i)
        var r = new egret.TextField()
        ;(r.touchEnabled = !0),
            r.addEventListener(
                egret.TouchEvent.TOUCH_TAP,
                this._OnClick,
                this
            ),
            (r.text = '若长时间加载不成功，请点击刷新界面'),
            (r.strokeColor = 723971),
            (r.textColor = 2480417),
            (r.stroke = 1),
            (r.size = 24),
            (r.x = -302),
            (r.y = 1126),
            (r.width = 604),
            (r.verticalAlign = egret.VerticalAlign.MIDDLE),
            (r.textAlign = egret.HorizontalAlign.CENTER),
            this.addChild(r)
        var a = (this.label03 = new egret.TextField())
        ;(a.text = ''),
            (a.strokeColor = 723971),
            (a.stroke = 1),
            (a.size = 24),
            (a.x = -302),
            (a.y = 1156),
            (a.width = 604),
            (a.verticalAlign = egret.VerticalAlign.MIDDLE),
            (a.textAlign = egret.HorizontalAlign.CENTER),
            this.addChild(a);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    }

    // public onProgress(current: number, total: number): void {
    //     this.textField.text = `Loading...${current}/${total}`;
    // }
    private NewBar(y){
        var e = new egret.Bitmap()
        ;(e.x = -342),
            (e.y = y),
            (e.texture = Main.getInstance().GetImg(
                '_ui_bm_cjjindutiao01@63_0_60_0'
            )),
            (e.width = 685),
            (e.scale9Grid = new egret.Rectangle(63, 0, 3, 49)),
            (e.touchEnabled = !0),
            this.addChild(e)
        var i = new egret.Bitmap()
        return (
            (i.x = -296),
            (i.y = y + 11),
            (i.texture = Main.getInstance().GetImg(
                '_ui_bm_cjjindutiao02@14_0_8_0'
            )),
            (i.width = 593),
            (i.scale9Grid = new egret.Rectangle(15, 0, 3, 27)),
            (i.touchEnabled = !0),
            this.addChild(i),
            i
        )
    }

    private onAddToStage(event){
        this.removeEventListener(
            egret.Event.ADDED_TO_STAGE,
            this.onAddToStage,
            this
        );
        this.preveTime = this.pt = egret.getTimer();
        this.mt = egret.getTimer();
        let self = this;
        setTimeout(function() {
            egret.startTick(self.Update, self);
            StartMain.RunGame();    
        }, 100);        
    }

    private SetBarValue(bar, value, tag){
        value > 1 ? (value = 0) : 0 > value && (value = 0)
        var r = bar.width,
            a = Math.round(value * r)
        ;(0 > a || a === 1 / 0) && (a = 0)
        var n = bar.$scrollRect
        return (
            n || (n = egret.$TempRectangle),
            n.setTo(0, 0, bar.width, bar.height),
            (n.width = a),
            (bar.scrollRect = n),
            (tag.x = bar.x + a - 55),
            value
        )
    }
    private _LoadTexture(index){
        RES.getResByUrl(
            this.m_Textures[index].path,
            this._Loaded,
            this,
            RES.ResourceItem.TYPE_IMAGE
        )
    }
    private _Loaded(obj, name){
        if (obj)
            for (var i = 0; i < this.m_Textures.length; ++i)
                if (this.m_Textures[i].path == name) {
                    this.tipImg.texture = obj
                    break
                }
    }
    Close(){
        if ((egret.stopTick(this.Update, this), this.parent)) {
            this.parent.removeChild(this)
            for (var t = 0, e = this.m_Textures; t < e.length; t++) {
                var i = e[t]
                RES.destroyRes(i.path)
            }
        }
    }
    private Update(time){
        var e = time - this.pt
        ;(this.pt = time), (this.t += e)
        var i
        ;(i = this.t > this.et ? 1 : this.t / this.et),
            (this.img01W = this.SetBarValue(
                this.img01,
                this.s1 + (this.e1 - this.s1) * i,
                this.img01Tag
            ))
        var r = (time - this.mt) % 2500
        return (
            (this.img02W = this.SetBarValue(
                this.img02,
                r / 2500,
                this.img02Tag
            )),
            this._UpdatePro(i),
            !1
        )
    }
    private _OnClick(){
        window.location.reload();
    }
    private _UpdatePro(value){
        this.str
            ? (this.label03.text =
                    this.str + ' [' + Math.floor(100 * value) + '%]')
            : (this.label03.text = '')
    }
    UpdateText(str: string, p1: number, p2: number, time: number){
        ;(this.str = str),
            this._UpdatePro(p2),
            (this.t = 0),
            (this.et = time),
            (this.s1 = this.img01W),
            (this.e1 = p1),
            this.e1 < this.s1 && (this.e1 += 1),
            (this.s2 = this.img02W),
            (this.e2 = p2),
            this.e2 < this.s2 && (this.e2 += 1)
    }
    SetText(str: string, p1: number, p2: number, time: number){
        console.log("加载进度----",p1);
        ;(this.img02W = this.SetBarValue(this.img02, 0, this.img02Tag)),
            this.UpdateText(str, p1, p2, time)
    }
    private onResize(){
        this.blackBg &&
            ((this.blackBg.x =
                -4 - (egret.MainContext.instance.stage.stageWidth >> 1)),
            (this.blackBg.y = -Main.getInstance().mUIGroupYPos),
            (this.blackBg.width =
                1.2 * egret.MainContext.instance.stage.stageWidth),
            (this.blackBg.height =
                1.2 * egret.MainContext.instance.stage.stageHeight)),
            this.bg &&
                ((this.bg.y = -Main.getInstance().mUIGroupYPos),
                (this.bg.height =
                    egret.MainContext.instance.stage.stageHeight),
                (this.bg.width = (this.bg.height / 1280) * 960),
                (this.bg.x = -this.bg.width >> 1))
    }
    getElasticOut(t: number){
        if (0 == t || 1 == t) return t
        var e = 0.075
        return Math.pow(2, -10 * t) * Math.sin((6.28 * (t - e)) / 0.3) + 1
    }
    sineOut(t: number){
        return Math.sin((t * Math.PI) / 2)
    }
}
