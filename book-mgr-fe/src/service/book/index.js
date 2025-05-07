import {
    del,
    post,
    get
  } from '@/helpers/request';

export const add = (form) => {
    return post(
        '/book/add',
        form,);
};

export const list = (data) => {
    return get(
        '/book/list',
       data,);
};

export const remove = async (id) => {
    try {
        const response = await del(`/book/${id}`);
        return response.data; // 返回接口数据
    } catch (error) {
        console.error('删除书籍失败:', error);
        throw error; // 抛出错误，由调用方处理
    }
};

export const updateCount = (data = {}) => {
    return post(
        `/book/update/count`,
        data,
    );
};

export const update = (data = {}) => {
    return post(
        `/book/update`,
        data,
    );
};

export const detail = (id) => {
    return get(
        `/book/detail/${id}`,
    );
};

export const addMany = (key) => {
    return post('/book/addMany', {
      key, // 注意这里直接用 key，而不是 Key，注意大小写！！！
    });
  };
  