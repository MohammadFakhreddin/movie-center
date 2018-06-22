import Input from '~/components/Input.vue'

export default {
  data () {
    let searchValue = ''
    return {
      searchValue
    }
  },
  methods: {
    onSearchBtnClicked: function () {
      this.$parent.$emit('search-btn-clicked', this.searchValue)
    }
  },
  components: {
    'my-input': Input
  },
  props: [
    'backgroundUrl'
  ]
}
