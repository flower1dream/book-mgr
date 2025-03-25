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

export const clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

const tsPadStart = (str) => {
    str = String(str);
    return str.padStart(2, '0');
};

export const formatTimestamp = (ts) => {
    const date = new Date(Number(ts));

    const YYYY = date.getFullYear();
    const MM = tsPadStart(date.getMonth() + 1);
    const DD = tsPadStart(date.getDate());

    const hh = tsPadStart(date.getHours());
    const mm = tsPadStart(date.getMinutes());
    const ss = tsPadStart(date.getSeconds());

    return `${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}`;
};