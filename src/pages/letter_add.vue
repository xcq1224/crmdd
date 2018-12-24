<template>
    <div class="has-tabbar page"> 
        <div class="main">
            <group gutter='0' class="tab" label-width="80px">
                <cell @click.native="popup = true" title="收件人" is-link v-model="receivers"></cell>
            </group>
            <group gutter='10px' class="tab">
                <x-textarea :max="20" v-model="title" :rows="1" placeholder="请输入标题"></x-textarea>
            </group>
            <group gutter='0'>
                <x-textarea :max="200" v-model="content" :rows="5" :autosize="true" placeholder="请输入内容"></x-textarea>
            </group>
            
        </div>
        <div class="footer" @click="addLetter">确定</div>
        <popup v-model="popup">
            <popup-header
            left-text="取消"
            right-text="确定"
            title=""
            :show-bottom-border="false"
            @on-click-left="popup = false"
            @on-click-right="chooseStaff"></popup-header>
            <div class="staff-box">
                <checklist :options="staffs" v-model="staffValue"></checklist>
            </div>
        </popup>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge, InlineXSwitch, XTextarea, XInput, Checklist, PopupHeader, Popup } from 'vux'

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
            Checklist,
            PopupHeader,
            Popup,
        },
        data () {
            return {
                staffs: [],
                staffValue: [],
                popup: false,
                receivers: '',
                title: '',
                content: '',
            }
        },
        created(){
            this.getStaff()
        },
        activated(){
            this.receivers = ''
            this.staffValue = []
            this.title = ''
            this.content = ''
        },
        methods: {
            getStaff(){
                this.$post("/crm/getAllStaff", {}, (data) => {
                    this.staffs = []
                    let userid = data.userid
                    data.list.map((item) => {
                        if(userid != item.userName){
                            this.staffs.push({
                                key: item.cname + "(" + item.userName + ")",
                                value: item.userName + " " + item.cname,
                            })
                        }
                    })
                })
            },
            chooseStaff(){
                this.popup = false
                this.receivers = this.staffValue.join(";")
            },
            addLetter(){
                if(!this.receivers){
                    this.toastFail("请选择收件人", "160px")
                    return;
                }
                if(!this.title.trim()){
                    this.toastFail("请输入标题", "160px")
                    return;
                }
                if(!this.content.trim()){
                    this.toastFail("请输入内容", "160px")
                    return;
                }
                let params = {
                    receivers: this.receivers,
                    title: this.title,
                    content: this.content,
                }
                this.$vux.loading.show()
                this.$post("/api/IimsMailPR/addMail", params, (data) => {
                    this.toastSuccess("发送成功")
                    this.goBack()
                })
            },
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .page{
        background: #f2f2f2;
    }
    .main{
        .textarea{
            font-size: 14px;
            height: 130px;
        }
        .weui-cell{
            font-size: 14px;
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
        background: @baseColor;
        color: #fff;
    }
    .staff-box{
        overflow: auto;
        max-height: 80vh;
    }
</style>


