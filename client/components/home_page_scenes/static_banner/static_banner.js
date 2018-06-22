export default{
  data () {
    return {

    }
  },
  props: [
    'width',
    'height',
    'title',
    'body',
    'btnText',
    'backgroundImage',
    'movieId'
  ],
  components: {

  },
  methods: {
    onDownloadBtnClicked: function () {
      let _this = this
      this.$router.push({ name: 'download',
        params:
          {
            movieId: _this.movieId
          }
      })
    }
  }
}
