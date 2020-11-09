<template>
  <ul class="cate_list">
    <li
      v-for="item in list"
      :key="item.categoryId"
      :class="{act:item.categoryId===categoryId}"
      @click="changeCategory(item)"
    >
      {{item.categoryName}}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      categoryId: 0
    }
  },
  methods: {
    changeCategory (item) {
      if (this.categoryId === item.categoryId) return
      this.categoryId = item.categoryId
      this.$emit('changeCategory', item)
    }
  },
  watch: {
    list () {
      if (this.list.length < 1) return
      this.categoryId = this.list[0].categoryId
      this.$emit('changeCategory', this.list[0])
    }
  }
}
</script>

<style lang="less" scope>
.cate_list{
  li{
    font-size: 14rem/@dpi;
    text-align: center;
    padding: 16px 0;
  }
  .act{
    background: #fff;
    color:@red;
  }
}
</style>
