<template>
    <div class="has-tabbar page"> 
        <div class="main">
            <group gutter='0' label-width="100px">
                <template v-for="item in addLabel">
                    <x-textarea v-model="formAdd[item.name]" :disabled="item.name == 'name' && query.handleType == '1'" :height="20" :rows='1' :autosize="true" v-if="item.editorType == 'text'">
                        <div slot="label" style="width: 100px;"><span v-if="requiredList.indexOf(item.name) != -1" style="color: red;">* </span>{{item.label}}</div>
                    </x-textarea>
                    <selector v-model="formAdd[item.name]" direction="rtl" v-if="item.editorType == 'dict'" placeholder="请选择" :title="item.label" :options="item.selectList"></selector>
                    <datetime v-model="formAdd[item.name]" format="YYYY-MM-DD HH:mm" v-if="item.editorType == 'date'" :title="item.label">
                        <div slot="title"><span v-if="requiredList.indexOf(item.name) != -1" style="color: red;">* </span>{{item.label}}</div>
                    </datetime>
                </template>
                <cell is-link v-model="formAdd.financialManagerName" @click.native="popup5 = true">
                    <div slot="title"><span style="color: red;">* </span>财务经理</div>
                </cell>
                <x-textarea v-model="formAdd.customerSignatory" :height="20" :rows='1' :autosize="true">
                    <div slot="label" style="width: 100px;">客户签约人</div>
                </x-textarea>
                <cell is-link v-model="formAdd.selfSignatory" @click.native="popup4 = true">
                    <div slot="title">我方签约人</div>
                </cell>
                <cell is-link v-model="formAdd.ownerCname" @click.native="popup3 = true">
                    <div slot="title"><span style="color: red;">* </span>合同负责人</div>
                </cell>
            </group>
            <div class="submit-btn" @click="save">保存</div>
        </div>
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
        <!-- 添加我方签约人 -->
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
        <!-- 添加拥有者 -->
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

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge, InlineXSwitch, XTextarea, XInput, Datetime, PopupPicker, Selector, Popup, Search } from 'vux'

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
            Selector,
            Popup,
            Search,
        },
        data () {
            return {
                opportunity: {},       //  线索
                query: {},  
                formAdd: {dealPossible: ''},
                addLabel: [],
                requiredList: ["contractName", "contracAmount", "signatoryTime"],             //  必填字段

                //  拥有者
                popup3: false,
                results3: [],                        //  搜索结果
                staffs: [],
                searchValue3: '',                    //  搜索文本

                //  我方签约人
                popup4: false,
                results4: [],                        //  搜索结果
                searchValue4: '',                    //  搜索文本
                //  财务经理
                popup5: false,
                results5: [],                        //  搜索结果
                financialManagers: [],
                searchValue5: '',                    //  搜索文本
            }
        },
        mounted(){
            this.getField()
        },
        activated(){
            this.formAdd = {dealPossible: ''}
            this.query = this.$router.currentRoute.query
            this.getOpportunity()
            this.getStaffs()
            this.getFinancialManager()
        },
        methods: {
            //  获取机会字段
            getField(){
                this.$post("/crm/extFieldPR/getField", {tableName: "crm_marketing_contract"}, (data) => {
                    this.addLabel = data.list;
                })
            },
            //  获取机会
            getOpportunity(){
                this.$vux.loading.show()
                this.$post("/crm/opportunityDetailPR/queryOpportunityForOne", {id: this.query.id, moduleName: 'crm_marketing_opportunity'}, (data) => {
                    this.opportunity = data.opportunity
                    this.formAdd.customerId = this.opportunity.customerId
                    this.formAdd.opportunityId = this.opportunity.id
                })
            },
            //  获取员工
            getStaffs(){
                this.$post("/crm/getAllStaff", {}, (data) => {
                    this.formAdd.ownerCname = data.username + '/' + data.userid
                    this.staffs = []
                    data.list.map((item) => {
                        this.staffs.push({
                            title: item.userName + " " + item.cname,
                            name: item.cname,
                            id: item.userName
                        })
                    })
                    this.results3 = this.deepClone(this.staffs)
                    this.results4 = this.deepClone(this.staffs)
                })   
            },
            //  保存
            save(){
                if(!this.formAdd.contractName){
                    this.toastFail("请输入合同名称", "160px")
                    return;
                }
                if(!this.formAdd.contracAmount){
                    this.toastFail("请输入合同金额")
                    return;
                }
                if(!this.formAdd.signatoryTime){
                    this.toastFail("请选择签约日期")
                    return;
                }
                if(!this.formAdd.financialManagerName){
                    this.toastFail("请选择财务经理", "160px")
                    return;
                }
                if(!this.formAdd.ownerCname){
                    this.toastFail("请选择合同负责人", "160px")
                    return;
                }
                let formAdd = this.deepClone(this.formAdd)
                this.$post("/crm/opportunityDetailPR/formContract", {id: this.query.id, formContract:formAdd}, (data) => {
                    this.toastSuccess("添加成功")
                    this.goBack()
                })
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
                    this.formAdd.ownerCname = item.name
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
        /************************************添加我方签约人****************************** */
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
                    this.formAdd.selfSignatoryId = item.id
                    this.formAdd.selfSignatory = item.name
                    this.popup4 = false
                }
            },
            getResult4 (val) {
                this.results4 = val ? this.match4(val) : this.staffs
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
                this.staffs.map((item) => {
                    if(item.title.indexOf(val) != -1){
                        rs.push(item)
                    }
                })
                return rs
            },
        /************************************添加财务经理****************************** */
            //  获取财务经理
            getFinancialManager(){
                this.$post("/crm/getFinancialManager", {}, (data) => {
                    this.financialManagers = []
                    data.financialManagers.map((item) => {
                        this.financialManagers.push({
                            title: item.userName + " " + item.cname,
                            name: item.cname,
                            id: item.userName
                        })
                    })
                    this.results5 = this.deepClone(this.financialManagers)
                })
            },
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
                    this.formAdd.financialManagerName = item.name
                    this.formAdd.financialManagerId = item.id
                    // this.formAdd.ownerId = item.id
                    this.popup5 = false
                }
            },
            getResult5 (val) {
                this.results5 = val ? this.match5(val) : this.financialManagers
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
                this.financialManagers.map((item) => {
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
        .weui-switch{
            width: 42px;
            height: 24px;
            float: right;
            &:before{
                width: 40px;
            }
        }
    }
</style>


