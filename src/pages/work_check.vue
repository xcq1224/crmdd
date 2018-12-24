<template>
    <div class="page"> 
        <div class="main">
            <div>
                <group gutter='0'>
                    <cell class="cell header">
                        <img src="../assets/avatar.jpg" alt="" slot="icon">
                        <div slot="title" class="title">
                            <p class="text_333">{{workReport.createUserName}}</p>
                            <p class="text_999">{{workReport.createTime}}</p>
                        </div>
                        <div slot="" class="text_base" v-if="isOwner" @click="isEdit = true" v-show="!isEdit">修改</div>
                    </cell>
                </group>
                <group gutter='20' v-if="tabIndex == 0">
                    <p class="title text_333" style="font-weight: bold;"><span></span>签到情况</p>
                    <cell class="cell" :title="item.visitType" v-model="item.createTime" v-for="(item, index) in signList0" :key="index"></cell>
                    <p v-show="!signList0.length" style="font-size: 14px;text-align: center;line-height: 40px;">暂无签到</p>
                </group>
                <group gutter='20' v-if="tabIndex == 2">
                    <p class="title"><span></span>签到情况</p>
                    <cell class="cell" title="正常办公" v-model="signTimesList[0]"></cell>
                    <cell class="cell" title="国内出差" v-model="signTimesList[1]"></cell>
                    <cell class="cell" title="国外出差" v-model="signTimesList[2]"></cell>
                </group>
                <group gutter='20' v-if="tabIndex == 2" v-for="(item, index) in workReport.oppoList" :key="index">
                    <p class="title"><span></span>机会{{index + 1}}<i class="iconfont icon-guanbi float_r" v-if="isEdit" @click="delOppo(index)"></i></p>
                    <cell class="cell" title="机会名称" v-model="item.oppoName"></cell>
                    <cell class="cell" title="营销阶段" v-model="item.oppoMarketingSection"></cell>
                    <cell class="cell" title="跟进状态" v-model="item.oppoFollowStatus"></cell>
                    <cell class="cell" title="机会类别" v-model="item.oppoType"></cell>
                    <cell class="cell" title="预计营销金额" v-model="item.amount"></cell>
                    <x-textarea v-model="item.oppoOverview" :height="20" :rows='1' :autosize="true" :readonly="!isEdit" title="本月概况  " style="line-height: 20px;"></x-textarea>
                </group>
                <p class="addOppo" v-if="tabIndex == 2 && isEdit" @click="popup2 = true">添加机会</p>
                <group gutter='20'>
                    <p class="font14 text_333" style="font-weight: bold;padding: 10px 15px 0;">总结</p>
                    <x-textarea  :readonly="!isEdit" autosize class="textarea" v-model="workReport.summary"></x-textarea>
                </group>
                <group gutter='20'>
                    <p class="font14 text_333" style="font-weight: bold;padding: 10px 15px 0;">其它事项</p>
                    <x-textarea  :readonly="!isEdit" autosize class="textarea" v-model="workReport.otherItem"></x-textarea>
                </group>
                <group gutter='20'>
                    <p class="font14 text_333" style="font-weight: bold;padding: 10px 15px 0;">评论</p>
                    <div class="common" v-for="(item, index) in workReviews" :key="index">
                        <p class="text_999">{{item.createUserName}} {{item.createTime}}</p>
                        <p style="padding-left: 20px;">{{item.content}}</p>
                    </div>
                    <p v-show="!workReviews.length" style="font-size: 14px;text-align: center;line-height: 40px;">暂无评论</p>
                </group>
            </div>
        </div>
        <div class="submit-btn" @click="save" v-if="isEdit">提交</div>
        <div class="footer" v-if="!isEdit">
            <div class="review-box">
                <x-textarea :height="10" :rows="1" ref="review" class="review-input textarea" autosize placeholder="请输入评论" v-model="content"></x-textarea>
            </div>
            <div class="review" @click="review">评论</div> 
        </div>
        <!-- 添加机会 -->
        <popup v-model="popup2" @on-show="showPopup2" height="100%">
            <div class="popup0">
                <search
                    @result-click="resultClick2"
                    @on-change="getResult2"
                    :results="results2"
                    v-model="searchValue2"
                    position="absolute"
                    auto-scroll-to-top
                    top="0"
                    @on-cancel="onCancel2"
                    ref="search2">
                </search>
            </div>
        </popup>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge, InlineXSwitch, XTextarea, XInput, Datetime, PopupPicker, Tab, TabItem, Popup, Search } from 'vux'
    import { setTimeout } from 'timers';

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            Group,
            Cell,
            CellFormPreview,
            CellBox,
            Badge,
            InlineXSwitch,
            XTextarea,
            XInput,
            Datetime,
            PopupPicker,
            Tab, 
            TabItem,
            Popup,
            Search,
        },
        data () {
            return {
                query: {},              //  页面参数
                workReport: {},         //  日志信息
                workReviews: [],        //  评论
                isOwner: false,         //  是否是自己的日志
                tabIndex: -1,           //  日志类型
                isEdit: false,          //  是否修改
                content: '',            //  评论框文本
                //  总结
                summary0: '',
                summary1: '',
                summary2: '',
                //  其他事项
                otherItem0: '',
                otherItem1: '',
                otherItem2: '',
                oppoList: [],       //  机会列表
                date: '',   
                week: '',
                month: '',
                list: ["日报", "周报", "月报"],

                //  签到情况
                signList0: [],
                signList1: [],
                signList2: [],
                signTimesList: [],

                //  机会
                popup2: false,
                results2: [],                        //  搜索结果
                opportunitys: [],
                searchValue2: '',                    //  搜索文本
            }
        },
        activated(){
            this.query = this.$router.currentRoute.query
            this.date = this.query.date
            this.week = this.getWeek(new Date(this.date))
            this.month = this.formatDate(new Date(), "yyyy-MM")
            this.tabIndex = parseInt(this.query.type)
            this.isEdit = false
            this.$vux.loading.show()
            this.getWorkReport()
        },
        methods: {
            //  获取日志信息
            getWorkReport(){
                this.$post("/crm/workReportPR/queryOne", {id: this.query.id}, (data) => {
                    this.workReport = data.workReport
                    this.workReviews = data.workReviews
                    document.title = this.workReport.createUserName + '的' + this.workReport.reportType
                    this.isOwner = data.isOwner
                    this.getVisit()
                })
            },
            //  获取当前周
            getWeek(date){
                let day = date.getDay()
                let startDate = new Date()
                let endDate = new Date()
                if(day>0){
                    startDate.setDate(date.getDate() - day + 1);
                    endDate.setDate(date.getDate() - day + 7);
                }else{
                    endDate = date
                    startDate.setDate(date.getDate() - 6);
                }
                let week = startDate.format('yyyy-MM-dd') + '~' + endDate.format('yyyy-MM-dd')
                return week
            },
            //  保存
            save(){
                if(!this.workReport.summary.trim()){
                    this.toastFail("请填写工作总结", "200px")
                    return
                }
                let i
                let flag = this.workReport.oppoList.some((item, index) => {
                    if(!item.oppoOverview){
                        i = index
                        return true
                    }
                })
                if(flag){
                    this.toastFail("请填写机会" + i + "的本月概况", "240px")
                    return
                }
                this.$post("/crm/workReportPR/update", this.workReport, (data) => {
                    this.toastSuccess("修改成功")
                    this.isEdit = false
                })
            },
            //  删除机会
            delOppo(index){
                this.oppoList.splice(index, 1)
            },
        /*************************************获取签到信息****************************** */
            //  获取当前月的月初和月末
            getMonthtDate(date){
				var month = date.getMonth(); //当前月 
				var year = date.getFullYear(); //当前年 
				var startDate = new Date(year, month, 1);
				var endDate = new Date(year, month + 1, 0);
                return [this.formatDate(startDate, 'yyyy-MM-dd'), this.formatDate(endDate, 'yyyy-MM-dd')]
            },
            getSignTimes(){
                let i = 0
                let m = 0
                let n = 0
                let dateList = []
                this.signList2.forEach(item => {
                    var date = item.createTime.split(' ')[0]
                    if(dateList.indexOf(date) == -1){
                        dateList.push(date)
                        console.log(item.visitType)
                        if(item.visitType == '正常办公'){
                            i++
                        }else if(item.visitType == '国内出差'){
                            m++
                        }else if(item.visitType == '国外出差'){
                            n++
                        }
                    }
                })
                this.signTimesList = [i, m, n]
            },
            getVisit(){
                let visitTime = []
                if(this.tabIndex == 0){
                    visitTime = [this.date, this.date]
                }else if(this.tabIndex == 1){
                    visitTime = [this.week.split("~")[0], this.week.split("~")[1]]
                }else if(this.tabIndex == 2){
                    visitTime = this.getMonthtDate(new Date(this.date))
                }
                this.$post("/crm/visitPR/queryAll", {visitTime: visitTime, isOwner: true}, (data) => {
                    this["signList" + this.tabIndex] = data.list
                    if(this.tabIndex == 2){
                        this.getSignTimes()
                    }
                })
            },
        /************************************添加机会****************************** */
            //  获取机会
            getOpportunitys(){
                if(!this.opportunitys.length){
                    this.$vux.loading.show()
                    this.$post("/crm/opportunityPR/queryOpportunity", {currentPage:1,order:-1,pageSize:999,prop:"createTime"}, (data) => {
                        data.list.map((item, index) => {
                            this.opportunitys.push({
                                title: item.opportunityName,
                                opportunity: item
                            })
                        })
                        this.results2 = this.deepClone(this.opportunitys)
                    })
                }
            },
            showPopup2(){
                this.getOpportunitys()
                setTimeout(() => {
                    this.$refs.search2.setFocus()
                    setTimeout(() => {
                        this.$refs.search2.setBlur()
                    }, 0);
                }, 0);
            },

            resultClick2 (item) {
                if(item.opportunity.id){
                    this.oppoList.push({
                        oppoId: item.opportunity.id,
                        oppoName: item.opportunity.opportunityName,
                        oppoMarketingSection: item.opportunity.marketingSection,
                        oppoFollowStatus: item.opportunity.followStatus,
                        oppoType: item.opportunity.opportunityType,
                        amount: item.opportunity.amount,
                        oppoOverview: ''
                    })
                    this.popup2 = false
                }
            },
            getResult2 (val) {
                this.results2 = val ? this.match2(val) : this.opportunitys
                if(!this.results2.length){
                    this.results2 = [{
                        opportunity: {},
                        title: '暂无数据'
                    }]
                }
            },
            onCancel2 () {
                this.popup2 = false
            },
            match2(val){
                let rs = []
                this.opportunitys.map((item) => {
                    if(item.title.indexOf(val) != -1){
                        rs.push(item)
                    }
                })
                return rs
            },
        /***********************************评论******************************** */
            getReview(){
                this.$post("/crm/workReportPR/queryReview", {reportId: this.query.id}, (data) => {
                    this.workReviews = data.list
                })
            },
            review(){
                if(this.content.trim()){
                    let params = {
                        content: this.content,
                        reportId: this.query.id
                    }
                    this.$post("/crm/workReportPR/addReview", params, (data) => {
                        this.content = ''
                        setTimeout(()=> {
                            this.$refs.review.updateAutosize()
                        }, 0)
                        this.getReview()
                    })
                }
            },
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .page{
        background: #f2f2f2;
    }
    .main{
        padding-bottom: 60px;
        .header{
            font-size: 14px;
            padding: 7px 15px;
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                float: left;
            }
        }
        .textarea{
            font-size: 14px;
        }
        .handle{
            padding-left: 10px;
            color: #ccc;
            i{
                font-size: 24px;
            }
        }
        .weui-cell, .vux-cell-box{
            line-height: 24px;
            font-size: 14px;
            &:before{
                left: 0;
            }
        }
        .textarea:before{
            display: none;
        }
        .common{
            font-size: 14px;
            padding: 6px 15px;
        }
    }
    .addOppo{
        text-align: center;
        background: #fff;
        padding: 10px;
        color: @baseColor;
        margin-top: 20px;
    }
    .title{
        padding: 4px 15px 4px 10px;
        font-size: 14px;
        line-height: 24px;
        span{
            display: inline-block;
            width: 5px;
            height: 18px;
            background: @baseColor;
            margin-right: 5px;
            vertical-align: sub;
        }
    }
    .cell{
        padding: 4px 15px;
    }
    .submit-btn{
        text-align: center;
        width: 100%;
        height: 40px;
        color: #fff;
        background: @baseColor;
        line-height: 40px;
        position: absolute;
        bottom: 0;
    }
    .footer{
        position: fixed;
        bottom: 0;
        background: #fbf9fe;
        width: 100%;
        display: flex;
        align-items: flex-end;
        .review-box{
            flex: 1;
            padding: 10px 0 10px 10px;
        }
        .review-input{
            background: #fff;
            border: 1px solid #eee;
            vertical-align: bottom;
            padding: 5px;
            border-radius: 6px;
            line-height: 20px;
        }
        .review{
            width: 60px;
            color: @baseColor;
            text-align: center;
            padding-bottom: 12px;
        }
    }
</style>


