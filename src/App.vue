<template>
  <div id="app">
    <div id="nav">
      <div class="aaa">我是说</div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
.aaa{
  font-size: 32rem/37.5;
}
</style>
