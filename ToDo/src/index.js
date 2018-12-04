
import Vue from 'vue';
import TodoList from './TodoList.vue';
Vue.prototype.axios = require('axios');
Vue.prototype.qs = require('qs');

new Vue({
  el: '#app',
  components: { TodoList },
  template: '<TodoList/>'
})
