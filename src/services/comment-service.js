import axios from 'axios';

const PATH = 'https://jsonplaceholder.typicode.com/comments';

export function getComments() {
    return axios.get(PATH);
}

export function getCommentById(id) {
    return axios.get(`${PATH}/${id}`);
}

export function getCommentsByPost(id) {
    return axios.get(PATH, {
        params: {
            postId: id
        }
    })
}

export function postComment(payload) {
    return axios.post(PATH, payload);
}