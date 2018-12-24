<template>
    <div class="page"> 
        <div class="main">
            <group gutter='0' label-width="100px">
                <cell title="客户名称" :value="form.customerName" value-align="left"></cell>
                <cell title="合同名称" :value="form.contractName" value-align="left"></cell>
                <cell title="纳税识别号" :value="form.taxNo" value-align="left"></cell>
                <cell title="地址" :value="form.companyAddress" value-align="left"></cell>
                <cell title="电话" :value="form.companyPhone" value-align="left"></cell>
                <cell title="开户银行" :value="form.openBank" value-align="left"></cell>
                <cell title="开户账号" :value="form.openAccount" value-align="left"></cell>
                <x-input v-if="query.state < 1" title="发票金额(万元)" v-model="form.ticketAmout" placeholder="必填(最多四位小数)"></x-input>
                <x-textarea v-if="query.state < 1" :max="200" v-model="form.remark" placeholder="备注"></x-textarea>
                <cell v-if="query.state > 0" title="发票金额(万元)" :value="form.ticketAmout" value-align="left"></cell>
                <cell v-if="query.state > 0" title="备注" :value="form.remark" value-align="left"></cell>
            </group>
        </div>
        <div class="footer" v-if="query.state < 1">
            <a @click="save(0)">仅保存</a>
            <a class="active" @click="save(1)">提交审批</a>
        </div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, ChinaAddressData } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton } from 'vux'
    import { Card } from 'vux'
    import { PopupPicker } from 'vux'
    import { XInput, Group, XAddress, XTextarea, Datetime, Cell } from 'vux'
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
            Cell,
        },  
        data () {
            return {
                form: {},
                query: {},  
            }
        },
        activated(){
            this.form = {}
            this.query = this.$router.currentRoute.query
            if(this.query.contractId) this.getContract()
            if(this.query.openTicketId) this.getOpenTicket()
        },
        methods: {
            //  获取合同信息
            getContract(){
                this.$vux.loading.show()
                this.$post("/crm/contractDetailPR/queryContractForOne", {id: this.query.contractId}, (data) => {
                    this.form = {
                        companyAddress: data.customer.companyAddress || '',
                        companyPhone: data.customer.companyPhone || '',
                        contractId: data.contract.id || '',
                        customerId: data.customer.id || '',
                        openAccount: data.customer.openAccount || '',
                        openBank: data.customer.openBank || '',
                        taxNo: data.customer.taxNo || '',
                        customerName: data.customer.name || '',
                        contractName: data.contract.contractName || '',
                        remark: '',
                        ticketAmout: ''
                    }
                })
            },
            //  获取开票详情
            getOpenTicket(){
                this.$post("/crm/openTicketDetailPR/queryOpenTicketForOne", {"id": this.query.openTicketId}, (data) => {
                    this.form = data.openTicket
                })
            },
            //  保存
            save(type){
                let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,4})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,4}?$)/;
                if(!reg.test(this.form.ticketAmout)){
                    this.toastFail("请输入发票金额金额(最多四位小数)", "280px")
                    return;
                }
                let openTicket = {
                    companyAddress: this.form.companyAddress || '',
                    companyPhone: this.form.companyPhone || '',
                    contractId: this.form.contractId || '',
                    customerId: this.form.customerId || '',
                    openAccount: this.form.openAccount || '',
                    openBank: this.form.openBank || '',
                    taxNo: this.form.taxNo || '',
                    ticketAmout: this.form.ticketAmout || '',
                    remark: this.form.remark || '',
                }
                this.$vux.loading.show()
                this.$post("/crm/openTicketPR/addOpenTicket", {"openTicket": openTicket}, (data) => {
                    if(type){
                        // js生成UUID
                        var s = [];
                        var hexDigits = "0123456789abcdef";
                        for (var i = 0; i < 36; i++) {
                            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                        }
                        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
                        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
                        s[8] = s[13] = s[18] = s[23] = "-";
                    
                        var uuid = s.join("");
                        let params = {
                            busId: uuid,
                            openTicketId: data.openTicket.id,
                            remark: '',
                        }
                        this.$post("/crm/openTicketPR/begin", params, (data) => {
                            console.log(data)
                            this.toastSuccess("提交审批成功！", "140px")
                            this.goBack()
                        })
                    }else{
                        this.toastSuccess("保存成功！")
                        this.goBack()
                    }
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



