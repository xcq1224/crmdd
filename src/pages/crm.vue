<template>
    <div class="has-tabbar page"> 
        <div class="main">
            <p class="title">客户管理</p>
            <div class="flex-box">
                <router-link class="flex-item" to="./client">
                    <i class="iconfont icon-kehu"></i>
                    <p>营销客户</p>
                </router-link>
                <!-- <router-link class="flex-item" to="./clue">
                    <i class="iconfont icon-kehuguanli"></i>
                    <p>公海客户</p>
                </router-link> -->
                <router-link class="flex-item" to="./contacts">
                    <i class="iconfont icon-icon--"></i>
                    <p>客户联系人</p>
                </router-link>
                <!-- <router-link class="flex-item" to="./clue">
                    <i class="iconfont icon-yishoukuan"></i>
                    <p>收款管理</p>
                </router-link> -->
            </div>
            <p class="title">营销管理</p>
            <div class="flex-box">
                <router-link class="flex-item" to="./clue">
                    <i class="iconfont icon-hailiangxiansuo"></i>
                    <p>营销线索</p>
                </router-link>
                <router-link class="flex-item" to="./opportunity">
                    <i class="iconfont icon-shangji"></i>
                    <p>营销机会</p>
                </router-link>
                <router-link class="flex-item" to="./contract">
                    <i class="iconfont icon-hetong2"></i>
                    <p>营销合同</p>
                </router-link>
            </div>
            <p class="title">营销支持</p>
            <div class="flex-box">
                <!-- <router-link class="flex-item" to="./clue">
                    <i class="iconfont icon-fl-baobiao"></i>
                    <p>数据报表</p>
                </router-link> -->
                <router-link class="flex-item" to="./work_report">
                    <i class="iconfont icon-icon-test"></i>
                    <p>工作日志</p>
                </router-link>
                <router-link class="flex-item" to="./sign">
                    <i class="iconfont icon-dingwei"></i>
                    <p>拜访签到</p>
                </router-link>
                <!-- <router-link class="flex-item" to="./clue">
                    <i class="iconfont icon-tongxunlu"></i>
                    <p>通讯录</p>
                </router-link> -->
            </div>
        </div>

    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
        },
        data () {
            return {
                //  search
                results: [],
                value: '',

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
        
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
            
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .main{
        font-size: 12px;
        .title{
            padding-left: 10px;
            line-height: 32px;
        }
        .flex-box{
            text-align: center;
            display: flex;
            background: #fff;
            padding: 15px 0 5px;
            .flex-item{
                width: 25%;
            }
            i{
                font-size: 36px;
                color: #fff;
                background: @baseColor;
                padding: 10px;
                border-radius: 6px;
            }
            p{
                line-height: 28px;
            }
        }
    }
    
</style>

