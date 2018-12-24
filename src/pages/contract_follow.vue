<template>
    <div class="has-tabbar page"> 
        <div class="main">
            <group gutter='0'>
                <x-textarea :height="120" class="textarea" placeholder=""></x-textarea>
                <div class="handle">
                    <i class="iconfont icon-yuyin"></i>
                    <i class="iconfont icon-dingwei"></i>
                </div>
            </group>
            <group>
                <datetime v-model="datetime" title="跟进时间" format="YYYY-MM-DD HH:mm"></datetime>
                <popup-picker class="picker" title="跟进方式" :data="list" v-model="value1"></popup-picker>
            </group>
            <group>
                <x-input title="合同名称" value="合同名称" text-align="right" disabled></x-input>
                <popup-picker class="picker" title="跟进状态" :data="list" v-model="value1"></popup-picker>
            </group>
            <div class="submit-btn">保存</div>
        </div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge, InlineXSwitch, XTextarea, XInput, Datetime, PopupPicker } from 'vux'

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
        },
        data () {
            return {
                datetime: '',
                value1: ['电话'],
                list: [['电话','b','c']]
            }
        },
        activated(){

        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
            abc(){
                console.log(3)
            }
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
        }
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
        .submit-btn{
            text-align: center;
            width: 100%;
            height: 40px;
            color: #fff;
            background: @baseColor;
            line-height: 40px;
            position: absolute;
            bottom: 0;
        }
    }
</style>


