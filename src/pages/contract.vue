<template>
    <div class="page"> 
        <div class="operating-box">
            <div class="operating-flex">
                <div class="vux-1px-r filter" @click="showPopupPicker2 = true">
                    <span>筛选<i class="iconfont icon-xia"></i></span>
                </div>
                <div class="vux-1px-r filter" @click="showPopupPicker3 = true">
                    <span>排序<i class="iconfont icon-xia"></i></span>
                </div>
                <div class="vux-1px-r icon" @click="search">
                    <span><i class="iconfont icon-chaxun"></i></span>
                </div>
                <router-link class="icon" to="./contract_add?handleType=0">
                    <span><i class="iconfont icon-add1"></i></span>
                </router-link>
            </div>
        </div>
        <div class="main">
            <div v-if="tableData.length">
                <router-link :to="'./contract_detail?id=' + item.id" class="list-item" v-for="(item, index) in tableData" :key="index">
                    <p>
                        <span  class="inline_block text-ellipsis w270 text_333">{{item.contractName}}</span>
                        <span class="float_r font12">{{item.createTime.split(" ")[0]}}</span>
                    </p> 
                    <p>
                        <span class="inline_block text-ellipsis w270">{{item.contracAmount}}(万元)&nbsp;&nbsp;{{item.customerName}}</span>
                        <span class="float_r font12">{{item.contractState}}</span>
                    </p>
                </router-link>
            </div>
            <div v-else>
                <p class="iconfont icon-zanwushuju1" style="font-size: 160px;color: #ccc;text-align: center;"></p>
            </div>
        </div>
        <search
            v-show="is_search"
            @on-submit="getTableData(1)"
            v-model="value"
            placeholder="请输入合同名称"
            @on-cancel="onCancel"
            ref="search" style="position:absolute;top:0;">
        </search>
        <popup-picker class="popup-picker" :show.sync="showPopupPicker2" @on-change="onChange2" :show-cell="false" :data="list2" v-model="value2" :columns="2"></popup-picker>
        <popup-picker class="popup-picker" :show.sync="showPopupPicker3" @on-change="onChange3" :show-cell="false" :data="list3" v-model="value3" :columns="2"></popup-picker>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton, Swiper, SwiperItem } from 'vux'
    import { Card } from 'vux'
    import { PopupPicker, PopupRadio } from 'vux'
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
            PopupRadio,
        },  
        data () {
            return {
                value2: ['state', ''],
                showPopupPicker2: false,
                list2: [{
                        name: '合同状态',
                        value: 'contractState',
                        parent: 0
                    }, {
                        name: '请选择',
                        value: '',
                        parent: 'contractState'
                }],
                value3: ['createTime', '-1'],
                showPopupPicker3: false,
                list3: [{
                        name: '创建时间',
                        value: 'createTime',
                        parent: 0
                    }, {
                        name: '合同名称',
                        value: 'contractName',
                        parent: 0
                    }, {
                        name: '升序',
                        value: '1',
                        parent: 'createTime'
                    }, {
                        name: '降序',
                        value: '-1',
                        parent: 'createTime'
                    }, {
                        name: '升序',
                        value: '1',
                        parent: 'contractName'
                    }, {
                        name: '降序',
                        value: '-1',
                        parent: 'contractName'
                }],
                value: '',
                is_search: false,
                currentPage: 1,
                pageSize: 2000,
                tableData: []
            }
        },
        mounted() {
            //  获取数据字典
            let list = ["crm-htzt"]
            this.$post("/crm/getDict", {"list": list}, (data) => {
                data['crm-htzt'].map((item, index) => {
                    this.list2.push({ 
                            name: item,
                            value: item,
                            parent: 'contractState'
                    })
                })
            })
        },
        activated(){
            this.value2 = ['state', '']
            this.value3 = ['createTime', '-1']
            this.getTableData(1)
        },
        methods: {
            onChange2(){
                this.getTableData(1)
            },
            onChange3(){
                this.getTableData(1)
            },

            //  获取机会
            getTableData(val){
                this.currentPage = val
                let params = {
                    prop: this.value3[0], 
                    order: parseInt(this.value3[1]),
                }
                params.currentPage = val
                params.pageSize = this.pageSize
                params.contractName = this.value
                params[this.value2[0]] = this.value2[1]
                this.$vux.loading.show()
                this.$post("/crm/contractPR/queryContract", params, (data) => {
                    this.tableData = data.list;
                    this.is_search = false
                    this.value = ''
                })
            },
            search(){
                this.is_search = true
                setTimeout(() => {
                    this.$refs.search.setFocus()
                },0)
            },
            onCancel () {
                this.is_search = false
            },
        },
    }
</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .main{
        padding-top: 46px;
    }
    .popup-picker:before{
        display: none;
    }
</style>



