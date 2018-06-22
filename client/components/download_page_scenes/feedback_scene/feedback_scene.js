import ProfileButton from '~/components/UserProfileButton.vue'
import ExistingCommentItem from '~/components/ExistingCommentItem.vue'
import UserManager from '~/api/user_manager.js'

export default {
  data () {
    let directorScore = {
      value: 5
    }
    let actorsScore = {
      value: 5
    }
    let storyScore = {
      value: 5
    }
    let userCommentValue = ''
    let currentPage = 1
    let commentList = []
    let totalScore = 0
    let numOfVoters = 0
    let positiveViewsCount = 0
    let totalScoreProgressValue = 0
    let userIsValid = false
    let userSuggestionState = 0
    let movieId = null
    return {
      directorScore,
      actorsScore,
      storyScore,
      userCommentValue,
      currentPage,
      commentList,
      totalScore,
      numOfVoters,
      positiveViewsCount,
      totalScoreProgressValue,
      userIsValid,
      userSuggestionState,
      movieId
    }
  },
  components: {
    'profile-button': ProfileButton,
    'existing-comment': ExistingCommentItem
  },
  created: function () {
    let _this = this
    _this.movieId = _this.$route.params.movieId
    _this.requestMovieComments()
    _this.$root.$on('check-login-status', data => {
      _this.userIsValid = UserManager.isAuth()
    })
  },
  methods: {
    onSendCommentBtnClicked: function () {
      let _this = this
      let comment = {
        text: _this.userCommentValue,
        directorRate: _this.directorScore.value,
        storyRate: _this.storyScore.value,
        actorRate: _this.actorsScore.value,
        userSuggestionState: parseInt(_this.userSuggestionState)
      }
      UserManager.requestAddNewComment(_this.movieId, comment.text,
        comment.directorRate, comment.storyRate, comment.actorRate,
        comment.userSuggestionState, function (err, res) {
          if (err) {
            throw err
          } else {
            _this.requestMovieComments()
          }
        })
    },
    requestMovieComments: function () {
      let _this = this
      UserManager.requestMovieComments(_this.movieId, function (err, res) {
        if (err) {
          throw err
        } else {
          _this.totalScore = res.totalScore
          _this.totalScoreProgressValue = _this.totalScore * 10
          _this.commentList = res.commentList
          _this.numOfVoters = _this.commentList.length
          _this.positiveViewsCount = 0
          for (let i = 0; i < _this.commentList.length; i++) {
            if (_this.commentList[i].userSuggestionState === 1) {
              _this.positiveViewsCount++
            }
          }
        }
      })
    }
  }
}
