import axios from 'axios';

const PATH = 'https://jsonplaceholder.typicode.com/albums';

export function getAlbums() {
    return axios.get(PATH);
}

export function getAlbumById(id) {
    return axios.get(`${PATH}/${id}`);
}

export function getAlbumsByUser(id) {
    return axios.get(PATH, {
        params: {
            userId: id
        }
    })
}