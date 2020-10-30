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
    data() {
      return {
        isClear: false,
        detail: ""
      };
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
