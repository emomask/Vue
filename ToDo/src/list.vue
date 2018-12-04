<template>
<div class="list">
  <div class="state">
    <span>未完成：{{intr.list.length-intr.finis}} 个</span>
    <span>已完成：{{intr.finis}} 个</span>
    <span>任务总数：{{intr.list.length}} 个</span>
  </div>
  <ul>
    <li v-for="(item,index) in data.show" :key="index">
      <div :style="item.istype==0?'':'text-decoration:line-through'">{{item.content}}</div>
      <span @click="edit(index)">修改</span>
      <span @click="finish(index)">完成</span>
      <span @click="del(index)">删除</span>
    </li>
  </ul>
  <div>{{data.list}}</div>
</div>
</template>
<script>
// import  from "axios";
export default {
  props:['intr'],
  data(){
    return{
      data:this.intr
    }
  },
  created(){
    // console.log(this)
  },
  computed:{
  },
  methods:{
    finish(i){
      if(this.data.show[i].istype == 1) return '';
      this.data.show[i].istype = 1;
      this.data.finis +=1;
      for(let a in this.data.list){
        if(this.data.list[a]._id == this.data.show[i]._id){
          this.data.list[a].istype = 1;
          let req = {
            url:'https://api.hedingheng.com/Todo/update/istype',
            data:{
              id:this.data.list[a]._id,
              istype:this.data.list[a].istype
            }
          }
          this.ajax(req,res=>{});
          return 0;
        }
      }
    },
    del(i){
      this.data.show[i].istype == 1 && this.data.finis--;
      let req = {
        url:'https://api.hedingheng.com/Todo/delete',
        data:{
          id:this.data.show[i]._id,
        }
      };
      this.ajax(req,res=>{});
      for(let a in this.data.list){
        this.data.list[a]._id == this.data.show[i]._id&&this.data.list.splice(a,1);
      };
      this.data.show.splice(i,1);
    },
    edit(i){
      if(this.data.show[i].istype != 0) return alert('该任务已完成，不可修改！');
      let content = prompt("请输入修改内容！");
      if(!content) return 0;
      this.data.show[i].content = content;
      let req = {
        url:'https://api.hedingheng.com/Todo/update/content',
        data:{
          id:this.data.show[i]._id,
          content:data.show[i].content
        }
      };
      this.ajax(req,res=>{});
    },
    //todo-ajax请求函数
    ajax:function(req,ret){
      this.axios({
        method:'post',
        url:req.url,
        headers: {
          'Content-Type':'application/x-www-form-urlencoded'
        },
        data:this.qs.stringify(req.data)
      }).then(res=>{ret(res)});
    }
  }
}
</script>

