<template>
  <v-app light>
    <top-toolbar app :loginIsValid="loginIsValid" :username="username"></top-toolbar>
    <br>
    <br>
    <br>
    <v-content>
      <v-container>
        <top-menu app class="pt-2"></top-menu>
        <v-alert v-show="(successMessage!='')" outline color="success"
         icon="check_circle" value="true" class="normalFont bold  text-xs-right">
          {{successMessage}}
        </v-alert>
        <v-alert v-show="(errorMessage!='')" outline color="error" 
        icon="warning" value="true" class="normalFont bold text-xs-right">
          {{errorMessage}}
        </v-alert>
        <nuxt/>
      </v-container>
      <v-container>
        <v-dialog v-model="showLoginRegisterDialog" max-width="300" >
          <v-card >
            <login-register-dialog-content></login-register-dialog-content>
          </v-card>
        </v-dialog>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import UserManager from '~/api/user_manager.js'
  import TopToolbar from '~/components/TopToolbar.vue'
  import TopMenu from '~/components/TopMenu.vue'
  import LoginRegisterDialogContent from '~/components/login_register/LoginRegister.vue'
  export default {
    data () {
      let loginIsValid = false
      let showLoginRegisterDialog = false
      let successMessage = ''
      let errorMessage = ''
      let username = ''
      return {
        loginIsValid,
        showLoginRegisterDialog,
        successMessage,
        errorMessage,
        username
      }
    },
    components:{
      'top-toolbar':TopToolbar,
      'top-menu':TopMenu,
      'login-register-dialog-content':LoginRegisterDialogContent
    },
    created:function(){
      let _this = this
      _this.$root.$on('check-login-status', data => {
        _this.loginIsValid = UserManager.isAuth()
        if(_this.loginIsValid){
          UserManager.requestGetUser(function(err,res){
            if(err){
              throw err
            }else{
              _this.username = res.user.email
            }
          })
        }
      })
      _this.$root.$on('on-login-btn-clicked', data => {
        _this.showLoginRegisterDialog = true
      })
      _this.$root.$on('close-login-register',data=>{
        _this.showLoginRegisterDialog = false
      })
      _this.$root.$on('show-success-alert',data=>{
        _this.successMessage = data.message
        setTimeout(() => {
          _this.successMessage = ''
        }, 4000);   
      })
      _this.$root.$on('show-error-alert',data=>{
        _this.errorMessage = data.message
        setTimeout(() => {
          _this.errorMessage = ''
        }, 4000);   
      })
    }
  }
</script>

<style scoped>

</style>