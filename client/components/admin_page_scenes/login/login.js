import SectionTitle from '~/components/SectionTitle.vue'
import Input from '~/components/Input.vue'
import AdminManager from '~/api/admin_manager.js'

export default{
  data () {
    let username = ''
    let password = ''
    return {
      username,
      password
    }
  },
  components: {
    'section-title': SectionTitle,
    'my-input': Input
  },
  props: [

  ],
  methods: {
    onLoginBtnClicked: function () {
      AdminManager.requestLogin(this.username, this.password,
        function (res) {
          console.log('Login is successful')
        }, function () {
          console.log('Login failed')
        })
    }
  }
}
