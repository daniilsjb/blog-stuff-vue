<template>
    <v-container>
        <v-card width="850px">
            <v-list-item two-line>
                <v-list-item-content>
                    <!-- To-Do Status -->
                    <div class="overline">
                        <span v-if="completed" class="green--text">COMPLETED</span>
                        <span v-else class="red--text">NOT COMPLETED</span>
                    </div>

                    <!-- To-Do Content -->
                    <v-list-item-content class="body-1 text--primary">To-Do: {{ title }} {{ title }}</v-list-item-content>
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "UserTodo",
        props: ['id', 'title', 'completed']
    }
</script>

<style scoped>

</style>