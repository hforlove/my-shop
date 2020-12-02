<template>
  <div>
    <header-bar>
      <template v-slot:middle>关于我们</template>
    </header-bar>
    <h1 style="padding-top:100px;text-align:center">关于我们</h1>
  </div>
</template>

<script>

import HeaderBar from 'comp/HeaderBar'

export default {
  components: { HeaderBar }
}

</script>

<style lang="less" scope>

</style>
