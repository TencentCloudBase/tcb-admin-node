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
}
export declare function RegExpConstructor(param: any): RegExp;
