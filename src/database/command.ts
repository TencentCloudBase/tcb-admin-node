/**
 * 指令
 *
 */
export class Command {

  public logicParam: object = {};
  private placeholder = "{{{AAA}}}";

  constructor(logicParam?: object) {
    if (logicParam) {
      this.logicParam = logicParam;
    }
  }

  eq(target: any) {
    return new Command(this.baseOperate("$eq", target));
  }

  neq(target: any) {
    return new Command(this.baseOperate("$ne", target));
  }

  gt(target: any) {
    return new Command(this.baseOperate("$gt", target));
  }

  gte(target: any) {
    return new Command(this.baseOperate("$gte", target));
  }

  lt(target: any) {
    return new Command(this.baseOperate("$lt", target));
  }

  lte(target: any) {
    return new Command(this.baseOperate("$lte", target));
  }

  in(target: any[]) {
    return new Command(this.baseOperate("$in", target));
  }

  nin(target: any[]) {
    return new Command(this.baseOperate("$nin", target));
  }

  mul(target: number) {
    return new Command({ $mul: { [this.placeholder]: target } });
  }

  remove() {
    return new Command({ $unset: { [this.placeholder]: "" } });
  }

  inc(target: number) {
    return new Command({ $inc: { [this.placeholder]: target } });
  }

  private baseOperate(operator: string, target: any): object {
    // for (let param of this.logicParam) {
    //   if (
    //     param.hasOwnProperty(this.placeholder) &&
    //     param[this.placeholder][operator]
    //   ) {
    //     param[this.placeholder][operator] = target;
    //     return;
    //   }
    // }
    return {
      [this.placeholder]: { [operator]: target }
    };
  }

  and(...targets: any[]) {
    return new Command(this.connectOperate("$and", targets));
  }

  or(...targets: any[]) {
    return new Command(this.connectOperate("$or", targets));
  }

  // not(target: any) {
  //   return new Command(this.connectOperate("$not", target));
  // }

  private connectOperate(operator: string, targets: any[]) {
    // console.log(this.logicParam, target.logicParam, targets);
    let logicParams: object[] = [];
    if (Object.keys(this.logicParam).length > 0) {
      logicParams.push(this.logicParam);
    }

    for (let target of targets) {
      if (target instanceof Command) {
        if (Object.keys(target.logicParam).length === 0) {
          continue;
        }
        logicParams.push(target.logicParam);
      } else {
        const tmp = this.concatKeys(target);
        console.log(tmp);
        logicParams.push({
          [tmp.keys]:
            tmp.value instanceof Command ? tmp.value.logicParam : tmp.value
        });
      }
    }

    this.logicParam = [];
    // console.log(logicParam);
    return {
      [operator]: logicParams
    };
  }

  parse(key?: string): object {
    return JSON.parse(
      JSON.stringify(this.logicParam).replace(/{{{AAA}}}/g, key)
    );
  }

  public toString = (): object => {
    return this.logicParam[0];
  };

  public concatKeys(obj: object) {
    let keys = "",
      value: any;

    for (let key in obj) {
      // console.log(key, obj[key]);
      if (
        typeof obj[key] === "object" &&
        obj[key] instanceof Command === false
      ) {
        let tmp = this.concatKeys(obj[key]);
        keys = key + ":" + tmp.keys;
        value = tmp.value;
        // console.log(keys);
      } else {
        keys = key;
        value = obj[key];
        // console.log({ keys, value });
      }
      break;
    }
    return { keys, value };
  }
}
