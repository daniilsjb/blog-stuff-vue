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
                <h1 class="subtitle-1 text--secondary">Could not retrieve albums</h1>
            </v-col>
        </v-row>
    </v-container>

    <!-- Content Row -->
    <v-container v-else>
        <v-row dense align="center" justify="center" align-content="center">
            <v-col v-for="(album, i) in content.albums" :key="i" cols="12" class="d-flex justify-center">
                <user-album :id="album.id"
                       :title="album.title"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import UserAlbum from "./UserAlbum";
    import { getAlbumsByUser } from "../../../services/album-service";

    export default {
        name: "UserAlbumOverview",
        data() {
            return {
                request: {
                    loading: false,
                    failed: false
                },
                content: {
                    albums: []
                }
            }
        },
        components: {
            'user-album': UserAlbum
        },
        created() {
            this.getAlbums();
        },
        methods: {
            getAlbums() {
                this.request.loading = true;
                this.request.failed = false;

                getAlbumsByUser(this.$route.params.id)
                    .then(response => {
                        this.content.albums = response.data;
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