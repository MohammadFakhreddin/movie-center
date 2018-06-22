import SectionTitle from '~/components/SectionTitle.vue'
import Input from '~/components/Input.vue'
import AdminManager from '~/api/admin_manager.js'

export default{
  layout: 'admin',
  data () {
    let wallpaperFile = null
    let posterFile = null
    let movieId = ''
    let titleValue = ''
    let originalTitleValue = ''
    let rateValue = 0
    let yearValue = 0
    let lengthValue = 0
    let countryValue = ''
    let descriptionValue = ''
    let directorValue = ''
    let writersValue = ''
    let actorsValue = ''
    let tags = ''
    return {
      wallpaperFile,
      posterFile,
      movieId,
      titleValue,
      originalTitleValue,
      rateValue,
      yearValue,
      lengthValue,
      countryValue,
      descriptionValue,
      directorValue,
      writersValue,
      actorsValue,
      tags
    }
  },
  components: {
    'section-title': SectionTitle,
    'my-input': Input
  },
  props: [

  ],
  methods: {
    onAddWallpaperClicked: function () {
      AdminManager.requestUploadWallpaper(this.movieId, this.posterFile,
        function () {
          console.log('Upload wallpaper succeeded')
        },
        function () {
          console.log('Upload wallpaper failed')
        })
    },
    onAddPosterClicked: function () {
      AdminManager.requestUploadPoster(this.movieId, this.posterFile,
        function () {
          console.log('Upload poster succeeded')
        },
        function () {
          console.log('Upload poster failed')
        })
    },
    onAddMovieClicked: function () {
      AdminManager.requestAddNewMovie(this.titleValue,
        this.originalTitleValue, this.rateValue, this.yearValue,
        this.lengthValue, this.countryValue, this.descriptionValue,
        this.directorValue, this.writersValue, this.actorsValue,
        this.tags, function () {
          console.log('Adding movie succeeded')
          // TODO Show and unfill all fields
        },
        function () {
          console.log('Adding movie failed')
          // TODO show error message
        })
    },
    onWallpaperFileChanged: function (event) {
      this.wallpaperFile = event.target.files[0]
    },
    onPosterFileChanged: function (event) {
      this.posterFile = event.target.files[0]
    }
  }
}
