import Vue from 'vue';
import Router from 'vue-router';
import PostOverviewView from "./views/post-overview/PostOverviewView";
import PostView from "./views/post/PostView";
import UserView from "./views/user/UserView";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: '/posts'
        },
        {
            path: '/posts',
            name: 'posts',
            component: PostOverviewView
        },
        {
            path: '/posts/:id',
            name: 'post',
            component: PostView
        },
        {
          path: '/users/:id',
          name: 'user',
          component: UserView
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});