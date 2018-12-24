<template>
    <div class="page login"> 
        <div class="main">
            
        </div>
    </div>
</template>

<script>

    import { XHeader, XButton, XInput } from 'vux'
    
    export default {
        components: {
            XHeader,
            XButton,
            XInput,
        },
        data () {
            return {

            }
        },
        created(){
           
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .main{
        padding: 100px 30px 0;
        background: linear-gradient(170deg, rgba(0, 198, 251, 1) 0%, rgba(0, 198, 251, 1) 0%, rgba(0, 91, 234, 1) 100%, rgba(0, 91, 234, 1) 100%);
        .logo{
            font-family: '幼圆 Bold', '幼圆';
            font-weight: 700;
            font-style: normal;
            font-size: 36px;
            color: #FFFFFF;
            text-align: center;
            margin-bottom: 50px;
        }
        .input{
            width: 100%;
            height: 40px;
            padding: 0;
            border: 1px solid #fff;
            border-radius: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 14px;
            margin-bottom: 20px;
            color: #fff;
            &:before{
                display: none;
            }
        }
        ::-webkit-input-placeholder{
            color: #fff;
        }
        .btn-submit{
            display: block;
            background: #fff;
            color: @baseColor;
        }
        p{
            text-align: center;
        }
    }
</style>



