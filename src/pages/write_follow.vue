<template>
    <div class="page write-follow"> 
        <div class="main">
            <div class="flex-box">
                <div class="flex-item" @click="openSearch(1)">
                    <i class="iconfont icon-kehu"></i>
                    <p>营销客户</p>
                </div>
                <div class="flex-item" @click="openSearch(2)">
                    <i class="iconfont icon-hailiangxiansuo"></i>
                    <p>营销线索</p>
                </div>
                <div class="flex-item" @click="openSearch(3)">
                    <i class="iconfont icon-shangji"></i>
                    <p>营销机会</p>
                </div>
            </div>
        </div>
        <!-- 客户 -->
        <popup v-model="popup1" @on-show="showPopup1" height="100%">
            <div class="popup0">
                <search
                    @result-click="resultClick1"
                    @on-change="getResult1"
                    :results="results1"
                    v-model="searchValue1"
                    position="absolute"
                    auto-scroll-to-top
                    top="0"
                    @on-cancel="onCancel1"
                    ref="search1">
                </search>
            </div>
        </popup>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton, Swiper, SwiperItem, XTable, Search, Popup } from 'vux'

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
            Swiper,
            SwiperItem,
            XTable,
            Search,
            Popup,
        },
        data () {
            return {
                data: [],                           // 模态框显示的数据
                data1: [],                          //  客户 
                data2: [],                          //  线索
                data3: [],                          //  机会
                index: 0,                           
                
                popup1: false,
                results1: [],                       //  搜索结果
                searchValue1: '',                   //  搜索文本
            }
        },
        activated(){
            this.getData1()
            this.getData2()
            this.getData3()
        },
        methods: {
            //  打开搜索框
            openSearch(index){
                this.data = this["data" + index]
                this.index = index
                this.popup1 = true
                this.results1 = this.deepClone(this.data)
            },
            //  获取客户
            getData1(){
                let params = {
                    prop: 'createTime', 
                    order: -1,
                    currentPage: 1,
                    pageSize: 1000
                }
                this.$post("/crm/customerPR/queryCrmCustomer", params, (data) => {
                    this.data1 = []
                    data.list.map((item) => {
                        this.data1.push({
                            title: item.name,
                            id: item.id
                        })
                    })
                    // this.results1 = this.deepClone(this.data1)
                })
            },
            //  获取线索
            getData2(){
                let params = {
                    prop: 'createTime', 
                    order: -1,
                    currentPage: 1,
                    pageSize: 1000
                }
                this.$post("/crm/marketingCluePR/queryMarketingClue", params, (data) => {
                    this.data2 = []
                    data.list.map((item) => {
                        this.data2.push({
                            title: item.name,
                            id: item.id,
                            customerId: item.customerId
                        })
                    })
                })
            },
            //  获取机会
            getData3(){
                let params = {
                    prop: 'createTime', 
                    order: -1,
                    currentPage: 1,
                    pageSize: 1000
                }
                this.$post("/crm/opportunityPR/queryOpportunity", params, (data) => {
                    this.data3 = []
                    data.list.map((item) => {
                        this.data3.push({
                            title: item.opportunityName,
                            id: item.id,
                            customerId: item.customerId
                        })
                    })
                })
            },
        /************************************搜索****************************** */
            showPopup1(){
                this.searchValue1 = ''
                setTimeout(() => {
                    this.$refs.search1.setFocus()
                    setTimeout(() => {
                        this.$refs.search1.setBlur()
                    }, 0);
                }, 0);
            },

            resultClick1 (item) {
                if(item.id){
                    if(this.index == 1){
                        this.$router.push("./client_follow?id=" + item.id + '&name=' + item.title)
                    }else if(this.index == 2){
                        this.$router.push("./clue_follow?id=" + item.id + '&name=' + item.title + '&customerId=' + item.customerId)
                    }else if(this.index == 3){
                        this.$router.push("./opportunity_follow?id=" + item.id + '&name=' + item.title + '&customerId=' + item.customerId)
                    }
                }
            },
            getResult1 (val) {
                this.results1 = val ? this.match1(val) : this.data
                if(!this.results1.length){
                    this.results1 = [{
                        id: '',
                        title: '暂无数据'
                    }]
                }
            },
            onCancel1 () {
                this.popup1 = false
            },
            match1(val){
                let rs = []
                this.data.map((item) => {
                    if(item.title.indexOf(val) != -1){
                        rs.push(item)
                    }
                })
                return rs
            },
        },
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .main{
        font-size: 12px;
        overflow: hidden;
        .flex-box{
            text-align: center;
            display: flex;
            background: #fff;
            padding: 15px 0 5px;
            .flex-item{
                width: 25%;
            }
            i{
                font-size: 36px;
                color: #fff;
                background: @baseColor;
                padding: 10px;
                border-radius: 6px;
            }
            p{
                line-height: 28px;
            }
        }
    }
</style>






