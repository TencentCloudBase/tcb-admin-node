import { Request } from "./request";
import { Db } from "./db";
import { Util } from "./util";

/**
 * 文档模块
 *
 * @author haroldhu
 */
export class DocumentReference {

  /**
   * 数据库引用
   *
   * @internal
   */
  private _db: Db;

  /**
   * 集合名称
   *
   * @internal
   */
  private _coll: string;

  /**
   * 文档ID
   */
  readonly id: string;

  /**
   * Request 实例
   *
   * @internal
   */
  private request: Request;

  /**
   * 初始化
   *
   * @internal
   *
   * @param db    - 数据库的引用
   * @param coll  - 集合名称
   * @param docID - 文档ID
   */
  constructor(db: Db, coll: string, docID: string) {
    this._db = db;
    this._coll = coll;
    this.id = docID;
    this.request = new Request(this._db);
  }

  /**
   * 创建一篇文档
   *
   * @param data - 文档数据
   * @internal
   */
  create(data): Promise<any> {
    let params = {
      collectionName: this._coll,
      data: this.processData(data),
    }

    if (this.id) {
      params['_id'] = this.id;
    }

    return new Promise<any>(resolve => {
      this.request.send("addDocument", params).then(res => {
        if (res.code) {
          resolve(res);
        }
        resolve({
          id: res.data._id,
          requestId: res.requestId
        });
      });
    });
  }

  /**
   * 创建或添加数据
   *
   * 如果文档ID不存在，则创建该文档并插入数据，根据返回数据的 upserted_id 判断
   * 添加数据的话，根据返回数据的 updated 判断影响的行数
   *
   * @param data - 文档数据
   */
  set(data: Object): Promise<any> {
    let param = {
      collectionName: this._coll,
      data: this.processData(data),
      multi: false,
      merge: false,
      upsert: true,
    };

    if (this.id) {
      param['query'] = { _id: this.id };
    }

    return new Promise<any>(resolve => {
      this.request.send("updateDocument", param).then(res => {
        if (res.code) {
          resolve(res);
        } else {
          resolve({
            updated: res.data.updated,
            upsertedId: res.data.upserted_id,
            requestId: res.requestId
          });
        }
      });
    });
  }

  /**
   * 更新数据
   *
   * @param data - 文档数据
   */
  update(data: Object) {
    const query = { _id: this.id };
    const param = {
      collectionName: this._coll,
      data: this.processData(data),
      query: query,
      multi: false,
      merge: false,
      upsert: false,
    };
    return new Promise<any>(resolve => {
      this.request.send("updateDocument", param).then(res => {
        if (res.code) {
          resolve(res);
        } else {
          resolve({
            updated: res.data.updated,
            upsertedId: res.data.upserted_id,
            requestId: res.requestId
          });
        }
      });
    });
  }

  /**
   * 删除文档
   */
  remove(): Promise<any> {
    const query = { _id: this.id };
    const param = {
      collectionName: this._coll,
      query: query,
      multi: false
    };
    return new Promise<any>(resolve => {
      this.request.send("deleteDocument", param).then(res => {
        if (res.code) {
          resolve(res);
        } else {
          resolve({
            deleted: res.data.deleted,
            requestId: res.requestId
          });
        }
      });
    });
  }

  /**
   * 新增和更新文档时预处理文档数据
   *
   * @param data
   * @internal
   */
  private processData(data) {
    const params = Util.encodeDocumentDataForReq(data);
    return params;
  }

}
