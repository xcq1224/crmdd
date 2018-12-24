<!--
<template>
 <div>
 <x-header :left-options="{'showBack': false}">上拉加载，下拉刷新</x-header>
 <scroller use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="loadMore"
    use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh"
    lock-x ref="scrollerBottom" height="-48">
    <div style="padding: 10px 0">
      <div class="box" v-for="i in list" :key="i">
          <p>公司名称{{i}}</p>
      </div>
    </div>
 </scroller>
 </div>
</template>
<script>
 import {Scroller, XHeader} from 'vux'
 
 const pulldownDefaultConfig = {
    content: '下拉刷新',
    height: 40,
    autoRefresh: false,
    downContent: '下拉刷新',
    upContent: '释放后刷新',
    loadingContent: '正在刷新...',
    clsPrefix: 'xs-plugin-pulldown-'
 }
 const pullupDefaultConfig = {
    content: '上拉加载更多',
    pullUpHeight: 60,
    height: 40,
    autoRefresh: false,
    downContent: '释放后加载',
    upContent: '上拉加载更多',
    loadingContent: '加载中...',
    clsPrefix: 'xs-plugin-pullup-'
 }
 export default {
 components: {
  XHeader,
  Scroller
 },
 mounted() {
  this.$nextTick(() => {
    this.$refs.scrollerBottom.reset({top: 0})
  })
  this.loadMore()
 },
 data() {
  return {
    list: 10,
    pullupDefaultConfig: pullupDefaultConfig,
    pulldownDefaultConfig: pulldownDefaultConfig
  }
 },
 methods: {
  fetchData(cb) {
    this.list = this.list + 10
    cb(this.list)
  },
  refresh() {
   this.list = this.list + 10
   this.$refs.scrollerBottom.enablePullup()
   this.$refs.scrollerBottom.donePulldown()
  },
  loadMore() {
    if (this.list >= 10) {
      this.$refs.scrollerBottom.disablePullup()
    }
    this.list = this.list + 10
    this.$refs.scrollerBottom.donePullup()
  }
 }
 }
</script>
<style lang="less">
 .box {
 padding: 30px 10px;
 }
 .xs-plugin-pulldown-container {
 line-height: 40px;
 }
 .xs-plugin-pullup-container {
 line-height: 40px;
 }
</style>
-->



<template>
 <div class="page">
 <x-header :left-options="{'showBack': false}">上拉加载，下拉刷新</x-header>
 <div class="main">
 	
 
	 <scroller use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="loadMore"
	    use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh"
	    lock-x ref="scrollerBottom" height="-48">
	  <div style="padding: 10px 0">
	  <div class="box" v-for="(item, index) in list" :key="index">
	   <p class="list">公司名称{{index}}</p>
	  </div>
	  </div>
	 </scroller>
 </div>
 </div>
</template>
<script>
 import {Scroller, XHeader} from 'vux'
 import axios from 'axios'
import { setTimeout } from 'timers';
 
 const pulldownDefaultConfig = {
 content: '下拉刷新',
 height: 40,
 autoRefresh: false,
 downContent: '下拉刷新',
 upContent: '释放后刷新',
 loadingContent: '正在刷新...',
 clsPrefix: 'xs-plugin-pulldown-'
 }
 const pullupDefaultConfig = {
 content: '上拉加载更多',
 pullUpHeight: 60,
 height: 40,
 autoRefresh: false,
 downContent: '释放后加载',
 upContent: '上拉加载更多',
 loadingContent: '加载中...',
 clsPrefix: 'xs-plugin-pullup-'
 }
 export default {
 components: {
  XHeader,
  Scroller
 },
 mounted() {
  this.$nextTick(() => {
    this.$refs.scrollerBottom.reset({top: 0})
  })
  this.loadMore()
 },
 data() {
  return {
  list: 0,
  pullupDefaultConfig: pullupDefaultConfig,
  pulldownDefaultConfig: pulldownDefaultConfig
  }
 },
 methods: {
  fetchData(cb) {
    var data = {"list": [1,2,3,4,5]}
    var that = this
  setTimeout(function(){
    that.$nextTick(() => {
      that.$refs.scrollerBottom.reset()
   })
    cb(10)
  }, 200)
  },
  refresh() {
    console.log(3)
  this.fetchData(data => {
   this.list = 10
   this.$refs.scrollerBottom.enablePullup()
   this.$refs.scrollerBottom.donePulldown()
  })
  },
  loadMore() {
  this.fetchData(data => {
      if (this.list >= 40) {
      		this.$refs.scrollerBottom.disablePullup()
      }else{
      	
	    console.log(4)
	   	this.list += 10
	   	this.$refs.scrollerBottom.donePullup()
      }
  })
  }
 }
 }
</script>
<style lang="less">
	.page{
		padding-bottom: 46px;
	}
	.main{
		padding-top: 46px;
	}
 .box {
 padding: 5px 10px 5px 10px;
 &:first-child {
  padding: 0 10px 5px 10px;
 }
 &:last-child {
  padding: 5px 10px 0 10px;
 }
 }
 .list {
 background-color: #fff;
 border-radius: 4px;
 border: 1px solid #f0f0f0;
 padding: 30px;
 }
 .xs-plugin-pulldown-container {
 line-height: 40px;
 }
 .xs-plugin-pullup-container {
 line-height: 40px;
 }
</style>