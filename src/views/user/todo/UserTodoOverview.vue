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
                <h1 class="subtitle-1 text--secondary">Could not retrieve To-Do</h1>
            </v-col>
        </v-row>
    </v-container>

    <!-- Content Row -->
    <v-container v-else fill-height>
        <v-row dense align="center" justify="center" align-content="center">
            <v-col v-for="(todo, i) in content.todos" :key="i" cols="12" class="d-flex justify-center">
                <user-todo :id="todo.id"
                       :title="todo.title"
                       :completed="todo.completed"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import UserTodo from "./UserTodo";
    import { getTodosByUser } from "../../../services/todo-service";

    export default {
        name: "UserTodoOverview",
        data() {
            return {
                request: {
                    loading: false,
                    failed: false
                },
                content: {
                    todos: []
                }
            }
        },
        components: {
            'user-todo': UserTodo
        },
        created() {
            this.getTodos();
        },
        methods: {
            getTodos() {
                this.request.loading = true;
                this.request.failed = false;

                getTodosByUser(this.$route.params.id)
                    .then(response => {
                        this.content.todos = response.data;
                    })
                    .catch(reason => {
                        this.request.failed = true;
                        console.error(reason);
                    })
                    .finally(() => this.request.loading = false);
            }
        }
    }
</script>

<style scoped>

</style>