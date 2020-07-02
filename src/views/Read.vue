<template>
  <div class="k_md">
    <h1>{{blog.title}}</h1>
    <p>{{blog.createTime}}</p>
    <div v-html="md"></div>
     <Footer :msg="msg" />
  </div>
</template>

<script>
//引入marked
const marked = require("marked");
const util = require("../assets/utils/util.js");
import Footer from "../components/Footer.vue";
export default {
  components: {
    Footer,
  },
  data() {
    return {
      md: "",
      blog: {},
      msg: 2020
    };
  },
  async created() {
    this.msg = new Date().getFullYear()
    //匿名登入
    await this.$cloudbase
      .auth({ persistence: "local" })
      .anonymousAuthProvider()
      .signIn();

    //通过指定id查询数据
    var id = this.$route.params.id;
    const queryResult = await this.$cloudbase
      .database()
      .collection("blog")
      .doc(id)
      .get();
    let list = queryResult.data[0];
    list.createTime = util.formatTime(list.createTime);
    this.blog = list;

    // 调用marked函数，传入markdown格式的内容，返回一段html
    this.md = marked(list.content);
  },
  methods: {}
};
</script>

<style>
.k_md {
  width: 80%;
  margin-left: 10%;
}
img {
  width: 100%;
}
</style>
