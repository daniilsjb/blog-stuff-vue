import Vue from 'vue';
import Router from 'vue-router';
import PostOverview from "./views/post-overview/PostOverviewView";
import DetailedPostOverview from "./views/post/PostView";
import DetailedUserOverview from "./views/user/UserView";

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
            component: PostOverview
        },
        {
            path: '/posts/:id',
            name: 'post',
            component: DetailedPostOverview
        },
        {
          path: '/users/:id',
          name: 'user',
          component: DetailedUserOverview
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});