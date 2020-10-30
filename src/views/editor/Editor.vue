<template>
  <div>
    <wang-editor
      v-model="detail"
      :isClear="isClear"
      @change="change"
    ></wang-editor>

    <button @click="send">点我！</button>
  </div>
</template>
<script>
  import WangEditor from "./WangEditor";

  export default {
    components: { WangEditor },
    i18n: require('./i18n'),
    data() {
      return {
        isClear: false,
        detail: ""
      };
    },
    computed: {
      desc () {
        return this.$t('pageDesc')
      }
    },
    methods: {
      change(val) {
        console.log(val)
      },
      send() {
        alert(this.detail);
      }
    }
  };
</script>

<style></style>
