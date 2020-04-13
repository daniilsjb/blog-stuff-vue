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
                <h1 class="body-1 text--primary">Could not retrieve posts</h1>
            </v-col>

            <!-- Retry Button -->
            <v-col cols="12" class="d-flex justify-center">
                <v-btn outlined dark color="primary" @click="fetchPosts">Try Again</v-btn>
            </v-col>
        </v-row>
    </v-container>

    <!-- Content Row -->
    <v-container v-else fill-height class="align-start">
        <v-row align="center" justify="center" align-content="center">
            <v-col v-for="(post, i) in content.page" :key="i" cols="12" class="d-flex justify-center">
                <post-overview :id="post.id"
                               :title="post.title"
                               :body="post.body"
                />
            </v-col>
        </v-row>

        <!-- Page Selection -->
        <v-pagination v-model="pagination.offset" :length="totalPages" @input="onNewPage"/>
    </v-container>
</template>

<script>
    import PostOverview from "./PostOverview";
    import { getPosts } from "../../services/post-service";

    export default {
        name: "PostOverviewView",
        components: {
            'post-overview': PostOverview
        },
        data() {
            return {
                request: {
                    loading: false,
                    failed: false
                },
                content: {
                    posts: [],
                    page: []
                },
                pagination: {
                    offset: 1,
                    limit: 10
                }
            }
        },
        computed: {
            totalPages() {
                return Math.ceil(this.content.posts.length / this.pagination.limit);
            }
        },
        created() {
            this.fetchPosts();
        },
        methods: {
            fetchPosts() {
                this.request.loading = true;
                this.request.failed = false;

                getPosts()
                    .then(response => {
                        this.content.posts = response.data;
                        this.onNewPage();
                    })
                    .catch(reason => {
                        this.request.failed = true;
                        console.error(reason);
                    })
                    .finally(() => this.request.loading = false);
            },
            onNewPage() {
                let start = (this.pagination.offset - 1) * this.pagination.limit;
                let end = start + this.pagination.limit;
                this.content.page = this.content.posts.slice(start, end);
            }
        }
    }
</script>

<style scoped>

</style>