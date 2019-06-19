<template>
  <el-container>
    <el-aside width="200px">
      ---------雷诀八条---------
      第一条：基本定式不要忘，现场推理真够呛。
      第二条：鼠标点击不要快，稳定节奏把空开。
      第三条：顺手标雷不要惯，积累下来记录悬。
      第四条：无从下手不要愣，就近猜雷把心横。
      第五条：遇到猜雷不要怕，爆了脸上不留疤。
      第六条：猜雷猜错不要悔，哭天抢地也白费。
      第七条：碰上好局不要慌，紧盯局部慢扩张。
      第八条：痛失好局不要恨，既然有缘定有份。
    </el-aside>
    <el-container>
      <el-header>扫雷规则介绍</el-header>
      <el-main>
        以windows XP自带扫雷winmine.exe为例（其它版本的扫雷游戏与之大同小异）。游戏区包括雷区、地雷计数器（位于左上角，记录剩余地雷数）和计时器（位于右上角，记录游戏时间），确定大小的矩形雷区中随机布置一定数量的地雷(初级为9*9个方块10个雷，中级为16*16个方块40个雷，高级为16*30个方块99个雷，自定义级别可以自己设定雷区大小和雷数，但是雷区大小不能超过24*30)，玩家需要尽快找出雷区中的所有不是地雷的方块，而不许踩到地雷。
        游戏的基本操作包括左键单击（Left Click）、右键单击（Right Click）、双击（Chording）三种。其中左键用于打开安全的格子，推进游戏进度；右键用于标记地雷，以辅助判断，或为接下来的双击做准备；双击在一个数字周围的地雷标记完时，相当于对数字周围未打开的方块均进行一次左键单击操作：
        左键单击：在判断出不是雷的方块上按下左键，可以打开该方块。如果方块上出现数字，则该数字表示其周围3×3区域中的地雷数（一般为8个格子，对于边块为5个格子，对于角块为3个格子。所以扫雷中最大的数字为8）；如果方块上为空（相当于0），则可以递归地打开与空相邻的方块；如果不幸触雷，则游戏结束。
        右键单击：在判断为地雷的方块上按下右键，可以标记地雷（显示为小红旗）。重复一次或两次操作可取消标记（如果在游戏菜单中勾选了“标记(?)”，则需要两次操作来取消标雷）。
      </el-main>
      <el-footer>
        <el-button @click="backToPlay">马上开玩</el-button>
      </el-footer>
    </el-container>
  </el-container>
</template>


<script>
export default {
  data() {
    return {};
  },

  methods: {
    backToPlay() {
      this.$router.push("/App");
    }
  }
};
</script>


<style>
.el-container {
  margin: 0 auto;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: left;
  line-height: 30px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: left;
  line-height: 30px;
  font-family: "微软雅黑";
}

body > .el-container {
  margin-bottom: 40px;
}
</style>