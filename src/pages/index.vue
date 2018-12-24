<template>
    <div class="wrap">
        <div class="content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <tabbar v-if="flag">
            <!-- <tabbar-item :class="index == 0 ? 'active': ''" @on-item-click="index=0" link="/index">
                <i slot="icon" class="iconfont icon-shouye"></i>
                <span slot="label">首页</span>
            </tabbar-item> -->
            <tabbar-item :class="index == 0 ? 'active': ''" @on-item-click="changeTab('./index', 0)">
                <i slot="icon" class="iconfont icon-fankui"></i>
                <span slot="label">消息</span>
            </tabbar-item>
            <tabbar-item :class="index == 1 ? 'active': ''" @on-item-click="changeTab('./crm', 1)">
                <i slot="icon" class="iconfont icon-fenlei"></i>
                <span slot="label">工作台</span>
            </tabbar-item>
            <!-- <tabbar-item class="tabbar-item-add" @on-item-click="popup1 = true">  
                <span slot="label" class="more"><i slot="icon" class="iconfont icon-add"></i></span>
            </tabbar-item>   -->
            <tabbar-item :class="index == 2 ? 'active': ''" @on-item-click="changeTab('./book', 2)">
                <i slot="icon" class="iconfont icon-tongxunlu1"></i>
                <span slot="label">通讯录</span>
            </tabbar-item>
            <!-- <tabbar-item :class="index == 3 ? 'active': ''" @on-item-click="changeTab('./mine', 3)">
                <i slot="icon" class="iconfont icon-kehu"></i>
                <span slot="label">我的</span>
            </tabbar-item>  -->
        </tabbar>
        <div class="show-more-btn iconfont icon-add1" @click="popup1 = true"></div>
        <popup v-model="popup1">
            <div class="more-handle">
                <div class="more-handle-body">
                    <router-link to="./write_follow">
                        <span style="background: #f66;"><i class="iconfont icon-bianji"></i></span>
                        <p>写跟进</p>
                    </router-link>
                    <router-link to="./client_add?handleType=0">
                        <span style="background: #fbce77;"><i class="iconfont icon-kehuguanli"></i></span>
                        <p>新增客户</p>
                    </router-link>
                    <router-link to="./visit_sign">
                        <span style="background: #86df79;"><i class="iconfont icon-dingwei"></i></span>
                        <p>拜访签到</p>
                    </router-link>
                    <router-link to="./clue_add?handleType=0">
                        <span style="background: #b5e1fe;"><i class="iconfont icon-xiansuogenjin"></i></span>
                        <p>新增线索</p>
                    </router-link>
                    <router-link to="./opportunity_add?handleType=0">
                        <span style="background: #AB47BC;"><i class="iconfont icon-wodeshangjizhuanhuan"></i></span>
                        <p>新增机会</p>
                    </router-link>
                    <router-link to="./contract_add?handleType=0">
                        <span style="background: #1976D2;"><i class="iconfont icon-hetong2"></i></span>
                        <p>新增合同</p>
                    </router-link>
                    <!-- <router-link to="./letter_add">
                        <span style="background: #7c8dc1;"><i class="iconfont icon-yijianfankui"></i></span>
                        <p>发站内信</p>
                    </router-link> -->
                </div>
                <div class="more-handle-footer">
                    <span @click="popup1 = false"><i class="iconfont icon-close"></i></span>
                </div>
            </div>
        </popup>
     </div>
</template>

<script>
import { Tabbar, TabbarItem, Popup} from 'vux'

