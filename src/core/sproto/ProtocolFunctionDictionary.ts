namespace Sproto {

	export class MetaInfo {
		public ProtocolType: number;
		public RequestType: string;
		public ResponseType: string;
	}

	export class ProtocolFunctionDictionary {
		private MetaDictionary: {[key: number]: MetaInfo};

		public constructor() {
			this.MetaDictionary = {}
		}

		private _GetMeta(tag: number): MetaInfo {
			let data = this.MetaDictionary[tag];
			if (data == null) {
				data = new MetaInfo();
				data.ProtocolType = tag;
				this.MetaDictionary[tag] = data;
			}
			return data;
		}

		public Set(tag: number, request: string, response: string): void {
			let data = this._GetMeta(tag);
			data.RequestType = request;
			data.ResponseType = response;
		}

		public GenRequest(tag: number, buffer: Uint8Array, offset: number = 0): SprotoTypeBase {
			let data = this.MetaDictionary[tag];
			if (data.RequestType == null) {
				return null
			}
			let des = SprotoCore.GetDeserialize(buffer, offset, buffer.length)
			let obj = ALL_DICT[data.RequestType].de(des)
			SprotoCore.CloseDeserialize(des)
			return obj
		}

		public Get(tag: number): MetaInfo {
			return this.MetaDictionary[tag];
		}
	}
}