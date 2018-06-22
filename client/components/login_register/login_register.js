import UserManager from '~/api/user_manager.js'

let validateEmail = function (email) {
  let regrex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regrex.test(email)
}

let validatePassword = function (password) {
  let regex = /^[a-zA-Z0-9]{3,30}$/
  return regex.test(password)
}

export default {
  data () {
    let activeTab = 'login-tab'
    let loginEmailInput = ''
    let loginPasswordInput = ''
    let registerEmailInput = ''
    let registerPasswordInput = ''
    let registerRePasswordInput = ''
    let successMessage = ''
    let errorMessage = ''
    return {
      activeTab,
      loginEmailInput,
      loginPasswordInput,
      registerEmailInput,
      registerPasswordInput,
      registerRePasswordInput,
      successMessage,
      errorMessage
    }
  },
  methods: {
    onExitBtnClicked: function () {
      this.$root.$emit('close-login-register', {})
    },
    onLoginBtnClicked: function () {
      let _this = this
      _this.loginEmailInput = 'mohammad.fakhreddin@gmail.com'
      _this.loginPasswordInput = '1234'
      if (validateEmail(_this.loginEmailInput) &&
        validatePassword(_this.loginPasswordInput)) {
        UserManager.requestLogin(_this.loginEmailInput,
          _this.loginPasswordInput, function (err, res) {
            if (err) {
              _this.showFailureMessage('خطا در ارتباط با سرور')
              throw err
            } else {
              _this.$root.$emit('check-login-status', {})
              _this.$root.$emit('show-success-alert',
                {message: 'خوش آمدید'})
              _this.onExitBtnClicked()
            }
          })
      } else {
        _this.showFailureMessage('خطا در ورودی')
      }
    },
    showSuccessMessage: function (message) {
      let _this = this
      _this.successMessage = message
      setTimeout(() => {
        _this.successMessage = ''
      }, 4000)
    },
    showFailureMessage: function (message) {
      let _this = this
      _this.errorMessage = message
      setTimeout(() => {
        _this.errorMessage = ''
      }, 4000)
    },
    onRegisterBtnClicked: function () {
      let _this = this
      console.log(_this.registerEmailInput + '----' + _this.registerPasswordInput)
      if (validateEmail(_this.registerEmailInput) &&
        validatePassword(_this.registerPasswordInput) &&
        (_this.registerRePasswordInput === _this.registerPasswordInput)) {
        UserManager.requestRegister(_this.registerEmailInput,
          _this.registerPasswordInput, function (err, res) {
            if (err) {
              _this.showFailureMessage('خطا در ارتباط با سرور')
              throw err
            } else {
              _this.$root.$emit('check-login-status', {})
              _this.$root.$emit('show-success-alert',
                {message: 'خوش آمدید'})
              _this.onExitBtnClicked()
            }
          })
      } else {
        _this.showFailureMessage('خطا در ورودی')
      }
    }
  },
  created: function () {

  }
}
