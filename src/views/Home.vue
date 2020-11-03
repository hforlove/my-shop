<template>
  <div class="home">

  </div>
</template>

<script>

import { getHomeData } from '@/api/index'

export default {
  name: 'Home',
  created () {
    getHomeData().then(res => {
      console.log(res)
    })
  }
}

</script>
