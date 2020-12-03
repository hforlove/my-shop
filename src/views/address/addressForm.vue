<template>
  <div class="page_wrap">
    <header-bar home>{{title}}</header-bar>
    <van-address-edit
      :area-list="areaList"
      show-set-default
      show-search-result
      :address-info="address"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>

<script>

import HeaderBar from 'comp/HeaderBar'

import areaList from 'asset/js/area.js'

export default {
  components: { HeaderBar },
  data () {
    return {
      title: '新增地址',
      areaList,
      addressId: '',
      address: {}
    }
  },
  created () {
    if (this.$route.query.id) {
      this.title = '编辑地址'
      this.addressId = this.$route.query.id
      this.getAddressDetail()
    }
  },
  methods: {
    getAreaCode (county) {
      let areaCode = ''
      for (const code in areaList.county_list) {
        if (areaList.county_list[code] === county) {
          areaCode = code
          break
        }
      }
      return areaCode
    },
    getAddressDetail () {
      this.$api.getAddressDetail(this.addressId).then(res => {
        const data = res.data
        const areaCode = this.getAreaCode(data.regionName)
        this.address = {
          areaCode,
          addressDetail: data.detailAddress,
          city: data.cityName,
          county: data.regionName,
          isDefault: data.defaultFlag === 1,
          name: data.userName,
          province: data.provinceName,
          tel: data.userPhone
        }
      })
    },
    onSave (content) {
      const params = {
        userName: content.name,
        userPhone: content.tel,
        provinceName: content.province,
        cityName: content.city,
        regionName: content.county,
        detailAddress: content.addressDetail,
        defaultFlag: content.isDefault ? 1 : 0
      }
      if (this.addressId) {
        params.addressId = this.addressId
        this.$api.updateAddress(params).then(res => {
          this.$router.go('-1')
        })
      } else {
        this.$api.addAddress(params).then(res => {
          this.$router.go('-1')
        })
      }
    }
  }
}

</script>

<style lang="less" scope>

</style>
