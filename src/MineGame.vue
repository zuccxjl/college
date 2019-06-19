<template>
  <div id="app" :style="{ backgroundImage: 'url(' + BgImg + ')' }">
    <h1>扫雷游戏</h1>
    <h2>当前用户为:{{player}}</h2>
    <div class="container">
      <div class="main">
        <table class="mine-table">
          <tr v-for="(rowItem, rIndex) of rows" :key="'row_' + rIndex">
            <!--<td
              :style="{ width: cellWidth + 'px', height: cellHeight + 'px' }"
              v-for="(colItem, cIndex) of cols"
              :key="'col_' + cIndex"
            ></td>-->
            <cell
              @clearboom="clearBoom"
              :cell-data="cellArray[rIndex * cols + cIndex]"
              :size="{ w: cellWidth, h: cellHeight }"
              v-for="(colItem, cIndex) of cols"
              :key="'col_' + cIndex"
            ></cell>
          </tr>
        </table>
      </div>
      <div class="aside">
        <el-radio-group @change="changeLevel" v-model="level" size="mini">
          <el-radio-button label="简单"></el-radio-button>
          <el-radio-button label="中级"></el-radio-button>
          <el-radio-button label="高级"></el-radio-button>
        </el-radio-group>

        <div class="block">
          <span class="demonstration">列数:{{ cols }}</span>
          <el-slider v-model="cols" :min="5" :max="20"></el-slider>
        </div>

        <div class="block">
          <span class="demonstration">行数:{{ rows }}</span>
          <el-slider v-model="rows" :min="5" :max="20"></el-slider>
        </div>

        <div class="block">
          <el-switch
            style="display: block"
            v-model="isCellWHSync"
            active-color="#13ce00"
            inactive-color="#ff4949"
            active-text="是否同步宽高"
          ></el-switch>
        </div>

        <div class="block">
          <span class="demonstration">行宽:{{ cellWidth }}</span>
          <el-slider v-model="cellWidth" :min="5"></el-slider>
        </div>

        <div class="block">
          <span class="demonstration">列高:{{ cellHeight }}</span>
          <el-slider v-model="cellHeight" :min="5"></el-slider>
        </div>
        <div class="block">
          <h1></h1>

          <el-button type="danger" @click="initCellData()">重置</el-button>
        </div>
      </div>
    </div>
    <play-sound src-sound="/boom.mp3"></play-sound>
    <timer></timer>
    <el-button type="info" @click="ToRule" plain>规则</el-button>
    <el-button type="success" @click="ToRank" plain>排行榜</el-button>
    <el-button type="primary" @click="ToRecommend" plain>游戏推荐</el-button>
    <el-button @click="handleRouter" label="注销" style="margin-right:0px position:absolute; ">注销</el-button>
  </div>
</template>

<script>
import Cell from "./components/Cell";
import PlaySound from "./components/PlaySound";
import Timer from "./components/Timer";
import EventBus from "./eventBus.js";

import "element-ui/lib/theme-chalk/index.css";
import GLOBAL from "../server/global_variable";

