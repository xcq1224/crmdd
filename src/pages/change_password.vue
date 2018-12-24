<template>
    <div class="page"> 
        <div class="main">
            <group gutter='0' label-width="120px">
                <x-input title="原有密码" type="password"></x-input>
                <x-input title="新密码" type="password"></x-input>
                <x-input title="再次输入新密码" type="password"></x-input>
            </group>
        </div>
        <div class="footer">保存</div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, ChinaAddressData } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton } from 'vux'
    import { Card } from 'vux'
    import { PopupPicker } from 'vux'
    import { XInput, Group, XAddress, XTextarea } from 'vux'
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
        background: @baseColor;
        color: #fff;
    }
</style>



