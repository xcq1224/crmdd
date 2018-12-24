<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{backText: ''}">{{handleType == '0'?'新增收款':'编辑收款'}}</x-header>
        <div class="main">
            <group gutter='0' label-width="100px">
                <datetime title="收款日期" format="YYYY-MM-DD"></datetime>
                <x-input required>
                    <div slot="label"><span style="color: red;">* </span>收款金额</div>
                </x-input>
                <popup-picker title="收款期数" :data="list" v-model="value" value-text-align="left"></popup-picker>
                <popup-picker title="付款方式" :data="list" v-model="value" value-text-align="left"></popup-picker>
                <x-input title="客户名称"></x-input>
                <x-input title="合同名称"></x-input>
                <popup-picker title="收款类型" :data="list" v-model="value" value-text-align="left"></popup-picker>
                <x-input title="收款人"></x-input>
                <x-textarea :max="200" placeholder="备注"></x-textarea>
            </group>
        </div>
        <div class="footer">
            <a v-show="handleType==0" class="active">保存</a>
            <a v-show="handleType==1">删除</a>
            <a v-show="handleType==1" class="active">保存</a>
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
                formADD: {

                },
                value: [],
                list: [['A', 'B', 'C']],
                addressValue: [],
                addressData: ChinaAddressData,
                handleType: '0',
            }
        },
        activated(){
            this.handleType = this.$router.currentRoute.query.handleType || this.handleType
        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
            




            
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
        padding-top: 46px;
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



