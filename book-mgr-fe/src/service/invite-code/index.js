import axios from 'axios';

export const list = (page, size) => {
    return axios.get('http://localhost:3000/invite/list', {
        params: {
            page,
            size,
        },
    });
};

export const add = (count) => {
    return axios.post('http://localhost:3000/invite/add', {
        count,
    });
};

export const remove = (id) => {
    return axios.delete(`http://localhost:3000/invite/${id}`);
};