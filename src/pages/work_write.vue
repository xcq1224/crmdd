<template>
    <div class="page"> 
        <tab class="vux-1px-b pst" :line-width=2 custom-bar-width="60%" v-model="tabIndex" >
            <tab-item class="vux-center" selected @on-item-click="getVisit">日报</tab-item>
            <tab-item class="vux-center" @on-item-click="getVisit">周报</tab-item>
            <tab-item class="vux-center" @on-item-click="getVisit">月报</tab-item>
        </tab>
        <div class="main">
            <div v-show="tabIndex == 0">
                <group>
                    <cell v-show="tabIndex == 0" title="日期" v-model="date"></cell>
                </group>
                <group gutter='20'>
                    <p class="title"><span></span>签到情况</p>
                    <cell class="cell" :title="item.visitType" v-model="item.createTime" v-for="(item, index) in signList0" :key="index"></cell>
                    <p v-show="!signList0.length" style="font-size: 14px;text-align: center;line-height: 40px;">暂无签到</p>
                </group>
                <group gutter='20'>
                    <x-textarea :height="120" class="textarea" placeholder="总结" v-model="summary0"></x-textarea>
                </group>
                <group gutter='20'>
                    <x-textarea :height="120" class="textarea" placeholder="其他事项" v-model="otherItem0"></x-textarea>
                </group>
            </div>
            <div v-show="tabIndex == 1">
                <group>
                    <cell v-show="tabIndex == 1" title="日期" v-model="week"></cell>
                </group>
                <group gutter='20'>
                    <x-textarea :height="120" class="textarea" placeholder="总结" v-model="summary1"></x-textarea>
                </group>
                <group gutter='20'>
                    <x-textarea :height="120" class="textarea" placeholder="其他事项" v-model="otherItem1"></x-textarea>
                </group>
            </div>
            <div v-show="tabIndex == 2">
                <group>
                    <cell v-show="tabIndex == 2" title="日期" v-model="month"></cell>
                </group>
                <group gutter='20'>
                    <p class="title"><span></span>签到情况</p>
                    <cell class="cell" title="正常办公" v-model="signTimesList[0]"></cell>
                    <cell class="cell" title="国内出差" v-model="signTimesList[1]"></cell>
                    <cell class="cell" title="国外出差" v-model="signTimesList[2]"></cell>
                </group>
                <group gutter='20' v-for="(item, index) in oppoList" :key="index">
                    <p class="title"><span></span>机会{{index + 1}}<i class="iconfont icon-guanbi float_r" @click="delOppo(index)"></i></p>
                    <cell class="cell" title="机会名称" v-model="item.oppoName"></cell>
                    <cell class="cell" title="营销阶段" v-model="item.oppoMarketingSection"></cell>
                    <cell class="cell" title="跟进状态" v-model="item.oppoFollowStatus"></cell>
                    <cell class="cell" title="机会类别" v-model="item.oppoType"></cell>
                    <cell class="cell" title="预计营销金额" v-model="item.amount"></cell>
                    <x-textarea v-model="item.oppoOverview" :height="20" :rows='1' :autosize="true" title="本月概况  " style="line-height: 20px;"></x-textarea>
                </group>
                <p class="addOppo" @click="popup2 = true">添加机会</p>
                <group gutter='20'>
                    <x-textarea :height="120" class="textarea" placeholder="总结" v-model="summary2"></x-textarea>
                </group>
                <group gutter='20'>
                    <x-textarea :height="120" class="textarea" placeholder="其他事项" v-model="otherItem2"></x-textarea>
                </group>
            </div>
        </div>
        <div class="submit-btn" @click="save">提交</div>
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
                tabIndex: 0,
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
            this.summary0 = ''
            this.summary1 = ''
            this.summary2 = ''
            this.otherItem0 = ''
            this.otherItem1 = ''
            this.otherItem2 = ''
            let query = this.$router.currentRoute.query
            this.tabIndex = parseInt(query.handleType)
            this.date = this.formatDate(new Date(), "yyyy-MM-dd")
            this.week = this.getWeek()
            this.month = this.formatDate(new Date(), "yyyy-MM")
            this.getVisit()
        },
        methods: {
            //  获取当前周
            getWeek(){
                let date = new Date()
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
                let params = {
                    reportType: this.list[this.tabIndex],
                    summary: this["summary" + this.tabIndex],
                    otherItem: this["otherItem" + this.tabIndex],
                    oppoList: this.tabIndex == 2 ? this.oppoList : []
                }
                if(!params.summary.trim()){
                    this.toastFail("请填写工作总结", "200px")
                    return
                }
                let i
                let flag = params.oppoList.some((item, index) => {
                    if(!item.oppoOverview){
                        i = index
                        return true
                    }
                })
                if(flag){
                    this.toastFail("请填写机会" + i + "的本月概况", "240px")
                    return
                }
                console.log(params)
                this.$post("/crm/workReportPR/addOne", params, (data) => {
                    this.toastSuccess("提交" + params.reportType + "成功", "200px")
                    this.goBack()
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
                    visitTime = this.getMonthtDate(new Date())
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
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .page{
        background: #f2f2f2;
    }
    .main{
        padding-top: 46px;
        padding-bottom: 60px;
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
</style>


