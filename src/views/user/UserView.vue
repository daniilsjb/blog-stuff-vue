<template>
    <!-- Loading State -->
    <v-container v-if="request.loading" fill-height>
        <v-row align="center" justify="center" align-content="center">
            <!-- Progress Spinner -->
            <v-col cols="12" class="d-flex justify-center">
                <v-progress-circular indeterminate color="deep-purple accent-4"/>
            </v-col>
        </v-row>
    </v-container>

    <!-- Error State -->
    <v-container v-else-if="request.failed" fill-height>
        <v-row align="center" justify="center" align-content="center">
            <!-- Error Message -->
            <v-col cols="12" class="d-flex justify-center">
                <h1 class="body-1 text--primary">Could not retrieve user profile with identifier {{ $route.params.id }}</h1>
            </v-col>

            <!-- Back Button -->
            <v-col cols="12" class="d-flex justify-center">
                <v-btn outlined dark color="deep-purple accent-4" @click="navigateBack">Back</v-btn>
            </v-col>
        </v-row>
    </v-container>

    <!-- Content State -->
    <v-container style="width: 40%" v-else>
        <v-list-item>
            <v-list-item-content>
                <!-- General Information -->
                <v-list-item-title class="display-1 font-weight-bold">{{ content.user.name }}</v-list-item-title>
                <v-list-item-subtitle>@{{ content.user.username }}</v-list-item-subtitle>

                <!-- User Bio -->
                <v-list-item-content class="body-1">
                    Works at {{ content.user.company.name }}, a company specialized in {{ content.user.company.catchPhrase | lowercase }}.
                    His dream is to {{ content.user.company.bs }}.
                </v-list-item-content>
            </v-list-item-content>

            <!-- User Avatar -->
            <v-list-item-avatar size="120">
                <img :src="`https://randomuser.me/api/portraits/men/${this.content.user.id}.jpg`"
                     alt=""/>
            </v-list-item-avatar>
        </v-list-item>

        <!-- User Address Information -->
        <v-list-item two-line>
            <v-list-item-content>
                <!-- Header -->
                <v-list-item-subtitle class="body-2 font-weight-bold">
                    Address Information
                </v-list-item-subtitle>

                <!-- Location -->
                <v-list-item-subtitle class="body-2">
                    Lives in {{ content.user.address.city }}, street {{ content.user.address.street }}, suite {{ content.user.address.suite }}
                </v-list-item-subtitle>

                <!-- Zip-Code -->
                <v-list-item-subtitle class="body-2">
                    Zip: {{ content.user.address.zipcode }}
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <!-- Contact Information -->
        <v-list-item three-line>
            <v-list-item-content>
                <!-- Header -->
                <v-list-item-subtitle class="body-2 font-weight-bold">
                    Contact Information
                </v-list-item-subtitle>

                <!-- Email -->
                <v-list-item-subtitle class="body-2">
                    Email: {{ content.user.email }}
                </v-list-item-subtitle>

                <!-- Phone -->
                <v-list-item-subtitle class="body-2">
                    Phone: {{ content.user.phone }}
                </v-list-item-subtitle>

                <!-- Website -->
                <v-list-item-subtitle class="body-2">
                    Website: {{ content.user.website }}
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <!-- Other Information Selection -->
        <v-tabs fixed-tabs class="mt-6" color="primary" v-model="tabs.current">
            <v-tab v-for="tab in tabs.items" :key="tab.name">
                {{ tab.name }}
            </v-tab>

            <v-tab-item v-for="tab in tabs.items" :key="tab.name">
                <component v-bind:is="tab.component"/>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
    import UserPostOverview from "./post/UserPostOverview";
    import UserTodoOverview from "./todo/UserTodoOverview";
    import UserAlbumOverview from "./album/UserAlbumOverview";
    import { getUserById } from "../../services/user-service";

    export default {
        name: "UserView",
        data() {
            return {
                request: {
                    loading: false,
                    failed: false
                },
                content: {
                    user: null
                },
                tabs: {
                    current: null,
                    items: [
                        { name: 'Posts' , component: UserPostOverview },
                        { name: 'To-Do' , component: UserTodoOverview },
                        { name: 'Albums' , component: UserAlbumOverview }
                    ]
                }
            }
        },
        created() {
            this.getUser();
        },
        filters: {
            lowercase: function(value) {
                return value.toLowerCase();
            }
        },
        methods: {
            navigateBack() {
                this.$router.push('/posts');
            },
            getUser() {
                this.request.loading = true;
                this.request.failed = false;

                getUserById(this.$route.params.id)
                    .then(response => {
                        this.content.user = response.data;
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