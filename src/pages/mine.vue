<template>
    <div class="has-tabbar page"> 
        <div class="main">
            <group gutter='0' class="header">
                <cell class="cell">
                    <img :src="userInfo.headimgurl" alt="" slot="icon">
                    <div slot="title" class="title">
                        <p>{{userInfo.cname}}</p>
                        <p>{{userInfo.mobile}}</p>
                    </div>
                </cell>
            </group>
            <div class="empty-box"></div>
            <group gutter='0'>
                <!-- <cell class="cell" is-link link="./change_password">
                    <span slot="title"><i class="iconfont icon-iconfontmima" style="color: #6ccac9;"></i>修改密码</span>
                </cell>
                <cell class="cell" is-link link="./feedback">
                    <span slot="title"><i class="iconfont icon-yijianfankui" style="color: #a9d96c;"></i>意见反馈</span>
                </cell> -->
                <cell class="cell" is-link @click.native="logout">
                    <span slot="title"><i class="iconfont icon-icon" style="color: #7c8dc1;"></i>退出</span>
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
                tabIndex: 0,
                userInfo: {},
            }
        },
        activated(){
            this.$post("/crm/getUserInfo", {userId: this.getCookie('crmUserName')}, (data) => {
                this.userInfo = data.userInfo
            })
        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
            logout(){
                this.$vux.confirm.show({
                    content: '您确定退出吗？',
                    onCancel: () => {},
                    onConfirm: () => {
                        this.delCookie("crmUserName")
                        this.delCookie("crmpassword")
                        this.replaceRouter("./login")
                    }
                })
            },
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .page{
        // background: #fff;
    }
    .main{
        .empty-box{
            height: 10px;
            background: #f2f2f2;
        }
        .cell{
            font-size: 14px;
            padding: 7px 15px;
            img{
                width: 64px;
                height: 64px;
                border-radius: 50%;
                float: left;
                margin: 20px 10px 20px 0;
            }
            .title{
                line-height: 26px;
            }
            i{
                font-size: 22px;
                vertical-align: middle;
                margin-right: 10px;
            }
        }
    }
</style>


