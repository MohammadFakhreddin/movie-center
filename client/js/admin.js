import TabButton from '~/components/TabButton.vue'
import SectionTitle from '~/components/SectionTitle.vue'
import Input from '~/components/Input.vue'
import AddNewMoviePage from '~/components/admin_page_scenes/add_new_movie/AddNewMovie.vue'
import RemoveMoviePage from '~/components/admin_page_scenes/remove_movie/RemoveMovie.vue'
import SeeMovieListPage from '~/components/admin_page_scenes/see_movie_list/SeeMovieList.vue'
import Login from '~/components/admin_page_scenes/login/Login.vue'

export default{
  layout: 'admin',
  data () {
    let selectedPage = 'movie-list'
    let uploadPosterAddress = ''
    let uploadWallpaperAddress = ''
    return {
      selectedPage,
      uploadPosterAddress,
      uploadWallpaperAddress
    }
  },
  components: {
    'pages-button': TabButton,
    'section-title': SectionTitle,
    'my-input': Input,
    'add-new-movie-page': AddNewMoviePage,
    'remove-movie-page': RemoveMoviePage,
    'see-movie-list-page': SeeMovieListPage,
    'login-page': Login
  },
  props: [

  ],
  methods: {
    onPageSelected: function (selectedPage) {
      this.selectedPage = selectedPage
    }
  }
}
