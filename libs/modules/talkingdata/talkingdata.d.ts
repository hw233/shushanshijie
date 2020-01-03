    declare module TDGA {
        var Account: {
            (id: Object): any;
            setAccountName(p_value: string): void;
            setAccountType(p_value: number): void;
            setLevel(p_value: number): void;
            setGender(p_value: number): void;
            setAge(p_value: number): void;
            setGameServer(p_value: string): void;
        };

        var onChargeRequest: {
            (id: Object): any;
        }

        var onChargeSuccess: {
            (id: Object): any;
        }

        var onPageLeave: {
            (): any;
        }
    }