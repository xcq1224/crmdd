<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{backText: ''}">
            参与成员
            <span @click="search" slot="right" style="font-size: 20px;" class="iconfont icon-add1"></span>
        </x-header>
        
        <div class="main">
            <div class="item">
                <span class="admin"><img src="../assets/avatar.jpg" alt=""><i class="iconfont icon-geren"></i></span>
                <span>张三</span>
                <span class="handle">读写权限</span>
            </div>
            <div class="item">
                <span><img src="../assets/avatar.jpg" alt=""></span>
                <span>张三</span>
                <span class="handle" @click="showPopupPicker = true">只读 <i class="iconfont icon-iconset0421"></i></span>
            </div>
            <div class="item">
                <span><img src="../assets/avatar.jpg" alt=""></span>
                <span>张三</span>
                <span class="handle" @click="showPopupPicker = true">读写权限 <i class="iconfont icon-iconset0421"></i></span>
            </div>
        </div>
        <search
            v-show="is_search"
            @result-click="resultClick"
            @on-change="getResult"
            :results="results"
            v-model="searchValue"
            placeholder="搜索线索名称或拥有者姓名"
            @on-focus="onFocus"
            @on-cancel="onCancel"
            ref="search" style="position:absolute;top:0;">
        </search>
        <popup-picker :show.sync="showPopupPicker" @on-change="pickerChange" :show-cell="false" :data="pickerList" v-model="pickerValue"></popup-picker>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, PopupPicker, Search } from 'vux'

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            PopupPicker,
            Search,
        },
        data () {
            return {
                tabIndex: 0,
                showSubbat: false,
                showPopupPicker: false,
                pickerList: [['只读', '读写权限', '移除成员']],
                pickerValue: ["只读"],
                is_search: false,
                results: [],
                searchValue: '',
            }
        },
        activated(){
            // this.type = this.$router.currentRoute.query.type || this.type
        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
            pickerChange(val){
                console.log(val)
            },

            //  search
            search(){
                this.is_search = true
                var that = this
                setTimeout(function(){
                    that.$refs.search.setFocus()
                },0)
            },
            resultClick (item) {
                let that = this
                let value = JSON.stringify(item)
                setTimeout(function(){
                    that.$vux.confirm.show({
                        title: '',
                        content: '确定添加到成员列表吗？',
                        onShow () {
                            console.log('plugin show')
                        },
                        onHide () {
                            console.log('plugin hide')
                        },
                        onCancel () {
                            console.log('plugin cancel')
                        },
                        onConfirm () {
                            that.is_search = false
                            console.log(value)
                        }
                    });
                    that.$refs.search.setFocus()
                },0)
                // this.is_search = false
                console.log(JSON.stringify(item))
            },
            getResult (val) {
                console.log('on-change', val)
                this.results = val ? getResult(val) : []
            },
            onFocus () {
                console.log('on focus')
            },
            onCancel () {
                this.is_search = false
                console.log('on cancel')
            }
        },
    }
    function getResult (val) {
        let rs = []
        for (let i = 0; i < 20; i++) {
            rs.push({
                title: `${val} result: ${i + 1} `,
                id: i   
            })
        }
        return rs
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .main{
        padding-top: 46px;
        background: #f2f2f2;
        .item{
            height: 46px;
            border-bottom: 1px solid #ddd;
            background: #fff;
            padding: 5px 15px 0;
            box-sizing: border-box;
            img{
                width: 36px;
                height: 36px;
                border-radius: 50%;
                vertical-align: middle;
                margin-right: 5px;
            }
            .admin{
                position: relative;
                i{
                    position: absolute;
                    top: 15px;
                    right: 5px;
                    display: block;
                    color: #f00;
                    font-size: 14px;
                    background: #fff;
                    height: 12px;
                    width: 12px;
                    border-radius: 50%;
                    &:before{
                        position: relative;
                        top: -5px;
                        left: -1px;
                    }
                }
            }
            .handle{
                float: right;
                line-height: 36px;
                color: #ccc;
            }
        }
    }
</style>




