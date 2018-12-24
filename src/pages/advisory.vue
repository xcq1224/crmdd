<template>
    <div class="page"> 
        <div class="main">
            <x-textarea placeholder="请输入要咨询的问题"></x-textarea>
            <a class="primary-btn">提交</a>
        </div>

    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { XTextarea } from 'vux'

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            XTextarea,
        },
        data () {
            return {
                
            }
        },
        methods: {
           
            
        },
    }
</script>

<style lang="less" scoped>
    @baseColor: #b5e1fe;
    .main{
        padding: 8px;
    }
    .vux-x-textarea{
        margin-bottom: 15px;
        background: #f2f2f2;
        padding: 0;
    }
    .primary-btn{
        display: block;
        height: 36px;
        line-height: 36px;
        background: @baseColor;
        text-align: center;
        color: #fff;
        border-radius: 4px;
    }
</style>
<style lang="less">
    .weui-textarea{
        background: #f2f2f2;
        height: 230px;
        padding: 15px;
        box-sizing: border-box;
        &::-webkit-input-placeholder{
            color:#ccc;
        }
        &:-moz-placeholder{
            color:#ccc;
        }
        &::-moz-placeholder{
            color:#ccc;
        }
        &:-ms-input-placeholder{
            color:#ccc;
        }
    }
</style>


