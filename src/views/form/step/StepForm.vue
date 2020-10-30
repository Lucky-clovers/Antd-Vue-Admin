<template>
  <a-card :bordered="false">
    <a-steps class="steps" :current="current">
      <a-step :title="$t('input')"/>
      <a-step :title="$t('confirm')"/>
      <a-step :title="$t('complete')"/>
    </a-steps>
    <div>
      <step1 v-if="current === 0" @nextStep="nextStep"></step1>
      <step2 v-else-if="current === 1" @nextStep="nextStep" @prevStep="prevStep"></step2>
      <step3 v-else-if="current === 2" @finish="finish"></step3>
    </div>

    <div class="antd-pro-pages-form-step-form-components-step1-index-desc" v-if="current === 0">
      <a-divider></a-divider>
      <h3>说明</h3>
      <h4>转账到支付宝账户</h4>
      <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
      <h4>转账到银行卡</h4>
      <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p></div>
  </a-card>
</template>

<script>
  import Step1 from './Step1'
  import Step2 from './Step2'
  import Step3 from './Step3'

  export default {
    name: 'StepForm',
    i18n: require('./i18n'),
    components: {
      Step1,
      Step2,
      Step3
    },
    data () {
      return {
        current: 0
      }
    },
    computed: {
      desc () {
        return this.$t('pageDesc')
      }
    },
    methods: {
      nextStep () {
        if (this.current < 2) {
          this.current++
        }
      },
      prevStep () {
        if (this.current > 0) {
          this.current--
        }
      },
      finish () {
        this.current = 0
      }
    }
  }
</script>

<style lang="less" scoped>
  .steps {
    max-width: 950px;
    margin: 16px auto;
  }
  .antd-pro-pages-form-step-form-components-step1-index-desc {
    padding: 0 56px;
    color: rgba(0,0,0,.45);
  }
  .antd-pro-pages-form-step-form-components-step1-index-desc h3 {
    margin: 0 0 12px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    line-height: 32px;
  }
  .antd-pro-pages-form-step-form-components-step1-index-desc h4 {
    margin: 0 0 4px;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
  }
</style>
