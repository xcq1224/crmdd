<template>
    <div class="page"> 
        <div class="main">
            <group gutter='0' label-width="200px">
                <cell v-if="query.handleType == '0'" is-link v-model="formAdd.name" title="联系人" @click.native="popup1 = true"></cell>
                <cell v-if="query.handleType == '1'" v-model="formAdd.name" title="联系人"></cell>
                <popup-radio title="联系人角色" :options="lxrjs" v-model="formAdd.role" placeholder="请选择"></popup-radio>
                <cell class="font14">
                    <div slot="title">是否主联系人</div>
                    <check-icon :value.sync="formAdd.isMaster"></check-icon>
                </cell>
            </group>
        </div>
        <div class="footer">
            <a class="active" @click="save" style="border-right: 1px solid #fff;">保存</a>
            <router-link class="active" to="./contacts_add?handleType=0" slot="right">新增联系人</router-link>
        </div>
        <!-- 添加联系人 -->
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

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, ChinaAddressData } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton } from 'vux'
    import { Card } from 'vux'
    import { PopupPicker } from 'vux'
    import { XInput, Group, XAddress, XTextarea, Cell, CheckIcon, PopupRadio, Popup, Search } from 'vux'
    import { setTimeout } from 'timers';

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
            Card,
            PopupPicker,
            XInput,
            Group,
            XAddress,
            XTextarea,
            Cell,
            CheckIcon,
            PopupRadio,
            Popup,
            Search,
        },  
        data () {
            return {
                query: {},      //  url参数
                lxrjs: [],      //  联系人角色
                formAdd: {isMaster: false},

                //  联系人
                popup1: false,
                results1: [],                        //  搜索结果
                contacts: [],
                searchValue1: '',                    //  搜索文本
                
            }
        },
        mounted(){
            let list = ["crm-lxrjs"]
            this.$post("/crm/getDict", {"list": list}, (data) => {
                this.lxrjs = data['crm-lxrjs']
            })
        },
        activated(){
            this.query = this.$router.currentRoute.query
            this.formAdd = {isMaster: false}
            if(this.query.handleType == 1){
                this.$post("/crm/opportunityDetailPR/queryContactOpportunity", {id: this.query.id}, (data) => {
                    this.formAdd = data.opportunityContact
                })
            }else{
                this.formAdd.opportunityId = this.query.oppoId
                this.getContacts()
            }
        },
        methods: {
            save(){
                if(!this.formAdd.contactId){
                    this.toastFail("请选择联系人", "160px")
                    return;
                }
                if(!this.formAdd.role){
                    this.toastFail("请选择角色", "160px")
                    return;
                }
                let formAdd = this.deepClone(this.formAdd)
                delete formAdd.name
                if(this.query.handleType == 1){
                    //  修改
                    this.$post("/crm/opportunityDetailPR/updateContact", formAdd, (data) => {
                        if(data.status){
                            this.$vux.confirm.show({
                                content: data.message,
                                onCancel: () => {},
                                onConfirm: () => {
                                    this.$post("/crm/opportunityDetailPR/updateMasterContact", formAdd, (data) => {
                                        this.toastSuccess("修改成功")
                                        this.goBack()
                                    })
                                }
                            })
                        }else{
                            this.toastSuccess("修改成功")
                            this.goBack()
                        }
                    })
                }else{
                    //  新增
                    this.$post("/crm/opportunityDetailPR/addContact", formAdd, (data) => {
                        if(data.status){
                            this.$vux.confirm.show({
                                content: data.message,
                                onCancel: () => {},
                                onConfirm: () => {
                                    this.$post("/crm/opportunityDetailPR/addMasterContact", formAdd, (data) => {
                                        this.toastSuccess("添加成功")
                                        this.goBack()
                                    })
                                }
                            })
                        }else{
                            this.toastSuccess("添加成功")
                            this.goBack()
                        }
                    })
                }
            },
        /************************************添加客户****************************** */
            //  获取联系人
            getContacts(){
                this.$post("/crm/contactsDetailPR/queryOtherContacts", {id: this.query.customerId}, (data) => {
                    this.contacts = []
                    data.list.map((item) => {
                        this.contacts.push({
                            title: item.name,
                            id: item.id
                        })
                    })
                    this.results1 = this.deepClone(this.contacts)
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

            resultClick1 (item) {
                if(item.id){
                    this.formAdd.name = item.title
                    this.formAdd.contactId = item.id
                    this.popup1 = false
                }
            },
            getResult1 (val) {
                this.results1 = val ? this.match1(val) : this.contacts
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
                this.contacts.map((item) => {
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
    .empty-box{
        height: 12px;
    }
    .main{
        background: #f2f2f2;
        padding-bottom: 55px;
        font-size: 12px;
        .weui-cell, .vux-cell-box{
            font-size: 14px;
            &:before{
                left: 0;
            }
        }
    }
    .footer{
        position: absolute;
        bottom: 0;
        z-index: 2;
        width: 100%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        background: #fff;
        display: flex;
        color: @baseColor;
        border-top: 1px solid @baseColor;
        a{
            flex: 1;
            &.active{
                color: #fff;    
                background: @baseColor;
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



