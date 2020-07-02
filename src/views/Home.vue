<template>
  <div class="block">
      <el-form class="k_form" :inline="true">
        <el-form-item>
          <el-input v-model="titile" placeholder="文章查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    <el-timeline>
      <el-timeline-item
        v-for="item in blogs"
        :key="item._id"
        :timestamp="item.createTime"
        placement="top">
        <el-card>
          <h4 v-on:click="selectItem(item._id)">{{item.title}}</h4>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <div class="k_page" v-if="page">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :page-size="6"
        :total="total"
      ></el-pagination>
    </div>

     <Footer :msg="msg" />
  </div>
</template>
<script>
const util = require("../assets/utils/util.js");
import Footer from "../components/Footer.vue";
export default {
  components: {
    Footer,
  },
  data() {
    return {
      blogs: [],
      total: 0,
      msg: 2020,
      titile:'',
      page:true
    };
  },
  async created() {
    this.msg = new Date().getFullYear()
    // 以匿名登录为例
    await this.$cloudbase
      .auth({ persistence: "local" })
      .anonymousAuthProvider()
      .signIn();
    
    //获取文章总数
    await this.$cloudbase
      .database()
      .collection("blog")
      .count()
      .then(res => {
        this.total = res.total;
      });
    this.getArticle(0);
  },
  methods: {
    //获取文章列表
    async getArticle(p) {
      await this.$cloudbase
        .callFunction({
          name: "getArticle",
          data: {
            title:this.titile,
            skip: 6 * p // 分页查询跳过 skip 条数据
          }
        })
        .then(res => {
          const result = res.result; //云函数执行结果
          var data = res.result.data;
          for (let i = 0; i < data.length; i++) {
            //时间格式转换
            data[i]["createTime"] = util.formatTime(new Date(data[i]["createTime"]))
          }
          this.blogs = data;
        });
    },

    //查询按钮点击时间
    onSubmit:function(){
      this.getArticle(0);
      this.page = this.titile ? false : true; //判断输入框是否有值，来显示分页
    },

    //页面切换，调用函数获取当前页数据
    handleCurrentChange(val) {
      this.getArticle(val - 1); 
    },

    //列表跳到详情页
    selectItem: function(event) {
      this.$router.push({
        path: `/read/${event}`
      });
    }
  }
};
</script>

<style>
.block {
  width: 80%;
  margin-top: 30px;
  margin-left: 10%;
}
.k_page {
  text-align: center;
}
.k_form{
  text-align: right;
}
</style>
