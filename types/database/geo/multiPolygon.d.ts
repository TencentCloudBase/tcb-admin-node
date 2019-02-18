import { Polygon } from './polygon';
export declare class MultiPolygon {
    readonly polygons: Polygon[];
    constructor(polygons: Polygon[]);
    parse(key: any): {
        [x: number]: {
            type: string;
            coordinates: number[][][][];
        };
    };
    toJSON(): {
        type: string;
        coordinates: number[][][][];
    };
    static validate(multiPolygon: any): boolean;
    readonly _internalType: import("../utils/symbol").InternalSymbol;
}
