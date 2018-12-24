<template>
    <div class="has-tabbar page"> 
        <div class="main">
            <group gutter='0' class="tab" title="内容标签">
                <div class="cell">
                    <span :class="tabIndex == 0? 'active': ''" @click="tabIndex = 0">BUG问题</span>
                    <span :class="tabIndex == 1? 'active': ''" @click="tabIndex = 1">功能建议</span>
                </div>
            </group>
            <group gutter='0' title="反馈内容">
                <x-textarea class="textarea" placeholder="请详细描述你的问题或意见"></x-textarea>
                <div class="img-list">
                    <i class="iconfont icon-web-icon- upload"></i>
                </div>
            </group>
            <group gutter='0' title="联系方式">
                <x-input title="手机号/微信" placeholder="请输入手机号/微信"></x-input>
            </group>
        </div>
        <div class="footer">提交</div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge, InlineXSwitch, XTextarea, XInput } from 'vux'

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
        },
        data () {
            return {
                tabIndex: 0,

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
    .vux-header{
        position: relative;
        z-index: 2;
    }
    .main{
        .tab{
            .cell{
                padding: 15px 20px;
                font-size: 14px;
            }
            span{
                display: inline-block;
                width: 110px;
                height: 36px;
                line-height: 36px;
                text-align: center;
                background: #f2f2f2;
                margin-right: 25px;
                border-radius: 4px;
                &.active{
                    background: @baseColor;
                    color: #fff;
                }
            }
        }
        .textarea{
            font-size: 14px;
            height: 130px;
        }
        .img-list{
            padding-left: 10px;
            .upload{
                font-size: 44px;
                color: #ccc;
            }
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
</style>


