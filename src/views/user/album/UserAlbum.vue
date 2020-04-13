<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title class="title text-center justify-center">{{ title }}</v-card-title>

                <v-divider></v-divider>

                <v-container>
                    <v-row>
                        <v-col v-for="n in 9" :key="n" cols="4" class="d-flex child-flex">
                            <v-card class="d-flex">
                                <v-img :src="`https://picsum.photos/500/300?image=${n * id + 2 * id}`"
                                       aspect-ratio="1"
                                       class="grey lighten-2"/>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "UserAlbum",
        props: ['id', 'title']
    }
</script>

<style scoped>

</style>