<template>
  <div class="timer">{{ hh }}小时 {{ mm }}分钟 {{ ss }}秒</div>
</template>

<script>
import EventBus from "../eventBus.js";
import { setInterval, clearInterval } from "timers";
import GLOBAL from "../../server/global_variable";
export default {
  name: "",
  data() {
    return {
      hh: "00",
      mm: "00",
      ss: "00",
      startTime: 0,
      endTime: 0,
      timerId: 0
    };
  },
  created() {
    EventBus.$on("boom-end", () => {
      this.endTime = Date.now();
      this.showTimer(this.endTime - this.startTime);
      clearInterval(this.timerId);
    });
    EventBus.$on("goodgame", () => {
      var a=this;
      this.endTime = Date.now();
      this.showTimer(this.endTime - this.startTime);
      var h=parseInt(a.hh);
      var m=parseInt(a.mm);
      var s=parseInt(a.ss);
      GLOBAL.useTime=h*3600+m*60+s;
      clearInterval(this.timerId);
    });

    EventBus.$on("start-timer", () => {
      this.startTime = Date.now();
      this.timerId = setInterval(() => {
        let s = Date.now() - this.startTime;
        this.showTimer(s);
      }, 500);
    });
  },
  methods: {
    showTimer(s) {
      this.ss = String(Math.trunc(s / 1000) % 60).padStart(2, "0");
      this.mm = String(Math.trunc(s / (1000 * 60)) % 60).padStart(2, "0");
      this.hh = String(Math.trunc(s / (1000 * 60 * 60)) % 60).padStart(2, "0");
    }
  }
};
</script>

<style lang="scss" scoped></style>
