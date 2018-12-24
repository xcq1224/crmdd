<template>
    <div class="has-tabbar page"> 
        <div class="main">
            <search
                @result-click="resultClick5"
                @on-change="getResult5"
                :results="results5"
                v-model="searchValue5"
                position="absolute"
                auto-scroll-to-top
                top="0"
                @on-cancel="isSearch = false"
                @on-focus="isSearch = true"
                ref="search">
            </search>
            <group gutter='10px' v-show="!isSearch">
                <my-tree :data="theData" @getSubMenu="getSubMenu" :fun="getSubMenu"></my-tree>
            </group>
        </div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge, Search } from 'vux'
    import myTree from '../components/treeMune'

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
            myTree,
            Search,
        },
        data () {
            return {
                theData: [],

                results5: [],                        //  搜索结果
                searchValue5: '',                    //  搜索文本
                isSearch: false,
            }
        },
        created(){
            this.$post("/api/DeptController/getRootDepts", {}, (data) => {
                this.theData = data.list
            })
        },
        activated(){
            this.isSearch = false
        },
        deactivated(){
            this.$refs.search.setBlur()
            this.searchValue5 = ''
            this.results5 = []
        },
        methods: {
            getSubMenu (item, callback) {
                this.$post("/api/DeptController/getChildDepts", {no: item.no}, (data) => {
                    item.children = data.list;
                    if(!data.list.length){
                        this.$router.push('./staff?no=' + item.no + '&title=' + item.name)
                    }
                    callback(data.list)
                })
            },

            resultClick5 (item) {
                if(item.id){
                    this.$router.push('./staff_detail?id='+item.id+'&title='+item.userCname)
                }
            },
            getResult5 (val) {
                this.$post("/api/DeptController/queryStaff", {name: val}, (data) => {
                    console.log(data)
                    this.results5 = []
                    data.list.map((item) => {
                        this.results5.push({
                            id: item.id,
                            name: item.userCname,
                            title: item.userCname + '       ' + item.deptName
                        })
                    })
                    if(!this.results5.length){
                        this.results5 = [{
                            id: '',
                            name: '',
                            title: '暂无数据'
                        }]
                    }
                })
            },
            
        }
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .main{
        padding-bottom: 80px;
    }
</style>



