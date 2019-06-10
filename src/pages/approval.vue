<template>
    <div class="page"> 
        <div class="main">
            <tab class="vux-1px-b" :line-width=2 custom-bar-width="70%" v-model="tabIndex">
                <tab-item class="vux-center" selected>待处理<span v-show="list1.length">({{list1.length}})</span></tab-item>
                <!-- <tab-item class="vux-center">抄送我的</tab-item> -->
                <tab-item class="vux-center">已处理</tab-item>
                <tab-item class="vux-center">我发起</tab-item>
            </tab>
            <swiper v-model="tabIndex" :threshold="100" :min-moving-distance="20" :show-dots="false" height="100%">
                <swiper-item>
                    <scroller use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh(0)" lock-x ref="scrollerBottom0" height="100%" 
                        use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="getUnDealList(currentPage1)">
                        <div>
                            <div v-if="list1.length">
                                <div class="item" v-for="item in list1" :key="item.taskId" @click="toDetail(1, item.taskId)">
                                    <p class="title">
                                        <span class="name">{{lastName(item.promoterCname)}}</span>
                                        <span class="title-text">{{item.promoterCname}}发起的{{item.processDesc}}</span>
                                        <span class="datetime">{{item.createTime}}</span>
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
                                <div v-show="load1" class="empty-box">
                                    <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                                </div>
                            </div>
                        </div>
                    </scroller>
                </swiper-item>
                <swiper-item>
                    <scroller use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh(1)" lock-x ref="scrollerBottom1" height="100%" 
                        use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="getSuccessList(currentPage2)">
                        <div>
                            <div v-if="list2.length">
                                <div class="item" v-for="(item, index) in list2" :key="index" @click="toDetail(2, item.taskId)">
                                    <p class="title">
                                        <span class="name">{{lastName(item.promoterCname)}}</span>
                                        <span class="title-text">{{item.promoterCname}}发起的{{item.processDesc}}</span>
                                        <span class="datetime">{{item.createTime}}</span>
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
                                <div v-show="load2" class="empty-box">
                                    <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                                </div>
                            </div>
                        </div>
                    </scroller>
                </swiper-item>
                <swiper-item>
                    <scroller use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh(2)" lock-x ref="scrollerBottom2" height="100%">
                        <div>
                            <div v-if="list3.length || list4.length">
                                <div class="item" v-for="item in list3" :key="item.piId" @click="toDetail(3, item.piId)">
                                    <p class="title">
                                        <span class="name">{{lastName(item.promoterCname)}}</span>
                                        <span class="title-text">{{item.promoterCname}}发起的{{item.processDesc}}</span>
                                        <span class="datetime">{{item.createTime}}</span>
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
                                <div class="item" v-for="item in list4" :key="item.piId" @click="toDetail(3, item.piId)">
                                    <p class="title">
                                        <span class="name">{{lastName(item.promoterCname)}}</span>
                                        <span class="title-text">{{item.promoterCname}}发起的{{item.processDesc}}</span>
                                        <span class="datetime">{{item.createTime}}</span>
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
                                <div v-show="load3" class="empty-box">
                                    <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                                </div>
                            </div>
                        </div>
                    </scroller>
                </swiper-item>
            </swiper>
        </div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton, Swiper, SwiperItem, Badge, Scroller } from 'vux'

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
        content: '加载中...',
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
            Badge,
            Scroller,
        },
        data () {
            return {
                tabIndex: 0,            //   tab类型
                list1: [],            //  未处理列表
                list2: [],            //  已完成列表
                list3: [],      //  我发起未结束
                list4: [],      //  我发起已结束
                pageSize:5,           //  每页条数
                currentPage1: 1,         //  未处理列表当前页
                currentPage2: 1,         //  已完成列表当前页

                load1: false,
                load2: false,
                load3: false,
                //  刷新、加载
                pullupDefaultConfig: pullupDefaultConfig,
                pulldownDefaultConfig: pulldownDefaultConfig,
            }
        },
        activated(){
            this.$nextTick(() => {
                this.$refs.scrollerBottom0.reset({top: 0})
                this.$refs.scrollerBottom1.reset({top: 0})
                this.$refs.scrollerBottom2.reset({top: 0})
            })
            this.refresh(0)
            this.refresh(1)
            this.refresh(2)
        },
        // activated(){
        //     // this.type = this.$router.currentRoute.query.type || this.type
        // },
        methods: {
            toDetail(flowType, id){
                this.$router.push('./approval_detail?flowType='+flowType + '&id=' + id)
            },
            lastName(name){
                name = name || ''
                return name.slice(-2)
            },
            //  加载数据
            fetchData(cb) {
                setTimeout(() => {
                    this.$nextTick(() => {
                        this.$refs['scrollerBottom' + this.tabIndex].reset()
                    })
                    cb()
                }, 200)
            },
            //  下拉刷新
            refresh(tabIndex) {
                this.fetchData(data => {
                    this.$refs['scrollerBottom' + tabIndex].donePulldown()
                    if(tabIndex == 0){
                        this.getUnDealList(1)
                    }else if(tabIndex == 1){
                        this.getSuccessList(1)
                    }else{
                        this.getMyList(1)
                    }
                })
            },
            //  未处理
            getUnDealList(currentPage){
                this.load1 = false
                let params = {
                    pageSize: this.pageSize,
                    currentPage: currentPage,
                    prop: 'createTime',
                    order: -1,
                    flowType: '1'
                }
                this.$vux.loading.show()
                this.$post("/crm/dingDingPR/getAllFlowList", params, (data) => {
                    let list = data.tp_list || []
                    this.load1 = true
                    if(currentPage == 1){
                        this.list1 = list
                        this.currentPage1 = 2
                    }else{
                        this.list1 = this.list1.concat(list)
                        this.currentPage1++
                    }
                    if(list.length == this.pageSize){
                        this.$refs.scrollerBottom0.donePullup()
                        this.$refs.scrollerBottom0.enablePullup()
                    }else{
                        this.$refs.scrollerBottom0.disablePullup()
                    }
                })
            },
            //  已完成
            getSuccessList(currentPage){
                this.load2 = false
                this.$vux.loading.show()
                let params = {
                    pageSize: this.pageSize,
                    currentPage: currentPage,
                    prop: 'createTime',
                    order: -1,
                    flowType: '2'
                }
                this.$vux.loading.show()
                this.$post("/crm/dingDingPR/getAllFlowList", params, (data) => {
                    let list = data.htp_list || []
                    this.load2 = true
                    if(currentPage == 1){
                        this.list2 = list
                        this.currentPage2 = 2
                    }else{
                        this.list2 = this.list2.concat(list)
                        this.currentPage2++
                    }
                    if(list.length == this.pageSize){
                        this.$refs.scrollerBottom1.donePullup()
                        this.$refs.scrollerBottom1.enablePullup()
                    }else{
                        this.$refs.scrollerBottom1.disablePullup()
                    }
                })
            },
            //  我发起的
            getMyList(currentPage){
                this.load3 = false
                let params = {
                    pageSize: this.pageSize,
                    currentPage: currentPage,
                    prop: 'createTime',
                    order: -1,
                    flowType: '3'
                }
                this.$vux.loading.show()
                this.$post("/crm/dingDingPR/getAllFlowList", params, (data) => {
                    this.load3 = true
                    this.list3 = data.pi_list || []
                    this.list4 = data.hpi_list || []
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