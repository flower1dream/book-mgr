import axios from 'axios';

export const list = () => {
    return axios.get('http://localhost:3000/character/list', {});
};