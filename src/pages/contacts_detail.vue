<template>
    <div class="page"> 
        <swiper class="crm_detial_header" :show-dots="false">
            <swiper-item class="item1">
                <p class="title">{{baseInfo.name}}</p>
                <p>公司名称：{{customerName}}</p>
            </swiper-item>
        </swiper>
        <div class="main">
            <tab class="vux-1px-b" :line-width=2 custom-bar-width="80%" :scroll-threshold='5' v-model="tabIndex">
                <tab-item class="vux-center" :selected="tabIndex == 0" @click="tabIndex = 0">详情</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 1" @click="tabIndex = 1">公司同事</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 2" @click="tabIndex = 2">关联人</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 3" @click="tabIndex = 3">机会</tab-item>
                <tab-item class="vux-center" :selected="tabIndex == 4" @click="tabIndex = 4">日志</tab-item>
            </tab>
            <swiper v-model="tabIndex" :show-dots="false" height="100%" @on-index-change="getInfoByindex">
                <swiper-item class="tab-item2">
                    <div class="scroll-box" :style="isModify? '' : 'padding-bottom: 0;'">
                        <x-table :cell-bordered="false" :content-bordered="false" :full-bordered="false">
                            <tr>
                                <td width='100'>照片</td>
                                <td><img v-show="baseInfo.avatarPath" width="60" height="60" :src="baseInfo.avatarPath" /></td>
                            </tr>
                            <tr v-for="(item, index) in addLabel" :key="index">
                                <td>{{item.label}}</td>
                                <td>{{baseInfo[item.name]}}</td>
                            </tr>
                            <tr>
                                <td>标签</td>
                                <td class="tag-box" style="border: none;">
                                    <span class="el-tag" v-for="(item, index) in baseInfo.tags" :key="index">{{item}}</span>
                                </td>
                            </tr>
                        </x-table>
                    </div>
                    <div class="footer" v-if="isModify">
                        <div class="footer-tab vux-1px-l"><router-link style="display: block;" :to="'./contacts_add?id=' + baseInfo.id + '&handleType=1'">编辑</router-link></div>
                        <div class="footer-tab vux-1px-l" v-if="isOwner" @click="delcontact">删除</div>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item3">
                    <div class="scroll-box">
                        <div v-if="otherContacts.length">
                            <div class="list-item" @click="reload(item.id)" v-for="(item, index) in otherContacts" :key="index">
                                <p><span class="text_base">{{item.name}}</span><span class="float_r text_333">{{item.job}}</span></p>
                            </div>
                        </div>
                        <div v-else>
                            <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                        </div>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item4">
                    <div class="scroll-box">
                        <div v-if="relationShipList.length">
                            <div v-for="(item, index) in relationShipList" :key="index" class="list-item">
                                <p>
                                    <router-link :to="'./related_info_add?handleType=2&id=' + item.id + '&aId=' + baseInfo.id" class="text_base">{{item.name}}</router-link>
                                    <i v-if="isOwner" @click="delContactRelation(index, item.id, item.relationShipId, item.name)" class="float_r text_base iconfont icon-shanchu" style="margin-left: 10px;"></i>
                                    <router-link v-if="isModify" :to="'./related_info_add?handleType=1&id=' + item.id + '&aId=' + baseInfo.id" class="float_r text_base iconfont icon-bianji1" style="margin-left: 10px;"></router-link>
                                    <span class="float_r text_333">{{item.relation}}</span>
                                </p>
                            </div>
                        </div>
                        <div v-else>
                            <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                        </div>
                    </div>
                    <div class="handle">
                        <router-link :to="'./related_info_add?handleType=0&aId=' + baseInfo.id">新增</router-link>
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
                                <p><span class="inline_block text-ellipsis w270">{{item.amount}}万元&nbsp;&nbsp;{{item.customerName}}</span><span class="float_r font12">{{item.marketingSection}}</span></p>
                            </div>
                        </div>
                        <div v-else>
                            <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
                        </div>
                    </div>
                </swiper-item>
                <swiper-item class="tab-item6">
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
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton, Swiper, SwiperItem, XTable } from 'vux'

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
        },
        data () {
            return {
                tabIndex: 0,            
                baseInfo: {},               //  详细信息
                customerName: '',           //  客户名称      
                isModify: false,            //  是否能编辑
                isOwner: false,             //  是否是拥有者
                query: {},                  //  页面传参
                addLabel: [],       
                otherContacts: [],          //  公司其他联系人    
                relationShipList: [],       //  关联人
                opportunitys: [],           //  机会
                logs: [],                   //  日志
            }
        },
        activated(){
            this.$vux.loading.show()
            this.query = this.$router.currentRoute.query
            this.$post("/crm/contactsDetailPR/queryContactsForOne", {id: this.query.id}, (data) => {
                this.baseInfo = data.contact
                this.customerName = data.customerName
                this.isModify = data.isModify
                this.isOwner = data.isOwner
                this.getInfoByindex(this.tabIndex)
            })
            
        },
        deactivated(){

        },
        methods: {
            //  跳转公司其他联系人
            reload(id){
                window.location.href="./contacts_detail?id=" + id
            },
            //  删除联系人
            delcontact(){
                this.$vux.confirm.show({
                    content: '您确定删除吗？',
                    onCancel: () => {},
                    onConfirm: () => {
                        this.$post('/crm/contactsPR/deleteCrmContacts', {"list": [this.baseInfo.id]}, (data) => {
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
            //  根据当前swiper来加载对应内容
            getInfoByindex(val){
                this.$vux.loading.show()
                if(val == 0){         //  获取详情
                    this.getField()
                }
                if(val == 1){         //  获取其他联系人
                    this.getOtherContacts()
                }
                if(val == 2){         //  获取相关联系人
                    this.getContactRelation()
                }
                if(val == 3){         //  获取相关机会
                    this.getOpportunitys()
                }
                if(val == 4){         //  获取日志
                    this.getLogs()
                }
            },
            //  获取联系人字段
            getField(){
                this.$post("/crm/extFieldPR/getField", {tableName: 'crm_contacts'}, (data) => {
                    this.addLabel = data.list;
                })
            },
            //  获取其他联系人
            getOtherContacts(){
                this.$post("/crm/contactsDetailPR/queryOtherContacts", {id: this.baseInfo.customerId}, (data) => {
                    this.otherContacts = []
                    data.list.map((item) => {
                        if(item.id != this.baseInfo.id){
                            this.otherContacts.push(item)
                        }
                    })
                })
            },
            //  获取相关联系人
            getContactRelation(){
                this.$post("/crm/contactsDetailPR/queryContactRelation", {id: this.baseInfo.id}, (data) => {
                    this.relationShipList = data.list
                })
            },
            //  获取机会
            getOpportunitys(){
                this.$post("/crm/opportunityDetailPR/getContactOppo", {id: this.baseInfo.id}, (data) => {
                    this.opportunitys = data.list
                })
            },
            //  获取日志
            getLogs(){
                this.$post("/crm/queryLog", {parentId: this.baseInfo.id}, (data) => {
                    this.logs = data.list
                })
            },
            //  删除相关联系人
            delContactRelation(index, id, relationShipId, name){
                this.$vux.confirm.show({
                    content: '您确定删除吗？',
                    onCancel: () => {},
                    onConfirm: () => {
                        let params = {
                            id: id,
                            name: name,
                            bId: this.baseInfo.id,
                            relationShipId: relationShipId
                        }
                        this.$post("/crm/contactsDetailPR/delContactRelation", params, (data) => {
                            this.toastSuccess("删除成功！")
                            this.relationShipList.splice(index, 1)
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
                text-align: left;
                padding: 0 0 8px 20px;
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
    .tab-item3 .list-item, .tab-item4 .list-item{
        padding: 10px 10px;
    }
</style>




