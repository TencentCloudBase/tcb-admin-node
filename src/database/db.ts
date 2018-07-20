import { Point } from "./geo/point";
import * as Geo from "./geo";
import { CollectionReference } from "./collection";
import { Command } from "./command";

/**
 * 数据库初始化的配置
 */
interface DbConfig {
  secretId: string;
  secretKey: string;
  mpAppId: string;
  envName?: string;
  /**
   * @internal
   * @todo
   * @description 后续版本支持
   */
  dbname?: string;
  proxy?: string;
}

/**
 * 地理位置类型
 */
interface GeoTeyp {
  Point: typeof Point;
}

/**
 * 数据库模块
 *
 * @author haroldhu
 */
export class Db {
  /**
   * 配置信息
   *
   * @param secretId
   * @param secretKey
   * @param env
   * @param dbname
   */
  readonly config: DbConfig = {
    secretId: "",
    secretKey: "",
    envName: "",
    mpAppId: "",
    dbname: "default",
    proxy: ""
  };

  /**
   * Geo 类型
   */
  Geo: GeoTeyp;

  /**
   * 逻辑操作的命令
   */
  command: Command;

  /**
   * 初始化
   *
   * 默认是 `default` 数据库，为今后扩展使用
   *
   * @param config
   */
  constructor(config: DbConfig) {
    this.config = Object.assign({}, this.config, config);
    this.Geo = Geo;
    this.command = new Command();
  }

  /**
   * 获取集合的引用
   *
   * @param collName - 集合名称
   */
  collection(collName: string): CollectionReference {
    if (!collName) {
      throw new Error("Collection name is required");
    }
    return new CollectionReference(this, collName);
  }

  // /**
  //  * 获取全部集合列表
  //  *
  //  * @internal
  //  * @todo
  //  * @description 后续版本规划
  //  */
  // private getCollections(): void {

  // }
}
