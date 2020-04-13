<template>
    <v-card class="mb-4" outlined width="850px">
        <v-card-subtitle class="subtitle-1 mb-1 pb-2">Posted by {{ email }}</v-card-subtitle>
        <v-card-title class="title pb-2">{{ name }}</v-card-title>
        <v-card-text class="body-1 text--primary">{{ body }}</v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "PostComment",
        props: ['id', 'name', 'email', 'body']
    }
</script>

<style scoped>

</style>