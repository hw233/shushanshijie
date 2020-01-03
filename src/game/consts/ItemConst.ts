// 道具类型
enum ItemType {
	EQUIP = 0, 		// 装备
	MATERIAL = 1, 	// 材料
	RIDE = 2,		// 坐骑装备
	WING = 3, 		// 翅膀装备
	XIAN_FZ = 4,	// 红颜阵法装备
	XIAN_XW = 5,	// 红颜绝技装备
	PET_TL = 6,		// 伙伴心法装备
	PET_SH = 7,		// 伙伴暗器装备
	TIANXIAN = 8,	// 精灵装备
	SHENGB = 9,		// 神兵装备
	TIANNV = 10,	// 童姥装备
	XIANQ = 11,		// 仙器装备
	HUA = 12,		// 香囊装备
	LINGQI = 13,	// 功法装备

	DESTINY = 14,	// 命格
}

class ItemConst {

	public static OPEN_EQUIPS_TIPS = {
		[ItemType.EQUIP]: true,
		[ItemType.RIDE]: true,
		[ItemType.WING]: true,
		[ItemType.XIAN_FZ]: true,
		[ItemType.XIAN_XW]: true,
		[ItemType.PET_TL]: true,
		[ItemType.PET_SH]: true,
		[ItemType.TIANXIAN]: true,
		[ItemType.SHENGB]: true,
		[ItemType.TIANNV]: true,
		[ItemType.XIANQ]: true,
		[ItemType.HUA]: true,
		[ItemType.LINGQI]: true,
	}

	/** 显示阶数和附加值的物品类型 */
	public static ITEM_SHOW_RANK_TYPE = {
		[ItemType.RIDE]: true,
		[ItemType.WING]: true,
		[ItemType.XIAN_FZ]: true,
		[ItemType.XIAN_XW]: true,
		[ItemType.PET_TL]: true,
		[ItemType.PET_SH]: true,
		[ItemType.TIANXIAN]: true,
		[ItemType.SHENGB]: true,
		[ItemType.HUA]: true,
		[ItemType.LINGQI]: true,
	}

	public static TYPE_NAME = {
		[ItemType.RIDE]: "坐骑",
		[ItemType.WING]: "翅膀",
		[ItemType.XIAN_FZ]: "阵法",
		[ItemType.XIAN_XW]: "绝技",
		[ItemType.PET_TL]: "心法",
		[ItemType.PET_SH]: "暗器",
		[ItemType.TIANXIAN]: "精灵",
		[ItemType.SHENGB]: "神兵",
		[ItemType.TIANNV]: "童姥",
		[ItemType.HUA]: "香囊",
		[ItemType.LINGQI]: "功法",
	}

}

enum ItemUseType {
	TYPE00 = 0,
	TYPE01 = 1,
	TYPE02 = 2,
	TYPE03 = 3,
	TYPE04 = 4,
}
