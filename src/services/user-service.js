import axios from 'axios';

const PATH = 'https://jsonplaceholder.typicode.com/users';

export function getUsers() {
    return axios.get(PATH);
}

export function getUserById(id) {
    return axios.get(`${PATH}/${id}`);
}