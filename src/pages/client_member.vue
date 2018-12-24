<template>
    <div class="page"> 
        <div class="main" :style="isOwner ? 'padding-bottom: 40px' : ''">
            <swipeout>
                <swipeout-item transition-mode="follow" :disabled="item.isOwner || !isOwner" v-for="(item, index) in memberList" :key="index">
                    <div slot="right-menu">
                    <swipeout-button type="warn" @click.native="deleteMember(item.id, index)">删除</swipeout-button>
                    </div>
                    <div slot="content" class="item">
                        <span :class="item.isOwner ? 'admin avatar' : 'avatar'">
                            <!-- <img src="../assets/avatar.jpg" alt=""> -->
                            <font class="iconfont icon-morentouxiang"></font>
                            <i v-if="item.isOwner" class="iconfont icon-geren"></i>
                        </span>
                        <span>{{item.userCname}}</span>
                        <div class="float_r" style="margin-top: 6px;" v-if="isOwner & !item.isOwner">
                            <check-icon :value.sync="item.isModify" @click.native="updateMember(item.isModify, index, item.id, 'isModify')"><span class="text_777 float_r">编辑</span></check-icon>
                            <check-icon :value.sync="item.isDownload" @click.native="updateMember(item.isDownload, index, item.id, 'isDownload')"><span class="text_777">下载附件</span></check-icon>
                        </div>
                    </div>
                </swipeout-item>
            </swipeout>
        </div>
        <div v-if="isOwner" @click="popup1 = true" class="add">
            <a>新增</a>
        </div>
        <!-- 添加团队成员 -->
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

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, PopupPicker, Search, CheckIcon, Popup,
            Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            PopupPicker,
            Search,
            CheckIcon,
            Popup,
            Swipeout, 
            SwipeoutItem, 
            SwipeoutButton,
        },
        data () {
            return {
                memberList: [],                         //  团队成员
                query: {},                              //  url参数
                isOwner: false,                         //  是否是拥有者
                //  拥有者
                popup1: false,
                results1: [],                           //  搜索结果
                staffs: [],
                searchValue1: '',                       //  搜索文本
            }
        },
        activated(){
            this.query = this.$router.currentRoute.query
            this.getAllStaff()
            this.getMembers()
            
        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
            //  获取团队成员
            getMembers(){
                this.$vux.loading.show()
                this.$post("/crm/memberPR/getAll", {"parentId": this.query.id, "moduleName": this.query.moduleName}, (data) => {
                    this.memberList = data.list
                    this.isOwner = data.isOwner
                })
            },
            //  获取所员工
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
                    this.results1 = this.deepClone(this.staffs)
                })
            },
            //  修改团队成员权限
            updateMember(flag, index, id, type){
                let params = {
                    id: id,
                    flag: flag,
                    type: type,
                    moduleName: this.query.moduleNames, 
                    parentId: this.query.id
                }
                this.memberList[index][type] = !flag
                this.$post("/crm/memberPR/update", params, (data) => {
                    this.memberList[index][type] = flag
                    this.toastSuccess("权限修改成功！", "200px")
                })
            },
            //  删除团队成员
            deleteMember(id, index){
                this.$post("/crm/memberPR/delete", {list: [id], moduleName: this.query.moduleNames, parentId: this.query.id}, (data) => {
                    this.memberList.splice(index, 1)
                    this.toastSuccess("删除团队成员成功！", "200px")
                })
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
                    let params = {
                        parentId: this.query.id,
                        moduleName: this.query.moduleName,
                        userCname: item.name,
                        userId: item.id,
                        userJobNum: item.id,
                        isModify: false,
                        isDownload: false,
                        isOwner: false,
                        content: '添加团队成员：' + item.name,
                        moduleNames: this.query.moduleNames
                    }
                    this.$post("/crm/memberPR/addOne", params, (data) => {
                        this.toastSuccess("添加成功！")
                        this.getMembers()
                        this.popup1 = false
                    })
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
        },
    }
</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .main{
        box-sizing: border-box;
        background: #f2f2f2;
        .item{
            height: 46px;
            border-bottom: 1px solid #ddd;
            background: #fff;
            padding: 5px 15px 0;
            box-sizing: border-box;
            img{
                width: 36px;
                height: 36px;
                border-radius: 50%;
                vertical-align: middle;
                margin-right: 5px;
            }
            font{
                font-size: 36px;
                color: @baseColor;
                vertical-align: middle;
                margin-right: 5px;
            }
            .avatar{
                position: relative;
                top: -10px;
            }
            .admin{
                position: relative;
                i{
                    position: absolute;
                    top: 15px;
                    right: 6px;
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
            }
            .handle{
                float: right;
                line-height: 36px;
                color: #ccc;
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




