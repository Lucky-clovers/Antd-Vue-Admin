<template>
  <div style="max-width: 500px; margin: 40px auto 0; text-align: center">
    <result :title="$t('success')" :is-success="true" >
      <div slot="content">
        <template>
          <a-descriptions  :column="1">
            <a-descriptions-item :label="$t('payment')">
              ant-design@alipay.com
            </a-descriptions-item>
            <a-descriptions-item :label="$t('collection')">
              test@example.com
            </a-descriptions-item>
            <a-descriptions-item :label="$t('collectionName')">
              Alex
            </a-descriptions-item>
            <a-descriptions-item :label="$t('transferAmount')" >
              5000元
            </a-descriptions-item>

          </a-descriptions>
        </template>
      </div>
      <div slot="action">
        <a-button type="primary" @click="doOnceAgin">{{$t('doAgain')}}</a-button>
        <a-button style="margin-left: 8px">{{$t('bill')}}</a-button>
      </div>
    </result>
  </div>
</template>

<script>
  import Result from '@/components/result/Result'
  export default {
    name: 'Step3',
    i18n: require('./i18n'),
    components: {Result},
    methods: {
      doOnceAgin () {
        this.$emit('finish')
      }
    }
  }
</script>

<style scoped>

</style>
