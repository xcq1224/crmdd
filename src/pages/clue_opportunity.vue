<template>
    <div class="has-tabbar page"> 
        <div class="main">
            <group gutter='0' label-width="100px">
                <template v-for="item in addLabel">
                    <x-textarea v-model="formAdd[item.name]" :disabled="item.name == 'name' && query.handleType == '1'" :height="20" :rows='1' :autosize="true" v-if="item.editorType == 'text' & item.name != 'dealPossible'">
                        <div slot="label" style="width: 100px;"><span v-if="requiredList.indexOf(item.name) != -1" style="color: red;">* </span>{{item.label}}</div>
                    </x-textarea>
                    <cell v-if="item.name == 'dealPossible'" v-model="formAdd[item.name]" :title="item.label"></cell>
                    <selector v-model="formAdd[item.name]" @on-change="choose(item.name)" v-if="item.editorType == 'dict'" placeholder="请选择" :title="item.label" :options="item.selectList"></selector>
                    <datetime v-model="formAdd[item.name]" format="YYYY-MM-DD HH:mm" v-if="item.editorType == 'date'" :title="item.label"></datetime>
                </template>
                <!-- <cell is-link v-model="formAdd.partnerName" title="合作伙伴" @click.native="popup2 = true"></cell> -->
                <cell is-link v-model="formAdd.ownerCname" @click.native="popup3 = true">
                    <div slot="title"><span style="color: red;">* </span>拥有者</div>
                </cell>
            </group>
        </div>
        <div class="submit-btn" @click="save">保存</div>
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
                clue: {},       //  线索
                query: {},  
                formAdd: {dealPossible: ''},
                addLabel: [],
                requiredList: ["opportunityName", "amount"],             //  必填字段

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
        mounted(){
            this.getField()
        },
        activated(){
            this.formAdd = {dealPossible: ''}
            this.query = this.$router.currentRoute.query
            this.getClue()
            this.getPartners()
            this.getStaffs()
        },
        methods: {
            //  获取机会字段
            getField(){
                this.$post("/crm/extFieldPR/getField", {tableName: "crm_marketing_opportunity"}, (data) => {
                    this.addLabel = data.list;
                })
            },
            //  获取线索
            getClue(){
                this.$vux.loading.show()
                this.$post("/crm/marketingClueDetailPR/queryMarketingClueForOne", {id: this.query.id, moduleName: 'crm_marketing_clue'}, (data) => {
                    this.clue = data.marketingClue
                    this.formAdd.customerId = this.clue.customerId
                    this.formAdd.partnerId = this.clue.partnerId
                    this.formAdd.partnerName = this.clue.partnerName
                })
            },
            //  选择营销状态
            choose(name){
                if(name == 'marketingSection'){
                    this.$post("/crm/marketingClueDetailPR/changeStage", {value: this.formAdd.marketingSection}, (data) => {
                        this.formAdd.dealPossible = data.dealPossible
                    })
                }
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
                })   
            },
            //  保存
            save(){
                if(!this.formAdd.opportunityName){
                    this.toastFail("请输入机会名称", "160px")
                    return;
                }
                if(!this.formAdd.amount){
                    this.toastFail("请输入预计营销额")
                    return;
                }
                if(!this.formAdd.ownerCname){
                    this.toastFail("请选择拥有者")
                    return;
                }
                let formAdd = this.deepClone(this.formAdd)
                delete formAdd.partnerName
                console.log(formAdd)
                this.$post("/crm/marketingClueDetailPR/formOpportunity", {id: this.query.id, formOpportunity: formAdd}, (data) => {
                    this.toastSuccess("添加成功")
                    this.goBack()
                })
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
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .page{
        background: #f2f2f2;
    }
    .main{
        padding-bottom: 40px;
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
        .weui-switch{
            width: 42px;
            height: 24px;
            float: right;
            &:before{
                width: 40px;
            }
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
        z-index: 5;
    }
</style>


