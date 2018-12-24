// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import store from './store'
import App from './App'
import 'lib-flexible/flexible.js'
import  { ConfirmPlugin, LoadingPlugin, ToastPlugin, DatetimePlugin  } from 'vux'
import axios from 'axios'
//  省市区选择
import cityData from "./js/cityData"
//  定位
import "./js/geolocation.min"
//  动态标题
// import { setMetaTitle } from './js/util'
// 设置title
// Vue.directive('title', {
//   inserted: function (el, binding) {
//     setMetaTitle(binding.value)
//   }
// })

import wx from 'weixin-js-sdk'
Vue.prototype.wx = wx

import dd from 'dingtalk-jsapi';
window.dd = dd

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(DatetimePlugin)
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios

/**
 * 
 * @param {接口名} url 
 * @param {post请求参数} params 
 * @param {请求成功回调} success 
 * @param {请求失败回调} error 
 */
Vue.prototype.$post = function(action, params, success, error) {
  let url = '/iims4' + action + '.do'
  this.$axios.post(url,params).then(res => {
    this.$vux.loading.hide()
    if(res.data.flag){
      if(success) success(res.data)
    }else{
      this.toastFail(res.data.message || '网络异常，请稍后再试', '200px')
      if(error) error(res.data)
    }
  }).catch(res=>{
    this.$vux.loading.hide()
    this.toastFail('网络异常，请稍后再试', '200px')
    }
  )
}

//  跳转前检查是否有权限
Vue.prototype.jumpCheck = function(page, id, tableName, pageId){
    this.$vux.loading.show()
    let params = {
        id: id
    }
    if(tableName) params["tableName"] = tableName
    if(!pageId) pageId = id
    this.$post("/crm/memberPR/isCheck", params, (data) => {
        if(data.isCheck){
            this.$router.push('./' + page + '?id=' + pageId)
        }else{
            this.toastFail("您没有权限查看", "160px")
        }
    })
}

//  获取省市区数据
Vue.prototype.cityData = function(){
  return cityData.data
}
//  获取省市区
Vue.prototype.code2area = function(arr){
  return cityData.code2area(arr)
}

//  当前页面跳转
Vue.prototype.replaceRouter = function(url){
  this.$router.replace(url)
}

//  返回
Vue.prototype.goBack = function(){
  this.$router.go(-1)
}

//  设置cookie
Vue.prototype.setCookie = function(c_name,value,expiredays){
  var exdate=new Date()
  exdate.setDate(exdate.getDate()+expiredays)
  document.cookie = c_name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
//  获取cookie
Vue.prototype.getCookie = function(c_name){
  if (document.cookie.length>0){
    let c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1){ 
        c_start=c_start + c_name.length+1 
        let c_end=document.cookie.indexOf(";",c_start)
        if (c_end==-1) c_end=document.cookie.length
        return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
  return ""
}
//  删除cookie
Vue.prototype.delCookie = function(name){
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval= this.getCookie(name);
  if(cval!=null)
  document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

//  成功提示
Vue.prototype.toastSuccess = function(text, width){
  this.$vux.toast.show({
      text: text,
      type: "text",
      width: width || '100px',
      time: 800,
      position: 'top',
  })
}

//  失败提示
Vue.prototype.toastFail = function(text, width){
  this.$vux.toast.show({ 
      text: '<span style="color:#f90">' + text + '</span>',
      type: "text",
      width: width || '100px',
      time: 1600,
      position: 'top',
  })
}

/**
 * 对象深拷贝
 * @param {要拷贝的对象} obj 
 */
Vue.prototype.deepClone = function(initalObj) {
  var obj = {};
  obj = JSON.parse(JSON.stringify(initalObj));
  return obj;
}

/**
 * 日期格式化
 * @param {日期} datetime
 * @param {格式化类型} fmt
 */
Vue.prototype.formatDate = function(datetime, fmt){
  var fmt = fmt || 'yyyy-MM-dd';
  var o = {
      "M+": datetime.getMonth() + 1, //月份
      "d+": datetime.getDate(), //日
      "h+": datetime.getHours(), //小时
      "m+": datetime.getMinutes(), //分
      "s+": datetime.getSeconds(), //秒
      "q+": Math.floor((datetime.getMonth() + 3) / 3), //季度
      "S": datetime.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (datetime.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/**
 * 获取本周日期
 * @param {当前时间字符串} currentTime 
 */
Vue.prototype.getDates = function(currentTime){
  var currentDate = new Date(currentTime)
  var timesStamp = currentDate.getTime();
  var currenDay = currentDate.getDay();
  var dates = [];
  for (var i = 0; i < 7; i++) {
      dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/\//g, '-'));
  }
  return dates
}

Date.prototype.format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

//  动态title
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    dd.biz.navigation.setTitle({
      title : to.meta.title,//控制标题文本，空字符串表示显示默认文本
      onSuccess : function(result) {},
      onFail : function(err) {}
    });
    document.title = to.meta.title;
  }
  next()
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  created: function(){
    //在页面加载时读取localStorage里的状态信息
    localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userMsg"))));
    
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
        localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
    })
  },
  render: h => h(App)
}).$mount('#app-box')


