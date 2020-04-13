<template>
    <!-- Empty Comments State -->
    <div v-if="emptyComments">
        <v-row dense align="center" justify="center" align-content="center">
            <h1 class="body-1 mt-12 text--primary font-italic">
                Comments are empty
            </h1>
        </v-row>
    </div>

    <!-- Non-Empty Comments State -->
    <div v-else>
        <!-- Comments Header -->
        <h1 class="title mt-12 mb-4">{{ commentCount }} Comments:</h1>

        <!-- Comments -->
        <v-row dense align="center" justify="center" align-content="center">
            <v-col v-for="(comment, i) in comments" :key="i" cols="12" class="d-flex justify-center">
                <post-comment :id="comment.id"
                              :name="comment.name"
                              :email="comment.email"
                              :body="comment.body"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import PostComment from "./PostComment";

    export default {
        name: "PostCommentOverview",
        props: ['comments'],
        components: {
            'post-comment': PostComment
        },
        computed: {
            emptyComments() {
                return this.comments === undefined || this.comments.length === 0;
            },
            commentCount() {
                return (this.comments === undefined) ? 0 : this.comments.length;
            }
        }
    }
</script>

<style scoped>

</style>