const cloud = require("@cloudbase/node-sdk");
// 云函数入口文件
exports.main = async (event, context) => {
    const app = cloud.init({
        env: cloud.SYMBOL_CURRENT_ENV,
    });
    const db = app.database()
    const _ = db.command


    return await db.collection('blog').where({
       title: new RegExp(event.title)
    }).orderBy('createTime', 'desc').skip(event.skip).limit(6).get()
};