<template>
  <div class="playsound">
    <audio ref="sd" :src="srcSound"></audio>
  </div>
</template>

<script>
import EventBus from "../eventBus.js";

export default {
  name: "playsound",
  props: {
    srcSound: {
      type: String,
      required: true
    }
  },
  created() {
    EventBus.$on("boom-end", () => {
      this.$refs.sd.play();
    });
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.playsound {
  height: 0;
  width: 0;
  visibility: hidden;
  position: absolute;
}
</style>
