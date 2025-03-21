import axios from 'axios';

export const add = (form) => {
    return axios.post(
        'http://localhost:3000/book/add',
        form,);
};

export const list = (data) => {
    return axios.get(
        'http://localhost:3000/book/list',
        {
            params: data,
        },);
};

export const remove = async (id) => {
    try {
        const response = await axios.delete(
            `http://localhost:3000/book/${id}`,
        );
        return response.data; // 返回接口数据
    } catch (error) {
        console.error('删除书籍失败:', error);
        throw error; // 抛出错误，由调用方处理
    }
};

export const updateCount = (data = {}) => {
    return axios.post(
        `http://localhost:3000/book/update/count`,
        data,
    );
};

export const update = (data = {}) => {
    return axios.post(
        `http://localhost:3000/book/update`,
        data,
    );
};