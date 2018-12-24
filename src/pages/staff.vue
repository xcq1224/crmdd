<template>
    <div class="has-tabbar page">
        <div class="main">
            <group gutter='0'>
                <cell class="cell" v-for="(item, index) in data" :key="index" is-link :link="'./staff_detail?id='+item.id+'&title='+item.usercname">
                    <p slot="title"><span class="name">{{item.usercname}}</span> {{item.username}}</p>
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
                query: {},
                data: [],
            }
        },
        activated(){
            this.query = this.$router.currentRoute.query
            document.title = this.query.title
            this.$post("/api/DeptController/getStaffDepts", {no: this.query.no}, (data) => {
                this.data = data.list
            })
        },
        methods: {

        }
    }

</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .main{
        .cell{
            font-size: 14px;
            .name{
                display: inline-block;
                width: 70px;
            }
        }
    }
</style>



