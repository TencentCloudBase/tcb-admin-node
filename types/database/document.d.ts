export declare class DocumentReference {
    readonly id: string;
    set(data: Object): Promise<any>;
    update(data: Object): Promise<any>;
    remove(): Promise<any>;
}
