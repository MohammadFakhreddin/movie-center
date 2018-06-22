import SectionTitle from '~/components/SectionTitle.vue'
import Input from '~/components/Input.vue'
import AdminManager from '~/api/admin_manager.js'

export default{
  data () {
    let movieList = ''
    return {
      movieList
    }
  },
  components: {
    'section-title': SectionTitle,
    'my-input': Input
  },
  props: [

  ],
  methods: {
    onRefreshBtnClicked: function () {
      let _this = this
      AdminManager.requestAllMovies(function (movieList) {
        _this.movieList = JSON.stringify(movieList)
      }, function () {
        // TODO
        console.log('Request to server failed')
      })
    }
  }
}
