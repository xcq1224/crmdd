<template>
    <div class="page"> 
        <div class="main">
            <group gutter='0'>
                <x-textarea v-model="formAdd.visitContent" :height="120" class="textarea" placeholder="请填写拜访内容..."></x-textarea>
            </group>
            <group>
                <cell v-show="formAdd.visitAddress" title="签到地点" v-model="formAdd.visitAddress" @click.native="geolocation"></cell>
                <cell v-show="!formAdd.visitAddress" title="签到地点">
                    <div slot="" class="text_base" @click="geolocation">获取当前位置</div>
                </cell>
                <cell title="签到时间" v-model="formAdd.visitTime"></cell>
                <popup-radio title="签到类型" :options="qdlx" v-model="formAdd.visitType" placeholder="请选择类型"></popup-radio>
                <cell v-if="!query.id" is-link title="拜访客户" v-model="customerName" @click.native="popup1 = true"></cell>
                <cell v-if="query.id" title="拜访客户" v-model="customerName"></cell>
            </group>
            <div class="submit-btn" @click="save">保存</div>
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
    import { Cell, CellBox, CellFormPreview, Group, InlineXSwitch, XTextarea, XInput, Datetime, Popup, PopupRadio, Search } from 'vux'
    import { POINT_CONVERSION_COMPRESSED } from 'constants';
    import jsonp from 'jsonp';

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
            InlineXSwitch,
            XTextarea,
            XInput,
            Datetime,
            Popup,
            PopupRadio,
            Search,
        },
        data () {
            return {
                formAdd: {},  
                query: {},  
                qdlx: [],           //  签到类型
                customers: [],      //  客户列表
                customerName: '',   //  客户名称
            //  搜索客户
                popup1: false,
                results1: [],                       //  搜索结果
                searchValue1: '',                   //  搜索文本
                options : {timeout: 8000},          //  定位超时
            }
        },
        activated(){
            this.query = this.$router.currentRoute.query
            this.customers = []
            this.customerName = ''
            this.formAdd = {
                visitTime: this.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
                visitAddress: '',
            }
            this.getDict()
            if(this.query.id){
                this.formAdd.customerId = this.query.id
                this.customerName = this.query.name
            }else{
                this.getCustomers()
                this.getPartners()
            }

            //  获取定位信息
            this.geolocation()
        },
        methods: {
            //  获取数字字典
            getDict(){
                let list = ["crm-qdlx"]
                this.$post("/crm/getDict", {"list": list}, (data) => {
                    this.qdlx = data['crm-qdlx']
                    this.formAdd.visitType = data['crm-qdlx'][0]
                }) 
            },
            //  获取客户
            getCustomers(){
                this.$post("/crm/queryAllCustomers", {}, (data) => {
                    data.customers.map(item => {
                        this.customers.push({
                            title: item.name,
                            id: item.id
                        })
                    })
                    this.results1 = this.customers
                }) 
            },
            //  获取合作伙伴
            getPartners(){
                this.$post("/crm/queryAllPartner", {}, (data) => {
                    data.partner.map(item => {
                        this.customers.push({
                            title: item.name,
                            id: item.id
                        })
                    })  
                    this.results1 = this.customers
                }) 
            },
            //保存
            save(){
                if(!this.formAdd.visitAddress){
                    this.toastFail("定位失败，请重新定位", "200px")
                    return;
                }
                if(!this.formAdd.visitType){
                    this.toastFail("请选择类型", "160px")
                    return;
                }
                if(!this.formAdd.customerId){
                    this.toastFail("请选择客户", "160px")
                    return;
                }
                this.$post("/crm/visitPR/addOne", this.formAdd, (data) => {
                    this.toastSuccess("签到成功")
                    this.goBack()
                })
            },
        
        /***************************************获取定位*********************************** */
            geolocation(){
                this.$vux.loading.show({
                    text: '定位中...'
                })
                var geolocation = new qq.maps.Geolocation("HPABZ-Z6KAQ-MZF5Q-GBJDK-25QXQ-DUBGP", "crmapp")
                geolocation.getLocation(this.showPosition, this.showErr, this.options)
            },
            showPosition(position) {
                let latlon = position.lat + "," + position.lng
                var url = "http://apis.map.qq.com/ws/geocoder/v1/?key=HPABZ-Z6KAQ-MZF5Q-GBJDK-25QXQ-DUBGP&jsonpCallback=QQmap&location="+latlon+"&output=jsonp&get_poi=0";
                jsonp(url, null, (err, data) => {
                    if (err) {
                        this.$vux.loading.hide()
                        this.toastFail('网络异常，请稍后再试', '200px')
                    } else {
                        this.$vux.loading.hide()
                        if(data.result && data.result.address){
                            this.formAdd.visitAddress = data.result.address;
                        }else{
                            this.toastFail("定位失败")
                        }
                    }
                })
            },
            showErr(){
                this.toastFail("定位失败")
            },
        /************************************客户****************************** */
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
                    this.formAdd.customerId = item.id
                    this.customerName = item.title
                    this.popup1 = false
                }
            },
            getResult1 (val) {
                this.results1 = val ? this.match1(val) : this.customers
                if(!this.results1.length){
                    this.results1 = [{
                        id: '',
                        name: '',
                        title: '暂无数据'
                    }]
                }
            },
            onCancel1 () {
                this.popup1 = false
            },
            match1(val){
                let rs = []
                this.customers.map((item) => {
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


