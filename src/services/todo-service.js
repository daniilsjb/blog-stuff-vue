import axios from 'axios';

const PATH = 'https://jsonplaceholder.typicode.com/todos';

export function getTodos() {
    return axios.get(PATH);
}

export function getTodoById(id) {
    return axios.get(`${PATH}/${id}`);
}

export function getTodosByUser(id) {
    return axios.get(PATH, {
        params: {
            userId: id
        }
    })
}