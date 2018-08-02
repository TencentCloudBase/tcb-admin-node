# v1.0.18

- [changed] 数据库操作的field()方法后需要get()才能取得数据
- [changed] 添加了数据库的serverDate数据类型
- [changed] 增加了数据库的更新(update)方法的数组操作符push、pop、shift和unshift，增加了set指令
- [changed] 数据库逻辑运算符and和or支持传入一个数字，作为逻辑运算的参数


# v1.0.17

- [changed] 对象初始化实例后，init操作可以传入空参数，这样会使用默认环境。如果需要指定环境(env)或者代理(proxy)，则还是通过init方法传入。
- [changed] init时跟小程序SDK保持参数命名一致，envName改为env
- [changed] init时mpAppId不再需要传入
- [changed] 修复了数据库排序的bug
- [changed] 增加了数据库的count方法
- [changed] 修正了文档，修改了文件存储和云函数的返回结果。请参考文档

# v1.0.9

- [changed] 云函数内使用不需要填写secretId和secretKey，云函数重新部署后生效
- [changed] 文件上传添加支持buffer
- [changed] 修复了嵌套对象的bug
