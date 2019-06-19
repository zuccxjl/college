<template>
  <el-container>
    <el-header>笔者推荐</el-header>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">游戏名称</el-menu-item>
      <el-submenu index="2">
        <template slot="title">类型</template>
        <el-menu-item index="2-1">角色扮演</el-menu-item>
        <el-menu-item index="2-2">休闲竞技</el-menu-item>
        <el-menu-item index="2-3">策略</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">社交</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">简介</el-menu-item>
      <el-menu-item index="4">
        <a href="http://game.163.com/" target="_blank">网易游戏</a>
      </el-menu-item>
    </el-menu>
    <el-table :data="tableData" style="width: 100% " max-height="1500" >
      <el-table-column fixed prop="name" label width="300"></el-table-column>
      <el-table-column prop="type" label width="100"></el-table-column>
      <el-table-column prop="info" label width="300"></el-table-column>
      <el-table-column prop="href" label width="300"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-col>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="info"
              size="small"
            >不再看此条</el-button>
          </el-col>

          <el-button
            @click.native.prevent="collect(scope.$index, tableData)"
            type="danger"
            size="small"
          >收藏</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="ToMinegame">返回</el-button>
  </el-container>
</template>





<style>

.el-header,
.el-footer {
  background-color: rgba(241, 52, 52, 0.933);
  font-size: 35px;
  font-style: italic;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-menu-item {
  width: 300px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

<script>
export default {
  methods: {
    ToMinegame() {
      this.$router.push("/App");
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    collect(index, rows) {}
  },
  data() {
    return {
      tableData: [
        {
          name: "《梦幻西游》",
          type: "角色扮演",
          info:
            "《梦幻西游》是一款由中国网易公司自行开发并营运的网络游戏。游戏以著名的章回小说《西游记》故事为背景，透过Q版的人物，试图营造出浪漫的网络游戏风格。",
          href: (
            <a href="http://xyq.163.com/?from=nietop">
              http://xyq.163.com/?from=nietop
            </a>
          )
        },
        {
          name: "《我的世界》",
          type: "休闲竞技",
          info:
            "我的世界（Minecraft）是一款沙盒类独立视频游戏。其灵感来自无尽矿工，由马库斯·泊松（Notch）开创，现由Mojang AB维护，是Xbox工作室的一部分。",
          href: (
            <a href="http://mc.163.com/?from=nietop">
              http://mc.163.com/?from=nietop
            </a>
          )
        },
        {
          name: "《率土之滨》",
          type: "策略",
          info:
            "《率土之滨》是由网易游戏制作发行的一款全自由实时沙盘战略手游，该作于2015年10月22日正式公测。游戏以三国历史为背景，讲述东汉末年的群雄割据，魏、蜀、吴三国之间的政治和军事斗争的故事。玩家可以扮演主公的身份，进入游戏去建造城池、生产资源、招兵买马等，来提高自己的军事实力，从而实现统一天下的愿望 [1-2] ",
          href: (
            <a href="https://stzb.163.com/tongren/">
              https://stzb.163.com/tongren/
            </a>
          )
        },
        {
          name: "《战意》",
          type: "竞技休闲",
          info:
            "《战意》 [1]  是一款冷兵器骑战网游 [2]  ，是网易游戏“不鸣工作室”2017年创新端游作品，致力打造一个波澜壮阔的古代战争世界。玩家将成为一名武将，统御各式兵马，于世界沙盘中往来杀伐、攻城略地。在《战意》中，玩家可以感受战马嘶鸣的旷野，巨兽眈视的城墙，可以在漫天的流石火羽中与敌人真刀真枪的肉搏，为领土与荣耀而战。",
          href: (
            <a href="https://z.163.com/zworld/">https://z.163.com/zworld/</a>
          )
        },
        {
          name: "《梦幻西游》",
          type: "角色扮演",
          info:
            "《梦幻西游》是一款由中国网易公司自行开发并营运的网络游戏。游戏以著名的章回小说《西游记》故事为背景，透过Q版的人物，试图营造出浪漫的网络游戏风格。",
          href: (
            <a href="http://xyq.163.com/?from=nietop">
              http://xyq.163.com/?from=nietop
            </a>
          )
        },
        {
          name: "《梦幻西游》",
          type: "角色扮演",
          info:
            "《梦幻西游》是一款由中国网易公司自行开发并营运的网络游戏。游戏以著名的章回小说《西游记》故事为背景，透过Q版的人物，试图营造出浪漫的网络游戏风格。",
          href: (
            <a href="http://xyq.163.com/?from=nietop">
              http://xyq.163.com/?from=nietop
            </a>
          )
        },
        {
          name: "《梦幻西游》",
          type: "角色扮演",
          info:
            "《梦幻西游》是一款由中国网易公司自行开发并营运的网络游戏。游戏以著名的章回小说《西游记》故事为背景，透过Q版的人物，试图营造出浪漫的网络游戏风格。",
          href: (
            <a href="http://xyq.163.com/?from=nietop">
              http://xyq.163.com/?from=nietop
            </a>
          )
        }
      ]
    };
  }
};
</script>