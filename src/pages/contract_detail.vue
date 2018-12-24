<template>
    <div class="page"> 
        <swiper class="crm_detial_header" :show-dots="false">
            <swiper-item class="item1">
                <p class="title">{{baseInfo.contractName}}</p>
                <p>总金额(万元)：{{baseInfo.contracAmount}}</p>
                <p>合同状态：{{baseInfo.contractState}}</p>
            </swiper-item>
        </swiper>
        <div class="main">
            <tab class="vux-1px-b" :line-width=2 custom-bar-width="80%" :scroll-threshold='6' v-model="tabIndex">
                <tab-item class="vux-center" :selected="tabIndex == 0" @click="tabIndex = 0">详情</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 1" @click="tabIndex = 1">开票信息</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 2" @click="tabIndex = 2">收款计划</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 3" @click="tabIndex = 3">收款</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 4" @click="tabIndex = 4">开票记录</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 5" @click="tabIndex = 5">附件</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 6" @click="tabIndex = 6">日志</tab-item>
            </tab>
            <swiper v-model="tabIndex" :show-dots="false" height="100%" @on-index-change="getInfoByindex">
                <swiper-item class="tab-item2">
                    <div class="scroll-box">
                        <x-table :cell-bordered="false" :content-bordered="false" :full-bordered="false">
                            <tr>
                                <td width='100'>客户</td>
                                <td>{{baseInfo.customerName}}</td>
                            </tr>
                            <tr>
                                <td>合同编号</td>
                                <td>{{baseInfo.contractNo}}</td>
                            </tr>
                            <tr v-for="(item, index) in fieldList" :key="index">
                                <td width='80'>{{item.label}}</td>
                                <td>{{baseInfo[item.name]}}</td>
                            </tr>
                            <tr>
                                <td>执行部门</td>
                                <td>{{baseInfo.implementDeptName}}</td>
                            </tr>
                            <tr>
                                <td>营销机会</td>
                                <td>{{baseInfo.opportunityName}}</td>
                            </tr>
                            <tr>
                                <td>财务经理</td>
                                <td>{{baseInfo.financialManagerName}}</td>
                            </tr>
                            <tr>
                                <td>客户签约人</td>
                                <td>{{baseInfo.customerSignatory}}</td>
                            </tr>
                            <tr>
                                <td>我方签约人</td>
                                <td>{{baseInfo.selfSignatory}}</td>
                            </tr>
                            <tr>
                                <td>拥有者</td>
                                <td>{{baseInfo.ownerCname}}</td>
                            </tr>
                            <tr>
                                <td>创建者</td>
                                <td>{{baseInfo.createUserCname}}</td>
                            </tr>
                            <tr>
                                <td>创建时间</td>
                                <td>{{baseInfo.createTime}}</td>
                            </tr>
                        </x-table>
                    </div>
                    <div class="footer">
                        <router-link class="footer-tab" :to="'./contract_add?handleType=1&id=' + baseInfo.id">编辑</router-link>
                        <div class="footer-tab vux-1px-l" @click="popup1 = true">转给他人</div>
                        <div class="footer-tab vux-1px-l" @click="delContract">删除</div>
                        <div class="footer-tab vux-1px-l" ref="applyBtn" v-show="baseInfo.state != 1 && baseInfo.state != 2 && baseInfo.state != 4" @click="applyContract">提交审批</div>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item5">
                    <div class="scroll-box">
                        <x-table :cell-bordered="false" :content-bordered="false" :full-bordered="false">
                            <tr>
                                <td width='100'>纳税识别号</td>
                                <td>{{customer.taxNo}}</td>
                            </tr>
                            <tr>
                                <td>开票地址</td>
                                <td>{{customer.companyAddress}}</td>
                            </tr>
                            <tr>
                                <td>开票电话</td>
                                <td>{{customer.companyPhone}}</td>
                            </tr>
                            <tr>
                                <td>开户银行</td>
                                <td>{{customer.openBank}}</td>
                            </tr>
                            <tr>
                                <td>开户账号</td>
                                <td>{{customer.openAccount}}</td>
                            </tr>
                        </x-table>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item3">
                    <div class="scroll-box">
                        <div v-if="receiptPlans.length">
                            <div class="amount" v-for="(item, index) in receiptPlans" :key="index">
                                <p class="title"><span class="status" :class="item.receiptstate == '未完成'?'fail' : 'success'">{{item.receiptstate}}</span>第{{item.receiptNum}}期收款计划</p>
                                <p><span class="label" style="width: 160px;">计划收款日期</span><span class="text_333">{{item.planReceiptTime}}</span></p>
                                <p><span class="label" style="width: 160px;">计划收款金额(万元)</span><span class="text_333">{{item.planPaymentAmount}}</span></p>
                                <p class="set status" v-if="item.receiptstate == '未完成'" @click="setFinish(item.receiptId, index)">设置完成</p>
                            </div>
                        </div>
                        <div v-else>
                            <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                        </div>
                    </div>
                    <div class="handle">
                        <router-link :to="'./collection_plan_deploy?id=' + baseInfo.id + '&customerId=' + baseInfo.customerId + '&contractAmount=' + baseInfo.contracAmount">配置收款计划</router-link>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item4">
                    <div class="scroll-box">
                        <div v-if="receipts.length">
                            <div class="amount" v-for="(item, index) in receipts" :key="index">
                                <p><span class="label">收款日期</span><span class="text_333 float_r">{{item.receiptActualTime}}</span></p>
                                <p><span class="label">收款金额(万元)</span><span class="text_333 float_r">{{item.receiptAmount}}</span></p>
                            </div>
                        </div>
                        <div v-else>
                            <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                        </div>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item5">
                    <div class="scroll-box">
                        <div v-if="billings.length">
                            <router-link :to="'./invoicing_add?state=' + item.state + '&openTicketId=' + item.id"  class="amount" v-for="(item, index) in billings" :key="index">
                                <p><span class="label text_333">发票金额(万元)</span><span class="text_999">{{item.ticketAmout}}</span><span class=" float_r text_999">{{getTicketState(item.state)}}</span></p>
                            </router-link>
                        </div>
                        <div v-else>
                            <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                        </div>
                    </div>
                    <div class="handle">
                        <a @click="applyTicket">申请开票</a>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item6">
                    <div v-if="annexList.length">
                        <div class="list-item" v-for="(item, index) in annexList" :key="index">
                            <p>
                                <span  class="inline_block text-ellipsis w320 text_333">{{item.fileName}}</span>
                                <span class="float_r"><i class="iconfont icon-shanchu icon_handle" @click="delAnnex(item.id)"></i></span>
                            </p> 
                            <p><span class="font12">{{formatDate(new Date(item.upTime), 'yyyy-MM-dd hh:mm:ss')}}</span></p>
                        </div>
                    </div>
                    <div v-else>
                        <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item7">
                    <div class="list-item" v-for="(item, index) in logs" :key="index">
                        <p>
                            <span  class="text_333">{{item.createUserCname}}</span>
                            <span class="float_r font12">{{item.createTime}}</span>
                        </p> 
                        <p><span class="inline_block text-ellipsis w_100">{{item.content}}</span></p>
                    </div>
                </swiper-item>
            </swiper>
        </div>
        <!-- 转给他人 -->
        <popup v-model="popup1" @on-show="showPopup1" height="100%">
            <div class="popup0">
                <search
                    @result-click="resultClick1"
                    @on-change="getResult1"
                    :results="results1"
                    v-model="searchValue1"
                    position="absolute"
                    auto-scroll-to-top
                    top="0"
                    @on-cancel="onCancel1"
                    ref="search1">
                </search>
            </div>
        </popup>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton, Swiper, SwiperItem, XTable, Search, Popup } from 'vux'

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
            XTable,
            Search,
            Popup,
        },
        data () {
            return {
                tabIndex: 0,
                query: {},              //  url参数
                baseInfo: {"state": '0'},           //  合同信息
                customer: {},           //  客户信息
                fieldList: [],          //  合同字段信息
                receiptPlans: [],       //  收款计划
                receipts: [],           //  收款记录
                billings: [],           //  开票记录
                annexList: [],          //  附件列表
                logs: [],               //  日志记录

                //  拥有者
                popup1: false,
                results1: [],                        //  搜索结果
                staffs: [],
                searchValue1: '',                    //  搜索文本
            }
        },
        mounted(){
            this.getFieldList()
        },
        activated(){
            this.query = this.$router.currentRoute.query
            this.$vux.loading.show()
            this.getContract()
            this.getAllStaff()
        },
        methods: {  
            //  提交审批
            applyContract(){
                this.$vux.confirm.show({
                    content: '您确定提交审批吗？',
                    onCancel: () => {},
                    onConfirm: () => {
                        // js生成UUID
                        var s = [];
                        var hexDigits = "0123456789abcdef";
                        for (var i = 0; i < 36; i++) {
                            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                        }
                        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
                        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
                        s[8] = s[13] = s[18] = s[23] = "-";
                    
                        var uuid = s.join("");
                        let params = {
                            busId: uuid,
                            contractId: this.baseInfo.id,
                            remark: ''
                        }
                        this.$post('/crm/contractPR/begin', params, (data) => {
                            this.toastSuccess("提交审批成功！", "140px")
                            this.baseInfo.state = '1'
                            this.$refs.applyBtn.remove()
                        })
                    }
                })
            },
            //  获取开票状态
            getTicketState(state){
                let list = ["未提交", "审批中", "审批通过", "审批不通过"]
                return list[parseInt(state)]
            },
            //  申请开票
            applyTicket(){
                let openBank = this.customer.openBank
                let openAccount = this.customer.openAccount
                let taxNo = this.customer.taxNo
                if(openBank && openAccount && taxNo){
                    this.$router.push('./invoicing_add?state=0&contractId=' + this.baseInfo.id)
                }else{
                    this.toastFail("请先在客户页面完善开票信息", "260px")
                }
            },
            //  获取合同信息
            getContract(){
                this.$post("/crm/contractDetailPR/queryContractForOne", {id: this.query.id}, (data) => {
                    this.baseInfo = data.contract
                    this.customer = data.customer
                    this.follows = data.follows
                    this.getInfoByindex(this.tabIndex)
                })
            },
            //  根据当前swiper来加载对应内容
            getInfoByindex(val){
                if(val == 2){
                    this.getReceiptPlans()
                }
                if(val == 3){
                    this.getReceipts()
                }
                if(val == 4){
                    this.getBillings()
                }
                if(val == 5){
                    this.getAttachs()
                }
                if(val == 6){
                    this.getLogs()
                }
            },
            //  删除合同
            delContract(){
                this.$vux.confirm.show({
                    content: '您确定删除吗？',
                    onCancel: () => {},
                    onConfirm: () => {
                        this.$post('/crm/contractPR/deleteContract', {"list": [this.query.id]}, (data) => {
                            if(data.message){
                                this.toastFail(data.message, "200px")
                            }else{
                                this.toastSuccess("删除成功！")
                                this.goBack()
                            }
                        })
                    }
                })
            },
        /**---------------------------------------------转给他人--------------------------------------------- */
            //  获取所员工
            getAllStaff(){
                this.$post("/crm/getAllStaff", {}, (data) => {
                    this.staffs = []
                    data.list.map((item) => {
                        this.staffs.push({
                            title: item.userName + " " + item.cname,
                            name: item.cname,
                            id: item.userName
                        })
                    })
                    this.results1 = this.deepClone(this.staffs)
                })
            },
            showPopup1(){
                setTimeout(() => {
                    this.$refs.search1.setFocus()
                    setTimeout(() => {
                        this.$refs.search1.setBlur()
                    }, 0);
                }, 0);
            },
            //  转给他人
            resultClick1 (item) {
                if(item.id){
                    let params = {
                        list: [this.query.id],
                        ownerId: item.id
                    }
                    this.$vux.loading.show()
                    this.$post("/crm/contractPR/turnOther", params, (data) => {
                        this.toastSuccess("转移成功！")
                        this.popup1 = false
                        this.goBack()
                    })
                }
            },
            getResult1 (val) {
                this.results1 = val ? this.match1(val) : this.staffs
                if(!this.results1.length){
                    this.results1 = [{
                        id: '',
                        name: '',
                        title: '暂无数据'
                    }]
                }
            },
            onCancel1 () {
                this.popup1 = false
            },
            match1(val){
                let rs = []
                this.staffs.map((item) => {
                    if(item.title.indexOf(val) != -1){
                        rs.push(item)
                    }
                })
                return rs
            },
        /**********************************************获取对应tab内容******************************** */
            //  获取合同字段
            getFieldList(){
                if(!this.fieldList.length){
                    this.$vux.loading.show()
                    this.$post("/crm/extFieldPR/getField", {tableName: 'crm_marketing_contract'}, (data) => {
                        this.fieldList = data.list
                    })
                }
            },
            //  获取收款计划
            getReceiptPlans(){
                this.$vux.loading.show()
                this.$post("/crm/contractDetailPR/queryReceiptByContractId", {id: this.query.id, tableName: "crm_receipt_plan", prop: 'planReceiptTime', order: -1, currentPage: 1, pageSize: 999}, (data) => {
                    this.receiptPlans = data.receipt_list
                })
            },
            setFinish(receiptId, index){
                this.$vux.loading.show()
                this.$post("/crm/contractDetailPR/setFinish", {id: this.query.id, receiptIds: [receiptId]}, (data) => {
                    this.receiptPlans[index].receiptstate = '已完成'
                    this.toastSuccess("设置成功！")
                })
            },
            //  获取收款记录
            getReceipts(){
                this.$vux.loading.show()
                this.$post("/crm/contractDetailPR/queryReceiptByContractId", {id: this.query.id, tableName: "crm_receipt_info", prop: 'receiptActualTime', order: -1, currentPage: 1, pageSize: 999}, (data) => {
                    this.receipts = data.receipt_list
                })
            },
            //  获取开票记录
            getBillings(){
                this.$vux.loading.show()
                this.$post("/crm/contractDetailPR/queryReceiptByContractId", {id: this.query.id, tableName : "crm_open_ticket", prop: 'state', order: 1, currentPage: 1, pageSize: 999}, (data) => {
                    this.billings = data.receipt_list
                })
            },
            //  获取附件
            getAttachs(){
                this.$vux.loading.show()
                this.$post("/crm/getAttachs", {parentId: this.query.id}, (data) => {
                    this.annexList = data.list
                })
            },
            //  删除附件
            delAnnex(id){
                this.$vux.confirm.show({
                    content: '您确定删除吗？',
                    onCancel: () => {},
                    onConfirm: () => {
                        this.$post("/crm/deleteFile", {ids: [id]}, (data) => {
                            this.toastSuccess("删除成功！")
                            this.getAttachs()
                        })
                    }
                })
            },
            //  获取日志
            getLogs(){
                this.$post("/crm/queryLog", {parentId: this.query.id}, (data) => {
                    this.logs = data.list
                })
            },
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .main{
        padding-top: 110px;
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
    }
    .scroll-box{
        height: 100%;
        overflow: auto;
        padding-bottom: 46px;
        box-sizing: border-box;
        .vux-table{
            margin-top: 15px;
            line-height: 20px;
            &:after, td:before{
                display: none;
            }
            td:first-of-type{
                text-align: right;
                padding: 0 10px 8px;
                vertical-align: text-top;
            }
            td:last-of-type{
                text-align: left;
                padding: 0 10px 8px;
            }
        }
        .contacts{
            position: relative;
            padding: 8px 12px;
            border-bottom: 1px solid #ddd;
            .img{
                position: relative;
                float: left;
                i{
                    position: absolute;
                    top: 20px;
                    right: 8px;
                    display: block;
                    color: #f00;
                    font-size: 14px;
                    background: #fff;
                    height: 12px;
                    width: 12px;
                    border-radius: 50%;
                    &:before{
                        position: relative;
                        top: -5px;
                        left: -1px;
                    }
                }
                img{
                    margin-right: 8px;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    vertical-align: middle;
                }
            }
            .edit{
                position: absolute;
                color: #ccc;
                right: 10px;
                top: 8px;
                i{
                    font-size: 24px;
                }
            }
        }
    }
    .handle{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 40px;
        border-top: 1px solid @baseColor;
        display: flex;
        font-size: 14px;
        background: #fff;
        z-index: 5;
        a{
            flex: 1;
            text-align: center;
            line-height: 40px;
            color: @baseColor;
            &.active{
                background: @baseColor;
                color: #fff;
            }
        }
    }
    .footer{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 40px;
        background: #fff;
        border-top: 1px solid #ddd;
        z-index: 2;
        display: flex;
        text-align: center;
        line-height: 40px;
        .footer-tab{
            flex: 1;
            position: relative;
        }
    }
    .amount{
        padding: 8px 12px;
        display: block;
        border-bottom: 1px solid #ddd;
        position: relative;
        .title{
            color: @baseColor;
            line-height: 24px;
            margin-bottom: 10px;
            .success{
                background: @baseColor;
            }
            .fail{
                background: #f60;
            }
        }
        .status{
            display: inline-block;
            padding: 1px 6px;
            line-height: 21px;
            border-radius: 4px;
            text-align: center;
            color: #fff;
            font-weight: normal;
            font-size: 12px;
            margin-right: 10px;
        }
        .label{
            display: inline-block;
            width: 120px;
        }
        .set{
            position: absolute;
            top: 9px;
            right: 10px;
            background: @baseColor;
        }
    }
</style>




