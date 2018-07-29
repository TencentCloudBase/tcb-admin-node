import { Point } from "./geo/point";
import { CollectionReference } from "./collection";
import { Command } from "./command";
interface DbConfig {
    secretId: string;
    secretKey: string;
    envName?: string;
    proxy?: string;
}
interface GeoTeyp {
    Point: typeof Point;
}
export declare class Db {
    readonly config: DbConfig;
    Geo: GeoTeyp;
    command: Command;
    constructor(config: DbConfig);
    collection(collName: string): CollectionReference;
}
export {};
