// Generated by sprotodump. DO NOT EDIT!

namespace Sproto { 
	export class item_count_base {
		public id: number; // tag 0
		public count: number; // tag 1
	}

	function _decode_item_count_base(d: SprotoTypeDeserialize) {
		let o = new item_count_base;
		let t = -1;
		while (-1 != (t = d.rt())) {
			switch (t) {
			case 0:
				o.id = d.ri ();
				break;
			case 1:
				o.count = d.ri ();
				break;
			default:
				d.nod ();
				break;
			}
		}
		return o
	}

	function _encode_item_count_base(self: item_count_base, st: Sproto.SprotoStream) {
		let se = SprotoCore.GetSerialize(st, 2);

		if (self.id != undefined) {
			se.wi (self.id, 0);
		}

		if (self.count != undefined) {
			se.wi (self.count, 1);
		}

		return SprotoCore.CloseSerialize(se);
	}

	ALL_DICT["item_count_base"] = {en: _encode_item_count_base, de: _decode_item_count_base}
	export class sc_bag_deal_add_item_request {
		public type: number; // tag 0
		public data: item_data; // tag 1
		public showTip: number; // tag 2
	}

	function _decode_sc_bag_deal_add_item_request(d: SprotoTypeDeserialize) {
		let o = new sc_bag_deal_add_item_request;
		let t = -1;
		while (-1 != (t = d.rt())) {
			switch (t) {
			case 0:
				o.type = d.ri ();
				break;
			case 1:
				o.data = d.ro("item_data");
				break;
			case 2:
				o.showTip = d.ri ();
				break;
			default:
				d.nod ();
				break;
			}
		}
		return o
	}

	function _encode_sc_bag_deal_add_item_request(self: sc_bag_deal_add_item_request, st: Sproto.SprotoStream) {
		let se = SprotoCore.GetSerialize(st, 3);

		if (self.type != undefined) {
			se.wi (self.type, 0);
		}

		if (self.data != undefined) {
			se.wo ("item_data", self.data, 1);
		}

		if (self.showTip != undefined) {
			se.wi (self.showTip, 2);
		}

		return SprotoCore.CloseSerialize(se);
	}

	ALL_DICT["sc_bag_deal_add_item_request"] = {en: _encode_sc_bag_deal_add_item_request, de: _decode_sc_bag_deal_add_item_request}
	export class sc_bag_deal_delete_item_request {
		public type: number; // tag 0
		public handle: number; // tag 1
	}

	function _decode_sc_bag_deal_delete_item_request(d: SprotoTypeDeserialize) {
		let o = new sc_bag_deal_delete_item_request;
		let t = -1;
		while (-1 != (t = d.rt())) {
			switch (t) {
			case 0:
				o.type = d.ri ();
				break;
			case 1:
				o.handle = d.ri ();
				break;
			default:
				d.nod ();
				break;
			}
		}
		return o
	}

	function _encode_sc_bag_deal_delete_item_request(self: sc_bag_deal_delete_item_request, st: Sproto.SprotoStream) {
		let se = SprotoCore.GetSerialize(st, 2);

		if (self.type != undefined) {
			se.wi (self.type, 0);
		}

		if (self.handle != undefined) {
			se.wi (self.handle, 1);
		}

		return SprotoCore.CloseSerialize(se);
	}

	ALL_DICT["sc_bag_deal_delete_item_request"] = {en: _encode_sc_bag_deal_delete_item_request, de: _decode_sc_bag_deal_delete_item_request}
	export class sc_bag_deal_smelt_result_request {
		public state: number; // tag 0
		public goldCount: number; // tag 1
		public len: number; // tag 2
	}

	function _decode_sc_bag_deal_smelt_result_request(d: SprotoTypeDeserialize) {
		let o = new sc_bag_deal_smelt_result_request;
		let t = -1;
		while (-1 != (t = d.rt())) {
			switch (t) {
			case 0:
				o.state = d.ri ();
				break;
			case 1:
				o.goldCount = d.ri ();
				break;
			case 2:
				o.len = d.ri ();
				break;
			default:
				d.nod ();
				break;
			}
		}
		return o
	}

	function _encode_sc_bag_deal_smelt_result_request(self: sc_bag_deal_smelt_result_request, st: Sproto.SprotoStream) {
		let se = SprotoCore.GetSerialize(st, 3);

		if (self.state != undefined) {
			se.wi (self.state, 0);
		}

		if (self.goldCount != undefined) {
			se.wi (self.goldCount, 1);
		}

		if (self.len != undefined) {
			se.wi (self.len, 2);
		}

		return SprotoCore.CloseSerialize(se);
	}

	ALL_DICT["sc_bag_deal_smelt_result_request"] = {en: _encode_sc_bag_deal_smelt_result_request, de: _decode_sc_bag_deal_smelt_result_request}
	export class sc_bag_deal_valumn_add_request {
		public bagNum: number; // tag 0
	}

	function _decode_sc_bag_deal_valumn_add_request(d: SprotoTypeDeserialize) {
		let o = new sc_bag_deal_valumn_add_request;
		let t = -1;
		while (-1 != (t = d.rt())) {
			switch (t) {
			case 0:
				o.bagNum = d.ri ();
				break;
			default:
				d.nod ();
				break;
			}
		}
		return o
	}

