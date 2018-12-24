<template>
    <div class="has-tabbar page">
        <div class="header">
            <span :class="tabIndex==0?'active':''" @click="changeTab(0)">本周</span>
            <span :class="tabIndex==1?'active':''" @click="changeTab(1)">本月</span>
            <span :class="tabIndex==2?'active':''" @click="changeTab(2)">本年</span>
        </div>
        <div class="main">
            <p class="title">营销简报</p>
            <div class="flex-box">
                <div class="flex-item">
                    <i class="iconfont icon-hetong2"></i>
                    <span>合同总金额</span>
                    <br>
                    <p>￥48999.00</p>
                </div>
                <div class="flex-item">
                    <i class="iconfont icon-hetong2"></i>
                    <span>合同数</span>
                    <br>
                    <p>10</p>
                </div>
                <div class="flex-item">
                    <i class="iconfont icon-wodeshangjizhuanhuan"></i>
                    <span>赢单机会总金额</span>
                    <br>
                    <p>￥48999.00</p>
                </div>
                <div class="flex-item">
                    <i class="iconfont icon-wodeshangjizhuanhuan"></i>
                    <span>赢单机会数</span>
                    <br>
                    <p>20</p>
                </div>
                <div class="flex-item">
                    <i class="iconfont icon-yishoukuan"></i>
                    <span>计划收款金额</span>
                    <br>
                    <p>￥48999.00</p>
                </div>
                <div class="flex-item">
                    <i class="iconfont icon-yishoukuan"></i>
                    <span>实际收款金额</span>
                    <br>
                    <p>￥48999.00</p>
                </div>
            </div>
            <p class="title">营销过程</p>
            <div class="flex-box">
                <div class="flex-item">
                    <i class="iconfont icon-xiansuogenjin"></i>
                    <span>新增线索</span>
                    <br>
                    <p>3</p>
                </div>
                <div class="flex-item">
                    <i class="iconfont icon-kehuguanli"></i>
                    <span>新增客户</span>
                    <br>
                    <p>2</p>
                </div>
                <div class="flex-item">
                    <i class="iconfont icon-wodeshangjizhuanhuan"></i>
                    <span>新增机会数</span>
                    <br>
                    <p>￥48999.00</p>
                </div>
                <div class="flex-item">
                    <i class="iconfont icon-hetong2"></i>
                    <span>新增合同数</span>
                    <br>
                    <p>20</p>
                </div>
                <div class="flex-item">
                    <i class="iconfont icon-bianji"></i>
                    <span>总跟进数</span>
                    <br>
                    <p>￥48999.00</p>
                </div>
                <div class="flex-item">
                    <i class="iconfont icon-dingwei"></i>
                    <span>拜访签到</span>
                    <br>
                    <p>￥48999.00</p>
                </div>
            </div>
            <p class="title">营销漏斗</p>
            <div class="funnel">
                <div>
                    <span>初步洽谈(100)￥10000.00</span>
                    <div class="bar bar1"></div>
                </div>
                <div>
                    <span>需求确定(50)￥8000.00</span>
                    <div class="bar bar2"></div>
                </div>
                <div>
                    <span>谈判(20)￥8000.00</span>
                    <div class="bar bar3"></div>
                </div>
                <div>
                    <span>合作(15)￥5000.00</span>
                    <div class="bar bar4"></div>
                </div>
                <div>
                    <span>赢单(10)￥3000.00</span>
                    <div class="bar bar5"></div>
                </div>
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
                tabIndex: 0,

            }
        },
        activated(){

        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
            changeTab(index){
                console.log(index)
                this.tabIndex = index
            }
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .header{
        background: #fff;
        display: flex;
        line-height: 32px;
        text-align: center;
        border-bottom: 1px solid #ddd;
        position: relative;
        z-index: 2;
        span{
            flex: 1;
            &.active{
                color: @baseColor;
            }
        }
    }
    .main{
        padding: 32px 0 65px;
        font-size: 12px;
        .title{
            padding-left: 10px;
            line-height: 32px;
            background: #fff;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            margin-top: 10px;
        }
        .flex-box{
            background: #fff;
            padding: 5px 0 5px;
            overflow: hidden;
            border-bottom: 1px solid #ddd;
            .flex-item{
                width: 50%;
                float: left;
                padding: 10px 0;
                i{
                    font-size: 20px;
                    color: @baseColor;
                    float: left;
                    margin: 0 8px 0 30px;
                }
                p{
                    font-weight: bold;
                    color: #333;
                }
            }
        }
        .funnel{
            background: #fff;
            padding: 20px 0 20px 10px;
            >div{
                padding-bottom: 6px;
            }
            .bar{
                height: 20px;
                float: right;
                border-radius: 4px;
            }
            .bar1{
                width: 154px;
                margin-right: 20px;
                background: #03a9f5;
            }
            .bar2{
                width: 136px;
                margin-right: 29px;
                background: #28b6f6;
            }
            .bar3{
                width: 118px;
                margin-right: 38px;
                background: #4fc2f8;
            }
            .bar4{
                width: 100px;
                margin-right: 47px;
                background: #81d5fa;
            }
            .bar5{
                width: 82px;
                margin-right: 56px;
                background: #b3e5fc;
            }
        }
    }
    
</style>

