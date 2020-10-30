<template>
  <common-layout>

    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/logo.png"/>
        <span class="title">{{systemName}}</span>
      </div>
      <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div>
      <router-view/>
    </div>
  </common-layout>
</template>

<script>
  import logo from '@/assets/img/logo.png';
  import CommonLayout from '@/layouts/CommonLayout'

  export default {
    name: "UserLayout",
    components: {CommonLayout},
    props: {
      logo: {default: logo, types: String}
    },
    computed: {
      systemName() {
        return this.$store.state.setting.systemName
      }
    },
  }
</script>

<style lang="less">
  .common-layout {
    .top {
      text-align: center;

      .header {
        height: 44px;
        line-height: 44px;

        a {
          text-decoration: none;
        }

        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }

        .title {
          font-size: 33px;
          color: @title-color;
          font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }

      .desc {
        font-size: 14px;
        color: @text-color-second;
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
  }
</style>
