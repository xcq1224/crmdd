<template>
    <div class="page"> 
        <div class="main">
            <group gutter='0' label-width="100px">
                <div class="weui-cell">
                    <span style="display: inline-block; width:100px;">照片</span>
                    <div class="img-box" :style="'backgroundImage: url(' + imgUrl() + ')'">
                        <i v-show="!(imgSrc || formAdd.avatarPath)" class="iconfont icon-add1"></i>
                        <input ref="uploadPicture" @change="uploadPicture" type="file" accept="image/*">  
                    </div>
                </div>
                <cell v-if="query.handleType == '0'" is-link v-model="formAdd.customerName" @click.native="popup0 = true">
                    <div slot="title"><span style="color: red;">* </span>客户名称</div>
                </cell>
                <x-input v-model="formAdd.name" :show-clear="false">
                    <div slot="label" style="width: 100px;"><span style="color: red;">* </span>姓名</div>
                    <i slot="right" class="iconfont icon-saoyisao" @click="scanCard"></i>
                </x-input>
                <template v-for="item in addLabel" v-if="item.name != 'name'">
                    <x-textarea v-model="formAdd[item.name]" :height="20" :rows='1' :autosize="true" v-if="item.editorType == 'text'">
                        <div slot="label" style="width: 100px;"><span v-if="requiredList.indexOf(item.name) != -1" style="color: red;">* </span>{{item.label}}</div>
                    </x-textarea>
                    <selector v-model="formAdd[item.name]" v-if="item.editorType == 'dict'" placeholder="请选择" :title="item.label" :options="item.selectList"></selector>
                    <datetime v-model="formAdd[item.name]" v-if="item.editorType == 'date'" :title="item.label"></datetime>
                </template>
                <div class="tag-box">
                    <p>标签</p>
                    <span class="el-tag" v-for="(item, index) in formAdd.tags" :key="index">{{item}} <i class="iconfont icon-close" @click="delTag(index)"></i></span>
                    <x-input v-show="editTag" ref="tagInput" v-model="tagValue" class="el-tag-input" :show-clear="false" @on-blur="tagConfirm" @on-enter="tagConfirm"></x-input>
                    <x-button mini plain type="primary" v-show="!editTag" @click.native="editStart">+ New Tag</x-button>
                </div>
            </group>
        </div>
        <div class="footer">
            <a class="active" @click="save">保存</a>
        </div>
        <popup v-model="popup0" @on-hide="hidePopup0" @on-show="showPopup0" height="100%">
            <div class="popup0">
                <search
                    @result-click="resultClick"
                    @on-change="getResult"
                    :results="results"
                    v-model="searchValue0"
                    position="absolute"
                    auto-scroll-to-top
                    top="0"
                    @on-cancel="onCancel"
                    ref="search">
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
                
                editTag: false,
                tagValue: '',
                popup0: false,

                imgSrc: '',


                formAdd: {tags: []},
                requiredList: ["name", "mobilePhone"],             //  必填字段
                addLabel: [],

                results: [],                        //  搜索结果
                customers: [],
                searchValue0: ''                    //  搜索文本
            }
        },
        activated(){
            this.formAdd = {tags: []}
            this.imgSrc = ""
            this.query = this.$router.currentRoute.query
            if(this.query.handleType == '1'){
                document.title = '编辑联系人'
            }
            this.$vux.loading.show()
            this.$post("/crm/extFieldPR/getField", {tableName: 'crm_contacts'}, (data) => {
                this.addLabel = data.list;
            })
            if(this.query.handleType == '1'){
                //  编辑联系人
                this.$post("/crm/contactsDetailPR/queryContactsForOne", {id: this.query.id}, (data) => {
                    this.formAdd = data.contact
                })
            }else if(this.query.handleType == '0'){
                //  新增联系人
                this.$post("/crm/queryAllCustomers", {}, (data) => {
                    data.customers.map((item) => {
                        this.customers.push({
                            title: item.name,
                            id: item.id
                        })
                        this.results = this.deepClone(this.customers)
                    })
                })
            }else if(this.query.handleType == '2'){
                //  从客户新增联系人
                this.formAdd.customerId = this.query.customerId
            }
        },
        methods: {
            // 扫描名片
            scanCard(){
                var that = this
                dd.biz.util.scanCard().then((res) => {
                    that.formAdd.name = res.NAME
                    that.formAdd.mobilePhone = res.MPHONE
                    that.formAdd.phone = res.PHONE
                    that.formAdd.job = res.POSITION
                }).catch((err) => {
                    console.log(err)
                })
            },
        /************************************添加照片********************************* */
            uploadPicture(e){
                if(e.target.files.length) this.imgSrc = e.target.files[0]
                e.target.value = ''
            },
            //  将文件流转化为url
            getUrl(file){
                return file ? URL.createObjectURL(file) : null
            },
            imgUrl(){
                return this.imgSrc ? this.getUrl(this.imgSrc) : this.formAdd.avatarPath
            },
        /************************************添加标签****************************** */
            editStart(){
                this.editTag = true
                setTimeout(() => {
                    this.$refs.tagInput.focus()
                }, 0)
            },
            tagConfirm(){
                let tagValue = this.tagValue;
                if (tagValue) {
                    this.formAdd.tags.push(tagValue);
                }
                this.editTag = false;
                this.tagValue = '';
            },
            delTag(index){
                this.formAdd.tags.splice(index, 1)
            },
        /************************************添加客户****************************** */
            hidePopup0(){},
            showPopup0(){
                setTimeout(() => {
                    this.$refs.search.setFocus()
                    setTimeout(() => {
                        this.$refs.search.setBlur()
                    }, 0);
                }, 0);
            },

            resultClick (item) {
                if(item.id){
                    this.formAdd.customerName = item.title
                    this.formAdd.customerId = item.id
                    this.popup0 = false
                }
            },
            getResult (val) {
                this.results = val ? this.match(val) : this.customers
                if(!this.results.length){
                    this.results = [{
                        id: '',
                        name: '',
                        title: '暂无数据'
                    }]
                }
            },
            onCancel () {
                this.popup0 = false
            },
            match(val){
                let rs = []
                this.customers.map((item) => {
                    if(item.title.indexOf(val) != -1){
                        rs.push(item)
                    }
                })
                return rs
            },
            save(){
                if(!this.formAdd.customerId){
                    this.toastFail("请选择客户")
                    return;
                }
                if(!this.formAdd.name){
                    this.toastFail("请输入联系人姓名", "160px")
                    return;
                }
                if(!this.formAdd.mobilePhone){
                    this.toastFail("请输入联系人手机号", "180px")
                    return;
                }
                let params = new FormData()
                let formAdd = this.deepClone(this.formAdd)
                delete formAdd.customerName
                params.append("avatar", this.imgSrc)
                if(this.query.handleType == '0' || this.query.handleType == '2'){
                    params.append('contactsAdd', JSON.stringify(formAdd))
                    this.$post("/crm/contactsPR/addCrmContacts", params, (data) => {
                        this.toastSuccess("添加成功")
                        this.goBack()
                    })
                }else if(this.query.handleType == '1'){
                    params.append("contact_str", JSON.stringify(this.formAdd))
                    this.$post("/crm/contactsPR/updateContact", params, (data) => {
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
    .img-box{
        width: 60px;
        height: 60px;
        border: 1px solid #ddd;
        text-align: center;
        position: relative;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        i{
            font-size: 40px;
            color: #ccc;
            line-height: 62px;
        }
        input{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }
</style>