	function _encode_sc_bag_deal_valumn_add_request(self: sc_bag_deal_valumn_add_request, st: Sproto.SprotoStream) {
		let se = SprotoCore.GetSerialize(st, 1);

		if (self.bagNum != undefined) {
			se.wi (self.bagNum, 0);
		}

		return SprotoCore.CloseSerialize(se);
	}

	ALL_DICT["sc_bag_deal_valumn_add_request"] = {en: _encode_sc_bag_deal_valumn_add_request, de: _decode_sc_bag_deal_valumn_add_request}
	export class sc_bag_get_treasure_equip_request {
		public handle: number[]; // tag 0
	}

	function _decode_sc_bag_get_treasure_equip_request(d: SprotoTypeDeserialize) {
		let o = new sc_bag_get_treasure_equip_request;
		let t = -1;
		while (-1 != (t = d.rt())) {
			switch (t) {
			case 0:
				o.handle = d.ria ();
				break;
			default:
				d.nod ();
				break;
			}
		}
		return o
	}

	function _encode_sc_bag_get_treasure_equip_request(self: sc_bag_get_treasure_equip_request, st: Sproto.SprotoStream) {
		let se = SprotoCore.GetSerialize(st, 1);

		if (self.handle != undefined) {
			se.wia (self.handle, 0);
		}

		return SprotoCore.CloseSerialize(se);
	}

	ALL_DICT["sc_bag_get_treasure_equip_request"] = {en: _encode_sc_bag_get_treasure_equip_request, de: _decode_sc_bag_get_treasure_equip_request}
	export class sc_bag_init_data_request {
		public code: number; // tag 0
		public type: number; // tag 1
		public datas: item_data[]; // tag 2
	}

	function _decode_sc_bag_init_data_request(d: SprotoTypeDeserialize) {
		let o = new sc_bag_init_data_request;
		let t = -1;
		while (-1 != (t = d.rt())) {
			switch (t) {
			case 0:
				o.code = d.ri ();
				break;
			case 1:
				o.type = d.ri ();
				break;
			case 2:
				o.datas = d.roa("item_data");
				break;
			default:
				d.nod ();
				break;
			}
		}
		return o
	}

	function _encode_sc_bag_init_data_request(self: sc_bag_init_data_request, st: Sproto.SprotoStream) {
		let se = SprotoCore.GetSerialize(st, 3);

		if (self.code != undefined) {
			se.wi (self.code, 0);
		}

		if (self.type != undefined) {
			se.wi (self.type, 1);
		}

		if (self.datas != undefined) {
			se.woa ("item_data", self.datas, 2);
		}

		return SprotoCore.CloseSerialize(se);
	}

	ALL_DICT["sc_bag_init_data_request"] = {en: _encode_sc_bag_init_data_request, de: _decode_sc_bag_init_data_request}
	export class sc_bag_update_item_data_request {
		public type: number; // tag 0
		public handle: number; // tag 1
		public num: number; // tag 2
		public showTip: number; // tag 3
	}

	function _decode_sc_bag_update_item_data_request(d: SprotoTypeDeserialize) {
		let o = new sc_bag_update_item_data_request;
		let t = -1;
		while (-1 != (t = d.rt())) {
			switch (t) {
			case 0:
				o.type = d.ri ();
				break;
			case 1:
				o.handle = d.ri ();
				break;
			case 2:
				o.num = d.ri ();
				break;
			case 3:
				o.showTip = d.ri ();
				break;
			default:
				d.nod ();
				break;
			}
		}
		return o
	}

	function _encode_sc_bag_update_item_data_request(self: sc_bag_update_item_data_request, st: Sproto.SprotoStream) {
		let se = SprotoCore.GetSerialize(st, 4);

		if (self.type != undefined) {
			se.wi (self.type, 0);
		}

		if (self.handle != undefined) {
			se.wi (self.handle, 1);
		}

		if (self.num != undefined) {
			se.wi (self.num, 2);
		}

		if (self.showTip != undefined) {
			se.wi (self.showTip, 3);
		}

		return SprotoCore.CloseSerialize(se);
	}

	ALL_DICT["sc_bag_update_item_data_request"] = {en: _encode_sc_bag_update_item_data_request, de: _decode_sc_bag_update_item_data_request}
	export class sc_bag_user_item_back_request {
		public tipIndex: number; // tag 0
	}

	function _decode_sc_bag_user_item_back_request(d: SprotoTypeDeserialize) {
		let o = new sc_bag_user_item_back_request;
		let t = -1;
		while (-1 != (t = d.rt())) {
			switch (t) {
			case 0:
				o.tipIndex = d.ri ();
				break;
			default:
				d.nod ();
				break;
			}
		}
		return o
	}

	function _encode_sc_bag_user_item_back_request(self: sc_bag_user_item_back_request, st: Sproto.SprotoStream) {
		let se = SprotoCore.GetSerialize(st, 1);

		if (self.tipIndex != undefined) {
			se.wi (self.tipIndex, 0);
		}

		return SprotoCore.CloseSerialize(se);
	}

	ALL_DICT["sc_bag_user_item_back_request"] = {en: _encode_sc_bag_user_item_back_request, de: _decode_sc_bag_user_item_back_request}
}

