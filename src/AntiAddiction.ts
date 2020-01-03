class AntiAddiction extends BaseView{
    private nameImg: eui.Image;
    private idNumImg: eui.Image;
    private nextTimeBtn: eui.Button;
    private submitBtn: eui.Button;
    private nameEditable: eui.EditableText;
    private idNumEditable: eui.EditableText;

    constructor(){
        super();
        this.skinName = "AntiAddictionSkin"
        this.nextTimeBtn.visible = true;
        this.submitBtn.visible = false;
        this.nameImg.visible = true;
        this.idNumImg.visible = true;
        this.addEventListener(egret.Event.CHANGE, this.onChangeName, this);
        this.addEventListener(egret.Event.CHANGE, this.onChangeIdNum, this);
        this.addEventListener(egret.FocusEvent.FOCUS_OUT, this.focusOutName, this);
        this.addEventListener(egret.FocusEvent.FOCUS_OUT, this.focusOutIdNum, this);
        this._AddClick(this.nextTimeBtn, this.sendNextTime);
        this._AddClick(this.submitBtn, this.sendSubmit);
    }

    public OnOpen(){
        //打开时执行
    }

    public OnClose(){
        
    }

    private onChangeName(){
        this.nameImg.visible = false;
    }

    private onChangeIdNum(){
        this.idNumImg.visible = false;
    }

    private focusOutName(){
        if(this.nameEditable.text == ""){
            this.nameImg.visible = true;
        }else{
            this.nameImg.visible = false;
        }
    }

    private focusOutIdNum(){
        if(this.idNumEditable.text == ""){
            this.idNumImg.visible = true;
        }else{
            this.idNumImg.visible = false;
        }
    }

    private sendNextTime(){
        this.DoClose();
    }

    private sendSubmit(){
        if(this.nameEditable.text == "" || this.idNumEditable.text == ""){
            UserTips.ins().showTips("输入信息不正确,请重新输入");
        }else{
            //此处发送消息

            this.DoClose();
        }
    }
}