<template>
    <v-toolbar fixed style="background-color: white"  class="elevation-1">
        <v-flex class="xs1"></v-flex>
        <v-flex class="xs4 text-xs-center">
            <search-bar class="offset-xs1"></search-bar>
        </v-flex>
        <v-flex class="xs1"></v-flex>
        <v-flex class="xs2 offset-xs2 text-xs-center" >
            <v-layout justify-center align-center >
                <label class="englishFont mediumText text-xs-right">
                    {{username}}
                </label>
                <v-flex v-show="!loginIsValid">
                    <sign-in-btn  @click.native="onLoginButtonClicked()" ></sign-in-btn>
                </v-flex>
                <v-flex v-show="loginIsValid">
                    <profile-btn @click.native="onProfileButtonClicked()"></profile-btn>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex class="xs1">
        </v-flex>
    </v-toolbar>
</template>
   
<script>  
    import SearchBar from '~/components/SearchBar.vue'
    import LoginSignInBtn from '~/components/LoginSignInBtn.vue'
    import ProfileButton from '~/components/UserProfileButton.vue'
    export default {
        components:{
            'search-bar':SearchBar,
            'sign-in-btn':LoginSignInBtn,
            'profile-btn':ProfileButton,
        },
        props:[
            'loginIsValid',
            'username'
        ],
        methods:{
            onProfileButtonClicked:function(){
                console.log("Profile button is clicked");
                this.$router.push({ name: 'profile', params: {}})
            },
            onLoginButtonClicked:function(){
                // console.log("Login button is clicked");
                // this.$router.push({ name: 'login_register', params: {}})    
                this.$root.$emit('on-login-btn-clicked',{})  
            }
        }
    }
</script>
<style scoped>

</style>