export default {
    components: {
        Tabbar,
        TabbarItem,
        Popup,
    },
    data() {
        return {
            flag: true,
            index: 0,
            showMore: false,
            popup1: false,
            routerList: ["/index", "/crm", "/book", "/mine"]
        }
    },
    activated(){
        this.index = this.routerList.indexOf(this.$router.currentRoute.path)
    },
    destroyed(){
        this.index = -1
    },
    methods: {
        changeTab(url, index){
            this.index = index
            this.replaceRouter(url)
        },
    }
}
function animate(dom, o,time,fn) {  
    if(time==undefined){  //默认的切换频率  
        time=10;  
    }  
    //dom.termId :为每一个运动的物体添加一个属于自己的线程标识  
    clearInterval(dom.termId);  

    dom.termId = setInterval(function() { //创建一个定时器，实现运动  
        dom.isOver = true; //是否可以停止定時器  
        for (var property in o) {  
            if (property == "opacity") {//如果是透明度  
                var currentValue = parseInt(getStylePropertyValue(dom, property) * 100); //当前样式属性的值       
            } else{//其他样式属性  
                var currentValue = parseInt(getStylePropertyValue(dom, property)); ////当前样式属性的值  
            }  
                
            //速度   正速度  负速度  
            var speed = (o[property] - currentValue) / 10;  
            // 三元表达式  三目运算符  
            speed = currentValue > o[property] ? Math.floor(speed) : Math.ceil(speed)  

            currentValue += speed; //改变样式属性的值  

            if (currentValue != o[property]) {  
                dom.isOver = false; //標識不停止定時器  
            }  

            if (property == "opacity") {  
                dom.style.opacity = currentValue / 100;  
                dom.style.filter = 'alpha(opacity= ' + currentValue + ')';  
            } else {  
                dom.style[property] = currentValue + "px"; //改变物体的样式属性值       
            }  

        }  

        if (dom.isOver) {  //停止定时器  
            clearInterval(dom.termId);  
            if(fn){  //执行回调函数  
                fn();  
            }  
        }  

    }, time)  //基于切换的频率来改变运动的快慢  

}  

/*获取指定样式的属性值*/  
function getStylePropertyValue(dom, property) {  
    if (window.getComputedStyle) { 
        //  
        return getComputedStyle(dom, null)[property];  
    } else {  
        return dom.currentStyle[property]; 
    }  
}  
</script>
<style lang="less" scoped>
    @baseColor: #16A4FA;
    .content{
        background: #f2f2f2;
    }
    .weui-tabbar{
        background: #fff;
        position: fixed;
        .tabbar-item-add{
            position: relative;
            &:after{
                content: '';
                position: absolute;
                top: 1px;
                bottom: -2px;
                background: #fff;
                width: 100%;
                left: 0;
            }
        }
        .iconfont{
            position: relative;
            top: -4px;
        }
        .active{
            i, span{
                color: @baseColor;
            }
        }
        .more{
            background: #fff;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            display: inline-block;
            position: relative;
            top: -6px;
            border: 1px solid #ddd;
            i{
                font-size: 36px;
                line-height: 56px;
                color: @baseColor;
                top: 0;
                z-index: 4;
            }
        }
    } 
    .show-more-btn{
        position: absolute;
        bottom: 80px;
        right: 20px;
        background: @baseColor;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        font-size: 24px;
        color: #fff;
        font-weight: bold;
    }  
    .more-handle{
        width: 100%;
        padding-top: 30px;
        background: #fff;
        overflow: hidden;
        box-shadow: 0 8px 20px #333;
        .more-handle-body{
            text-align: center;
            overflow: hidden;
            >a{
                width: 33.3%;
                float: left;
                margin-bottom: 30px;
                display: block;
                span{
                    display: inline-block;
                    border-radius: 50%;
                    width: 45px;
                    height: 45px;
                    color: #fff;
                    margin-bottom: 10px;
                    i{
                        font-size: 28px;
                    }
                }
            }
        }
        .more-handle-footer{
            position: relative;
            border-top: 1px solid #ddd;
            text-align: center;
            height: 40px;
            &:before{
                position: absolute;
                top: 0;
                display: block;
                content: '';
                background: #fff;
                height: 30px;
                width: 100%;
                z-index: 2;
            }
            span{
                position: relative;
                top: -27px;
                display: inline-block;
                border-radius: 50%;
                border: 1px solid #ddd;
                width: 54px;
                height: 54px;
                background: #fff;
                i{
                    font-size: 24px;
                    border: 1px solid #ccc;
                    border-radius: 50%;
                    padding: 5px 5.5px;
                    position: relative;
                    top: 10px;
                    z-index: 3;
                    color: #ddd;
                }
            }
        }
    }
</style>
