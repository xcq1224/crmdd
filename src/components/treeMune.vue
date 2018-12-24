<template>
  <ul class="tree-menu">
    <li v-for="(item, index) in data" :key="index">
        <p @click="toggle(item, index)">
            <i :class="item.parentNo ? 'iconfont icon-zuzhijiagoujiekou' : 'iconfont icon-gongsimingcheng'"></i>{{ item.name }}
            <x-icon v-show="!scope[index]" class="xicon" type="ios-arrow-right" style="fill: #ccc; margin-top: 4px;" size="20"></x-icon>
            <x-icon v-show="scope[index]" class="xicon" type="ios-arrow-down" style="fill: #ccc; margin-top: 4px;" size="20"></x-icon>
        </p>
      <tree-menu v-if="scope[index]" :data="item.children" @getSubMenu="fun" :fun="fun"></tree-menu>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'treeMenu',
  props: {
    data: Array,
    name: String,
    loading: Boolean,
    fun: Function
  },
  data () {
    return {
      scope: {}
    }
  },
  created () {
  },
  methods: {
    doTask (index) {
      this.$set(this.scope, index, !this.scope[index]);
    },
    toggle (item, index) {
        if (item.children && item.children.length) {
            this.doTask(index);
        } else {
            this.$emit('getSubMenu', item, (subMenuList) => {
                if (subMenuList && subMenuList.length) {
                    this.doTask(index);
                }
            });
        }
    }
  }
}
</script>

<style lang="less" scoped>
    @baseColor: #16A4FA;
    .tree-menu {
        list-style: none;
        font-size: 14px;
        li{
            padding-left: 15px;
            ul{
                margin-left: 20px;
            }
            i{
                font-size: 22px;
                vertical-align: middle;
                margin-right: 10px;
                color: @baseColor;
            }
            .xicon{
                color: #ccc;
                float: right;
                margin-right: 10px;
            }
            p{
                padding: 5px 0;
            }
        }
    }
</style>