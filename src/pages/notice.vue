<template>
    <div class="page"> 
        <div class="main">
            <div class="notice-item" v-for="(item, index) in notifyList" :key="index">
                <p :class="item.state == '0' ? 'active' : ''">{{item.content}}</p>
                <span class="datetime">{{formatDate(new Date(item.arriveTime), "yyyy-MM-dd hh:mm:ss")}}</span>
            </div>
            <divider>已经到底了</divider>
        </div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Divider } from 'vux'

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            Divider,
        },
        data () {
            return {
                notifyList: [],
            }
        },
        activated(){
            this.getNotify()
        },
        methods: {
            getNotify(){
                this.$vux.loading.show()
                this.$post("/crm/notifyPR/getNotify", {}, (data) => {
                    this.notifyList = data.list
                    let ids = []
                    data.list.some((item, index) => {
                        if(item.state == '0'){
                            ids.push(item.id)
                        }else{
                            return true
                        }
                    })
                    if(ids.length){
                        this.$post("/crm/notifyPR/setNotifyRead", {ids: ids}, (data) => {})
                    }
                })
            },
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .main{
        font-size: 12px;
        .notice-item{
            padding: 10px;
            border-bottom: 1px solid #ddd;
            p{
                line-height: 18px;
                margin: 5px 0;
                &.active{
                    font-weight: bold;
                    color: #333;
                }
            }
            .datetime{
                color: #ccc;
            }
            &:last-of-type{
                border-bottom: none;
            }
        }
    }
</style>



