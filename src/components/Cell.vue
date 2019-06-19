<template>
  <td
    :class="{
      boom: cellData.isShowBoom,
      'mine-clear': cellData.isClear,
      marked: cellData.isMarked
    }"
    @mousedown="cellClick"
    :style="{ width: size.w + 'px', height: size.h + 'px' }"
    class="cell"
  >
    <span
      :style="{ color: getNumColor(cellData.data) }"
      v-if="cellData.data != 0 && cellData.isClear"
      >{{ cellData.data }}</span
    >
  </td>
</template>

<script>
import EventBus from "../eventBus.js";
export default {
  name: "cell",
  data() {
    return {};
  },
  methods: {
    getNumColor(num) {
      switch (num) {
        case 1:
          return "#fff";
        case 2:
          return "#c6a";
        case 3:
          return "#08a";
        case 4:
          return "#0a2";
        case 5:
          return "#a20";
        case 6:
          return "#f30";
        default:
          return "#f90";
      }
    },
    cellClick(e) {
      //console.log(e.button);
      if (this.cellData.isClear) {
        return; //误操作，直接结束
      }

      EventBus.$emit("click-cell");

      //如果点击鼠标右键，标记为Marked状态
      if (e.button === 2) {
        this.$set(this.cellData, "isMarked", !this.cellData.isMarked);
      }
      //鼠标左键
      if (e.button === 0) {
        if (this.cellData.isBoom) {
          //点到炸弹，发送游戏结束的事件
          EventBus.$emit("boom-end");
          <play-sound src-soundx="/boom.mp3" />;
          console.log("Boom!");
        } else {
          //如果为marked状态,左键点击不做处理
          if (this.cellData.isMarked) {
            return;
          }
          EventBus.$emit("click-cell");

          //如果不是炸弹，让当前的单元格显示数字或者清除
          //this.$set(this.cellData, "isClear", true);
          //console.log("clear");
          //把要清理的坐标Index发送给父容器
          
          this.$emit("clearboom", this.cellData.cellIndex);
          if (this.isWin){
            EventBus.$emit("win-end");
            window.alert("恭喜您成功通关");
          }
        }
      }
    }
  },
  props: {
    cellData: {
      type: Object,
      required: true
    },
    size: {
      type: Object,
      required: false,
      default: function() {
        return {
          w: 30,
          h: 30
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
td {
  text-align: center;
  vertical-align: middle;
}
.mine-clear {
  background-color: #333 !important;
}
.marked {
  background-image: url(/flagt.png) !important;
  background-size: cover;
}
.boom {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(/bom.png) !important;
    background-size: contain;
  }
}
</style>
