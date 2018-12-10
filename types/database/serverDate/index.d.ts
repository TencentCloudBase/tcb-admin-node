export declare class ServerDate {
    readonly offset: number;
    constructor({ offset }: {
        offset: any;
    });
    readonly _internalType: import("../utils/symbol").InternalSymbol;
    parse(): {
        $date: {
            offset: number;
        };
    };
}
