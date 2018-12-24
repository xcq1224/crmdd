<template>
    <div class="page"> 
        <div class="main">
            <tab class="vux-1px-b" :line-width=2 custom-bar-width="70%" v-model="tabIndex">
                <tab-item class="vux-center" selected>待处理<span v-show="list0.length">({{list0.length}})</span></tab-item>
                <!-- <tab-item class="vux-center">抄送我的</tab-item> -->
                <tab-item class="vux-center">已处理</tab-item>
                <tab-item class="vux-center">我发起</tab-item>
            </tab>
             <!-- @on-index-change="tabChange" -->
            <swiper v-model="tabIndex" :threshold="100" :min-moving-distance="20" :show-dots="false" height="100%">
                <swiper-item>
                    <div v-if="list0.length">
                        <div class="item" v-for="item in list0" :key="item.taskId" @click="toDetail(1, item.taskId)">
                            <p class="title">
                                <span class="name">{{lastName(item.promoterCname)}}</span>
                                <span class="title-text">{{item.promoterCname}}发起的{{item.processDesc}}</span>
                                <span class="datetime">2018-08-08 08:08</span>
                            </p>
                            <p class="label">
                                <span class="label-text">{{item.processDesc == '营销合同流程' || item.processDesc == '开票流程' ? '合同名称：' : '项目名称：'}}</span>
                                <span class="label-valu">{{item.projectName || ''}}</span>
                            </p>
                            <p class="label">
                                <span class="label-text">{{item.processDesc == '营销合同流程' || item.processDesc == '开票流程' ? '合同编号：' : '项目编号：'}}</span>
                                <span class="label-valu">{{item.projectNo || ''}}</span>
                            </p>
                            <p class="label">
                                <span class="label-text">流程类型：</span>
                                <span class="label-valu">{{item.processDesc || ''}}</span>
                            </p>
                            <p class="label">
                                <span class="label-text">当前节点：</span>
                                <span class="label-valu">{{item.nodeName || ''}}</span>
                            </p>
                            <p class="label">
                                <span class="label-text">节点抵达时间：</span>
                                <span class="label-valu">{{item.nodeTime || ''}}</span>
                            </p>
                            <p class="status" style="color: coral;"><span>待处理</span></p>
                        </div>
                    </div>
                    <div v-else>
                        <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                    </div>
                </swiper-item>
                <swiper-item>
                    <div v-if="list1.length">
                        <div class="item" v-for="(item, index) in list1" :key="index" @click="toDetail(2, item.taskId)">
                            <p class="title">
                                <span class="name">{{lastName(item.promoterCname)}}</span>
                                <span class="title-text">{{item.promoterCname}}发起的{{item.processDesc}}</span>
                                <span class="datetime">2018-08-08 08:08</span>
                            </p>
                            <p class="label">
                                <span class="label-text">{{item.processDesc == '营销合同流程' || item.processDesc == '开票流程' ? '合同名称：' : '项目名称：'}}</span>
                                <span class="label-valu">{{item.projectName || ''}}</span>
                            </p>
                            <p class="label">
                                <span class="label-text">{{item.processDesc == '营销合同流程' || item.processDesc == '开票流程' ? '合同编号：' : '项目编号：'}}</span>
                                <span class="label-valu">{{item.projectNo || ''}}</span>
                            </p>
                            <p class="label">
                                <span class="label-text">流程类型：</span>
                                <span class="label-valu">{{item.processDesc || ''}}</span>
                            </p>
                            <p class="label">
                                <span class="label-text">当前节点：</span>
                                <span class="label-valu">{{item.nodeName || ''}}</span>
                            </p>
                            <p class="label">
                                <span class="label-text">节点抵达时间：</span>
                                <span class="label-valu">{{item.nodeTime || ''}}</span>
                            </p>
                            <p class="status"><span>已处理完毕</span></p>
                        </div>
                    </div>
                    <div v-else>
                        <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                    </div>
                </swiper-item>
                <swiper-item>
                    <div v-if="list2.length || list3.length">
                        <div class="item" v-for="item in list2" :key="item.piId" @click="toDetail(3, item.piId)">
                            <p class="title">
                                <span class="name">{{lastName(item.promoterCname)}}</span>
                                <span class="title-text">{{item.promoterCname}}发起的{{item.processDesc}}</span>
                                <span class="datetime">2018-08-08 08:08</span>
                            </p>
                            <p class="label">
                                <span class="label-text">{{item.processDesc == '营销合同流程' || item.processDesc == '开票流程' ? '合同名称：' : '项目名称：'}}</span>
                                <span class="label-valu">{{item.projectName || ''}}</span>
                            </p>
                            <p class="label">
                                <span class="label-text">{{item.processDesc == '营销合同流程' || item.processDesc == '开票流程' ? '合同编号：' : '项目编号：'}}</span>
                                <span class="label-valu">{{item.projectNo || ''}}</span>
                            </p>
                            <p class="label">
                                <span class="label-text">流程类型：</span>
                                <span class="label-valu">{{item.processDesc || ''}}</span>
                            </p>
                            <p class="label">
                                <span class="label-text">当前节点：</span>
                                <span class="label-valu">{{item.nodeName || ''}}</span>
                            </p>
                            <p class="label">
                                <span class="label-text">节点抵达时间：</span>
                                <span class="label-valu">{{item.nodeTime || ''}}</span>
                            </p>
                            <p class="status" style="color: #16A4FA;"><span>审批中</span></p>
                        </div>
                        <div class="item" v-for="item in list3" :key="item.piId" @click="toDetail(3, item.piId)">
                            <p class="title">
                                <span class="name">{{lastName(item.promoterCname)}}</span>
                                <span class="title-text">{{item.promoterCname}}发起的{{item.processDesc}}</span>
                                <span class="datetime">2018-08-08 08:08</span>
                            </p>
                            <p class="label">
                                <span class="label-text">{{item.processDesc == '营销合同流程' || item.processDesc == '开票流程' ? '合同名称：' : '项目名称：'}}</span>
                                <span class="label-valu">{{item.projectName || ''}}</span>
                            </p>
                            <p class="label">
                                <span class="label-text">{{item.processDesc == '营销合同流程' || item.processDesc == '开票流程' ? '合同编号：' : '项目编号：'}}</span>
                                <span class="label-valu">{{item.projectNo || ''}}</span>
                            </p>
                            <p class="label">
                                <span class="label-text">流程类型：</span>
                                <span class="label-valu">{{item.processDesc || ''}}</span>
                            </p>
                            <p class="label">
                                <span class="label-text">当前节点：</span>
                                <span class="label-valu">{{item.nodeName || ''}}</span>
                            </p>
                            <p class="label">
                                <span class="label-text">节点抵达时间：</span>
                                <span class="label-valu">{{item.nodeTime || ''}}</span>
                            </p>
                            <p class="status"><span>已处理完毕</span></p>
                        </div>
                    </div>
                    <div v-else>
                        <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                    </div>
                </swiper-item>
            </swiper>
        </div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton, Swiper, SwiperItem } from 'vux'

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            Divider,
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
                tabIndex: 0,
                list0: [],      //  待处理
                list1: [],      //  已处理
                list2: [],      //  我发起未结束
                list3: [],      //  我发起已结束
                userCname: '', 
                userId: '',
            }
        },
        activated(){
            this.tabChange(0)
            this.tabChange(1)
            this.tabChange(2)
        },
        methods: {
            toDetail(flowType, id){
                this.$router.push('./approval_detail?flowType='+flowType + '&id=' + id)
            },
            lastName(name){
                name = name || ''
                return name.slice(-2)
            },
            tabChange(val){
                let index = val + 1 + ''
                let params = {
                    flowType: index,
                }
                this.$vux.loading.show()
                this.$post("/crm/dingDingPR/getAllFlowList", params, (data) => {
                    if(index == 1){
                        console.log(1)
                        this.list0 = data.tp_list || []
                    }else if(index == 2){
                        console.log(2)
                        this.list1 = data.htp_list || []
                    }else if(index == 3){
                        console.log(3)
                        this.list2 = data.pi_list || []
                        this.list3 = data.hpi_list || []
                    }
                })
            },
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .w240{
        width: 240px;
    }
    .w180{
        width: 180px;
    }
    .main{
        font-size: 12px;
        overflow: hidden;
        .vux-tab-wrap{
            z-index: 2;
        }
        .vux-slider{
            height: 100%;
            top: -44px;
            padding-top: 44px;
            box-sizing: border-box;
            z-index: 1;
            .vux-swiper-item{
                height: 100%;
                overflow: auto;
            }
        }
        .item{
            .success, .finish{
                width: 46px;
                height: 20px;
                line-height: 21px;
                border-radius: 4px;
                text-align: center;
                color: #fff;
                font-weight: normal;
                font-size: 12px;
                margin-right: 6px;
                background: @baseColor;
                float: left;
                margin-top: 1px;
            }
            .finish{
                background: #ccc;
            }
        }
    }

    .item{
        padding: 6px;
        border-bottom: 2px solid #ddd;
        line-height: 18px;
        .title{
            display: flex;
            align-items: center;
            .name{
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: @baseColor;
                color: #fff;
                text-align: center;
                line-height: 36px;
            }
            .title-text{
                flex: 1;
                padding: 0 6px;
                font-weight: bold;
                font-size: 14px;
            }
            .datetime{
                width: 110px;
            }
        }
        .label{
            display: flex;
            padding: 1px 0;
            .label-text{
                padding-left: 42px;
                white-space: nowrap;
            }
        }
        .status{
            padding-left: 42px;
            color: #1aad19;
        }
    }
</style>



