
import * as tcb from '../../../';
import * as Config from "../../config.local";

describe("test/unit/collection.test.ts", () => {
  const collName = "coll-1";
  const app = tcb.init(Config)
  const db = app.database()
  const collection = db.collection(collName);
  const command = db.command;
  const _ = command;

  //   _.gt(32);
  //   _.lte(100);
  it('operator', async () => {
    var a
    a = _.gt(4);
    // a = _.and(_.gt(10), _.lt(32));
    // a = _.or(_.gt(20), _.and(_.gt(10), _.lte(20)));
    // a = _.or([{
    //   a: _.and(_.gt(10), _.lte(20)),
    //   b: _.gt(10)
    // }, {
    //   b: _.gt(20),
    //   a: _.lt(20)
    // }])
    // const result = await collection.where({ a }).get();
    const result = await collection.where({a}).update({ c: { d: _.mul(3) } })
    // const result = await collection.doc('W5-zLLOVH2exDS7d').set({a: 10, b: 1})
    console.log(result)
  })

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
});
