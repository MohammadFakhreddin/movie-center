import SearchBar from '~/components/SearchBar.vue'
import LoginSignInBtn from '~/components/LoginSignInBtn.vue'
import DownToolbar from '~/components/DownToolbar.vue'
import CarouselMovieItem from '~/components/CarouselMovieItem.vue'
import HomeCarouselButton from '~/components/HomeCarouselButton.vue'
import TopSearchPanel from '~/components/home_page_scenes/top_search_panel/TopSearch.vue'
import StaticBanner from '~/components/home_page_scenes/static_banner/StaticBanner.vue'
import UserManager from '~/api/user_manager.js'

let Carousel = null
let CarouselSlide = null

if (process.browser) {
  let VueCarousel = require('vue-carousel')
  Carousel = VueCarousel.Carousel
  CarouselSlide = VueCarousel.Slide
}

export default{
  data () {
    let cMenuAllSelected = true
    let cMenuMovieSelected = false
    let cMenuAnimationSelected = false
    let cMenuDocumentarySelected = false
    let cMenuDooblySelected = false
    let loginIsValid = true
    let recentMoviesItemList = []
    let bestMoviesItemList = []
    let staticBanner = {}
    let searchBackgroundSrc = ''
    let searchValue = ''
    let searchResults = []
    return {
      carousleNavigationEnabled: true,
      carousleAutoPlay: true,
      vueCarouslePerPage: 4,
      recentMoviesItemList,
      cMenuAllSelected,
      cMenuMovieSelected,
      cMenuAnimationSelected,
      cMenuDocumentarySelected,
      cMenuDooblySelected,
      loginIsValid,
      bestMoviesItemList,
      staticBanner,
      searchBackgroundSrc,
      searchResults,
      searchValue
    }
  },
  components: {
    'search-bar': SearchBar,
    'sign-in-btn': LoginSignInBtn,
    'carousel': Carousel,
    'carousel-slide': CarouselSlide,
    'down-toolbar': DownToolbar,
    'movie-item': CarouselMovieItem,
    'carousel-button': HomeCarouselButton,
    'top-search-panel': TopSearchPanel,
    'static-banner': StaticBanner
  },
  created: function () {
    let _this = this
    UserManager.requestRecentMovies(5, function (err, res) {
      if (err) {
        throw err
      } else {
        _this.recentMoviesItemList = res.movieList
      }
    })
    UserManager.requestTopMovies(5, function (err, res) {
      if (err) {
        throw err
      } else {
        _this.bestMoviesItemList = res.movieList
      }
    })
    UserManager.requestStaticBanner(function (err, res) {
      if (err) {
        throw err
      } else {
        _this.staticBanner = res.staticBanner
        _this.staticBanner.src = 'url(http://localhost:8000/images/wallpapers/' + res.staticBanner.id + '.png' + ')'
      }
    })
    UserManager.requestSearchBackground(function (err, res) {
      if (err) {
        throw err
      } else {
        _this.searchBackgroundSrc = 'url(http://localhost:8000/images/wallpapers/' + res.wallpaperId + '.png' + ')'
      }
    })
    _this.$on('search-btn-clicked', searchValue => {
      console.log('Recieved search request' + searchValue)
      UserManager.requestSearch(searchValue, function (err, res) {
        if (err) {
          _this.$root.$emit('show-error-alert', {message: 'خطا در دریافت اطلاعات'})
          throw err
        } else {
          console.log('Movie list is :' + JSON.stringify(res.movieList))
          _this.searchResults = res.movieList
        }
      })
    })
  },
  methods: {
    onCarouselButtonClicked: function (selectedButton) {
      // console.log('Click detected:', selectedButton)
      this.cMenuAllSelected = false
      this.cMenuMovieSelected = false
      this.cMenuAnimationSelected = false
      this.cMenuDocumentarySelected = false
      this.cMenuDooblySelected = false
      switch (selectedButton) {
        case 'all':
          this.cMenuAllSelected = true
          break
        case 'movie':
          this.cMenuMovieSelected = true
          break
        case 'animation':
          this.cMenuAnimationSelected = true
          break
        case 'documentary':
          this.cMenuDocumentarySelected = true
          break
        case 'doobly':
          this.cMenuDooblySelected = true
          break
        default:
          console.error('Unknown menu button detected')
      }
    },
    onMovieNameSelected: function (movieId) {
      if (movieId != null) {
        this.$router.push({ name: 'download',
          params:
          {
            movieId: movieId
          }
        })
      }
    },
    onSearchBtnClicked: function () {

    }
  },
  mounted: function () {
    this.$root.$emit('check-login-status', {})
  }
}
