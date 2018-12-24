<template>
    <div class="page"> 
        <swiper class="crm_detial_header" dots-class="dots" :auto='false' dots-position="center">
            <swiper-item class="item1">
                <p class="title">{{baseInfo.name}}</p>
                <p>{{baseInfo.customerName}}</p>
            </swiper-item>
            <swiper-item class="item2">
                <p>参与成员：</p>
                <router-link :to="'./client_member?id=' + baseInfo.id + '&moduleName=crm_marketing_clue&moduleNames=线索'" class="user-list">
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
            <tab class="vux-1px-b" :line-width=2 custom-bar-width="50%" v-model="tabIndex">
                <tab-item class="vux-center" :selected="tabIndex == 0" @click="tabIndex = 0">动态</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 1" @click="tabIndex = 1">详情</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 2" @click="tabIndex = 2">机会</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 3" @click="tabIndex = 3">附件</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 4" @click="tabIndex = 4">日志</tab-item>
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
                        <router-link class="footer-tab" :to="'./clue_follow?id=' + baseInfo.id + '&name=' + baseInfo.name + '&customerId=' + baseInfo.customerId">写跟进</router-link>
                        <router-link class="footer-tab vux-1px-l" :to="'./clue_opportunity?id=' + baseInfo.id">转化机会</router-link>
                        <div class="footer-tab vux-1px-l" v-if="isOwner">
                            <div @click="showSubbat = !showSubbat">更多</div>
                            <div v-show="showSubbat" @click="showSubbat = false" class="footer-subtab vux-1px-l">
                                <div class="vux-1px-b" @click="popup2 = true" v-if="baseInfo.marketingClueState != '已关闭'">关闭</div>
                                <div class="vux-1px-b" @click="delClue">删除</div>
                                <div @click="popup1 = true">转给他人</div>
                            </div>
                        </div>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item2">
                    <div class="scroll-box" :style="isModify ? '' : 'padding-bottom: 0'">
                        <x-table :cell-bordered="false" :content-bordered="false" :full-bordered="false">
                            <tr v-for="(item, index) in fieldList" :key="index">
                                <td width='80'>{{item.label}}</td>
                                <td v-if="item.editorType != 'cascade'">{{baseInfo[item.name]}}</td>
                                <td v-if="item.editorType == 'cascade'">{{baseInfo[item.name].join("/")}}</td>
                            </tr>
                            <!-- <tr>
                                <td width='80'>合作伙伴</td>
                                <td>{{baseInfo.partnerName}}</td>
                            </tr> -->
                            <tr>
                                <td width='80'>拥有者</td>
                                <td>{{baseInfo.ownerCname}}</td>
                            </tr>
                            <tr>
                                <td width='80'>线索状态</td>
                                <td>{{baseInfo.marketingClueState}}</td>
                            </tr>
                            <tr v-show="baseInfo.marketingClueState == '已关闭'">
                                <td width='80'>关闭原因</td>
                                <td>{{baseInfo.closeReason}}</td>
                            </tr>
                            <tr v-show="baseInfo.marketingClueState == '已关闭'">
                                <td width='80'>关闭人</td>
                                <td>{{baseInfo.closePerson}}</td>
                            </tr>
                            <tr v-show="baseInfo.marketingClueState == '已关闭'">
                                <td width='80'>关闭时间</td>
                                <td>{{baseInfo.closeTime}}</td>
                            </tr>
                        </x-table>
                    </div>
                    <div class="handle" v-if="isModify">
                        <router-link :to="'./clue_add?handleType=1&id=' + baseInfo.id">编辑</router-link>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item5">
                    <div class="scroll-box">
                        <div v-if="opportunitys.length">
                            <div @click="jumpCheck('opportunity_detail', item.id)" class="list-item" v-for="(item, index) in opportunitys" :key="index">
                                <p>
                                    <span  class="inline_block text-ellipsis w270 text_base">{{item.opportunityName}}</span>
                                    <span class="float_r font12">{{item.createTime.split(' ')[0]}}</span>
                                </p> 
                                <p><span class="inline_block text-ellipsis w_100">{{item.amount}}(万元)&nbsp;&nbsp;{{baseInfo.customerName}}</span></p>
                            </div>
                        </div>
                        <div v-else>
                            <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                        </div>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item3">
                    <div v-if="annexList.length">
                        <div class="list-item" v-for="(item, index) in annexList" :key="index">
                            <p>
                                <span  class="inline_block text-ellipsis w320 text_333">{{item.fileName}}</span>
                                <span class="float_r" v-if="isOwner"><i class="iconfont icon-shanchu icon_handle" @click="delAnnex(item.id)"></i></span>
                            </p> 
                            <p><span class="font12">{{formatDate(new Date(item.upTime), 'yyyy-MM-dd hh:mm:ss')}}}</span></p>
                        </div>
                    </div>
                    <div v-else>
                        <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item4">
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
        <!-- 关闭 -->
        <popup v-model="popup2" @on-show="showPopup2" height="100%">
            <div class="popup0">
                <div class="close-box" style="padding: 8px 16px;background: #fff; border-bottom: 1px solid #ddd;">
                    <span @click="popup2 = false">取消</span>
                    <span class="text_base float_r" @click="close">确定</span>
                </div>
                <x-textarea placeholder="请填写关闭原因" v-model="reason" :rows='5' :max="100" :autosize="true" style="background: #fff;"></x-textarea>
                <p style="padding: 5px 12px;font-size: 12px;color: red;">*关闭不可恢复</p>
            </div>
        </popup>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton, Swiper, SwiperItem, XTable, Search, Popup, XTextarea } from 'vux'

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
            XTextarea,
        },
        data () {
            return {
                tabIndex: 0,
                showSubbat: false,
                
                query: {},              //  页面传参
                baseInfo: {},           //  详细信息
                memberList: [],         //  团队成员
                isModify: false,        //  是否有编辑权限
                isDownload: false,      //  是否有下载权限
                isOwner: false,         //  是否是拥有者
                
                /********************跟进记录********************* */
                follows: [],
                fieldList: [],      //  详情字段列表
                opportunitys: [],   //  机会
                annexList: [],      //  附件
                logs: [],                   //  日志

                //  拥有者
                popup1: false,
                results1: [],                        //  搜索结果
                staffs: [],
                searchValue1: '',                    //  搜索文本

                //  关闭
                popup2: false,
                reason: '',
                
            }
        },
        activated(){
            this.showSubbat = false
            this.$vux.loading.show()
            this.query = this.$router.currentRoute.query
            this.getBaseInfo()
            this.getMembers()
            this.getAllStaff()
        },
        methods: {
            //  获取基本信息
            getBaseInfo(){
                this.$post("/crm/marketingClueDetailPR/queryMarketingClueForOne", {id: this.query.id, moduleName: 'crm_marketing_clue'}, (data) => {
                    this.baseInfo = data.marketingClue
                    this.isModify = data.isModify
                    this.isDownload = data.isDownload
                    this.isOwner = data.isOwner
                    this.follows = data.follows
                    this.getInfoByindex(this.tabIndex)
                })
            },
            //  根据当前swiper来加载对应内容
            getInfoByindex(val){
                console.log(val)
                if(val == 1){
                    this.getFieldList()
                }
                if(val == 2){
                    this.getOpportunitys()
                }
                if(val == 3){
                    this.getAttachs()
                }
                if(val == 4){
                    this.getLogs()
                }
            },
            //  获取团队成员
            getMembers(){
                this.$post("/crm/memberPR/getAll", {"parentId": this.query.id, "moduleName": "crm_marketing_clue"}, (data) => {
                    this.memberList = data.list
                })
            },
            //  删除客户
            delClue(){
                this.$vux.confirm.show({
                    content: '您确定删除吗？',
                    onCancel: () => {},
                    onConfirm: () => {
                        this.$post('/crm/marketingCluePR/deleteMarketingClue', {"list": [this.query.id]}, (data) => {
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
                    this.$post("/crm/marketingCluePR/turnOther", params, (data) => {
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
        /**---------------------------------------------关闭-------------------------------------- */
            showPopup2(){
                this.reason = ''
            },
            close(){
                if(!this.reason){
                    this.toastFail("请填写关闭原因", "160px")
                    return;
                }
                let params = {
                    closeMarketingClue: {closeReason: this.reason}, 
                    flag: "close", 
                    id: this.query.id
                }
                this.$post("/crm/marketingCluePR/updateMarketingClue", params, (data) => {
                    this.popup2 = false
                    this.getBaseInfo()
                })
            },
        /*****************************************其他tab信息************************************* */
            //  获取字段
            getFieldList(){
                if(!this.fieldList.length){
                    this.$vux.loading.show()
                    this.$post("/crm/extFieldPR/getField", {tableName: 'crm_marketing_clue'}, (data) => {
                        this.fieldList = data.list
                    })
                }
            },
            //  获取机会
            getOpportunitys(){
                this.$vux.loading.show()
                this.$post("/crm/marketingClueDetailPR/opportunityByMarketingClueId", {id: this.query.id}, (data) => {
                    this.opportunitys = data.list
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
            width: 100%;
            background: #fff;
            bottom: 41px;
            line-height: 36px;
            border-top: 1px solid #ddd;
        }
    }
    .tab-item2{
        .table-box{
            height: 100%;
            overflow: auto;
            padding-bottom: 46px;
            box-sizing: border-box;
        }
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
    }
</style>




