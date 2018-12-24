<template>
    <div class="page"> 
        <div class="main">
            <group gutter='0' label-width="100px">
                <template v-for="item in addLabel">
                    <x-textarea v-model="formAdd[item.name]" :height="20" :rows='1' :autosize="true" v-if="item.editorType == 'text' && item.name != 'no' && ['taxNo', 'companyAddress', 'companyPhone', 'openBank', 'openAccount'].indexOf(item.name) == -1">
                        <div slot="label" style="width: 100px;"><span v-if="requiredList.indexOf(item.name) != -1" style="color: red;">* </span>{{item.label}}</div>
                    </x-textarea>
                    <cell @click.native="showPopupPicker = true" v-if="item.editorType == 'cascade'" :title="item.label" :value="areaStr"></cell>
                    <selector v-model="formAdd[item.name]" v-if="item.editorType == 'dict'" placeholder="" :title="item.label" :options="item.selectList"></selector>
                    <datetime v-model="formAdd[item.name]" format="YYYY-MM-DD HH:mm" v-if="item.editorType == 'date'" :title="item.label"></datetime>
                </template>
                <cell v-if="query.handleType != '1'" is-link v-model="formAdd.ownerCname" @click.native="popup1 = true">
                    <div slot="title"><span style="color: red;">* </span>拥有者</div>
                </cell>
                <template v-for="item in addLabel" v-if="['taxNo', 'companyAddress', 'companyPhone', 'openBank', 'openAccount'].indexOf(item.name) != -1">
                    <x-textarea v-model="formAdd[item.name]" :height="20" :rows='1' :autosize="true" v-if="item.editorType == 'text' && item.name != 'no'">
                        <div slot="label" style="width: 100px;"><span v-if="requiredList.indexOf(item.name) != -1" style="color: red;">* </span>{{item.label}}</div>
                    </x-textarea>
                </template>
            </group>
        </div>
        <div class="footer">
            <a class="active" @click="save">保存</a>
        </div>
        <popup-picker class="popup-picker" :show.sync="showPopupPicker" @on-change="onChange" :show-cell="false" :data="cityData()" v-model="area" :columns="3"></popup-picker>
        <!-- 添加拥有者 -->
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
    import { XInput, Group, XAddress, XTextarea, Selector, Datetime, Search, Popup, Cell } from 'vux'
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
            Selector,
            Datetime,
            Search,
            Popup,
            Cell,
        },  
        data () {
            return {
                query: {},        // handleType  '0' 新增    '1' 编辑

                formAdd: {area: []},
                requiredList: ["name"],             //  必填字段
                addLabel: [],

                area:[],
                areaStr: '',
                showPopupPicker: false,

                //  拥有者
                popup1: false,
                results1: [],                        //  搜索结果
                staffs: [],
                searchValue1: '',                    //  搜索文本

            }
        },
        activated(){
            this.formAdd = {area: []}
            this.query = this.$router.currentRoute.query
            if(this.query.handleType == '1'){
                document.title = '编辑客户'
            }
            this.$post("/crm/extFieldPR/getField", {tableName: 'crm_customer'}, (data) => {
                this.addLabel = data.list;
            })
            if(this.query.id){
                this.$post("/crm/customerDetailPR/queryCrmCustomerForOne", {id: this.query.id}, (data) => {
                    this.formAdd = data.customer
                    this.areaStr = this.formAdd.area.join('/')
                })
            }else{
                this.$post("/crm/getAllStaff", {}, (data) => {
                    this.staffs = []
                    this.formAdd.ownerCname = data.username + '/' + data.userid
                    data.list.map((item) => {
                        this.staffs.push({
                            title: item.userName + " " + item.cname,
                            name: item.cname,
                            id: item.userName
                        })
                    })
                    this.results1 = this.deepClone(this.staffs)
                })
            }
        },
        methods: {
            onChange(val){
                this.formAdd.area = this.code2area(this.area)
                this.areaStr = this.formAdd.area.join('/')
            },
        /************************************添加拥有者****************************** */
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
                    this.formAdd.ownerCname = item.name + '/' + item.id
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
        /************************************添加****************************** */
            save(){
                if(!this.formAdd.name){
                    this.toastFail("请输入客户名称", "160px")
                    return;
                }
                if(!this.formAdd.ownerCname){
                    this.toastFail("请选择拥有者")
                    return;
                }
                if(this.query.handleType == '0'){
                    this.$post("/crm/customerPR/addCrmCustomer", this.formAdd, (data) => {
                        this.toastSuccess("添加成功")
                        this.goBack()
                    })
                }else{
                    this.$post("/crm/customerPR/updateCrmCustomer", this.formAdd, (data) => {
                        this.toastSuccess("修改成功")
                        this.goBack()
                    })
                }
            },

        },
    }
</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .empty-box{
        height: 12px;
        background: #f2f2f2;
    }
    .main{
        padding-bottom: 55px;
        font-size: 12px;
        background: #f2f2f2;
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
</style>





