<template>
  <div class="user_page">
    <header-bar>
      <template v-slot:middle>我的</template>
    </header-bar>
    <tab-bar :index="3"></tab-bar>
  </div>
</template>

<script>

import TabBar from 'comp/TabBar'
import HeaderBar from 'comp/HeaderBar'

export default {
  components: { TabBar, HeaderBar },
  data () {
    return {

    }
  }
}

</script>

<style lang="less" scope>

</style>
