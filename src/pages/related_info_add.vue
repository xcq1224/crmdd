<template>
    <div class="page"> 
        <div class="main">
            <!-- 新增和编辑 -->
            <group gutter='0' label-width="120px" v-if="query.handleType != 2">
                <div class="weui-cell">
                    <span style="display: inline-block; width:100px;">照片</span>
                    <div class="img-box" :style="'backgroundImage: url(' + imgUrl() + ')'">
                        <i v-show="!(imgSrc || formAdd.avatarPath)" class="iconfont icon-add1"></i>
                        <input ref="uploadPicture" @change="uploadPicture" type="file" accept="image/*">  
                    </div>
                </div>
                <div style="position: relative;">
                    <span style="color: red;position: absolute; top: 16px; left: 16px; font-size: 13px;">*</span><selector v-model="relation" title="&nbsp;&nbsp;与联系人关系" placeholder="请选择" :options="relationList"></selector>
                </div>
                <template v-for="item in addLabel">
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
            <!-- 查看 -->
            <group gutter='0' label-width="100px" v-if="query.handleType == 2">
                <div class="weui-cell">
                    <span style="display: inline-block; width:100px;">照片</span>
                    <div class="img-box" :style="'backgroundImage: url(' + imgUrl() + ')'"></div>
                </div>
                <cell title="与联系人关系" :value="relation"></cell>
                <cell v-for="(item, index) in addLabel" :key="index" :title="item.label" :value="formAdd[item.name]"></cell>
                <div class="tag-box">
                    <p>标签</p>
                    <span class="el-tag" v-for="(item, index) in formAdd.tags" :key="index">{{item}}</span>
                </div>
            </group>
        </div>
        <div class="footer" v-if="query.handleType != 2">
            <a class="active" @click="save">保存</a>
        </div>
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
                relation: '',                       //  与联系人关系
                relationList: [],                       //  与联系人关系列表
                relationShipId: '',                       //  与联系人关系id
                requiredList: ["name"],             //  必填字段
                addLabel: [],
                hideList: ['business', 'dept',  'job', 'customerName'],             //  联系人有但关联联系人没有的字段
                titleList: ['新增关联人','编辑关联人', '查看关联人'],      //  标题列表
            }
        },
        mounted(){
            this.getDict()
        },
        activated(){
            this.formAdd = {tags: []}
            this.relation = ''
            this.addLabel = []
            this.imgSrc = ""
            this.query = this.$router.currentRoute.query
            document.title = this.titleList[this.query.handleType]
            this.$post("/crm/extFieldPR/getField", {tableName: 'crm_contacts'}, (data) => {
                data.list.map((item) => {
                    if(this.hideList.indexOf(item.name) == -1){
                        this.addLabel.push(item)
                    }
                })
            })
            if(this.query.id){
                this.$post("/crm/contactsDetailPR/queryContactRelationById", {id: this.query.id, aId: this.query.aId}, (data) => {
                    this.formAdd = data.contact
                    this.relation = data.relation
                    this.relationShipId = data.relationShipId
                })
            }
        },
        methods: {
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
            getDict(){
                let list = ["crm-lxrgx"]
                this.$post("/crm/getDict", {"list": list}, (data) => {
                this.relationList = data['crm-lxrgx']
                })
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
            save(){
                if(!this.relation){
                    this.toastFail("请选择关联关系")
                    return;
                }
                if(!this.formAdd.name){
                    this.toastFail("请输入关联人姓名", "160px")
                    return;
                }
                let params = new FormData()
                params.append("avatar", this.imgSrc)
                if(this.query.handleType == '0'){
                    // params.append('avatar', this.relationImgSrc)
                    //  当前联系人id
                    params.append('id', this.query.aId)    
                    params.append('relation', this.relation)    
                    params.append('relationship', JSON.stringify(this.formAdd))
                    this.$post("/crm/contactsDetailPR/addContactRelation", params, (data) => {
                        this.toastSuccess("添加成功")
                        this.goBack()
                    })
                }else{
                    params.append("relation", this.relation)
                    params.append("relationShipId", this.relationShipId)
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





