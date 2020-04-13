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
                <h1 class="body-1 text--primary">Could not retrieve post with identifier {{ $route.params.id }}</h1>
            </v-col>

            <!-- Back Button -->
            <v-col cols="12" class="d-flex justify-center">
                <v-btn outlined dark color="primary" @click="navigateBack">Back</v-btn>
            </v-col>
        </v-row>
    </v-container>

    <!-- Content Row -->
    <v-container style="width: 40%" v-else>
        <!-- Post Thumbnail -->
        <v-row class="my-6" align="center" justify="center" align-content="center">
            <v-img :src="`https://picsum.photos/850/400?image=${this.$route.params.id}`"
                   :lazy-src="`https://picsum.photos/850/400?image=103`"
                   contain />
        </v-row>

        <!-- Post Title -->
        <h1 class="display-2 text-xl-center mt-6 mb-12">{{ content.post.title }}</h1>

        <!-- Post Body -->
        <p class="body-1 text-justify my-6" v-for="n in 10" :key="n">
            {{ content.post.body }} {{ content.post.body }} {{ content.post.body }}
        </p>

        <!-- About Author -->
        <v-row dense class="mt-12" align="center" justify="center" align-content="center">
            <post-author :author="content.author"/>
        </v-row>

        <!-- Comments -->
        <post-comment-overview :comments="content.comments"/>

        <!-- Comment Form -->
        <post-comment-form :post-id="content.post.id" @commentCreated="onCommentCreated"/>
    </v-container>
</template>

<script>
    import PostAuthor from "./PostAuthor";
    import PostCommentOverview from "./PostCommentOverview";
    import PostCommentForm from "./PostCommentForm";
    import { getPostById } from "../../services/post-service";
    import { getUserById } from "../../services/user-service";
    import { getCommentsByPost } from "../../services/comment-service";

    export default {
        name: "PostView",
        data() {
            return {
                request: {
                    loading: false,
                    failed: false
                },
                content: {
                    post: null,
                    author: null,
                    comments: []
                }
            }
        },
        components: {
            'post-author': PostAuthor,
            'post-comment-overview': PostCommentOverview,
            'post-comment-form': PostCommentForm
        },
        created() {
            this.getPost();
        },
        methods: {
            getPost() {
                this.request.loading = true;
                this.request.failed = false;

                getPostById(this.$route.params.id)
                    .then(response => {
                        this.content.post = response.data;
                        return getCommentsByPost(this.content.post.id);
                    })
                    .then(response => {
                        this.content.comments = response.data;
                        return getUserById(this.content.post.userId);
                    })
                    .then(response => {
                        this.content.author = response.data;
                    })
                    .catch(reason => {
                        this.request.failed = true;
                        console.error(reason);
                    })
                    .finally(() => this.request.loading = true);
            },
            navigateBack() {
                this.$router.push('/posts');
            },
            onCommentCreated(comment) {
                this.content.comments.push(comment);
            }
        }
    }
</script>

<style scoped>

</style>