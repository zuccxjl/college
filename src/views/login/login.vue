<template>
  <div id="login">
    <div class="logo"></div>
    <div class="login-wrap" v-show="showLogin">
      <h3>登录</h3>
      <p v-show="showTishi">{{ tishi }}</p>
      <input type="text" placeholder="请输入用户名" v-model="username">
      <input type="password" placeholder="请输入密码" v-model="password">
      <el-button @click="handleRouter">游客游玩</el-button>
      <button v-on:click="login()">登录</button>
      <span v-on:click="ToRegister">没有账号？马上注册</span>
    </div>

    <div class="register-wrap" v-show="showRegister">
      <h3>注册</h3>
      <p v-show="showTishi">{{ tishi }}</p>
      <input type="text" placeholder="请输入用户名" v-model="newUsername">
      <input type="password" placeholder="请输入密码" v-model="newPassword">
      <el-button @click="handleRouter">游客游玩</el-button>
      <button v-on:click="register">注册</button>
      <span v-on:click="ToLogin">已有账号，马上登录</span>
    </div>
  </div>
</template>



<script>
import EventBus from "../../eventBus.js";
export default {
  data() {
    return {
      showLogin: true,
      showRegister: false,
      showTishi: false,
      tishi: "",
      username: "",
      password: "",
      newUsername: "",
      newPassword: ""
    };
  },

  methods: {
    handleRouter() {
      this.$router.push("/App");
    },

    login(event) {
      if (this.username === "" || this.password === "") {
        alert("请输入用户名或密码");
      } else {
        this.$http
          .post("http://localhost:3001/minegamelogin", {
            username: this.username,
            password: this.password
          })
          .then(response => {
            EventBus.$emit("getUser", this.username);
            this.$router.push("/App");
            console.log(response.data);
          });
      }
    },

    register() {
      if (this.newUsername === "") {
        window.alert("请输入用户名");
      } else if (this.newPassword === "") {
        window.alert("请输入密码");
      } else {
        this.$http
          .post("http://localhost:3001/minegameregister", {
            newUsername: this.newUsername,
            newPassword: this.newPassword
          })
          .then(response => {
            window.alert("注册成功，返回登录界面");
            this.showLogin = true;
            this.showRegister = false;
            console.log(response.data);
          });
      }
    },

    ToRegister() {
      this.showRegister = true;
      this.showLogin = false;
    },
    ToLogin() {
      this.showLogin = true;
      this.showRegister = false;
    }
  },
  beforeDestroy() {
    this.$http.post("http://localhost:3001/minegamelogin", {
      username: this.username,
      password: this.password
    });
  }
};
</script>

<style>
.logo {
  margin: 0 auto;
  height: 200px;
  width: 300px;
  background-size: auto;
  background-image: url(/logo.jpg) !important;
}
.login-wrap {
  text-align: center;
  margin: 0 auto;
}
.register-wrap {
  text-align: center;
  margin: 0 auto;
}
input {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid #888;
  padding: 10px;
  box-sizing: border-box;
}
p {
  color: red;
}
button {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  border: none;
  background-color: #41b883;
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
}
span {
  cursor: pointer;
}
span:hover {
  color: #41b883;
}
</style>