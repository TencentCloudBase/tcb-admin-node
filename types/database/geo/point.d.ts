export declare class Point {
    readonly latitude: number;
    readonly longitude: number;
    constructor(longitude: number, latitude: number);
    parse(key: any): {
        [x: number]: {
            type: string;
            coordinates: number[];
        };
    };
    toJSON(): object;
    readonly _internalType: import("../../../../../../../Users/jimmyzhang/repo/tcb-admin-node/src/database/utils/symbol").InternalSymbol;
}
