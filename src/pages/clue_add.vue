<template>
    <div class="page"> 
        <div class="main">
            <group gutter='0' label-width="100px">
                <cell v-if="query.handleType == '0'" is-link v-model="formAdd.customerName" @click.native="popup1 = true">
                    <div slot="title"><span style="color: red;">* </span>客户</div>
                </cell>
                <template v-for="item in addLabel">
                    <x-textarea v-model="formAdd[item.name]" :height="20" :rows='1' :autosize="true" v-if="item.editorType == 'text'">
                        <div slot="label" style="width: 100px;"><span v-if="requiredList.indexOf(item.name) != -1" style="color: red;">* </span>{{item.label}}</div>
                    </x-textarea>
                    <selector v-model="formAdd[item.name]" v-if="item.editorType == 'dict'" placeholder="请选择" :title="item.label" :options="item.selectList"></selector>
                    <datetime v-model="formAdd[item.name]" format="YYYY-MM-DD HH:mm" v-if="item.editorType == 'date'" :title="item.label"></datetime>
                </template>
                <!-- <cell is-link v-model="formAdd.partnerName" title="合作伙伴" @click.native="popup2 = true"></cell> -->
                <cell v-if="query.handleType != '1'" is-link v-model="formAdd.ownerCname" @click.native="popup3 = true">
                    <div slot="title"><span style="color: red;">* </span>拥有者</div>
                </cell>
            </group>
        </div>
        <div class="footer">
            <a class="active" @click="save">保存</a>
        </div>
        <!-- 添加客户 -->
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
        <!-- 添加合作伙伴 -->
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
        <!-- 添加拥有者 -->
        <popup v-model="popup3" @on-show="showPopup3" height="100%">
            <div class="popup0">
                <search
                    @result-click="resultClick3"
                    @on-change="getResult3"
                    :results="results3"
                    v-model="searchValue3"
                    position="absolute"
                    auto-scroll-to-top
                    top="0"
                    @on-cancel="onCancel3"
                    ref="search3">
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
                query: {},        // handleType  '0' 新增    '1' 编辑   '2' 从客户新增
                formAdd: {},
                requiredList: ["name", "dept"],             //  必填字段
                addLabel: [],
                //  客户
                popup1: false,
                results1: [],                        //  搜索结果
                customers: [],
                searchValue1: '',                    //  搜索文本
                //  合作伙伴
                popup2: false,
                results2: [],                        //  搜索结果
                partners: [],
                searchValue2: '',                    //  搜索文本
                //  拥有者
                popup3: false,
                results3: [],                        //  搜索结果
                staffs: [],
                searchValue3: '',                    //  搜索文本
            }
        },
        activated(){
            this.formAdd = {}
            this.query = this.$router.currentRoute.query
            if(this.query.handleType == '1'){
                document.title = "编辑线索"
            }
            this.$vux.loading.show()
            this.$post("/crm/extFieldPR/getField", {tableName: 'crm_marketing_clue'}, (data) => {
                this.addLabel = data.list;
            })
            //  获取合作伙伴
            this.getPartners()

            if(this.query.handleType == '1'){
                //  编辑
                this.$post("/crm/marketingClueDetailPR/queryMarketingClueForOne", {id: this.query.id}, (data) => {
                    this.formAdd = data.marketingClue
                })
            }else{
                if(this.query.handleType == '2'){
                    this.formAdd.customerName = this.query.customerName
                    this.formAdd.customerId = this.query.customerId
                }else{
                    this.getCustomers()
                }
                this.$post("/crm/getAllStaff", {}, (data) => {
                    this.staffs = []
                    //  如果是新增则拥有者默认为当前用户
                    if(this.query.handleType != '1'){
                        this.formAdd.ownerCname = data.userid + '/' + data.username
                    }
                    data.list.map((item) => {
                        this.staffs.push({
                            title: item.userName + " " + item.cname,
                            name: item.cname,
                            id: item.userName
                        })
                    })
                    this.results3 = this.deepClone(this.staffs)
                })
            }
        },
        methods: {
            
        /************************************添加****************************** */
            save(){
                if(!this.formAdd.customerName){
                    this.toastFail("请选择客户", "160px")
                    return;
                }
                if(!this.formAdd.name){
                    this.toastFail("请输入线索名称", "160px")
                    return;
                }
                if(!this.formAdd.ownerCname){
                    this.toastFail("请选择拥有者")
                    return;
                }
                let formAdd = this.deepClone(this.formAdd)
                delete formAdd.customerName
                delete formAdd.partnerName
                if(this.query.handleType == '0' || this.query.handleType == '2'){
                    this.$post("/crm/marketingCluePR/addMarketingClue", {"marketingClueAdd": formAdd}, (data) => {
                        this.toastSuccess("添加成功")
                        this.goBack()
                    })
                }else{
                    this.$post("/crm/marketingCluePR/updateMarketingClue", {"marketingClueAdd": formAdd}, (data) => {
                        this.toastSuccess("修改成功")
                        this.goBack()
                    })
                }
            },
        /************************************添加客户****************************** */
            getCustomers(){
                this.$post("/crm/queryAllCustomers", {}, (data) => {
                    this.customers = []
                    data.customers.map((item) => {
                        this.customers.push({
                            title: item.name,
                            id: item.id
                        })
                    })
                    this.results1 = this.deepClone(this.customers)
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
                    this.formAdd.customerName = item.title
                    this.formAdd.customerId = item.id
                    this.popup1 = false
                }
            },
            getResult1 (val) {
                this.results1 = val ? this.match1(val) : this.customers
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
                this.customers.map((item) => {
                    if(item.title.indexOf(val) != -1){
                        rs.push(item)
                    }
                })
                return rs
            },
        /************************************添加合作伙伴****************************** */
            //  获取合作伙伴列表
            getPartners(){
                this.$post("/crm/queryAllPartner", {}, (data) => {
                    this.partners = []
                    data.partner.map((item) => {
                        this.partners.push({
                            title: item.name,
                            id: item.id
                        })
                    })
                    this.results2 = this.deepClone(this.partners)
                })
            },
            showPopup2(){
                setTimeout(() => {
                    this.$refs.search2.setFocus()
                    setTimeout(() => {
                        this.$refs.search2.setBlur()
                    }, 0);
                }, 0);
            },

            resultClick2 (item) {
                if(item.id){
                    this.formAdd.partnerName = item.title
                    this.formAdd.partnerId = item.id
                    this.popup2 = false
                }
            },
            getResult2 (val) {
                this.results2 = val ? this.match2(val) : this.partners
                if(!this.results2.length){
                    this.results2 = [{
                        id: '',
                        name: '',
                        title: '暂无数据'
                    }]
                }
            },
            onCancel2 () {
                this.popup2 = false
            },
            match2(val){
                let rs = []
                this.partners.map((item) => {
                    if(item.title.indexOf(val) != -1){
                        rs.push(item)
                    }
                })
                return rs
            },
        /************************************添加拥有者****************************** */
            showPopup3(){
                setTimeout(() => {
                    this.$refs.search3.setFocus()
                    setTimeout(() => {
                        this.$refs.search3.setBlur()
                    }, 0);
                }, 0);
            },

            resultClick3 (item) {
                if(item.id){
                    this.formAdd.ownerCname = item.id + '/' + item.name
                    this.popup3 = false
                }
            },
            getResult3 (val) {
                this.results3 = val ? this.match3(val) : this.staffs
                if(!this.results3.length){
                    this.results3 = [{
                        id: '',
                        name: '',
                        title: '暂无数据'
                    }]
                }
            },
            onCancel3 () {
                this.popup3 = false
            },
            match3(val){
                let rs = []
                this.staffs.map((item) => {
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





