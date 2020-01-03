/**
 *
 * @Author: liangzhaowei
 * @Date: 2018/6/26 20:15
 * @meaning: 随从命格数据类
 * 
 **/

class DestinyData
{

    item:number;//对应物品
    sort:number;//类型
    type:number;//品质
    level:number;//等级
    id:number;//下级物品ID
    attars: any//属性配置
    buffid:number;//随从主动武功增伤buffID
    skillName:string;//武功名称
    desc:string;//武功描述
    
    promotestar:number;//升级碎片
    resolvestar:number;//分解碎片
    resolvecoin:number;//分解银两




    //自定义字段 _data 基本数据 _ex 额外数据
    public initLocalData(_data)
    {
        if(!_data)return
        
        this.item = _data.item
        this.sort = _data.sort
        this.type = _data.type
        this.level = _data.level
        this.id = _data.id
        this.attars = _data.attars
        this.buffid = _data.buffid
        this.skillName = _data.skillName
        this.desc = _data.desc
    }

    //更新服务端数据
    public updataDataByServer(_data)
    {
        // this.todayNum = _data.todayNum
        // this.star = _data.star 
    }

}   