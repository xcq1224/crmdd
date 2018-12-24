<template>
    <div class="page"> 
        <tab class="vux-1px-b pst" :line-width=2 custom-bar-width="60%" v-model="tabIndex" @on-item-click="clickTab">
            <tab-item class="vux-center" selected @on-item-click="clickTab">日报</tab-item>
            <tab-item class="vux-center" @on-item-click="clickTab">周报</tab-item>
            <tab-item class="vux-center" @on-item-click="clickTab">月报</tab-item>
        </tab>
        <div class="main">
            <div v-show="tabIndex == 0">
                <router-link :to="'./work_check?id=' + item.id + '&type=0&date=' + item.createTime.split(' ')[0]" class="list-item" v-for="(item, index) in dateList" :key="index">
                    <p><span  class="text_333">{{item.createUserName}}的日报</span><span class="font12 float_r">{{item.createTime}}</span></p>
                </router-link>
            </div>
            <div v-show="tabIndex == 1">
                <router-link :to="'./work_check?id=' + item.id + '&type=1&date=' + item.createTime.split(' ')[0]" class="list-item" v-for="(item, index) in weekList" :key="index">
                    <p><span  class="text_333">{{item.createUserName}}的周报</span><span class="font12 float_r">{{item.createTime}}</span></p>
                </router-link>
            </div>
            <div v-show="tabIndex == 2">
                <router-link :to="'./work_check?id=' + item.id + '&type=2&date=' + item.createTime.split(' ')[0]" class="list-item" v-for="(item, index) in monthList" :key="index">
                    <p><span  class="text_333">{{item.createUserName}}的月报</span><span class="font12 float_r">{{item.createTime}}</span></p>
                </router-link>
            </div>
        </div>
        <router-link :to="'./work_write?handleType=' + tabIndex" class="submit-btn">新增</router-link>
    </div>
</template>1

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge, Tab, TabItem, } from 'vux'

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
            Tab, 
            TabItem,
        },
        data () {
            return {
                tabIndex: 0,    
                list: ["日报", "周报", "月报"],
                dateList: [],
                weekList: [],
                monthList: [],
            }
        },
        mounted(){
            this.$vux.loading.show()
        },
        activated(){
            this.clickTab(0)
        },
        methods: {
            clickTab(index){
                this.$post("/crm/workReportPR/queryAll", {reportType: this.list[index]}, (data) => {
                    if(index == 0){
                        this.dateList = data.list
                    }else if(index == 1){
                        this.weekList = data.list
                    }else{
                        this.monthList = data.list
                    }
                })
            },
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .date-custom{
        padding: 0;
    }
    .main{
        background: #f2f2f2;    
        padding-top: 46px;
        padding-bottom: 41px;
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
        .list-item{
            padding: 10px 15px;
            background: #fff;
        }
    }
    .submit-btn{
        text-align: center;
        width: 100%;
        height: 40px;
        background: #fff;
        color: @baseColor;
        border-top: 1px solid @baseColor;
        line-height: 40px;
        position: absolute;
        bottom: 0;
    }
</style>
<style lang="less">
    .page .date-custom .weui-cell__ft{
        padding-right: 0;
        text-align: center;
        &:after{
            display: none;
        }
    }
</style>



