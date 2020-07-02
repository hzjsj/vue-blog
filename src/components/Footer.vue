<template>
  <div class="k_footer">
      
      <p>Copyright © 2020-{{msg}} 王秀龙的博客 <a href="http://beian.miit.gov.cn/" target="_blank">皖ICP备19005551号-3</a></p>
     
    </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    msg: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.k_footer{
  text-align: center;
  color: #686868;
}
.k_footer a{
  color: #686868;
  text-decoration: none;
}
</style>
