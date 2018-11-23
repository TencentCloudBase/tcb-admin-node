export declare class RegExp {
    regexp: string;
    options: string;
    constructor({ regexp, options }: {
        regexp: any;
        options: any;
    });
    parse(key: any): {
        [x: number]: {
            $regex: string;
            $options: string;
        };
    };
    readonly _internalType: import("../utils/symbol").InternalSymbol;
}
export declare function RegExpConstructor(param: any): RegExp;
