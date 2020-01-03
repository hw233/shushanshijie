class ResVersionManager extends BaseClass {

    private resVersionData: {[key: string]: number}
    private tempDict: {[key: string]: number} = {}

    private __base_ver__: number = 1

	public constructor() {
		super();
        this.resVersionData = window["verData"]
        this.__base_ver__ = this.resVersionData["__base_ver__"] || 1
	}

	public static ins() {
        return super.ins.call(this);
    }

    private _GetVer(fullName: string): number {
        if (fullName == null || fullName.length == 0 || this.resVersionData == null) {
            return 1
        }
        let code = this.tempDict[fullName]
        if (code == null) {
            let array = fullName.split("/")
            let dict: any = this.resVersionData
            for (let value of array) {
                dict = dict[value]
                if (dict == null) {
                    break
                }
            }
            if (dict == null || typeof(dict) != "number") {
                code = this.__base_ver__
            } else {
                code = dict
            }
            this.tempDict[fullName] = code
        }
        return code
    }
}