<template>
    <div class="page"> 
        <div class="main">
            <div v-if="tableData.length">
                <router-link :to="'./contacts_detail?id=' + item.id" class="list-item" v-for="(item, index) in tableData" :key="index">
                    <p>
                        <span  class="inline_block text-ellipsis w270 text_333">{{item.name}}</span>
                        <span class="float_r font12">{{item.createTime.split(" ")[0]}}</span>
                    </p> 
                    <p><span class="inline_block w_100 text-ellipsis">{{item.customerName}}</span></p>
                </router-link>
            </div>
            <div v-else>
                <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
            </div>
        </div>
        <div class="add">
            <router-link class="icon active" to="./contacts_add?handleType=0" style="border-right: 1px solid #fff;">新增</router-link>
            <a class="active" @click="search">搜索</a>
        </div>
        <search
            v-show="is_search"
            @on-submit="getTableData(1)"
            v-model="value"
            placeholder="请输入联系人姓名或客户名称"
            @on-cancel="onCancel"
            ref="search" style="position:absolute;top:0;">
        </search>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton, Swiper, SwiperItem } from 'vux'
    import { Card } from 'vux'
    import { PopupPicker } from 'vux'
    import { Search } from 'vux'
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
            Swiper,
            SwiperItem,
            Card,
            PopupPicker,
            Search,
        },  
        data () {
            return {
                value: '',
                is_search: false,
                currentPage: 1,
                pageSize: 2000,
                tableData: []
            }
        },
        activated(){
            this.getTableData(1)
        },
        methods: {
            //  获取联系人
            getTableData(val){
                this.currentPage = val
                let params = {
                    prop: 'createTime', 
                    order: -1,
                    mobileName: this.value
                }
                params.currentPage = val
                params.pageSize = this.pageSize
                this.$post("/crm/contactsPR/queryCrmContacts", params, (data) => {
                    this.tableData = data.list;
                    this.is_search = false
                    this.value = ''
                })
            },
            search(){
                this.is_search = true
                var that = this
                setTimeout(function(){
                    that.$refs.search.setFocus()
                },0)
            },
            onCancel () {
                this.is_search = false
            }
        },
    }
</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .main{
        padding-bottom: 46px;
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



