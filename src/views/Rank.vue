<template>
  <div>
    <el-container>
      <el-header>排行榜</el-header>
      <el-main>
        <el-table :data="tableData" stripe>
          <el-table-column prop="rank" label="排名" width="250"></el-table-column>
          <el-table-column prop="name" label="昵称" width="300"></el-table-column>
          <el-table-column prop="goal" label="成绩(s)" width="300"></el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-button @click="backToPlay">再次挑战</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          rank: "No.1",
          name: "王小虎",
          goal: "上海市普陀区金沙江路 1518 弄"
        },
        {
          rank: "No.2",
          name: "王小虎",
          goal: "上海市普陀区金沙江路 1517 弄"
        },
        {
          rank: "No.3",
          name: "王小虎",
          goal: "上海市普陀区金沙江路 1519 弄"
        },
        {
          rank: "No.4",
          name: "王小虎",
          goal: "上海市普陀区金沙江路 1516 弄"
        },
        {
          rank: "No.5",
          name: "王小虎",
          goal: "上海市普陀区金沙江路 1518 弄"
        },
        {
          rank: "No.6",
          name: "王小虎",
          goal: "上海市普陀区金沙江路 1517 弄"
        },
        {
          rank: "No.7",
          name: "王小虎",
          goal: "上海市普陀区金沙江路 1519 弄"
        },
        {
          rank: "No.8",
          name: "王小虎",
          goal: "上海市普陀区金沙江路 1516 弄"
        },
        {
          rank: "No.9",
          name: "王小虎",
          goal: "上海市普陀区金沙江路 1519 弄"
        },
        {
          rank: "No.10",
          name: "王小虎",
          goal: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  mounted: function() {
    this.loadRank();
  },
  methods: {
    loadRank() {
      var _this = this;
      this.$http.post("http://localhost:3001/minegamerank").then(res => {
        for (let i = 0; i < 10; i++) {
          _this.tableData[i].name = res.data[i].username;
          _this.tableData[i].goal = res.data[i].goal;
        }
      });
    },
    backToPlay() {
      this.$router.push("/App");
    }
  }
};
</script>

<style>
.el-table {
  text-align: center;
  margin: 0 auto;
  height: 750px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-footer {
  width: 100%;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
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
  text-align: center;
  line-height: 160px;
  margin: 0 auto;
}
</style>