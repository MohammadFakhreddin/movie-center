import SectionTitle from '~/components/SectionTitle.vue'
import Input from '~/components/Input.vue'
import AdminManager from '~/api/admin_manager.js'

export default{
  data () {
    let movieId = ''
    return {
      movieId
    }
  },
  components: {
    'section-title': SectionTitle,
    'my-input': Input
  },
  props: [

  ],
  methods: {
    onRemoveMovieClicked: function () {
      AdminManager.requestRemoveMovie(this.movieId, function (res) {
        // TODO
        console.log('Movie removed successfully')
      }, function () {
        // TODO
        console.log('Request failed')
      })
    }
  }
}
