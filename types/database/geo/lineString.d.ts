import { Point } from './point';
export declare class LineString {
    readonly points: Point[];
    constructor(points: Point[]);
    parse(key: any): {
        [x: number]: {
            type: string;
            coordinates: number[][];
        };
    };
    toJSON(): {
        type: string;
        coordinates: number[][];
    };
    static validate(lineString: any): boolean;
    readonly _internalType: import("../utils/symbol").InternalSymbol;
}
