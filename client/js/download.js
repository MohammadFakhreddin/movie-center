import SearchBar from '~/components/SearchBar.vue'
import LoginSignInBtn from '~/components/LoginSignInBtn.vue'
import DownToolbar from '~/components/DownToolbar.vue'
import TabButton from '~/components/TabButton.vue'
import DownloadScene from '~/components/download_page_scenes/DownloadScene.vue'
import UserManager from '~/api/user_manager.js'
import FeedbackScene from '~/components/download_page_scenes/feedback_scene/FeedbackScene.vue'
import SubtitleScene from '~/components/download_page_scenes/subtitle_scene/SubtitleScene.vue'

export default{
  data () {
    let galleryPageIsSelected = false
    let awardsPageIsSelected = false
    let actorsPageIsSelected = false
    let reviewPageIsSelected = false
    let userFeedbackIsSelected = true
    let subtitlePageIsSelected = false
    let downloadPageIsSelected = false
    let movieName = 'Loading'
    let movieTags = []
    let movieImage = ''
    let movieStars = ''
    let movieWriter = ''
    let movieDirector = ''
    let movieDescription = ''
    let movieCountry = ''
    let movieLanguage = ''
    let movieDuration = ''
    let movieYear = ''
    let movieRating = ''
    let loginIsValid = true
    let movieWallpaper = ''
    let movieOriginalTitle = ''
    return {
      galleryPageIsSelected,
      awardsPageIsSelected,
      actorsPageIsSelected,
      reviewPageIsSelected,
      userFeedbackIsSelected,
      subtitlePageIsSelected,
      downloadPageIsSelected,
      movieName,
      movieTags,
      movieImage,
      movieStars,
      movieWriter,
      movieDirector,
      movieDescription,
      movieCountry,
      movieLanguage,
      movieDuration,
      movieYear,
      movieRating,
      loginIsValid,
      movieWallpaper,
      movieOriginalTitle
    }
  },
  components: {
    'search-bar': SearchBar,
    'sign-in-btn': LoginSignInBtn,
    'down-toolbar': DownToolbar,
    'pages-button': TabButton,
    'download-scene': DownloadScene,
    'feedback-scene': FeedbackScene,
    'subtitle-scene': SubtitleScene
  },
  methods: {
    onPageSelected: function (selectedPage) {
      let _this = this
      _this.galleryPageIsSelected = false
      _this.awardsPageIsSelected = false
      _this.actorsPageIsSelected = false
      _this.reviewPageIsSelected = false
      _this.userFeedbackIsSelected = false
      _this.subtitlePageIsSelected = false
      _this.downloadPageIsSelected = false
      switch (selectedPage) {
        case 'gallery':
          _this.galleryPageIsSelected = true
          break
        case 'awards':
          _this.awardsPageIsSelected = true
          break
        case 'actors':
          _this.actorsPageIsSelected = true
          break
        case 'review':
          _this.reviewPageIsSelected = true
          break
        case 'feedback':
          _this.userFeedbackIsSelected = true
          break
        case 'subtitle':
          _this.subtitlePageIsSelected = true
          break
        case 'download':
          _this.downloadPageIsSelected = true
          break
        default:
          console.error('Unknown page selected')
          break
      }
    }
  },
  created: function () {
    this.$root.$emit('check-login-status', {})
    let _this = this
    let movieId = _this.$route.params.movieId
    UserManager.requestMovieById(movieId, function (err, res) {
      if (err) {
        throw err
      } else {
        let movie = res.movie
        _this.movieName = movie.title
        _this.movieDirector = movie.director
        _this.movieTags = movie.tags
        _this.movieRating = movie.rate
        _this.movieWriter = movie.writers
        _this.movieOriginalTitle = movie.originalTitle
        _this.movieDuration = movie.length
        _this.movieYear = movie.year
        _this.movieImage = 'http://localhost:8000/images/posters/' + movieId + '.png'
        _this.movieWallpaper = 'url(http://localhost:8000/images/wallpapers/' + movieId + '.png)'
        _this.movieStars = movie.actors
        _this.movieDescription = movie.description
        _this.movieCountry = movie.country
      }
    })
  },
  mounted: function () {
    this.$root.$emit('check-login-status', {})
  }
}
