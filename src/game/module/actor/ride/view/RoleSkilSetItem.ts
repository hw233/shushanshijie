/**
 *
 * @Author: liangzhaowei
 * @Date: 2018/4/12 18:51
 * @meaning: 武功设置item
 * 
 **/


class RoleSkilSetItem extends eui.ItemRenderer {


    imgXiyou: eui.Image;
    img_lv_bg: eui.Image;
    img_icon: eui.Image
    
    lb_level: eui.Label;
    lbSkillNe: eui.Label;
    lbSkillLv: eui.Label;
    lbInfo: eui.Label;

    btn:eui.Button;

    tSkillList = []; //武功列表

    public constructor() {
        super();
        // 外观名称
        this.skinName = "RoleSkillSetSkinItemSkin";
        // this.touchChildren = true;

        //点击响应
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClick, this)



    }
    
    public dataChanged():void{
        
        //更新内容

        this.tSkillList =  SubRoles.ins().GetRoleData().getSkillSort();

        var itemIndex = this.tSkillList[this.data] -1  //修正武功下标
        

        var role = SubRoles.ins().GetRoleData()
        let skillIds = role.GetCurSkillIDs()
        let skillId = skillIds[itemIndex]
        let skillLevel = role.getSkillsDataByIndex(itemIndex)

        var skillName = SkillsConfig.GetSkillName(skillId)//名称
        var skillInfo = SkillsConfig.GetSkillDesc(skillId, skillLevel, 0)//武功描述


        if(skillLevel > 0)
        {
            this.btn.touchEnabled = true
             this.filters = null
        }
        else
        {
            this.btn.touchEnabled = false
            this.filters = Color.GetFilter()
        }

        this.lb_level.text = skillLevel + ""
        this.lbSkillLv.text = skillLevel + ""
        this.lbSkillNe.text = skillName

        this.lbInfo.text = skillInfo

        this.img_icon.source = SkillsConfig.GetSkillIcon(skillId)
        
    }

    public OnClick(e: egret.TouchEvent)
    {

		if(this.data > 0)
		{
           this.tSkillList = this.swapItems(this.tSkillList, this.data, this.data-1) 
           	UserSkill.ins().sendSkillList(this.tSkillList);
		    SubRoles.ins().GetRoleData().setSkillSort(this.tSkillList);
           GameGlobal.MessageCenter.dispatch(MessageDef.SKILL_SORT_CHANGE)//武功排序变化
		}

    }


    private swapItems(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    }


}