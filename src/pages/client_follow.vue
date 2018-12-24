<template>
    <div class="has-tabbar page"> 
        <div class="main">
            <group gutter='0'>
                <x-textarea :height="120" v-model="formAdd.followContent" :max="200" class="textarea" placeholder=""></x-textarea>
                <!-- <div class="handle">
                    <i class="iconfont icon-yuyin"></i>
                    <i class="iconfont icon-dingwei"></i>
                </div> -->
            </group>
            <group>
                <datetime v-model="formAdd.followTime" title="跟进时间" format="YYYY-MM-DD HH:mm"></datetime>
                <selector v-model="formAdd.followType" title="跟进方式" placeholder="请选择" :options="gjfs"></selector>
            </group>
            <group>
                <cell v-model="query.name" title="客户名称"></cell>
                <selector v-model="formAdd.followStatus" title="跟进状态" placeholder="请选择" :options="gjzt"></selector>
                <cell is-link v-model="formAdd.contactCname" title="拜访人员" @click.native="popup1 = true"></cell>
                <cell is-link v-model="formAdd.copyToUserCname" title="通知人" @click.native="popup2 = true"></cell>
            </group>
            <div class="submit-btn" @click="followSave">保存</div>
        </div>
        <!-- 添加拜访人员 -->
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
        <!-- 添加通知人员 -->
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
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, InlineXSwitch, XTextarea, XInput, Datetime, PopupPicker, Selector, Popup, Search } from 'vux'

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
                query: {},
                formAdd: {},
                gjfs: [],           //  跟进方式
                gjzt: [],           //  跟进状态

                //  联系人
                popup1: false,
                results1: [],                        //  搜索结果
                contacts: [],
                searchValue1: '',                    //  搜索文本
                //  通知人
                popup2: false,
                results2: [],                        //  搜索结果
                staffs: [],
                searchValue2: '',                    //  搜索文本
            }
        },
        mounted(){
            this.getDict()
            this.getAllStaff()         
        },
        activated(){
            this.query = this.$router.currentRoute.query
            this.formAdd = {
                parentId: this.query.id,
                moduleName: 'crm_customer',
                followTime: this.formatDate(new Date(), "yyyy-MM-dd hh:mm"),
                followContent: ''
            }
            this.$post("/crm/contactsDetailPR/queryOtherContacts", {id: this.query.id}, (data) => {
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
        methods: {
            //  获取数字字典
            getDict(){
                let list = ["crm-gjfs", "crm-kh-gjzt"]
                this.$post("/crm/getDict", {"list": list}, (data) => {
                    this.gjfs = data['crm-gjfs']
                    this.gjzt = data['crm-kh-gjzt']
                }) 
            },
            //  获取所有员工     
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
                    this.results2 = this.deepClone(this.staffs)
                })   
            },
            //  写跟进提交
            followSave(){
                if(!this.formAdd.followContent.trim()){
                    this.toastFail("请填写跟进内容", "160px")
                    return;
                }
                if(!this.formAdd.followType){
                    this.toastFail("请选择跟进方式", "160px")
                    return;
                }
                if(!this.formAdd.followStatus){
                    this.toastFail("请选择跟进状态", "160px")
                    return;
                }
                if(this.formAdd.followType == "到访" & !this.formAdd.contactCname){
                    this.toastFail("请选择拜访人员", "160px")
                    return;
                }
                this.$post("/crm/followPR/addOne", {follow: this.formAdd}, (data) => {
                    this.toastSuccess("添加成功")
                    this.goBack()
                })
            },
        /************************************添加联系人****************************** */
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
                    this.formAdd.contactCname = item.title
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
        /************************************添加通知人****************************** */
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
                    this.formAdd.copyToUserCname = item.name + "(" + item.id +  ")"
                    this.popup2 = false
                }
            },
            getResult2 (val) {
                this.results2 = val ? this.match2(val) : this.staffs
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
    }
</style>


