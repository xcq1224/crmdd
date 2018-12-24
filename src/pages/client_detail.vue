<template>
    <div class="page"> 
        <swiper class="crm_detial_header" dots-class="dots" :auto='false' dots-position="center">
            <swiper-item class="item1">
                <p class="title">{{baseInfo.name}}</p>
                <p>跟进状态：{{baseInfo.followStatus || '———'}}</p>
            </swiper-item>
            <swiper-item class="item2">
                <p>参与成员：</p>
                <router-link :to="'./client_member?id=' + baseInfo.id + '&moduleName=crm_customer&moduleNames=客户'" class="user-list">
                    <span v-if="index<7" :class="item.isOwner ? 'admin' : ''" v-for="(item, index) in memberList" :key="index">
                        <!-- <img src="../assets/avatar.jpg" alt=""> -->
                        <font class="iconfont icon-morentouxiang"></font>
                        <i v-if="item.isOwner" class="iconfont icon-geren"></i>
                    </span>
                    <span v-show="memberList.length > 7">●●●</span>
                    <i class="iconfont icon-right"></i>
                </router-link>
            </swiper-item>
        </swiper>
        <div class="main">
            <tab class="vux-1px-b" :line-width=2 custom-bar-width="80%" :scroll-threshold='7' v-model="tabIndex">
                <tab-item class="vux-center" :selected="tabIndex == 0" @click="tabIndex = 0">动态</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 1" @click="tabIndex = 1">详情</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 2" @click="tabIndex = 2">联系人</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 3" @click="tabIndex = 3">线索</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 4" @click="tabIndex = 4">机会</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 5" @click="tabIndex = 5">合同</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 6" @click="tabIndex = 6">附件</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 7" @click="tabIndex = 7">日志</tab-item>
            </tab>
            <swiper v-model="tabIndex" :show-dots="false" height="100%" @on-index-change="getInfoByindex">
                <swiper-item class="tab-item1">
                    <div class="follow-box">
                        <div class="follow">
                            <template v-for="(item, index) in follows">
                                <div v-show="showDate(index)" class="el-popover el-popper tooltip iconfont date" x-placement="right-start">
                                    <div class="follow-item-date iconfont">{{item.followTime.split(' ')[0]}}</div>
                                </div>
                                <div class="follow-item">
                                    <p class="title">{{item.createUserCname}}<span class="datetime">{{item.followTime.split(' ')[1]}}</span></p>
                                    <p>{{item.followContent}}</p>
                                    <p>跟进方式：{{item.followType}}</p>
                                    <p>跟进状态：{{item.followStatus}}</p>
                                    <p v-if="item.contactCname">联系人：{{item.contactCname}}</p>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="footer">
                        <router-link class="footer-tab" :to="'./client_follow?id=' + baseInfo.id + '&name=' + baseInfo.name">写跟进</router-link>
                        <router-link class="footer-tab vux-1px-l" :to="'./visit_sign?id=' + baseInfo.id + '&name=' + baseInfo.name">拜访签到</router-link>
                        <div class="footer-tab vux-1px-l" v-if="isOwner">
                            <div @click="showSubbat = !showSubbat">更多</div>
                            <div v-show="showSubbat" @click="showSubbat = false" class="footer-subtab vux-1px-l">
                                <div class="vux-1px-b" @click="delCustomer">删除</div>
                                <div @click="popup2 = true">转给他人</div>
                            </div>
                        </div>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item2">
                    <div class="scroll-box" :style="isModify ? '' : 'padding-bottom: 0'">
                        <x-table :cell-bordered="false" :content-bordered="false" :full-bordered="false" class="vux-table-default">
                            <tr v-for="(item, index) in fieldList" :key="index" v-if="['taxNo', 'companyAddress', 'companyPhone', 'openBank', 'openAccount'].indexOf(item.name) != -1">
                                <td width='80'>{{item.label}}</td>
                                <td>{{baseInfo[item.name]}}</td>
                            </tr>
                        </x-table>
                        <div style="height: 2px; background: #ddd;"></div>
                        <x-table :cell-bordered="false" :content-bordered="false" :full-bordered="false" class="vux-table-default">
                            <tr v-for="(item, index) in fieldList" :key="index" v-if="item.editorType != 'tableItem' && ['taxNo', 'companyAddress', 'companyPhone', 'openBank', 'openAccount'].indexOf(item.name) == -1">
                                <td width='80'>{{item.label}}</td>
                                <td v-if="item.editorType != 'cascade' && item.editorType != 'table'">{{baseInfo[item.name]}}</td>
                                <td v-if="item.editorType == 'cascade'">{{baseInfo[item.name] ? baseInfo[item.name].join("/") : ''}}</td>
                                <td v-if="item.editorType == 'table'" style="padding: 0 10px 0 0;">
                                    <x-table full-bordered class="custom-table">
                                        <thead>
                                            <tr>
                                                <td v-for="(item1, index1) in tableNameObj[item.name]" :key="index1">{{item1.label}}</td>
                                            </tr>
                                        </thead>
                                        <tr v-show="!(baseInfo[item.name] && baseInfo[item.name].length)">
                                            <td colspan="100">暂无数据</td>
                                        </tr>
                                        <tr v-if="baseInfo[item.name] && baseInfo[item.name].length" v-for="(item2, index2) in baseInfo[item.name]" :key="index2">
                                            <td v-for="(item1, index1) in tableNameObj[item.name]" :key="index1">{{item2[item1.name]}}</td>
                                        </tr>
                                    </x-table>
                                </td>
                            </tr>
                            <tr>
                                <td width='80'>拥有者</td>
                                <td>{{baseInfo.ownerCname}}</td>
                            </tr>
                            <tr>
                                <td width='80'>创建者</td>
                                <td>{{baseInfo.createUserCname}}</td>
                            </tr>
                            <tr>
                                <td width='80'>创建时间</td>
                                <td>{{baseInfo.createTime}}</td>
                            </tr>
                        </x-table>
                    </div>
                    <div class="handle" v-if="isModify">
                        <router-link :to="'./client_add?handleType=1&id=' + baseInfo.id">编辑</router-link>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item3">
                    <div class="scroll-box">
                        <div v-if="contacts.length">
                            <router-link :to="'./contacts_detail?id='+item.id" style="display: block;" class="contacts text_base" v-for="(item, index) in contacts" :key="index">
                                <img v-if="item.avatar" :src="item.avatar" alt="">
                                <img v-if="!item.avatar" src="../assets/avatar.jpg" alt="">
                                {{item.name}}
                            </router-link>
                        </div>
                        <div v-else>
                            <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                        </div>
                    </div>
                    <div class="handle">
                        <router-link :to="'./contacts_add?handleType=2&customerId=' + baseInfo.id">新增</router-link>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item8">
                    <div class="scroll-box">
                        <div v-if="clues.length">
                            <div @click="jumpCheck('clue_detail', item.id)" class="list-item" v-for="(item, index) in clues" :key="index">
                                <p>
                                    <span  class="inline_block text-ellipsis w270 text_base">{{item.name}}</span>
                                    <span class="float_r font12">{{item.createTime.split(' ')[0]}}</span>
                                </p> 
                                <p>
                                    <span class="inline_block text-ellipsis w270">{{item.mobilePhone}}</span>
                                    <span class="float_r font12">{{item.followStatus}}</span>
                                </p>
                            </div>
                        </div>
                        <div v-else>
                            <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                        </div>
                    </div>
                    <div class="handle">
                        <router-link :to="'./clue_add?handleType=2&customerId=' + baseInfo.id + '&customerName=' + baseInfo.name">新增</router-link>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item4">
                    <div class="scroll-box">
                        <div v-if="opportunitys.length">
                            <div @click="jumpCheck('opportunity_detail', item.id)" class="list-item" v-for="(item, index) in opportunitys" :key="index">
                                <p>
                                    <span  class="inline_block text-ellipsis w270 text_base">{{item.opportunityName}}</span>
                                    <span class="float_r font12">{{item.createTime.split(' ')[0]}}</span>
                                </p> 
                                <p><span class="inline_block text-ellipsis w_100">{{item.amount}}万元&nbsp;&nbsp;{{item.customerName}}</span></p>
                            </div>
                        </div>
                        <div v-else>
                            <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                        </div>
                    </div>
                    <div class="handle">
                        <router-link :to="'./opportunity_add?handleType=2&customerId=' + baseInfo.id + '&customerName=' + baseInfo.name">新增</router-link>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item5">
                    <div class="scroll-box">
                        <div v-if="marketContracts.length">
                            <div @click="jumpCheck('contract_detail', item.id, 'crm_marketing_contract')" class="list-item" v-for="(item, index) in marketContracts" :key="index">
                                <p>
                                    <span  class="inline_block text-ellipsis w270 text_base">{{item.contractName}}</span>
                                    <span class="float_r font12">{{item.createTime.split(' ')[0]}}</span>
                                </p> 
                                <p><span class="inline_block text-ellipsis w270">{{item.contracAmount}}万元&nbsp;&nbsp;{{item.customerName}}</span><span class="float_r font12">{{item.contractState}}</span></p>
                            </div>
                        </div>
                        <div v-else>
                            <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                        </div>
                    </div>
                    <div class="handle">
                        <router-link :to="'./contract_add?handleType=2&customerId=' + baseInfo.id + '&customerName=' + baseInfo.name">新增</router-link>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item6">
                    <div v-if="annexList.length">
                        <div class="list-item" v-for="(item, index) in annexList" :key="index">
                            <p>
                                <span  class="inline_block text-ellipsis w320 text_333">{{item.fileName}}</span>
                                <span class="float_r" v-if="isOwner"><i class="iconfont icon-shanchu icon_handle" @click="delAnnex(item.id)"></i></span>
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
        <!-- 转给他人选择拥有者 -->
        <!-- 转给他人弹框 -->
        <popup v-model="popup2" class="turn-box" @on-show="showPopup2" height="100%">
            <group gutter='0' label-width="150px">
                <cell is-link title="新拥有者" @click.native="popup1 = true" v-model="staffName" class="font14"></cell>
                <cell class="font14">
                    <div slot="title" style="width: 200px;">保留原拥有者为团队成员</div>
                    <check-icon :value.sync="checkBox1"></check-icon>
                </cell>
                <cell title="转移相关业务" class="font14">
                    <check-icon :value.sync="checkBox2"><span class="text_777 float_r">线索</span></check-icon>
                    <check-icon :value.sync="checkBox3"><span class="text_777 float_r">机会</span></check-icon>
                    <check-icon :value.sync="checkBox4"><span class="text_777">合同</span></check-icon>
                </cell>
            </group>
            <div class="add"><a @click="turnSave">确定</a></div>
        </popup>
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
    import { Tab, TabItem, Sticky, XButton, Swiper, SwiperItem, XTable, Search, Popup, Group, Cell, CheckIcon } from 'vux'

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
            Group,
            Cell,
            CheckIcon,
        },
        data () {
            return {
                tabIndex: 0,
                showSubbat: false,      //  显示更多

                query: {},              //  页面传参
                baseInfo: {},           //  详细信息
                memberList: [],         //  团队成员
                isModify: false,        //  是否有编辑权限
                isDownload: false,      //  是否有下载权限
                isOwner: false,         //  是否是拥有者
                addLabel: [],           
                tableNameObj: {},						//	自定义表格字段

            /********************跟进记录********************* */
                follows: [],
                fieldList: [],      //  客户字段列表
                contacts: [],       //  联系人列表
                opportunitys: [],   //  机会
                clues: [],          //  线索
                marketContracts: [],    //  合同
                annexList: [],      //  附件
                logs: [],                   //  日志

                //  搜索
                is_search: false,
                results: [],
                searchValue: '',
            /*********************转给他人********************** */
                popup2: false,                      
                staffName: '',              //  转给他人姓名
                staffId: '',              //  转给他人id
                checkBox1: false,           //  保留原拥有者为团队成员
                checkBox2: false,           //  转移线索
                checkBox3: false,           //  转移机会
                checkBox4: false,           //  转移合同
                //  拥有者
                popup1: false,
                results1: [],                        //  搜索结果
                staffs: [],
                searchValue1: '',                    //  搜索文本
            }
        },
        mounted(){
            this.getAllStaff()
        },
        activated(){
            // this.tabIndex = 0
            this.baseInfo = {}
            this.follows = []
            this.$vux.loading.show()
            this.query = this.$router.currentRoute.query
            this.$post("/crm/customerDetailPR/queryCrmCustomerForOne", {id: this.query.id}, (data) => {
                this.baseInfo = data.customer
                this.isModify = data.isModify
                this.isDownload = data.isDownload
                this.isOwner = data.isOwner
                this.follows = data.follows
                this.getInfoByindex(this.tabIndex)
            })
            this.getMembers()
        },
        deactivated(){
            
        },
        
        methods: {
            //  根据当前swiper来加载对应内容
            getInfoByindex(val){
                if(val == 1){
                    this.getFieldList()
                }
                if(val == 2){
                    this.getContacts()
                }
                if(val == 3){
                    this.getClues()
                }
                if(val == 4){
                    this.getOpportunitys()
                }
                if(val == 5){
                    this.getMarketContracts()
                }
                if(val == 6){
                    this.getAttachs()
                }
                if(val == 7){
                    this.getLogs()
                }
            },
            //  获取团队成员
            getMembers(){
                this.$post("/crm/memberPR/getAll", {"parentId": this.query.id, "moduleName": "crm_customer"}, (data) => {
                    this.memberList = data.list
                })
            },
            //  删除客户
            delCustomer(){
                this.$vux.confirm.show({
                    content: '您确定删除吗？',
                    onCancel: () => {},
                    onConfirm: () => {
                        this.$post('/crm/customerPR/deleteCrmCustomer', {"list": [this.baseInfo.id]}, (data) => {
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
        /**---------------------------------------------写跟进--------------------------------------------- */
            //  是否显示跟进日期
            showDate(index){
                if(index > 0){
                    let date1 = this.follows[index-1].followTime.split(' ')[0]
                    let date2 = this.follows[index].followTime.split(' ')[0]
                    if(date1 == date2){
                        return false
                    }
                }
                return true
            },
        /**---------------------------------------------转给他人--------------------------------------------- */
            //  打开弹框清空表单
            showPopup2(){
                this.staffName = ''
                this.staffId = ''
                this.checkBox1 = false
                this.checkBox2 = false
                this.checkBox3 = false
                this.checkBox4 = false
            },
            //  确定转给他人
            turnSave(){
                console.log()
                if(!this.staffId){
                    this.toastFail("请选择新拥有者！", "200px")
                    return
                }
                let list = [this.query.id]
                let params = {
                    list: list,
                    ownerId: this.staffId,
                    ifLeft: this.checkBox1,
                    turnClue: this.checkBox2,
                    turnOpportunity: this.checkBox3,
                    turnContract: this.checkBox4,
                }
                this.$post("/crm/customerPR/turnOther", params, (data) => {
                    this.popup2 = false
                    this.toastSuccess("转移成功！")
                    this.$router.back(-1)
                })
            },
        /****************************************转给他人选择拥有者******************************************* */
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
                    this.staffName = item.name
                    this.staffId = item.id
                    this.popup1 = false
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
            //  获取客户字段
            getFieldList(){
                if(!this.fieldList.length){
                    this.$vux.loading.show()
                    this.$post("/crm/extFieldPR/getField", {tableName: 'crm_customer'}, (data) => {
                        this.fieldList = data.list
                        data.tableList.map((item) => {
                            this.tableNameObj[item] = []
                        })
                        data.list.map((item) => {
                            if(item.editorType == 'tableItem'){
                                this.tableNameObj[item.dictName].push({
                                    name: item.name,
                                    label: item.label
                                })
                            }
                        })
                        console.log(this.tableNameObj)
                    })
                }
            },
            //  获取联系人
            getContacts(){
                this.$vux.loading.show()
                this.$post("/crm/contactsDetailPR/queryOtherContacts", {id: this.query.id}, (data) => {
                    this.contacts = data.list
                })
            },
            //  获取线索
            getClues(){
                this.$vux.loading.show()
                this.$post("/crm/customerDetailPR/customerAddMarketingClue", {id: this.query.id}, (data) => {
                    this.clues = data.list
                })
            },
            //  获取机会
            getOpportunitys(){
                this.$vux.loading.show()
                this.$post("/crm/customerDetailPR/customerAddOpportunity", {id: this.query.id}, (data) => {
                    this.opportunitys = data.list
                })
            },
            //  获取合同
            getMarketContracts(){
                this.$vux.loading.show()
                this.$post("/crm/customerDetailPR/customerAddContract", {id: this.query.id}, (data) => {
                    this.marketContracts = data.list
                })
            },
            //  获取附件
            getAttachs(){
                this.$vux.loading.show()
                this.$post("/crm/getAttachs", {parentId: this.query.id}, (data) => {
                    this.annexList = data.list
                })
            },
            //  获取日志
            getLogs(){
                this.$vux.loading.show()
                this.$post("/crm/queryLog", {parentId: this.query.id}, (data) => {
                    this.logs = data.list
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
            
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .main{
        padding-top: 110px;
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
    }
    .tab-item1{
        background: #f2f2f2;
        .follow-box{
            position: absolute;
            width: 100%;
            height: 100%;
            padding-bottom: 41px;
            box-sizing: border-box;
            overflow: auto;
        }
        .follow{
            margin: 0 18px 20px;
            padding: 30px 0 15px 15px;
            border-left: 1px solid @baseColor;
            .follow-item{
                position: relative;
                background: #fff;
                margin-bottom: 20px;
                padding: 5px 10px;
                border-radius: 6px;
                font-size: 14px;
                color: #333;
                .datetime{
                    float: right;
                    color: #777;
                }
                .title{
                    padding: 5px 0;
                }
                p{
                    line-height: 18px;
                }
                .text-color{
                    color: @baseColor;
                }
                &:after{
                    content: '';
                    display: block;
                    position: absolute;
                    top: 0;
                    left: -20px;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: @baseColor;
                }
            }
            .follow-item-date{
                position: relative;
                width: 72px;
                height: 22px;
                font-size: 12px;
                line-height: 22px;
                margin-bottom: 20px;
                text-align: center;
                background: @baseColor;
                color: #fff;
                border-radius: 5px;
                &:after{
                    content: '\e602';
                    display: block;
                    position: absolute;
                    top: 0;
                    left: -24px;
                    width: 18px;
                    height: 18px;
                    line-height: 18px;
                    font-size: 12px;
                    border-radius: 50%;
                    background: @baseColor;
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
        .footer-subtab{
            position: absolute;
            height: 72px;
            width: 100%;
            background: #fff;
            top: -74px;
            line-height: 36px;
            border-top: 1px solid #ddd;
        }
    }
    .scroll-box{
        height: 100%;
        overflow: auto;
        padding-bottom: 46px;
        box-sizing: border-box;
        .vux-table-default{
            margin-top: 15px;
            line-height: 20px;
            &:after, >tr>td:before{
                display: none;
            }
            >tr>td:first-of-type{
                text-align: left;
                padding: 0 0 8px 20px;
                vertical-align: text-top;
            }
            >tr>td:last-of-type{
                text-align: left;
                padding: 0 10px 8px;
            }
        }
        .contacts{
            padding: 8px 12px;
            border-bottom: 1px solid #ddd;
            img{
                margin-right: 8px;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                vertical-align: middle;
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
    .add{
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
</style>




