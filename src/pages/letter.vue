<template>
    <div class="page">
        <tab :line-width="2" custom-bar-width="60px" class="pst">
            <tab-item :selected="tabIndex == 0" @click.native="tabIndex = 0">收件箱</tab-item>
            <tab-item :selected="tabIndex == 1" @click.native="tabIndex = 1">发件箱</tab-item>
        </tab> 
        <div class="main">
            <div v-show="tabIndex == 0">
                <div class="notice-item" v-for="(item, index) in mailToList" :key="index" @click="check(index, 1, item)">
                    <p :class="item.ifRead == 0 ? 'active title' : 'title'">{{item.title}}</p>
                    <span class="datetime">{{formatDate(new Date(item.createTime), 'yyyy-MM-dd hh:mm:ss')}} &nbsp;&nbsp;发件人：{{item.createrCname}}</span>
                    <p class="content" v-show="showIndex1 == index">{{item.content}}</p>
                </div>
                <div class="empty" style="text-align: center;line-height: 40px;">{{empty1}}</div>
            </div>
            <div v-show="tabIndex == 1">
                <div class="notice-item" v-for="(item, index) in mailList" :key="index" @click="check(index, 2)">
                    <p class="title">{{item.title}}</p>
                    <span class="datetime">{{formatDate(new Date(item.createTime), 'yyyy-MM-dd hh:mm:ss')}} &nbsp;&nbsp;收件人：{{item.receivers}}</span>
                    <p class="content" v-show="showIndex2 == index">{{item.content}}</p>
                </div>
                <div class="empty" style="text-align: center;line-height: 40px;">{{empty2}}</div>
            </div>
        </div>
        <div class="footer" v-show="tabIndex == 0" @click="setAllReady">全部标记为已读</div>
        <router-link v-show="tabIndex == 1" to="./letter_add" class="footer">新增</router-link>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, Tab, TabItem } from 'vux'
    import { Divider } from 'vux'

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            Divider,
            Tab, 
            TabItem,
        },
        data () {
            return {
                tabIndex: 0,    //  0:收件箱； 1:发件箱
                showIndex1: -1, //  收集箱展开
                showIndex2: -1, //  发件箱展开
                mailList: [],   //  发件箱
                mailToList: [], // 收件箱
                empty1: '',
                empty2: '',
            }
        },
        activated(){
            this.$vux.loading.show()
            this.empty1 = ''
            this.empty2 = ''
            this.getMailTo()
            this.getMail()
        },
        methods: {
            //  获取发件箱
            getMail(){
                this.$post("/api/IimsMailPR/getMail", {}, (data) => {
                    this.mailList = data.list
                    this.empty2 = this.mailList.length ? '' : '暂无数据'
                })
            },
            //  获取收件箱
            getMailTo(){
                this.$post("/api/IimsMailPR/getMailTo", {}, (data) => {
                    this.mailToList = data.list
                    this.empty1 = this.mailToList.length ? '' : '暂无数据'
                })
            },
            check(index, type, item){
                if(type == 1){
                    if(!item.content){
                        this.$post("/api/IimsMailPR/getMailContent", {id: item.parentId}, (data) => {
                            item.content = data.mail.content
                            item.ifRead = 1
                            this.showIndex1 = this.showIndex1 == index ? -1 : index
                        })
                    }else{
                        this.showIndex1 = this.showIndex1 == index ? -1 : index
                    }
                }else{
                    this.showIndex2 = this.showIndex2 == index ? -1 : index
                }
            },
            setAllReady(){
                this.$post("/api/IimsMailPR/setIsReady", {}, (data) => {
                    this.mailToList.map((item) => {
                        item.ifRead = 1
                    })
                })
            },
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .main{
        font-size: 12px;
        padding-top: 46px;
        padding-bottom: 40px;
        background: #f6f6f6;
        .notice-item{
            padding: 10px;
            border-bottom: 1px solid #ddd;
            background: #fff;   
            p{
                line-height: 18px;
                margin: 5px 0;
                &.active{
                    font-weight: bold;
                    color: #333;
                }
            }
            .datetime, .content{
                color: #ccc;
            }
            &:last-of-type{
                border-bottom: none;
            }
        }
    }
    .footer{
        position: absolute;
        z-index: 5;
        bottom: 0;
        width: 100%;
        height: 40px;
        background: @baseColor;
        text-align: center;
        color: #fff;
        line-height: 40px;
        font-size: 14px;
    }
</style>



