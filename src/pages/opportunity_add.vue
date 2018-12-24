<template>
    <div class="page"> 
        <div class="main">
            <group gutter='0' label-width="100px">
                <cell v-if="query.handleType == '0'" is-link v-model="formAdd.customerName" @click.native="popup1 = true">
                    <div slot="title"><span style="color: red;">* </span>客户</div>
                </cell>
                <template v-for="item in addLabel">
                    <x-textarea v-model="formAdd[item.name]" :disabled="item.name == 'name' && query.handleType == '1'" :height="20" :rows='1' :autosize="true" v-if="item.editorType == 'text' & item.name != 'dealPossible'">
                        <div slot="label" style="width: 100px;"><span v-if="requiredList.indexOf(item.name) != -1" style="color: red;">* </span>{{item.label}}</div>
                    </x-textarea>
                    <cell v-if="item.name == 'dealPossible'" v-model="formAdd[item.name]" :title="item.label"></cell>
                    <selector v-model="formAdd[item.name]" @on-change="choose(item.name)" v-if="item.editorType == 'dict'" placeholder="请选择" :title="item.label" :options="item.selectList"></selector>
                    <datetime v-model="formAdd[item.name]" format="YYYY-MM-DD HH:mm" v-if="item.editorType == 'date'" :title="item.label"></datetime>
                </template>
                <cell is-link v-model="formAdd.marketingClueName" title="线索" @click.native="popup4 = true"></cell>
                <!-- <cell is-link v-model="formAdd.partnerName" title="合作伙伴" @click.native="popup2 = true"></cell> -->
                <!-- <cell is-link v-model="formAdd.competitorName" title="竞争对手" @click.native="popup5 = true"></cell> -->
                <cell is-link v-model="formAdd.ownerCname" @click.native="popup3 = true">
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
        <!-- 添加线索 -->
        <popup v-model="popup4" @on-show="showPopup4" height="100%">
            <div class="popup0">
                <search
                    @result-click="resultClick4"
                    @on-change="getResult4"
                    :results="results4"
                    v-model="searchValue4"
                    position="absolute"
                    auto-scroll-to-top
                    top="0"
                    @on-cancel="onCancel4"
                    ref="search4">
                </search>
            </div>
        </popup>
        <!-- 添加竞争对手 -->
        <popup v-model="popup5" @on-show="showPopup5" height="100%">
            <div class="popup0">
                <search
                    @result-click="resultClick5"
                    @on-change="getResult5"
                    :results="results5"
                    v-model="searchValue5"
                    position="absolute"
                    auto-scroll-to-top
                    top="0"
                    @on-cancel="onCancel5"
                    ref="search5">
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
            
                formAdd: {dealPossible:''},
                requiredList: ["opportunityName", "amount"],             //  必填字段
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
                //  线索
                popup4: false,
                results4: [],                        //  搜索结果
                clues: [],
                searchValue4: '',                    //  搜索文本
                //  竞争对手
                popup5: false,
                results5: [],                        //  搜索结果
                competitors: [],
                searchValue5: '',                    //  搜索文本
            }
        },
        activated(){
            this.formAdd = {dealPossible: ''}
            this.query = this.$router.currentRoute.query
            if(this.query.handleType == '1'){
                document.title = "编辑机会"
            }
            this.$vux.loading.show()
            this.$post("/crm/extFieldPR/getField", {tableName: "crm_marketing_opportunity"}, (data) => {
                this.addLabel = data.list;
            })
            if(this.query.handleType == '1'){
                this.$post("/crm/opportunityDetailPR/queryOpportunityForOne", {id: this.query.id}, (data) => {
                    this.formAdd = data.opportunity
                })
            }else{
                if(this.query.handleType == '2'){
                    this.formAdd.customerName = this.query.customerName
                    this.formAdd.customerId = this.query.customerId
                }else{
                    this.getCustomers()
                }
            }
            this.getPartners()
            this.getStaffs()
            this.getClues()
            this.getCompetitors()
        },
        methods: {
            //  选择营销状态
            choose(name){
                if(name == 'marketingSection'){
                    this.$post("/crm/marketingClueDetailPR/changeStage", {value: this.formAdd.marketingSection}, (data) => {
                        this.formAdd.dealPossible = data.dealPossible
                    })
                }
            },
            //  获取客户
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
            //  获取合作伙伴
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
            //  获取员工
            getStaffs(){
                this.$post("/crm/getAllStaff", {}, (data) => {
                    this.formAdd.ownerCname = data.userid + '/' + data.username
                    this.staffs = []
                    data.list.map((item) => {
                        this.staffs.push({
                            title: item.userName + " " + item.cname,
                            name: item.cname,
                            id: item.userName
                        })
                    })
                    this.results3 = this.deepClone(this.staffs)
                })   
            },
            //  获取线索
            getClues(){
                this.$post("/crm/marketingCluePR/queryMarketingClue", {currentPage:1,order:-1,pageSize:999,prop:"createTime"}, (data) => {
                    this.clues = []
                    data.list.map((item) => {
                        this.clues.push({
                            title: item.name,
                            id: item.id
                        })
                    })
                    this.results4 = this.deepClone(this.clues)
                })   
            },
            //  获取竞争对手
            getCompetitors(){
                this.$post("/crm/queryAllCompetitor", {}, (data) => {
                    this.competitors = []
                    data.competitor.map((item) => {
                        this.competitors.push({
                            title: item.name,
                            id: item.id
                        })
                    })
                    this.results5 = this.deepClone(this.competitors)
                })   
            },
        /************************************添加****************************** */
            save(){
                if(!this.formAdd.customerName){
                    this.toastFail("请选择客户", "160px")
                    return;
                }
                if(!this.formAdd.opportunityName){
                    this.toastFail("请输入机会名称", "160px")
                    return;
                }
                let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,4})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,4}?$)/;
                if(!reg.test(this.formAdd.amount)){
                    this.toastFail("请输入预计营销额(最多四)", "260px")
                    return;
                }
                if(!this.formAdd.ownerCname){
                    this.toastFail("请选择拥有者")
                    return;
                }
                let formAdd = this.deepClone(this.formAdd)
                delete formAdd.customerName
                delete formAdd.marketingClueName
                delete formAdd.competitorName
                delete formAdd.partnerName
                if(this.query.handleType == '0' || this.query.handleType == '2'){
                    this.$post("/crm/opportunityPR/addOpportunity", {"opportunityAdd":formAdd}, (data) => {
                        this.toastSuccess("添加成功")
                        this.goBack()
                    })
                }else{
                    this.$post("/crm/opportunityPR/updateOpportunity", {"opportunityAdd":formAdd}, (data) => {
                        this.toastSuccess("修改成功")
                        this.goBack()
                    })
                }
            },
        /************************************添加客户****************************** */
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
                    this.formAdd.ownerId = item.id
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
        /************************************添加线索****************************** */
            showPopup4(){
                setTimeout(() => {
                    this.$refs.search4.setFocus()
                    setTimeout(() => {
                        this.$refs.search4.setBlur()
                    }, 0);
                }, 0);
            },

            resultClick4 (item) {
                if(item.id){
                    this.formAdd.marketingClueName = item.title
                    this.formAdd.marketingClueId = item.id
                    this.popup4 = false
                }
            },
            getResult4 (val) {
                this.results4 = val ? this.match4(val) : this.clues
                if(!this.results4.length){
                    this.results4 = [{
                        id: '',
                        name: '',
                        title: '暂无数据'
                    }]
                }
            },
            onCancel4 () {
                this.popup4 = false
            },
            match4(val){
                let rs = []
                this.clues.map((item) => {
                    if(item.title.indexOf(val) != -1){
                        rs.push(item)
                    }
                })
                return rs
            },
        /************************************添加竞争对手****************************** */
            showPopup5(){
                setTimeout(() => {
                    this.$refs.search5.setFocus()
                    setTimeout(() => {
                        this.$refs.search5.setBlur()
                    }, 0);
                }, 0);
            },

            resultClick5 (item) {
                if(item.id){
                    this.formAdd.competitorName = item.title
                    this.formAdd.competitorId = item.id
                    this.popup5 = false
                }
            },
            getResult5 (val) {
                this.results5 = val ? this.match5(val) : this.competitors
                if(!this.results5.length){
                    this.results5 = [{
                        id: '',
                        name: '',
                        title: '暂无数据'
                    }]
                }
            },
            onCancel5 () {
                this.popup5 = false
            },
            match5(val){
                let rs = []
                this.competitors.map((item) => {
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





