<template>
    <div class="page" v-if="!detail.message"> 
        <div class="header pst">
            <p class="name">{{lastName(detail.promoterCname)}}</p>
            <div>
                <p>{{detail.promoterCname}}</p>
                <span v-if="query.flowType == 1" style="color: coral;">等待我审批</span>
                <span v-if="detail.flowState" style="color: #1aad19;">审批完成</span>
                <span v-if="query.flowType == 3 && detail.currentAssignee" style="color: #16A4FA;">等待{{detail.currentAssignee[0]}}审批</span>
            </div> 
        </div>
        <div class="main" :style="query.flowType == 1 && !detail.flowState ? '' : 'padding-bottom: 0;'">
            <div class="table-box">
                <p v-if="detail.projectName" class="label">
                    <span class="label-text">项目名称</span>
                    <span class="label-value">{{detail.projectName}}</span>
                </p>
                <p v-if="detail.projectNo" class="label">
                    <span class="label-text">项目编码</span>
                    <span class="label-value">{{detail.projectNo}}</span>
                </p>
                <p v-if="detail.volumeName" class="label">
                    <span class="label-text">工作包名称</span>
                    <span class="label-value">{{detail.volumeName}}</span>
                </p>
                <p v-if="detail.volumeNo" class="label">
                    <span class="label-text">工作包编码</span>
                    <span class="label-value">{{detail.volumeNo}}</span>
                </p>
                <p v-if="detail.promoterSpec" class="label">
                    <span class="label-text">申请专业</span>
                    <span class="label-value">{{detail.promoterSpec}}</span>
                </p>
                <p v-if="detail.promoterDept" class="label">
                    <span class="label-text">申请部门</span>
                    <span class="label-value">{{detail.promoterDept}}</span>
                </p>
                <p v-if="detail.zlName" class="label">
                    <span class="label-text">资料名称</span>
                    <span class="label-value">{{detail.zlName}}</span>
                </p>
                <p v-if="detail.changeReason" class="label">
                    <span class="label-text">变更依据</span>
                    <span class="label-value">{{detail.changeReason}}</span>
                </p>
                <p v-if="detail.reviseReasonAndGist" class="label">
                    <span class="label-text">修订依据</span>
                    <span class="label-value">{{detail.reviseReasonAndGist}}</span>
                </p>
                <p v-if="detail.fmName" class="label">
                    <span class="label-text">封面名称</span>
                    <span class="label-value">{{detail.fmName}}</span>
                </p>
                <p v-if="detail.applClass" class="label">
                    <span class="label-text">申请类型</span>
                    <span class="label-value">{{detail.applClass}}</span>
                </p>
                <p v-if="detail.exreasonDesc" class="label">
                    <span class="label-text">审批原因</span>
                    <span class="label-value">{{detail.exreasonDesc}}</span>
                </p>
                <p v-if="detail.contractPeriod" class="label">
                    <span class="label-text">合同工期</span>
                    <span class="label-value">{{detail.contractPeriod}}</span>
                </p>
                <p v-if="detail.yardPeriod" class="label">
                    <span class="label-text">院定工期</span>
                    <span class="label-value">{{detail.yardPeriod}}</span>
                </p>
                <p v-if="detail.explorationPeriod" class="label">
                    <span class="label-text">勘探工期</span>
                    <span class="label-value">{{detail.explorationPeriod}}</span>
                </p>
                <p v-if="detail.measurementDuration" class="label">
                    <span class="label-text">测量工期</span>
                    <span class="label-value">{{detail.measurementDuration}}</span>
                </p>
                <p v-if="detail.totalityPersonInCharge" class="label">
                    <span class="label-text">总体负责人</span>
                    <span class="label-value">{{detail.totalityPersonInCharge}}</span>
                </p>
                <p v-if="detail.totalityDepartment" class="label">
                    <span class="label-text">总体部门</span>
                    <span class="label-value">{{detail.totalityDepartment}}</span>
                </p>
                <p v-if="detail.designOutputTimeLimit" class="label">
                    <span class="label-text">成果交付时间</span>
                    <span class="label-value">{{detail.designOutputTimeLimit}}</span>
                </p>
                <p v-if="detail.yearMonth" class="label">
                    <span class="label-text">年月</span>
                    <span class="label-value">{{detail.yearMonth}}</span>
                </p>
                <p v-if="detail.revisedContent" class="label">
                    <span class="label-text">修订后内容</span>
                    <span class="label-value">{{detail.revisedContent}}</span>
                </p>
                <p v-if="detail.totalCount" class="label">
                    <span class="label-text">发图总份数</span>
                    <span class="label-value">{{detail.totalCount}}</span>
                </p>
                <p v-if="detail.applClass" class="label">
                    <span class="label-text">申请类型</span>
                    <span class="label-value">{{detail.applClass}}</span>
                </p>
                <p v-if="detail.exreasonDesc" class="label">
                    <span class="label-text">审批原因</span>
                    <span class="label-value">{{detail.exreasonDesc}}</span>
                </p>
                <p v-if="detail.archiveDesc" class="label">
                    <span class="label-text">归档说明</span>
                    <span class="label-value">{{detail.archiveDesc}}</span>
                </p>
                <p v-if="detail.stageName" class="label">
                    <span class="label-text">项目阶段</span>
                    <span class="label-value">{{detail.stageName}}</span>
                </p>
                <p v-if="detail.reviewContent" class="label">
                    <span class="label-text">评审内容</span>
                    <span class="label-value">{{detail.reviewContent}}</span>
                </p>
                <p v-if="detail.specName" class="label">
                    <span class="label-text">专业名称</span>
                    <span class="label-value">{{detail.specName}}</span>
                </p>
                <p v-if="detail.designInfo" class="label">
                    <span class="label-text">设计提供信息</span>
                    <span class="label-value">{{detail.designInfo}}</span>
                </p>
                <p v-if="detail.customerName" class="label">
                    <span class="label-text">客户名称</span>
                    <span class="label-value">{{detail.customerName}}</span>
                </p>
                <p v-if="detail.contractName" class="label">
                    <span class="label-text">合同名称</span>
                    <span class="label-value">{{detail.contractName}}</span>
                </p>
                <p v-if="detail.contractNo" class="label">
                    <span class="label-text">合同编号</span>
                    <span class="label-value">{{detail.contractNo}}</span>
                </p>
                <p v-if="detail.contracAmount" class="label">
                    <span class="label-text">合同总金额(万元)</span>
                    <span class="label-value">{{detail.contracAmount}}</span>
                </p>
                <p v-if="detail.startTime" class="label">
                    <span class="label-text">开始时间</span>
                    <span class="label-value">{{detail.startTime}}</span>
                </p>
                <p v-if="detail.endTime" class="label">
                    <span class="label-text">结束时间</span>
                    <span class="label-value">{{detail.endTime}}</span>
                </p>
                <p v-if="detail.ownerCname" class="label">
                    <span class="label-text">合同负责人</span>
                    <span class="label-value">{{detail.ownerCname}}</span>
                </p>
                <p v-if="detail.contractState" class="label">
                    <span class="label-text">合同状态</span>
                    <span class="label-value">{{detail.contractState}}</span>
                </p>
                <p v-if="detail.customerSignatory" class="label">
                    <span class="label-text">客户签约人</span>
                    <span class="label-value">{{detail.customerSignatory}}</span>
                </p>
                <p v-if="detail.selfSignatory" class="label">
                    <span class="label-text">我方签约人</span>
                    <span class="label-value">{{detail.selfSignatory}}</span>
                </p>
                <p v-if="detail.signatoryTime" class="label">
                    <span class="label-text">签约日期</span>
                    <span class="label-value">{{detail.signatoryTime}}</span>
                </p>
                <p v-if="detail.taxNo" class="label">
                    <span class="label-text">纳税识别号</span>
                    <span class="label-value">{{detail.taxNo}}</span>
                </p>
                <p v-if="detail.companyAddress" class="label">
                    <span class="label-text">地址</span>
                    <span class="label-value">{{detail.companyAddress}}</span>
                </p>
                <p v-if="detail.companyPhone" class="label">
                    <span class="label-text">电话</span>
                    <span class="label-value">{{detail.companyPhone}}</span>
                </p>
                <p v-if="detail.openBank" class="label">
                    <span class="label-text">开户银行</span>
                    <span class="label-value">{{detail.openBank}}</span>
                </p>
                <p v-if="detail.openAccount" class="label">
                    <span class="label-text">开户账号</span>
                    <span class="label-value">{{detail.openAccount}}</span>
                </p>
                <p v-if="detail.ticketAmout" class="label">
                    <span class="label-text">发票金额(万元)</span>
                    <span class="label-value">{{detail.ticketAmout}}</span>
                </p>
                <p v-if="detail.remark" class="label">
                    <span class="label-text">备注</span>
                    <span class="label-value">{{detail.remark}}</span>
                </p>
                <p v-if="detail.countersignDetails" class="label">
                    <span class="label-text">会签明细</span>
                    <x-table full-bordered style="background-color:#fff;">
                        <thead>
                            <tr>
                            <th>图名</th>
                            <th>图号</th>
                            <th>页次号</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in detail.countersignDetails" :key="index">
                                <td>{{item.attachName || ''}}</td>
                                <td>{{item.attachNo || ''}}</td>
                                <td>{{item.pageNo || ''}}</td>
                            </tr>
                            <tr v-if="detail.countersignDetails && detail.countersignDetails.length">
                                <td colspan="3">暂无数据</td>
                            </tr>
                        </tbody>
                    </x-table>
                </p>
                <p v-if="detail.sendVolDetails" class="label">
                    <span class="label-text">工作包明细</span>
                    <x-table full-bordered style="background-color:#fff;">
                        <thead>
                            <tr>
                            <th>工作包名称</th>
                            <th>工作包编码</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in detail.sendVolDetails" :key="index">
                                <td>{{item.name || ''}}</td>
                                <td>{{item.no || ''}}</td>
                            </tr>
                            <tr v-if="detail.sendVolDetails && detail.sendVolDetails.length">
                                <td colspan="2">暂无数据</td>
                            </tr>
                        </tbody>
                    </x-table>
                </p>
            </div>
            <div class="follow">
                <div class="follow-item">
                    <span class="approver">{{lastName(detail.promoterCname)}}</span>
                    <p><span class="text_333">{{detail.promoterCname}}</span><span style="color: #16A4FA;">  发起申请</span><span class="datetime">{{detail.createTime}}</span></p>
                </div>
                <div class="follow-item" v-for="(item, index) in detail.list" :key="index">
                    <span class="approver">{{lastName(item.userCname)}}</span>
                    <p><span class="text_333">{{item.userCname}}</span><span :class="item.ifPass ? 'success' : 'fail'">  {{item.nodeName}}{{item.ifPass ? '通过' : '拒绝'}}</span><span class="datetime">{{formatDate(new Date(item.checkTime), 'yyyy-MM-dd hh:mm')}}</span></p>
                    <p v-if="item.opinion">意见：{{item.opinion}}</p>
                </div>
            </div>
        </div>
        <div class="handle" v-if="query.flowType == 1 && !detail.flowState">
            <a @click="handle(false)">不同意</a>
            <a class="active" @click="handle(true)">同意</a>
        </div>
        <confirm v-model="show" class="confirm-cust"
            @on-confirm="pass"
            @on-show="openModel">
            <div slot="">
                <x-textarea v-model="evaluation" v-if="processName == 'foreignInvestigation'" placeholder="外业调查评定 (必填)" :rows="5"></x-textarea>
                <x-textarea v-model="opinion" placeholder="我的意见(可选)" :rows="5"></x-textarea>
            </div>
        </confirm>
    </div>
    <div v-else class="empty">
        <img src="../assets/none.png" />
        <p>任务已被处理</p>
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
                detail: {},       //  详细信息
                show: false,
                opinion: '',
                ifPass: '',
                evaluation: '',      //  外业调查评定 
                processName: '',        //  流程名称
            }
        },
        activated(){
            this.query = this.$router.currentRoute.query
            this.getDetail()
            
        },
        destroyed(){
            this.detail = {}
            this.list = []
        },
        methods: {
            lastName(name){
                name = name || ''
                return name.slice(-2)
            },
            getDetail(){
                this.$vux.loading.show()
                this.$post("/crm/dingDingPR/getFlowDetail", {flowType: this.query.flowType, taskId: this.query.id, piId: this.query.id}, (data) => {
                    this.detail = data
                    this.processName = data.processName
                })
            },
            handle(flag){
                this.show = true
                this.ifPass = flag
            },
            //  打开操作框
            openModel(){
                this.opinion = ''
                this.evaluation = ''
            },
            pass(){
                if(this.processName == 'foreignInvestigation' && !this.evaluation.trim()){
                    this.toastFail("请填写外业调查评定", '160px')
                    return
                }
                let params = {
                    taskId: this.query.id,
                    ifPass: this.ifPass ? "pass" : "reject",
                    opinion: this.opinion,
                    evaluation: this.evaluation,
                }
                this.$post("/crm/dingDingPR/sendFlowResult", params, (data) => {
                    this.toastSuccess("操作成功！")
                    this.replaceRouter("./approval")
                })
            }
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .header{
        display: flex;
        padding: 20px;
        background: #fff;
        align-items: center;
        .name{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: @baseColor;
            color: #fff;
            text-align: center;
            line-height: 40px;
            margin-right: 20px;
        }
        >div{
            p{
                font-size: 14px;
                font-weight: bold;
                color: #333;
            }
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
            margin-right: 6px;
            line-height: 20px;
            th, td{
                padding: 4px 2px;
            }
        }
        .follow{
            padding: 30px 0 0 50px;
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
                .approver{
                    content: '';
                    display: block;
                    position: absolute;
                    top: -4px;
                    left: -36px;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: @baseColor;
                    color: #fff;
                    line-height: 36px;
                    text-align: center;
                    font-size: 12px;
                }
                &:not(:last-of-type):before{
                    content: '';
                    display: block;
                    position: absolute;
                    top: -2px;
                    left: -19px;
                    width: 0;
                    height: 100%;
                    border-left: 2px dashed @baseColor;
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
    .label{
        display: flex;
        padding: 1px 0;
        .label-text{
            white-space: nowrap;
            width: 100px;
            text-align: right;
            padding-right: 10px;
        }
        .label-value{
            flex: 1;
            padding-right: 6px;
        }
    }
    .empty{
        text-align: center;
        padding-top: 40px;
        p{
            color: #ccc;
        }
    }
    .success{
        color: #1aad19;
    }
    .fail{
        color: red;
    }
</style>
<style lang="less">
    .confirm-cust{
        .weui-dialog__bd{
            padding: 0;
        }
    }
    .weui-dialog__btn_primary{
        color: #16A4FA;
    }
</style>




