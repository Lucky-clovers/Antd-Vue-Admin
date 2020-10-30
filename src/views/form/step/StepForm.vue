<template>
  <a-card :bordered="false">
    <a-steps class="steps" :current="current">
      <a-step :title="$t('input')" />
      <a-step :title="$t('confirm')" />
      <a-step :title="$t('complete')" />
    </a-steps>
    <div>
      <step1 v-if="current === 0" @nextStep="nextStep"></step1>
      <step2 v-else-if="current === 1" @nextStep="nextStep" @prevStep="prevStep"></step2>
      <step3 v-else-if="current === 2" @finish="finish" ></step3>
    </div>
    <a-divider></a-divider>
  </a-card>
</template>

<script>
  import Step1 from './Step1'
  import Step2 from './Step2'
  import Step3 from './Step3'

  export default {
    name: 'StepForm',
    i18n: require('./i18n'),
    components: {Step1, Step2, Step3},
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
    methods:{
      nextStep () {
        if (this.current < 2) {
          this.current ++
        }
      },
      prevStep(){
        if(this.current > 0){
          this.current --
        }
      },
      finish(){
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
</style>
