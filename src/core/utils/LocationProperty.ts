class LocationProperty {
	public constructor() {
	}

	public static urlParam: any;

	public static init() {
		this.urlParam = {};
		// var str = window['paraUrl'];
		var reg = new RegExp("(.*?)=(.*)")
		var str = window.location.search;
		if (str) {
			var whIndex = str.indexOf("?");
			if (whIndex != -1) {
				var param = str.slice(whIndex + 1).split("&");
				for (var i = 0; i < param.length; i++) {
					let match = param[i].match(reg)
					if (match) {
						this.urlParam[match[1]] = match[2]
					}
					// strArr = param[i].split("=");
					// this.urlParam[strArr[0]] = strArr[1];
				}
			}
		}
	};

	/*
     * 获取url参数值，没有返回null
     * 不传递paraUrl参数默认获取当前url
     * */
	public getPara(paraName, paraUrl) {
		if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE)
			return null;
		var url = paraUrl || location.href;
		var whIndex = url.indexOf("?");
		if (whIndex != -1) {
			//let urlPara = "&" + url.split("?")[1];
			var urlPara = "&" + url.slice(whIndex + 1);
			var reg = new RegExp("\&" + paraName + "\=.*?(?:\&|$)");
			var result = reg.exec(urlPara);
			if (result) {
				var value = result[0];
				return value.split("&")[1].split("=")[1];
			}
		}
		return null;
	};
    
    /*
     * 检查url中是否包含某参数
     * 这代码有一个例外就是paraName = "undefined", paraUrl中不含"?"会返回true
     * 相信你不会这么用的 =.=
     * */
	public hasProperty(paraName, paraUrl) {
		var url = paraUrl || location.href;
		var para = "&" + url.split("?")[1]; //加&是为了把&作为参数名开始=作为参数名结束，防止uid=1&id=2此类误判
		return para.indexOf("&" + paraName + "=") != -1;
	};

	private static m_UploadUserData = null

	public static UploadUserData(): boolean {
		if (this.m_UploadUserData == null) {
			this.m_UploadUserData = window["UPLOAD_USER_DATA"] ? true : false
		}
		return this.m_UploadUserData
	}

	public static Reload(): void {
		if (window["ReloadFunc"]) {
			window["ReloadFunc"]();
		} else {
			location.reload();
		}
	}


	public static GetRechargeId(): number {
		return window["__CONFIG__"]["__RECHARGE_ID__"] || 1
	}

	// 不显示首充推荐提示
	public static NotRechargeGood(): boolean {
		try {
			let func = window["__CONFIG__"]["__NOT_RECHARGE_GOOD__"]
			if (func) {
				if (typeof(func) == "function") {
					return func()
				} else {
					console.error("__NOT_RECHARGE_GOOD__ not function !!!")
				}
			}
		} catch (e) {
			console.error(e)	
		}
		return false
	}
}