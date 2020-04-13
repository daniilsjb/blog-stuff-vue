<template>
    <v-card class="mt-6" outlined :loading="request.loading">
        <!-- Form Header -->
        <v-card-title class="title">Leave a Comment!</v-card-title>

        <v-card-text>
            <!-- Input Form -->
            <v-form ref="form" v-model="valid">
                <v-text-field v-model="email.body" label="Email" :rules="email.rules" required/>
                <v-text-field v-model="name.body" label="Comment Name" :rules="name.rules" :counter="name.limit" required/>
                <v-textarea v-model="body.body" label="Comment Body" :rules="body.rules" :counter="body.limit" auto-grow required/>
            </v-form>
        </v-card-text>

        <!-- Submit Button -->
        <v-card-actions class="justify-center">
            <v-btn outlined class="mb-4" color="primary" :disabled="!maySubmit" @click="submitComment">Submit</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import { postComment } from "../../services/comment-service";

    export default {
        name: "PostCommentForm",
        props: ['postId'],
        data() {
            return {
                request: {
                    loading: false,
                    failed: false
                },
                valid: false,
                email: {
                    body: "",
                    rules: [
                        v => !!v || 'Email is required',
                        v => /.+@.+\..+/.test(v) || 'Email must be valid',
                    ]
                },
                name: {
                    body: "",
                    rules: [
                        v => !!v || 'Name is required',
                        v => (v && v.length <= this.name.limit) || `Name must be less than ${this.name.limit} characters`,
                    ],
                    limit: 40
                },
                body: {
                    body: "",
                    rules: [
                        v => !!v || 'Body is required',
                        v => (v && v.length <= this.body.limit) || `Body must be less than ${this.body.limit} characters`,
                    ],
                    limit: 250
                }
            }
        },
        computed: {
            maySubmit() {
                return this.valid && !this.request.loading;
            }
        },
        methods: {
            submitComment() {
                this.request.loading = true;
                this.request.failed = false;

                const comment = {
                    postId: this.postId,
                    email: this.email.body,
                    name: this.name.body,
                    body: this.body.body
                };

                postComment(comment)
                    .then(response => {
                        this.$emit('commentCreated', response.data);
                    })
                    .catch(reason => {
                        this.request.failed = true;
                        console.error(reason);
                    })
                    .finally(() => {
                        this.request.loading = false;
                        this.resetForm();
                    });

            },
            resetForm() {
                this.$refs.form.reset();
            }
        }
    }
</script>

<style scoped>

</style>