export default {
  name: "app",
  data: function() {
    return {
      player: GLOBAL.playUser,
      goal: 0,
      BgImg: "./back.jpg",
      level: "简单", //简单返回1 ，中级：2 高级：3 系数：0.15 雷数：cols*rows*level*系数
      cols: 10,
      rows: 10,
      cellWidth: 30,
      cellHeight: 30,
      isCellWHSync: true,
      //{isBoom: false, data: 2, isMarked: false, isClear: false}
      cellArray: [],
      //是否是重置状态
      isReset: true,
      isWin: false,
      winSpendTime: 0
    };
  },
  beforeCreate() {
   
  },
  created() {
    this.initCellData();
    document.oncontextmenu = () => {
      return false;
    };
    EventBus.$on("click-cell", () => {
      this.isReset && EventBus.$emit("start-timer");
      this.isReset = false;
    });

    EventBus.$on("boom-end", () => {
      this.boomEnd();
    });
    EventBus.$on("win-end", () => {
      this.winEnd();
    });
  },
  methods: {
    ToRule() {
      this.$router.push("/rule");
    },
    ToRecommend() {
      this.$router.push("/recommend");
    },
    ToRank() {
      this.$router.push("/rank");
    },
    handleRouter() {
      GLOBAL.playUser = "游客";
      this.$router.push("/login");
    },
    boomEnd() {
      //把棋盘所有信息显示出来
      this.cellArray.forEach(item => {
        if (item.isBoom) {
          this.$set(item, "isShowBoom", true);
        } else {
          this.$set(item, "isClear", true);
        }
      });
    },
    winEnd() {
      EventBus.$emit("goodgame", () => {});
      //把棋盘所有信息显示出来
      this.cellArray.forEach(item => {
        if (item.isBoom) {
          this.$set(item, "isShowBoom", true);
        } else {
          this.$set(item, "isClear", true);
        }
      });
      this.$http
        .post("http://localhost:3001/minegamesavegoal", {
          username: this.player,
          goal: GLOBAL.useTime
        })
        .then(response => {
          console.log(this.player);
          window.alert("恭喜通关,您本次共用时" + GLOBAL.useTime+"秒");
        });
    },
    //清理雷区
    clearBoom(index) {
      let sum = this.cols * this.rows;
      let alreadyClear = 1;
      //计算一共需要随机设置的地雷数
      let randomBooms = this.getLevelNum() * 0.15 * sum;
      for (let i = 0; i < sum; i++) {
        if (this.cellArray[i].isClear === true) {
          alreadyClear++;
        }
        if (alreadyClear === Math.floor(sum - randomBooms)) {
          this.isWin = true;
          console.log(this.isWin);
          EventBus.$emit("win-end");
        }
      }
      console.log(alreadyClear);
      const innerClearBoom = cIndex => {
        if (cIndex >= 0 && cIndex < this.cellArray.length) {
          let cell = this.cellArray[cIndex];
          if (cell.isMarked || cell.isBoom || cell.isClear) {
            return;
          } else {
            this.$set(this.cellArray[cIndex], "isClear", true);
            this.clearBoom(cIndex);
          }
        }
      };

      //如果当前自己不是0，直接清理
      let cell = this.cellArray[index];
      if (cell.data !== 0) {
        this.$set(cell, "isClear", true);
        return;
      }

      //如果是0，清除周围九宫格
      for (let i = -1; i <= 1; i++) {
        let startIndex = index - this.cols * i - 1;
        if (index % this.cols > 0) {
          innerClearBoom(startIndex);
        }

        innerClearBoom(startIndex + 1);

        if (index % this.cols < this.cols - 1) {
          innerClearBoom(startIndex + 2);
        }
      }
    },
    changeLevel() {
      this.initCellData();
    },
    initCellData() {
      //设置当前重置状态
      this.isReset = true;
      //this.EventBus.$emit()
      //动态初始化： cell数组，动态随机生成对象地雷数据
      let sum = this.cols * this.rows;
      //计算一共需要随机设置的地雷数
      let randomBooms = this.getLevelNum() * 0.15 * sum;
      let randomIndexSet = new Set(); //set的元素不能重复
      while (randomIndexSet.size < randomBooms) {
        randomIndexSet.add(Math.trunc(Math.random() * sum));
      }
      this.cellArray = []; //每次初始化前清空数组中的元素

      for (let i = 0; i < sum; i++) {
        let isBoom = randomIndexSet.has(i);
        let data = this.getBoomsNum(i, randomIndexSet);
        this.cellArray.push({
          isBoom,
          data,
          isShowBoom: false,
          isMarked: false,
          isClear: false,
          cellIndex: i
        });
        //this.$set(this.cellArray,i,{})
      }
      //console.log(randomIndexSet);
    },
    getBoomsNum(index, boomsSet) {
      let count = 0; //周围炸弹数
      for (let i = -1; i <= 1; i++) {
        let startIndex = index - i * this.cols - 1;
        if (index % this.cols > 0) {
          count += boomsSet.has(startIndex);
        }

        count += boomsSet.has(startIndex + 1);

        if (index % this.cols < this.cols - 1) {
          count += boomsSet.has(startIndex + 2);
        }
      }
      return count;
    },
    getLevelNum() {
      if (this.level === "简单") {
        return 1;
      } else if (this.level === "中级") {
        return 2;
      } else {
        return 3;
      }
    }
  },
  mounted: function() {
     var self = this;
    EventBus.$on("getUser", msg => {
      GLOBAL.playUser= msg;
      console.log("当前用户名：" +  msg);
    });
  },
  beforeDestroy() {
    EventBus.$off("boom-end");
    EventBus.$off("win-end");
    EventBus.$off("geruser");
  },
  watch: {
    cellWidth(newVal) {
      this.isCellWHSync && (this.cellHeight = newVal);
    },
    cellHeight(newVal) {
      this.isCellWHSync && (this.cellWidth = newVal);
    },
    rows() {
      this.initCellData();
    },
    cols() {
      this.initCellData();
    }
  },
  components: {
    cell: Cell,
    "play-sound": PlaySound,
    timer: Timer
  }
};
</script>

<style lang="scss">
.block {
  border-top: 1px solid #c09;
  margin: 0 auto;
}
#app {
  margin: 0 auto;
  h1 {
    text-align: center;
  }
  .container {
    margin: 0 auto;
    display: flex;
    & > div {
      border: 1px solid #ccc;
    }
  }
  .main {
    flex: 5 0 500px;
    min-height: 400px;
  }
  .aside {
    flex: 2 0 200px;
    min-height: 400px;
  }
  .mine-table {
    border-collapse: collapse;
    td {
      width: 30px;
      height: 30px;
      border: 1px solid rgb(209, 177, 201);
      background-color: rgb(101, 106, 153);
      border: outset;
    }
  }
}
</style>
