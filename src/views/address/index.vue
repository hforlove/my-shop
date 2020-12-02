<template>
  <div class="page_wrap">
    <header-bar home>
      <template v-slot:middle>地址管理</template>
    </header-bar>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
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
      chosenAddressId: ''
    }
  },
  created () {
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
