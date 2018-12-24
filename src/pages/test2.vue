<!--
  <template>
  <div style="text-align:center;">
    <popover placement="top" style="margin: 20px;" @on-show="onShow" @on-hide="onHide">
      <div slot="content" class="popover-demo-content">
        hello world
      </div>
      <button class="btn btn-default">23423</button>
    </popover>

    <popover>
      <div slot="content" class="popover-demo-content abc">
        <p @click="abc(0)">全部1</p>
        <p @click="abc(1)">全部2</p>
        <p @click="abc(2)">全部3</p>
        <p @click="abc(3)">全部4</p>
        <p @click="abc(4)">全部5</p>
      </div>
      <button class="btn btn-default">3253</button>
    </popover>
  </div>
</template>

<script>
import { Popover } from 'vux'

export default {
  components: {
    Popover
  },
  methods: {
    onShow () {
      console.log('on show')
    },
    onHide () {
      console.log('on hide')
    },
    abc(val){
      console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
  .abc{
    background: red;
    width: 100vw;
  }
</style>
-->



<template>
    <div class="has-tabbar page"> 
        <div class="header pst">
            <div class="search">
            	<div class="search-box" @click="search"><i class="weui-icon-search"></i>搜索</div>
            </div>
            <router-link to="./news" class="news active"><i class="iconfont icon-icon--"></i></router-link>
        </div>
        <div class="main" v-show="false">
            <tab :line-width=2 active-color='#b5e1fe' bar-active-color="#b5e1fe" :animate='false' v-model="index">
                <tab-item class="vux-center" :selected="index == 0" @click="index = 0">热门</tab-item>
                <tab-item class="vux-center" :selected="index == 1" @click="index = 1">精选</tab-item>
                <tab-item class="vux-center" :selected="index == 2" @click="index = 2">达人</tab-item>
                <tab-item class="vux-center" :selected="index == 3" @click="index = 3">干货</tab-item>
            </tab>
            <swiper v-model="index" :show-dots="false" height="100%">
                <swiper-item>
                    <div class="hot-card">
                        <div class="user-info">
                            <img src="../assets/avatar.jpg" width="28" height='28' alt="">&nbsp;&nbsp;曾庆全&nbsp;<i class='iconfont icon-zhongfu'></i>
                            <a class="active">+关注</a>
                        </div>
                        <div class="title">职场第一课，你应该知道哪些道理？</div>
                        <video src="http://bpic.588ku.com/video_listen/588ku_video/18/05/15/14/20/41/video5afa7c3928d6b.mp4"></video>
                        <div class="handle">企业大佬
                            <i class="iconfont icon-dianzan1"></i>
                            <i class="iconfont icon-pinglun"></i>
                            <i class="iconfont icon-ego-heart"></i>
                        </div>
                    </div>
                    <div class="hot-card">
                        <div class="user-info">
                            <img src="../assets/avatar.jpg" width="28" height='28' alt="">&nbsp;&nbsp;曾庆全&nbsp;<i class='iconfont icon-zhongfu'></i>
                            <a class="active">+关注</a>
                        </div>
                        <div class="title">职场第一课，你应该知道哪些道理？</div>
                        <video src="http://bpic.588ku.com/video_listen/588ku_video/18/05/21/12/16/37/video5b0248257ae31.mp4"></video>
                        <div class="handle">企业大佬
                            <i class="iconfont icon-dianzan1"></i>
                            <i class="iconfont icon-pinglun"></i>
                            <i class="iconfont icon-ego-heart"></i>
                        </div>
                    </div>
                    <div class="hot-card">
                        <div class="user-info">
                            <img src="../assets/avatar.jpg" width="28" height='28' alt="">&nbsp;&nbsp;曾庆全&nbsp;<i class='iconfont icon-zhongfu'></i>
                            <a class="active">+关注</a>
                        </div>
                        <div class="title">职场第一课，你应该知道哪些道理？</div>
                        <video src="http://bpic.588ku.com/video_listen/588ku_video/18/05/21/12/16/37/video5b0248257ae31.mp4"></video>
                        <div class="handle">企业大佬
                            <i class="iconfont icon-dianzan1"></i>
                            <i class="iconfont icon-pinglun"></i>
                            <i class="iconfont icon-ego-heart"></i>
                        </div>
                    </div>
                    <div class="hot-card">
                        <div class="user-info">
                            <img src="../assets/avatar.jpg" width="28" height='28' alt="">&nbsp;&nbsp;曾庆全&nbsp;<i class='iconfont icon-zhongfu'></i>
                            <a class="active">+关注</a>
                        </div>
                        <div class="title">职场第一课，你应该知道哪些道理？</div>
                        <video src="http://bpic.588ku.com/video_listen/588ku_video/18/05/21/12/16/37/video5b0248257ae31.mp4"></video>
                        <div class="handle">企业大佬
                            <i class="iconfont icon-dianzan1"></i>
                            <i class="iconfont icon-pinglun"></i>
                            <i class="iconfont icon-ego-heart"></i>
                        </div>
                    </div>
                    <div class="hot-card">
                        <div class="user-info">
                            <img src="../assets/avatar.jpg" width="28" height='28' alt="">&nbsp;&nbsp;曾庆全&nbsp;<i class='iconfont icon-zhongfu'></i>
                            <a class="active">+关注</a>
                        </div>
                        <div class="title">职场第一课，你应该知道哪些道理？</div>
                        <video src="http://bpic.588ku.com/video_listen/588ku_video/18/05/21/12/16/37/video5b0248257ae31.mp4"></video>
                        <div class="handle">企业大佬
                            <i class="iconfont icon-dianzan1"></i>
                            <i class="iconfont icon-pinglun"></i>
                            <i class="iconfont icon-ego-heart"></i>
                        </div>
                    </div>
                </swiper-item>
                <swiper-item class="chosen">
                    <div class="subnav">
                        <div>
                            <div class="subnav-item" :class="subnavIndex == 0 ? 'active' : ''" @click="isShow1 = !isShow1">技能学习<i class="iconfont icon-xia"></i></div>
                            <ul v-show="isShow1">
                                <li><a class="active" @click="isShow1 = false">全部</a></li>
                                <li><a>修理</a></li>
                                <li><a>学科</a></li>
                                <li><a>家教</a></li>
                                <li><a>宣传</a></li>
                                <li><a>闹钟</a></li>
                                <li><a>IT</a></li>
                                <li><a>IT</a></li>
                                <li><a>IT</a></li>
                                <li><a>IT</a></li>
                                <li><a>IT</a></li>
                                <li><a>IT</a></li>
                                <li><a>IT</a></li>
                                <li><a>IT</a></li>
                            </ul>
                        </div>
                        <div>
                            <div class="subnav-item" :class="subnavIndex == 1 ? 'active' : ''" @click="isShow2 = !isShow2">技能变现<i class="iconfont icon-xia"></i></div>
                            <ul v-show="isShow2">
                                <li><a class="active" @click="isShow2 = false">全部</a></li>
                                <li><a>修理</a></li>
                                <li><a>学科</a></li>
                                <li><a>家教</a></li>
                                <li><a>宣传</a></li>
                                <li><a>闹钟</a></li>
                                <li><a>IT</a></li>
                                <li><a>IT</a></li>
                                <li><a>IT</a></li>
                                <li><a>IT</a></li>
                                <li><a>IT</a></li>
                                <li><a>IT</a></li>
                                <li><a>IT</a></li>
                                <li><a>IT</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="chosen-card" @click="toDetail">
                        <img src="../assets/avatar.jpg">
                        <p class="title">穿衣也是有讲究的</p>
                        <p>云上塔兮 Abby</p>
                        <p><span class="num">1092</span>人在学<span class="sprice">￥35.00</span></p>
                    </div>
                    <div class="chosen-card" @click="toDetail">
                        <img src="../assets/avatar.jpg" width="118" height="70">
                        <p class="title">锻炼逻辑思维能力，开启机器人之旅开启机器人之旅开启机器人之旅</p>
                        <p>云上塔兮 Abby</p>
                        <p><span class="num">1092</span>人在学<span class="sprice">￥35.00</span></p>
                    </div>
                    <div class="chosen-card" @click="toDetail">
                        <img src="../assets/avatar.jpg" width="118" height="70">
                        <p class="title">锻炼逻辑思维能力，开启机器人之旅开启机器人之旅开启机器人之旅</p>
                        <p>云上塔兮 Abby</p>
                        <p><span class="num">1092</span>人在学<span class="sprice">￥35.00</span></p>
                    </div>
                    <div class="chosen-card" @click="toDetail">
                        <img src="../assets/avatar.jpg" width="118" height="70">
                        <p class="title">锻炼逻辑思维能力，开启机器人之旅开启机器人之旅开启机器人之旅</p>
                        <p>云上塔兮 Abby</p>
                        <p><span class="num">1092</span>人在学<span class="sprice">￥35.00</span></p>
                    </div>
                    <div class="chosen-card" @click="toDetail">
                        <img src="../assets/avatar.jpg" width="118" height="70">
                        <p class="title">锻炼逻辑思维能力，开启机器人之旅开启机器人之旅开启机器人之旅</p>
                        <p>云上塔兮 Abby</p>
                        <p><span class="num">1092</span>人在学<span class="sprice">￥35.00</span></p>
                    </div>
                    <div class="chosen-card" @click="toDetail">
                        <img src="../assets/avatar.jpg" width="118" height="70">
                        <p class="title">锻炼逻辑思维能力，开启机器人之旅开启机器人之旅开启机器人之旅</p>
                        <p>云上塔兮 Abby</p>
                        <p><span class="num">1092</span>人在学<span class="sprice">￥35.00</span></p>
                    </div>
                    <div class="chosen-card" @click="toDetail">
                        <img src="../assets/avatar.jpg" width="118" height="70">
                        <p class="title">锻炼逻辑思维能力，开启机器人之旅开启机器人之旅开启机器人之旅</p>
                        <p>云上塔兮 Abby</p>
                        <p><span class="num">1092</span>人在学<span class="sprice">￥35.00</span></p>
                    </div>
                    <div class="chosen-card" @click="toDetail">
                        <img src="../assets/avatar.jpg" width="118" height="70">
                        <p class="title">锻炼逻辑思维能力，开启机器人之旅开启机器人之旅开启机器人之旅</p>
                        <p>云上塔兮 Abby</p>
                        <p><span class="num">1092</span>人在学<span class="sprice">￥35.00</span></p>
                    </div>
                    <div class="chosen-card" @click="toDetail">
                        <img src="../assets/avatar.jpg" width="118" height="70">
                        <p class="title">锻炼逻辑思维能力，开启机器人之旅开启机器人之旅开启机器人之旅</p>
                        <p>云上塔兮 Abby</p>
                        <p><span class="num">1092</span>人在学<span class="sprice">￥35.00</span></p>
                    </div>
                </swiper-item>
                <swiper-item>
                    <div class="tab-swiper vux-center">
                        <div class="subnav">
                            <div>
                                <div class="subnav-item" :class="subnavIndex == 0 ? 'active' : ''" @click="isShow1 = !isShow1">企业大佬<i class="iconfont icon-xia"></i></div>
                                <ul v-show="isShow1">
                                    <li class="title">公司<i class="iconfont icon-xia"></i></li>
                                    <li><a class="active" @click="isShow1 = false">全部</a></li>
                                    <li><a>阿里</a></li>
                                    <li><a>腾讯</a></li>
                                    <li><a>塔兮</a></li>
                                    <li><a>锐博</a></li>
                                    <li class="title">职位<i class="iconfont icon-xia"></i></li>
                                    <li><a>全部</a></li>
                                    <li><a>总经理</a></li>
                                    <li><a>技术</a></li>
                                    <li><a>总监</a></li>
                                    <li><a>CEO</a></li>
                                    <li><a>IT</a></li>
                                    <li><a>IT</a></li>
                                    <li><a>IT</a></li>
                                </ul>
                            </div>
                            <div>
                                <div class="subnav-item" :class="subnavIndex == 1 ? 'active' : ''" @click="isShow2 = !isShow2">校园大牛<i class="iconfont icon-xia"></i></div>
                                <ul v-show="isShow2">
                                    <li class="title">学校<i class="iconfont icon-xia"></i></li>
                                    <li><a class="active" @click="isShow2 = false">清华</a></li>
                                    <li><a>北大</a></li>
                                    <li><a>华科</a></li>
                                    <li><a>武大</a></li>
                                    <li><a>华师</a></li>
                                    <li class="title">专业<i class="iconfont icon-xia"></i></li>
                                    <li><a>电子</a></li>
                                    <li><a>计算机</a></li>
                                    <li><a>经营</a></li>
                                    <li><a>人事</a></li>
                                    <li><a>哲学</a></li>
                                    <li class="title">技能<i class="iconfont icon-xia"></i></li>
                                    <li><a>修电脑</a></li>
                                    <li><a>编程</a></li>
                                    <li><a>家教</a></li>
                                    <li><a>代理</a></li>
                                    <li><a>美妆</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="talent-card" @click="toHomepage">
                            <img src="../assets/avatar.jpg" alt="">
                            <p class="title">曾庆全</p>
                            <p>云上塔兮 总经理，擅长人事管理，运营管理</p>
                            <p>1092人关注</p>
                            <span class="attention active">+关注</span>
                        </div>
                        <div class="talent-card">
                            <img src="../assets/avatar.jpg" alt="">
                            <p class="title">曾庆全</p>
                            <p>云上塔兮 总经理，擅长人事管理，运营管理</p>
                            <p>1092人关注</p>
                            <span class="attention active">+关注</span>
                        </div>
                    </div>
                </swiper-item>
                <swiper-item>
                    <div class="tab-swiper vux-center">Container4</div>
                </swiper-item>
            </swiper>
        </div>
        <search
            v-show="showSearch"
              @result-click="resultClick"
              @on-change="getResult"
              v-model="value"
              @on-focus="onFocus"
              @on-cancel="onCancel"
              @on-submit="onSubmit"
              ref="search"
              style="position:absolute;top:0;z-index:501;">
              <div slot="left">
                  <popover placement="bottom">
                      <div slot="content" class="search-tab-items">
                          <p :class="index == searchIndex?'active': ''" v-for="(item, index) in searchTabs" :key="index" @click="searchChoose(index)">{{searchTabs[index]}}</p>
                      </div>
                      <span class="search-tab">{{searchTabs[searchIndex]}}<i class="iconfont icon-xia"></i></span>
                  </popover>
              </div>
              <div slot="" class="result-box">
                  <div v-show="item.list.length" v-for="(item, index) in searchList" :key="index">
                    <div class="search-title">{{searchTabs[item.index]}}</div>
                    <div class="search-body" @click="resultClick(index)" v-for="(item1, index1) in item.list" :key="index1">
                        {{item1.title}}
                    </div>
                  </div>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg</p>
                  <p>estgzsg222222222222</p>
              </div>
          </search>
    </div>
</template>

<script>
    import { Search, Popover } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
    const list = () => ['热门', '精选', '达人', '干货']
    export default {
        components: {
            Search,
            Popover,

            Tab,
            TabItem,
            Sticky,
            Divider,
            XButton,
            Swiper,
            SwiperItem,
        },
        data () {
            return {
                //  search
                results: [],
                searchList: [{
                  index: 1,
                  list: [{'title': 'sdgjksjdg'},{'title': 'sdgjksjdg'}]
                },{
                  index: 2,
                  list: [{'title': 'sdgjksjdg'}]
                },{
                  index: 3,
                  list: [{'title': 'sdgjksjdg'}]
                },{
                  index: 4,
                  list: [{'title': 'sdgjksjdg'}]
                }],
                value: '',
                showSearch: false,
                searchIndex: 0,
                searchTabs: ['全部', '精选', '达人', '干货', '精选'],

                //  tab
                index: 0,

                //  精选
                subnavIndex: 0,
                isShow1: false,
                isShow2: false,
                isShow1: false,
                isShow1: false,
                chosenTop: 0,       //  精选tab的scrollTop高度

                

            }
        },
        activated(){
            document.getElementsByClassName('chosen')[0].scrollTop = this.chosenTop
            this.chosenTop = 0
        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
            //  search
            search(){
                this.showSearch = true
                var that = this
                setTimeout(function(){
                    that.$refs.search.setFocus()
                },0)
            },
            setFocus () {
                this.$refs.search.setFocus()
            },
            resultClick (index) {
                this.showSearch = false
                this.searchIndex = 0
                this.value = ''
                this.results = []
            },
            getResult (val) {
                console.log('on-change', val)
            },
            onSubmit () {
                this.$refs.search.setBlur()
                this.$vux.toast.show({
                    type: 'text',
                    position: 'top',
                    text: 'on submit'
                })
            },
            onFocus () {
                console.log('on focus')
            },
            onCancel () {
                this.showSearch = false
                this.searchIndex = 0
                this.value = ''
            },
            searchChoose(val){
                this.searchIndex = val
            },
            


            //  tab
            //  跳转到详情
            toDetail(e){
                this.chosenTop = document.getElementsByClassName('chosen')[0].scrollTop;
                this.$router.push('./detail')
            },
            //  跳转到个人主页
            toHomepage(){
                this.$router.push('./homepage')
            },
        },
    }
</script>

<style lang="less" scoped>
    @baseColor: #b5e1fe;
    .header{
        background: #b5e1fe;
        display: flex;
        height: 46px;
        .search{
            flex: 1;
            .weui-search-bar{
                background: #b5e1fe;
            }
        }
        .news{
            line-height: 46px;
            padding-right: 13px;
            color: #fff;
            position: relative;
            i{
                font-size: 24px;
            }
            &.active:after{
                content: '';
                position: absolute;
                top: 10px;
                right: 15px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: red;
            }
        }
    }
    .main{
        padding-top: 46px;
        overflow: hidden;
    }
    .vux-tab-wrap{
        z-index: 2;
    }
    .vux-slider{
        height: 100%;
        top: -88px;
        padding-top: 88px;
        box-sizing: border-box;
        z-index: 1;
    }
    .vux-swiper-item{
        height: 100%;
        overflow: auto;
    }
    .hot-card{
        padding: 10px 10px 3px;
        background: #fff;
        margin-bottom: 15px;
        color: #777;
        .user-info{
            img{
                border-radius: 50%;
                vertical-align: middle;
            }
            a{
                float: right;
                margin-top: 3px;
                height: 25px;
                width: 50px;
                text-align: center;
                line-height: 24px;
                border-radius: 4px;
                font-size: 13px;
                border: 1px solid #ccc;
                color: #ccc;
                &.active{
                    color: #fff;    
                    background: @baseColor;
                    border-color: @baseColor;
                }
            }
        }
        video{
            width: 100%;
            height: auto;
        }
        .title{
            font-weight: bold;
            margin: 5px 0 3px 10px;
        }
        .handle{
            color: #ccc;
            i{
                float: right;
                margin-right: 10px;
                font-size: 20px;
                line-height: 22px;
            }
        }
    }

    .subnav{
        height: 34px;
        padding-top: 6px;
        border-bottom: 1px solid #e5e5e5;
        margin-bottom: 10px;
        background: #fff;
        position: relative;
        >div{
            width: 50%;
            height: 24px;
            float: left;
            text-align: center;
            line-height: 24px;
            box-sizing: border-box;
            &:first-of-type{
                border-right: 1px solid #e5e5e5;
            }
            .subnav-item.active{
                color: @baseColor;
            }
        }
        ul{
            position: absolute;
            width: 100vw;
            top: 41px;
            left: 0;
            background: #fff;
            padding: 3px 7px 10px;
            box-sizing: border-box;
            overflow: hidden;
            z-index: 2;
            li{
                width: 20%;
                float: left;
                list-style: none;
                a{
                    display: block;
                    margin: 7px;
                    border: 1px solid @baseColor;
                    text-align: center;
                    line-height: 22px;
                    border-radius: 10px;
                    font-size: 12px;
                    &.active{
                        background: @baseColor;
                        color: #fff;
                    }
                }
                &.title{
                    width: 100%; 
                    text-align: left;
                    padding-left: 16px;
                }
                &.title:not(:first-of-type){
                    margin-top: 10px;
                }
            }
        }
    }
    .chosen-card{
        padding: 12px 8px;
        margin-bottom: 1px;
        background: #fff;
        overflow: hidden;
        font-size: 12px;
        img{
            float: left;
            border-radius: 8px;
            margin-right: 10px;
            width: 118px;
            height: 70px;
        }
        p{
            color: #ccc;
            &.title{
                color: #777;
                font-weight: bold;
                height: 38px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .num{
                color: #777;
            }
            .sprice{
                float: right;
                color: #f00;
                margin-right: 18px;
                font-weight: bold;
            }
        }
    }
    .talent-card{
        margin-bottom: 1px;
        background: #fff;
        padding: 10px;
        font-size: 12px;
        position: relative;
        img{
            width: 64px;
            height: 64px;
            border-radius: 50%;
            margin: 0 10px;
            float: left;
        }
        p{
            line-height: 22px;
        }
        .title{
            color: #333;
            font-weight: bold;
        }
        .attention{
            position: absolute;
            right: 10px;
            top: 4px;
        }
    }
    .attention{
        display: block;
        height: 25px;
        width: 50px;
        text-align: center;
        line-height: 24px;
        border-radius: 4px;
        font-size: 13px;
        border: 1px solid #ccc;
        color: #ccc;
        &.active{
            color: #fff;    
            background: @baseColor;
            border-color: @baseColor;
        }
    }
    
    
    .search-tab{
        background: #fff;
        padding: 0 2px 0 6px;
        display: block;
        height: 28px;
        font-size: 14px;
        i{
            font-size: 20px;
            line-height: 28px;
            vertical-align: middle;
        }
    }
    .search-tab-items{
        width: 64px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: #fff;
        text-align: center;
        color: #777;
        p{
            line-height: 26px;
            &:not(:last-of-type){
                border-bottom: 1px solid #ddd;
            }
            &.active{
                color: @baseColor;
            }
        }
    }
    .search-box{
        background: #fff;
        text-align: center;
        margin: 9px 10px;
        color: #ccc;
        height: 28px;
        line-height: 28px;
        border-radius: 4px;
        i{
            vertical-align: middle; 
            margin-right: 10px;
        }
    }
    .result-box{
      background: #f7f7f7;
      height: 100vh;
      overflow: auto;
      box-sizing: border-box;
      padding-bottom: 46px;
      .search-title{
        line-height: 36px;
        padding-left: 10px;
        font-size: 16px;
      }
      .search-body{
        background: #fff;
      }
    }
</style>

