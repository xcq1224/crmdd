<template>
    <div class="page"> 
        <div class="operating-box">
            <div class="operating-flex">
                <div class="vux-1px-r" style="text-align: center;" v-if="staffs.length" @click="popup1 = true">
                    <span>{{staffName || '全部'}}<i class="iconfont icon-xia"></i></span>
                </div>
                <div class="filter">
                    <datetime v-model="visitTime[0]" @on-confirm="getVisits" class="date-custom" format="YYYY-MM-DD"></datetime>
                </div>一
                <div class="filter">
                    <datetime v-model="visitTime[1]" @on-confirm="getVisits" class="date-custom" format="YYYY-MM-DD"></datetime>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="list-item" v-for="(item, index) in visits" :key="index">
                <p>
                    <span class="inline_block text-ellipsis text_333" style="width: 230px;">{{item.customerName}}</span>
                    <span class="float_r font12">{{item.visitTime}}</span></p> 
                <p>
                    <span class="font12 text_333">{{item.createUserName}}</span>
                    <span class="float_r inline_block text-ellipsis w270" style="text-align: right;">{{item.visitContent}}</span>
                </p>
            </div>
        </div>
        <router-link to="./visit_sign" class="submit-btn">签到</router-link>
        <!-- 选择签到人 -->
        <popup v-model="popup1" @on-show="showPopup1" height="80%" style="background: #fbf9fe;">
            <group>
                <radio :selected-label-style="{color: '#FF9900'}" :options="staffs" v-model="staffId" @on-change="changeVisit"></radio>
            </group>
        </popup>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge, InlineXSwitch, XTextarea, XInput, Datetime, PopupPicker, Popup, Radio } from 'vux'

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
            Popup,
            Radio,
        },
        data () {
            return {
                visitTime: [],

                visits: [],     //  签到列表
                staffs: [],     //  员工列表
                staffId: '',    //  查询某个员工
                staffName: '',  //  员工姓名
                popup1: false,  //  是否显示人员
            }
        },
        activated(){
            var startDate = new Date(); //获取今天日期
            startDate.setDate(startDate.getDate() - 7);
            this.visitTime = [this.formatDate(startDate, "yyyy-MM-dd"), this.formatDate(new Date(), "yyyy-MM-dd")]
            this.getVisits()
        },
        methods: {
            //  获取签到列表
            getVisits(){
                this.$vux.loading.show()
                let params = {visitTime: this.visitTime, isOwner: false}
                if(this.staffId){
                    params.idList = [this.staffId]
                }
                this.$post("/crm/visitPR/queryAll", params, (data) => {
                    this.visits = data.list
                    if(!this.staffs.length && data.staffs){
                        this.staffs.push({
                            key: '',
                            value: '全部'
                        })
                        data.staffs.forEach(item => {
                            this.staffs.push({
                                key: item.userName,
                                value: item.cname
                            })
                        });
                    } 
                })
            },
            showPopup1(){

            },
            changeVisit(value, label) {
                this.staffName = label
                this.staffId = value
                this.popup1 = false
                this.getVisits()
            }
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



