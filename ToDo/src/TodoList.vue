<template>
  <div class="page">
    <div>{{this.datas.list}}</div>
    <div class="inp">
      <input v-model="inputVal" type="text" placeholder="添加任务。。。。" />
      <button @click="setAdd">添加</button>
      <button @click="seeAbout" style="margin-left:1px;">查询</button>    
    </div>
    <List :intr="datas"></List>
  </div>
</template>
<style src="./static/css/app.css"></style>
<script>
import List from './list.vue';

export default {
  components:{List},
  data(){
    return{
      inputVal:'',
      datas:{
        list:[],//全部内容
        show:[],//显示内容
        finis:0,
      }
    }
  },
  created(){
    // console.log(this.datas.list);
    this.getAll();
  },
  mounted(){
  },
  methods:{
    getAll () {
      let req = {url:'https://api.hedingheng.com/Todo/all'};
      this.ajax(req,res=>{
        if(res.status != '200') return '';
        if(res.data.code != 0) return '';
        this.datas.list = res.data.data;//所有任务内容
        this.datas.list.reverse();//所有内容反序 
        this.datas.show = this.datas.list;//显示任务内容
        //计算任务完成数量
        for(let i in this.datas.list){
          this.datas.list[i].istype == 1&&this.datas.finis++;
        }
      })
    },
    setAdd(){
      if(this.inputVal=='')return alert('添加任务不允许为空！');
      for (let i in this.datas.list) {
        if (this.datas.list[i].content == this.inputVal) {
          alert('该任务已添加，请勿重复添加！')
          return this.inputVal = '';;
        }
      };
      let req = {
        url:'https://api.hedingheng.com/Todo/add',
        data:{content:this.inputVal}
      };
      this.ajax(req,res=>{
        if(res.status != '200') return '';
        if(res.data.code != 0) return '';
        this.datas.list.unshift(res.data.data);
        this.datas.show = this.datas.list;
        this.inputVal = '';
      })
    },
    seeAbout(){
      this.datas.show = [];
      this.datas.list.forEach(item=>{
        if(item.content.indexOf(this.inputVal)>-1){
          this.datas.show.push(item);
        };
      });
    },
    // showListData(data){
    //   this.datas = data;
    // },
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
  },
  computed:{
   
  }
}
</script>


