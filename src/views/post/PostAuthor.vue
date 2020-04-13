<template>
    <v-card outlined>
        <v-list-item>
            <!-- Author Avatar -->
            <v-list-item-avatar size="80">
                <img :src="`https://randomuser.me/api/portraits/men/${this.author.id}.jpg`"
                     alt="" />
            </v-list-item-avatar>

            <!-- General Information -->
            <v-list-item-content>
                <div class="overline mb-4">About author</div>
                <v-list-item-title class="headline mb-1">{{ author.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ author.email }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- Author Bio -->
        <v-list-item>
            <v-list-item-content>
                The author of this post, also known as @{{ author.username }}, lives in {{ author.address.city }}
                and works at {{ author.company.name }}, a company specialized in {{ author.company.catchPhrase | lowercase }}.
            </v-list-item-content>
        </v-list-item>

        <!-- Author Contacts -->
        <v-list-item>
            <v-list-item-content>
                <v-list-item-subtitle>Phone: {{ author.phone }}</v-list-item-subtitle>
                <v-list-item-subtitle>Website: {{ author.website }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-card-actions>
            <v-btn text color="primary" @click="navigateToAuthor">See Profile</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "PostAuthor",
        props: ['author'],
        filters: {
            lowercase: function(value) {
                return value.toLowerCase();
            }
        },
        methods: {
            navigateToAuthor() {
                this.$router.push(`/users/${this.author.id}`);
            }
        }
    }
</script>

<style scoped>

</style>