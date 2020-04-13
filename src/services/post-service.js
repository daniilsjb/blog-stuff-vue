import axios from 'axios';

const PATH = 'https://jsonplaceholder.typicode.com/posts';

export function getPosts() {
    return axios.get(PATH);
}

export function getPostById(id) {
    return axios.get(`${PATH}/${id}`);
}

export function getPostsByUser(id) {
    return axios.get(PATH, {
        params: {
            userId: id
        }
    })
}