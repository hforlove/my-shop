<template>
  <div class="page_wrap">
    <header-bar home>地址管理</header-bar>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<script>

import HeaderBar from 'comp/HeaderBar'

export default {
  components: { HeaderBar },
  data () {
    return {
      list: [],
      type: '',
      chosenAddressId: ''
    }
  },
  created () {
    this.type = this.$route.query.type
    this.getAddress()
  },
  methods: {
    getAddress () {
      this.$api.getAddress().then(res => {
        this.list = res.data.map(item => {
          return {
            id: item.addressId,
            name: item.userName,
            tel: item.userPhone,
            address: item.detailAddress,
            isDefault: item.defaultFlag === 1
          }
        })
      })
    },
    onAdd () {
      this.$router.push('/addressForm')
    },
    onEdit ({ id }) {
      this.$router.push({ path: '/addressForm', query: { id } })
    },
    onSelect (item) {
      if (this.type) this.$router.push({ name: 'orderCreate', query: { address: item.id } })
    }
  }
}

</script>

<style lang="less" scope>
.van-address-item__tag{
  border-radius: 2px;
  font-size: 10rem/@dpi;
}
</style>
