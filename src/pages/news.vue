<template>
    <div class="has-tabbar page"> 
        <div class="main news">
            <group gutter='0'>
                <cell class="cell" is-link link="./notice">
                    <span class="icon" slot="icon"><i class="iconfont icon-xiaoxi" style="background: #6ccac9;"></i></span>
                    <div class="title" slot="title">系统消息</div>
                    <badge v-show="notifyNum" class="num" :text="notifyNum" slot=""></badge>
                </cell>
                <!-- <cell class="cell" is-link link="./letter">
                    <span class="icon" slot="icon"><i class="iconfont icon-yijianfankui" style="background: #1991eb;"></i></span>
                    <div class="title" slot="title">站内信</div>
                    <badge v-show="letterNum" class="num" :text="letterNum" slot=""></badge>
                </cell> -->
                <cell class="cell" is-link link="./approval">
                    <span class="icon" slot="icon"><i class="iconfont icon-shenpi" style="background: #a9d96c;"></i></span>
                    <div class="title" slot="title">待办事项</div>
                    <badge v-show="approvalNum" class="num" :text="approvalNum" slot=""></badge>
                </cell>
            </group>
        </div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'

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
        },
        data () {
            return {
                notifyNum: 0,
                // letterNum: 0,
                approvalNum: 0,
                isLogin: false,
                showProcessList: ["营销合同流程", "开票流程"],        //  需要显示的流程
            }
        },
        created(){
            this.$vux.loading.show()
            this.$post("/crm/dingDingPR/getSignature", {url: window.location.href}, (data) => {
                dd.config({
                    agentId: data.agentId, // 服务端传来的congfig信息
                    corpId: data.corpId,
                    timeStamp: data.timeStamp,
                    nonceStr: data.nonceStr,
                    signature: data.signature,
                    jsApiList: [ // 所有需要使用到的jsapi需要在config的时候进行注册，写在这里。
                        'runtime.permission',
                        'biz.util.scanCard',
                        'biz.contact.choose',
                        'biz.telephone.call',
                        'biz.ding.post']
                });
            })
            dd.ready(() => {
                dd.runtime.permission.requestAuthCode({
                    // corpId: "dingda3192b9415c693435c2f4657eb6378f",            // 测试服
                    corpId: "ding28e04bf2f156abfd35c2f4657eb6378f",         // 正式服
                    onSuccess: (result) => {
                        let code = result.code
                        this.$post("/crm/dingDingPR/getUserIdAndPwd", {code: code}, (data) => {
                            let params = new URLSearchParams();
                            params.append("username_", data.userid)
                            params.append("password_", data.pwd)
                            params.append("remember_me_", true)
                            this.$axios({
                                method:"POST",
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                url: "/iims4/security_check_",
                                data : params,
                            }).then(r => {
                                this.getNotify()
                                this.getApproval()
                                this.isLogin = true
                            }).catch(err=>{
                                console.log(err)
                            })
                        })
                    },
                    onFail : function(err) {
                        console.log(err)
                        this.$vux.loading.show()
                    }
                });
            }); 	
        },
        activated(){
            if(this.isLogin){
                this.getNotify()
                // this.getMail()
                this.getApproval()
            }
        },
        methods: {
            getNotify(){
                this.$post("/crm/notifyPR/getNotify", {}, (data) => {
                    data.list.some((item, index) => {
                        if(item.state == '1'){
                            this.notifyNum = index
                            if(this.notifyNum > 99){
                                this.notifyNum = 99
                            }
                            return true
                        }
                    })
                })
            },
            getApproval(){
                this.$vux.loading.show()
                this.$post("/crm/dingDingPR/getAllFlowList", {flowType: '1'}, (data) => {
                    let list = data.tp_list || []
                    this.approvalNum = list.length
                })
            },
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .page{
        background: #fff;
    }
    .main{
        .cell{
            font-size: 14px;
            padding: 15px 15px 0 0;
            height: 40px;
            margin-bottom: 10px;
            border-bottom: 1px solid #ddd;
            .icon{
                display: block;
                overflow: hidden;
                background: #fff;
                padding-left: 10px;
                margin-right: 10px;
            }
            i{
                float: left;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                text-align: center;
                line-height: 50px;
                position: relative;
                font-size: 32px;
                vertical-align: middle;
                z-index: 4;
                color: #fff;
            }
            .title{
                line-height: 40px;
                font-size: 14px;
                color: @baseColor;
                span{
                    float: right;
                }
            }
            .num{
                position: relative;
                top: -3px;
            }
            &:before{
                display: none;
            }
            &:active{
                background: #fff;
            }
        }
    }
</style>
<style lang="less">
    .news .weui-cells{
        overflow: inherit;
        &:after, &:before{
            display: none;
        }
    }
</style>



