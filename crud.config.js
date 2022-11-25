
const fields = ['id', 'username', 'phone', 'gender', 'email', 'address', 'birthday'];
const queryFields = ['username', 'phone'];
const config = {
    entity: 'user',
    needCodeSplitting: true,
    fields: {
        username: {
            prop: String,
            type: 'input',
            label: "用户名",
            editable: false,
        },
        gender: {
            prop: String,
            type: 'radio',
            label: "性别",
            editable: false,
        },
        phone: {
            prop: String,
            type: 'input',
            label: "手机号",
            editable: false,
        },
        email: {
            prop: String,
            type: 'input',
            label: "电子邮箱",
            editable: false,
        },
        address: {
            prop: String,
            type: 'input',
            label: "用户名",
            editable: false,
        },
        birthday: {
            prop: String,
            type: 'datetime',
            label: "生日",
            editable: false,
        }
    },
    hasPagination: false,
    hasQuery: true,
    editable: true,
    queryFields: ['username', 'phone'],
    operations: ['create','update', 'remove', 'detail'],
    dependencies: [
        {
            name: 'store',
            isNeed: true,
            path: '@/stores',
            aliasName: 'userStore',
            actionTypes: {
                isNeed: true,
                path: '@/stores/action-types',
            },

        },
        {
            name: 'router',
            isNeed: true,
        }
    ]
};


module.exports = config;