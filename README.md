# :dragon_face: LeanLab

### 搭建自己的LeanLab， 你的项目不再需要写后端代码。 参考自[LeanCloud](https://leancloud.cn/)

### 需求阶段 实现数据的增删改查 和 基本的UI界面。

TODO
***

1. 使用LeanCloud了解细致产品需求
2. 设计数据表


- 权限 read write
- appId, appKey
- createAt, updateAt, ACL, objectId

- 用户类型 对应 ACL

```
{
  "testabc": "abc123",
  "ACL": {
    "master": {
      "read": true,
      "write": true
    },
    "user": {
      "read": true,
      "write": false
    }
  },
  "objectId": "583312495c497d006b28df88",
  "createdAt": "2016-11-21T15:27:05.081Z",
  "updatedAt": "2016-11-21T15:27:05.081Z"
}
```

3. Coding 实现系统
4. SDK
4. UI交互界面

5. run
```
nodemon ./server.js
```





#TODO
1. Login -done
2. API -ing
3. SDK -ing
4. Collection -done
5. UI -ing
6. ACL -wait
7. Auth -ing




