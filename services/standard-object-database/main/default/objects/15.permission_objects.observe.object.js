/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-08-05 14:17:44
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2024-02-27 15:48:50
 * @Description: 
 */
// const objectql = require("@steedos/objectql");
// const objectName = "permission_objects";
// Meteor.startup(function () {
//     var _change, _remove, inited = false;
//     _change = function (document) {
//         setTimeout(()=>{
//             try {
//                 objectql.getSteedosSchema().broker.call(`permission_fields.resetFieldPermissions`, {
//                     permissionObjectId: document._id
//                 }, {
//                     meta: {
//                         user: {
//                             userId: document.owner,
//                             spaceId: document.space,
//                             company_id: document.company_id,
//                             company_ids: document.company_ids,
//                         }
//                     }
//                 });
//             } catch (error) {
//                 console.error(`resetFieldPermissions`, error)
//             }
//         }, 1000 * 10)
//     };
//     Creator.getCollection(objectName).find({}, {
//         fields: {
//             created: 0,
//             created_by: 0,
//             modified: 0,
//             modified_by: 0
//         }
//     }).observe({
//         added: function (newDocument) {
//             if (newDocument.copy_from) { // 通过复制简档创建的对象权限，不需要重置字段权限
//                 return;
//             }
//             if (inited) {
//                 return _change(newDocument);
//             }
//         },
//         changed: function (newDocument, oldDocument) {
//             return _change(newDocument);
//         },
//         // removed: function (oldDocument) {
//         //     return _change(oldDocument);
//         // }
//     });
//     inited = true;
// });