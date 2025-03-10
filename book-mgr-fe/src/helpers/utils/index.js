import { message } from 'ant-design-vue';

export const result = (response, authShowErrorMsg = true) => {
    const { data } = response;

    if (data.code === 0 && authShowErrorMsg) {
        message.error(data.msg);
    }

    return {
        success(cb) {
            if (data.code !== 0 && typeof cb === 'function') {
                cb(data, response);
            }
            return this; // 支持链式调用
        },
        fail(cb) {
            if (data.code === 0 && typeof cb === 'function') {
                cb(data, response);
            }
            return this; // 支持链式调用
        },
        finally(cb) {
            if (typeof cb === 'function') {
                cb(data, response);
            }
            return this; // 支持链式调用
        },
    };
};