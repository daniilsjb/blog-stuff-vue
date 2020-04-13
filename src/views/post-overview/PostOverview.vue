<template>
    <v-container>
        <v-row align="center" justify="center" align-content="center">
            <v-card width="850px">
                <!-- Post Thumbnail -->
                <v-img class="white--text align-end"
                       :src="`https://picsum.photos/850/300?image=${this.id}`"
                       :lazy-src="`https://picsum.photos/850/300?image=103`"
                       contain>
                    <v-card-title class="title pb-1">{{ title }}</v-card-title>
                </v-img>

                <!-- Post Body -->
                <v-card-text class="body-1 text--primary">{{ body }}</v-card-text>

                <!-- Learn More Button -->
                <v-card-actions>
                    <v-btn text color="primary" @click="navigateToPost">Learn more</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "PostOverview",
        props: ['id', 'title', 'body'],
        methods: {
            navigateToPost() {
              this.$router.push(`/posts/${this.id}`);
            }
        }
    }
</script>

<style scoped>

</style>