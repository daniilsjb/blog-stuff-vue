<template>
    <!-- Loading State -->
    <v-container v-if="request.loading" fill-height>
        <v-row align="center" justify="center" align-content="center">
            <!-- Progress Spinner -->
            <v-col cols="12" class="d-flex justify-center">
                <v-progress-circular indeterminate color="primary"/>
            </v-col>
        </v-row>
    </v-container>

    <!-- Error State -->
    <v-container v-else-if="request.failed" fill-height>
        <v-row align="center" justify="center" align-content="center">
            <!-- Error Message -->
            <v-col cols="12" class="d-flex justify-center">
                <h1 class="subtitle-1 text--secondary">Could not retrieve posts</h1>
            </v-col>
        </v-row>
    </v-container>

    <!-- Content Row -->
    <v-container v-else fill-height>
        <v-row dense align="center" justify="center" align-content="center">
            <v-col v-for="(post, i) in content.posts" :key="i" cols="12" class="d-flex justify-center">
                <post-overview :id="post.id"
                      :title="post.title"
                      :body="post.body"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import PostOverview from "../../post-overview/PostOverview";
    import { getPostsByUser } from "../../../services/post-service";

    export default {
        name: "UserPostOverview",
        components: {
            'post-overview': PostOverview
        },
        data() {
            return {
                request: {
                    loading: false,
                    errored: false
                },
                content: {
                    posts: []
                }
            }
        },
        created() {
            this.fetchPosts();
        },
        methods: {
            fetchPosts() {
                this.request.loading = true;
                this.request.failed = false;

                getPostsByUser()
                    .then(response => {
                        this.content.posts = response.data;
                        console.log(response);
                    })
                    .catch(reason => {
                        this.request.failed = true;
                        console.log(reason);
                    })
                    .finally(() => this.request.loading = false);
            }
        }
    }
</script>

<style scoped>

</style>