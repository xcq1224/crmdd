<template>
    <div class="page"> 
        <div class="main">
            <group gutter='0' label-width="100px">
                <cell class="cell" is-link>
                    <span slot="title">头像</span>
                    <div slot>
                        <img src="../assets/avatar.jpg" alt="">
                    </div>
                </cell>
                <x-input title="姓名" v-model="nick"></x-input>
                <popup-picker title="性别" :data="list" v-model="value" value-text-align="left"></popup-picker>
                <x-input title="手机号"></x-input>
            </group>
        </div>
        <div class="footer">保存</div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, ChinaAddressData, Cell } from 'vux'
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
            Cell,
        },  
        data () {
            return {
                formADD: {

                },
                nick: '张三',
                value: ['男'],
                list: [['男', '女']],
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
        img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: block;
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



