import axios from 'axios';

export const list = (page, size) => {
    return axios.get('http://localhost:3000/forget-password/list', {
        params: {
            page,
            size,
        }
    });
};

export const add = (account) => {
    return axios.post('http://localhost:3000/forget-password/add', {
            account,
    });
};

export const updateStatus = (id, status) => {
    return axios.post('http://localhost:3000/forget-password/update/status', {
        id,
        status,
    });
};