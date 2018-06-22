import TabButton from '~/components/TabButton.vue'
import SettingScene from '~/components/profile_page_scenes/setting_scene/SettingScene.vue'

export default{
  data () {
    let selectedPage = 'setting'
    let innerHtml = ''
    return {
      selectedPage,
      innerHtml
    }
  },
  components: {
    'tab-button': TabButton,
    'setting-scene': SettingScene
  },
  methods: {
    onPageSelected: function (name) {
      this.selectedPage = name
    }
  }
}
