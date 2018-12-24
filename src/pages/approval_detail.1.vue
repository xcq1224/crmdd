<template>
    <div class="page"> 
        <div class="header list-item pst">
            <p>
                <span class="inline_block text-ellipsis text_333">{{query.userName}}({{query.userId}})</span>
                <span v-if="info.state == 1" class="float_r font12 success">待处理</span>
                <span v-if="info.state == 2" class="float_r font12 success">审批通过</span>
                <span v-if="info.state == 3" class="float_r font12 success" style="background: #ffcc00;">审批不通过</span>
            </p> 
            <p><span class="inline_block w_100 text-ellipsis">{{query.createDate}}</span></p>
        </div>
        <div class="main" :style="query.taskId != '0' ? '' : 'padding-bottom: 0;'">
            <div class="table-box">
                <x-table :cell-bordered="false" :content-bordered="false" :full-bordered="false">
                    <tr v-for="(item, index) in lableList" :key="index">
                        <td width='80'>{{item}}</td>
                        <td>{{value[valueList[index]]}}</td>
                    </tr>
                </x-table>
                <!-- <x-table v-if="query.processName == 'ContractCheck'" :cell-bordered="false" :content-bordered="false" :full-bordered="false">
                    <tr>
                        <td width='80'>合同编号</td>
                        <td>{{info.contractNo}}</td>
                    </tr>
                    <tr>
                        <td>合同名称</td>
                        <td>{{info.contractName}}</td>
                    </tr>
                    <tr>
                        <td width='80'>客户名称</td>
                        <td>{{info.customerName}}</td>
                    </tr>
                    <tr>
                        <td width='80'>合同总金额(万元)</td>
                        <td>{{info.contracAmount}}</td>
                    </tr>
                    <tr>
                        <td width='80'>开始时间</td>
                        <td>{{info.startTime}}</td>
                    </tr>
                    <tr>
                        <td width='80'>结束时间</td>
                        <td>{{info.endTime}}</td>
                    </tr>
                    <tr>
                        <td width='80'>合同负责人</td>
                        <td>{{info.ownerCname}}</td>
                    </tr>
                    <tr>
                        <td width='80'>合同状态</td>
                        <td>{{info.contractState}}</td>
                    </tr>
                    <tr>
                        <td width='80'>客户签约人</td>
                        <td>{{info.customerSignatory}}</td>
                    </tr>
                    <tr>
                        <td width='80'>我方签约人</td>
                        <td>{{info.selfSignatory}}</td>
                    </tr>
                    <tr>
                        <td width='80'>签约日期</td>
                        <td>{{info.signatoryTime}}</td>
                    </tr>
                </x-table>
                <x-table v-if="query.processName == 'OpenTicketCheck'" :cell-bordered="false" :content-bordered="false" :full-bordered="false">
                    <tr>
                        <td width='80'>合同名称</td>
                        <td>{{info.contractName}}</td>
                    </tr>
                    <tr>
                        <td>客户名称</td>
                        <td>{{info.customerName}}</td>
                    </tr>
                    <tr>
                        <td width='80'>纳税识别号</td>
                        <td>{{info.taxNo}}</td>
                    </tr>
                    <tr>
                        <td width='80'>地址</td>
                        <td>{{info.companyAddress}}</td>
                    </tr>
                    <tr>
                        <td width='80'>电话</td>
                        <td>{{info.companyPhone}}</td>
                    </tr>
                    <tr>
                        <td width='80'>开户银行</td>
                        <td>{{info.openBank}}</td>
                    </tr>
                    <tr>
                        <td width='80'>开户账号</td>
                        <td>{{info.openAccount}}</td>
                    </tr>
                    <tr>
                        <td width='80'>发票金额(万元)</td>
                        <td>{{info.ticketAmout}}</td>
                    </tr>
                    <tr>
                        <td width='80'>备注</td>
                        <td>{{info.remark}}</td>
                    </tr>
                </x-table> -->
            </div>
            <div class="follow">
                <div class="follow-item">
                    <p><span class="text_333">{{query.userName}}  发起申请</span><span class="datetime">{{changeDate(query.createDate)}}</span></p>
                </div>
                <div class="follow-item" v-for="(item, index) in list" :key="index">
                    <p><span class="text_333">{{item.userCname}} {{item.nodeName}}</span><span class="datetime">{{formatDate(new Date(item.checkTime), 'yyyy/MM/dd hh:mm')}}</span></p>
                    <p>{{item.opinion}}</p>
                </div>
            </div>
        </div>
        <div class="handle" v-if="!isHandle">
            <a @click="handle(false)">不同意</a>
            <a class="active" @click="handle(true)">同意</a>
        </div>
        <confirm v-model="show" class="confirm-cust"
            @on-confirm="pass"
            @on-show="opinion = ''">
            <div slot="">
                <x-textarea v-model="opinion" placeholder="我的意见(可选)" :rows="5"></x-textarea>
            </div>
        </confirm>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton, Swiper, SwiperItem, Confirm, XTextarea  } from 'vux'
    import { XTable } from 'vux'

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
            XTable,
            Confirm,
            XTextarea,
        },
        data () {
            return {
                query: {},
                info: {},       //  详细信息
                list: [],       //  任务流程
                lableList: [],  //  显示的label
                valueList: [],  //  显示label对应的英文名
                value: {},      //  展示的数据
                show: false,
                opinion: '',
                ifPass: '',
                isHandle: true,     //  是否处理了
            }
        },
        activated(){
            this.query = this.$router.currentRoute.query
            // this.getDetail()
            this.$post("/crm/dingDingPR/getFlowDetail", {flowType: this.query.flowType, taskId: this.query.id, piId: this.query.id}, (data) => {
                console.log(data)
            })
        },
        destroyed(){
            console.log(333)
            this.info = {}
            this.list = []
            this.lableList = []
            this.valueList = []
            this.value = {}
            this.isHandle = true
        },
        methods: {
            //  将2018-01-01 改成2018/01/01
            changeDate(val){
                let value = val || ''
                return value.replace(/-/g,'/')
            },
            getDetail(){
                this.$vux.loading.show()
                this.$post("/crm/processDetailPR/processDetail", {busId: this.query.busId, processName: this.query.processName, taskId: this.query.taskId, isMy: this.query.isMy, userId: this.query.userId}, (data) => {
                    this.info = data.obj
                    this.list = data.list
                    this.lableList = data.lableList
                    this.valueList = data.valueList
                    this.value = data.value
                    this.isHandle = data.isHandle
                    console.log(this.info.state)
                })
            },
            handle(flag){
                this.show = true
                this.ifPass = flag
            },
            pass(){
                let params = {
                    processName: this.query.processName,
                    taskId: this.query.taskId,
                    ifPass: this.ifPass,
                    opinion: this.opinion,
                    busId: this.query.busId,
                }
                this.$post("/crm/processIfPassPR/process", params, (data) => {
                    this.toastSuccess("操作成功！")
                    this.goBack()
                })
            }
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .header{
        padding: 10px;
        background: #fff;
        .success{
            display: inline-block;
            width: 64px;
            height: 24px;
            line-height: 23px;
            border-radius: 4px;
            text-align: center;
            color: #fff;
            font-weight: normal;
            font-size: 12px;
            background: @baseColor;
        }
        p{
            padding: 2px;
        }
    }
    .main{
        padding-top: 77px;
        font-size: 12px;
        padding-bottom: 40px;
        background: #f2f2f2;
        .table-box{
            overflow: auto;
            padding-bottom: 10px;
            padding-top: 15px;
            margin-bottom: 10px;
            box-sizing: border-box;
            background: #fff;
        }
        .vux-table{
            line-height: 20px;
            &:after, td:before{
                display: none;
            }
            td:first-of-type{
                text-align: right;
                padding: 0 10px 8px;
                vertical-align: text-top;
            }
            td:last-of-type{
                text-align: left;
                padding: 0 10px 8px;
            }
        }
        .follow{
            padding: 0 0 15px 30px;
            background: #fff;
            .follow-item{
                position: relative;
                padding: 5px 10px 35px;
                border-radius: 6px;
                font-size: 14px;
                color: #999;
                .datetime{
                    float: right;
                    font-size: 12px;
                }
                p{
                    padding: 2px 0;
                    line-height: 18px;
                }
                &:after{
                    content: '';
                    display: block;
                    position: absolute;
                    top: 10px;
                    left: -15px;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: @baseColor;
                }
                &:not(:last-of-type):before{
                    content: '';
                    display: block;
                    position: absolute;
                    top: 12px;
                    left: -11px;
                    width: 1px;
                    height: 100%;
                    background: @baseColor;
                }
            }
        }
    }
    .handle{
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
            line-height: 45px;
            color: @baseColor;
            &.active{
                background: @baseColor;
                color: #fff;
            }
        }
    }
</style>
<style lang="less">
    .confirm-cust{
        .weui-dialog__bd{
            padding: 0;
        }
    }
</style>




