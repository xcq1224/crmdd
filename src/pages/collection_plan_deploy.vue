<template>
    <div class="page"> 
        <div class="main">
            <group v-for="(item, index) in planList" :key="index" gutter='0' label-width="160px">
                <div class="title" slot="title">第{{index+1}}期收款计划<i class="iconfont icon-shanchu" @click="del(index)"></i></div>
                <datetime title="计划收款日期" format="YYYY-MM-DD" v-model="item.planReceiptTime"></datetime>
                <x-input title="计划收款金额(万元)" v-model="item.planPaymentAmount"></x-input>
                <x-textarea :max="200" placeholder="备注" v-model="item.remark"></x-textarea>
            </group>
            <div class="btn-add" @click="addPlan">添加收款期数</div>
        </div>
        <div class="footer">
            <a @click="save">保存</a>
        </div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, ChinaAddressData } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton } from 'vux'
    import { Card } from 'vux'
    import { PopupPicker } from 'vux'
    import { XInput, Group, XAddress, XTextarea, Datetime } from 'vux'
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
            Datetime,
        },  
        data () {
            return {
                query: {},          //  url参数
                planList: [{}],
                contractAmount: 0,  //  合同金额
            }
        },
        activated(){
            this.query = this.$router.currentRoute.query
            this.contractAmount = this.query.contractAmount
            this.planList = [{}]
            this.getReceiptPlans()
        },
        methods: {
            //  获取收款计划
            getReceiptPlans(){
                this.$vux.loading.show()
                this.$post("/crm/contractDetailPR/queryReceiptByContractId", {id: this.query.id, tableName: "crm_receipt_plan"}, (data) => {
                    if(data.list){
                        this.planList = data.list
                    }
                })
            },
            //  添加计划
            addPlan(){
                this.planList.push({})
            },
            //  删除计划
            del(index){
                this.planList.splice(index, 1)
            },
            //  保存
            save(){
                let receiptList = this.deepClone(this.planList)
                let amount = 0
                let msg = ''
                receiptList.some((item, index) => {
                    item.receiptNum = (index + 1).toString()
                    item.receiptstate = item.receiptstate || "未完成"
                    if(!item.planReceiptTime){
                        msg = '请选择计划收款日期'
                        return true
                    }
                    let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,4})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,4}?$)/;
                    if(!reg.test(item.planPaymentAmount)){
                        msg = "请输入计划收款金额(最多四位小数)"
                        return;
                    }
                    amount += parseInt(item.planPaymentAmount)
                    if(amount > this.contractAmount){
                        msg = '计划收款金额总和不能大于收款总金额'
                    }
                })
                if(msg){
                    this.toastFail(msg, "320px")
                    return
                }
                this.$vux.loading.show()
                this.$post("/crm/contractDetailPR/updateReceiptPlan", {customerId: this.query.customerId, id: this.query.id, receiptList: receiptList}, (data) => {
                    this.toastSuccess("添加成功！")
                    this.goBack()
                })
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
        background: #f2f2f2;
        padding-bottom: 55px;
        font-size: 12px;
        .weui-cell, .vux-cell-box{
            font-size: 14px;
            &:before{
                left: 0;
            }
        }
    }
    .title{
        overflow: hidden;
        padding: 0 10px;
        line-height: 30px;
        i{
            font-size: 20px;
            float: right;   
            color: #f00;
        }
    }
    .btn-add{
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: @baseColor;
        background: #fff;
        margin: 40px 0 20px;
        font-size: 14px;
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
</style>



