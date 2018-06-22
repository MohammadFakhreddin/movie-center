import RightTabButton from '~/components/RightTabButton.vue'
import NoSSR from 'vue-no-ssr'
import ChangeProfileInfoTab from '~/components/setting_scene_tabs/change_profile_info/ChangeProfileInfo.vue'

export default{
  data () {
    let selectedTab = 'edit-info'
    let mounted = false
    return {
      RightTabButton,
      selectedTab,
      mounted
    }
  },
  props: [
  ],
  components: {
    'right-tab-button': RightTabButton,
    'no-ssr': NoSSR,
    'change-profile-info-tab': ChangeProfileInfoTab
  },
  methods: {
    onRightTabsClicked: function (name) {
      this.selectedTab = name
    }
  },
  mounted: function () {
    this.mounted = true
  }
}
