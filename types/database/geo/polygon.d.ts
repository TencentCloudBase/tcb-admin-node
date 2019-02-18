import { LineString } from "./lineString";
export declare class Polygon {
    readonly lines: LineString[];
    constructor(lines: LineString[]);
    parse(key: any): {
        [x: number]: {
            type: string;
            coordinates: number[][][];
        };
    };
    toJSON(): {
        type: string;
        coordinates: number[][][];
    };
    static validate(polygon: any): boolean;
    static isCloseLineString(lineString: any): boolean;
    readonly _internalType: import("../utils/symbol").InternalSymbol;
}
