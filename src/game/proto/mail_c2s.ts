// Generated by sprotodump. DO NOT EDIT!

namespace Sproto { 
	export class cs_mail_get_content_request {
		public handle: number; // tag 0
	}

	function _decode_cs_mail_get_content_request(d: SprotoTypeDeserialize) {
		let o = new cs_mail_get_content_request;
		let t = -1;
		while (-1 != (t = d.rt())) {
			switch (t) {
			case 0:
				o.handle = d.ri ();
				break;
			default:
				d.nod ();
				break;
			}
		}
		return o
	}

	function _encode_cs_mail_get_content_request(self: cs_mail_get_content_request, st: Sproto.SprotoStream) {
		let se = SprotoCore.GetSerialize(st, 1);

		if (self.handle != undefined) {
			se.wi (self.handle, 0);
		}

		return SprotoCore.CloseSerialize(se);
	}

	ALL_DICT["cs_mail_get_content_request"] = {en: _encode_cs_mail_get_content_request, de: _decode_cs_mail_get_content_request}
	export class cs_mail_get_reward_request {
		public handle: number[]; // tag 0
	}

	function _decode_cs_mail_get_reward_request(d: SprotoTypeDeserialize) {
		let o = new cs_mail_get_reward_request;
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

	function _encode_cs_mail_get_reward_request(self: cs_mail_get_reward_request, st: Sproto.SprotoStream) {
		let se = SprotoCore.GetSerialize(st, 1);

		if (self.handle != undefined) {
			se.wia (self.handle, 0);
		}

		return SprotoCore.CloseSerialize(se);
	}

	ALL_DICT["cs_mail_get_reward_request"] = {en: _encode_cs_mail_get_reward_request, de: _decode_cs_mail_get_reward_request}
}

