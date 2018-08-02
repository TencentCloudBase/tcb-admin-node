import { Db } from "../../../src/database/db";
import * as Mock from "./mock";
import * as Config from "../../config";

describe("test/unit/collection.test.ts", async () => {
  const collName = "coll-1";
  const db = new Db({
    secretId: Config.secretId,
    secretKey: Config.secretKey
  });
  const collection = db.collection(collName);
  const command = db.command;
  const _ = command;

  //   _.gt(4);
  //   _.gt(32);
  //   _.lte(100);
  var a = _.and(_.gt(4), _.lt(32));
  collection.where(a).get();
  //   var a = _.or(_.lt(4000), _.and(_.gt(6000), _.lt(8000)));
  //   _.gt(4).and(_.lt(32));
  //   console.log(JSON.stringify(_.logicParam));
  //   _.and(_.gt(4), _.lt(32));
  //   var a = _.lt(4000).or(_.gt(6000).and(_.lt(8000)));
  //   var a = _.gt(6000).and(_.lt(8000));

  // var a = _.or(
  //   {
  //     properties: {
  //       memory: _.gt(8)
  //     }
  //   },
  //   {
  //     properties: {
  //       cpu: 3.2
  //     }
  //   }
  // );

  //   var a = _.or(
  //     {
  //       "properties.memory": 8
  //     },
  //     {
  //       "properties.cpu": 3.2
  //     }
  //   );
  //   var a = _.not(_.lt(4000));
  //   var a = _.mul(2);
  //   var a = _.remove();
  // console.log(JSON.stringify(a.parse("a")));

  //   console.log(JSON.stringify(command.eq(1).and(command.lt(2))));

  it("command null test", () => {
    // assert(command === {});
  });
});
