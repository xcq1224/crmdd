<template>
    <div class="has-tabbar page">
        <div class="main">
            <group gutter='0'>
                <cell class="cell" title="用户名" :value="staff.userName"></cell>
                <cell class="cell" title="姓名" :value="staff.cname"></cell>
                <cell class="cell" title="移动电话">
                    <a slot="value" class="text_base" :href="'tel:' + staff.mobile">{{staff.mobile}}</a>
                </cell>
                <cell class="cell" title="邮箱" :value="staff.email"></cell>
                <cell class="cell" title="部门" :value="staffDept.deptname"></cell>
                <cell class="cell" title="职位" :value="staffDept.positionName"></cell>
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
                staff: {},
                staffDept: {},
                company: '',
            }
        },
        activated(){
            this.query = this.$router.currentRoute.query
            document.title = this.query.title
            this.staff = {}
            this.staffDept = {}
            this.company = ''
            this.$post("/api/DeptController/getStaffInfo", {id: this.query.id}, (data) => {
                this.staff = data.staff
                this.staffDept = data.staffDept
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



