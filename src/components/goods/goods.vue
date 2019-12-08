<template>
    <div class="goods" >
        <div class="nav-menu" ref="menuWrapper">
            <ul>
                <li class="menu-item"
                :class="{ active: currentIndex === index }"
                :key="index"
                v-for="(item,index) in goods"
                @click="fn()"
                >
                    <span class="text border-1px">
                        <span class="icon" v-if="item.type>0" :class="classMap[item.type]"></span>
                        {{ item.name }}
                    </span>
                    
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li class="food-list" v-for="(item,index) in goods" :key="index" ref="foodList">
                    <h1 class="title">{{ item.name }}</h1>
                    <ul>
                        <li class="food-item border-1px" v-for="(food,index) in item.foods" :key="index">
                            <div class="icon">
                                <img alt="" width="57" height="57" :src="food.icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{ food.name }}</h2>
                                <div class="desc">{{ food.description }}</div>
                                <div class="extra">
                                    <span class="count">{{ food.sellCount }}份</span>
                                    <span>{{ food.rating }}%</span>
                                </div>
                                <div class="price">
                                    <span class="new-price">￥{{ food.price }}</span>
                                    <span v-if="food.oldPrice" class="old-price">￥{{ food.oldPrice }}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import getData from '@/api/header.js';
export default {
    data(){
        return {
            goods:[],
            listHeight: [], //用于存储每一块（list-item）高度
            scrollY: 0,
            menuScrollY:0
        }
    },
    computed: {
        currentIndex(){ //计算index
            for(let i=0; i<this.listHeight.length; i++){
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i+1];
                //在这些高度之间
                if(!height2 || this.scrollY >= height1 && this.scrollY < height2){
                    return i; //这就是要找的index
                }
            }

        }
    },
    async created() {
        this.classMap=["decrease", "discount", "guarantee", "invoice", "special"];
        this.goods = await getData('/api/goods');
        // console.log(this.goods)
        //当DOM更新完成执行
        await this.$nextTick();
        // this.$nextTick(() => {
        //     this.initScroll();
        // })
        this.initScroll();
        this.computedHeight();
    },
    methods: {
        fn(){
            alert(1)
        },
        initScroll(){
            //左侧导航scroll
            this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                click:true, //点击事件生效
            });
            //右侧导航scroll
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
                probeType:3 //实时监听scroll事件，包括触底反弹动画
            });
            //监听滚动高度
            this.foodsScroll.on('scroll', pos => {
                this.scrollY = Math.abs(pos.y);
                if(this.scrollY >= this.listHeight[this.listHeight.length - 2]) {
                    this.menuScroll.scrollTo(0,-54)
                }
                if(this.scrollY <= 1027) {
                    this.menuScroll.scrollTo(0,0)
                }
            })
        },
        computedHeight(){
            //计算高度
            let foodList = this.$refs.foodList;
            let height = 0 ;
            this.listHeight.push(height);
            foodList.forEach(item => {
                height += item.clientHeight;
                this.listHeight.push(height);
            })
            console.log(this.listHeight)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/common/sass/mixin';
.goods{
    display: flex;
    position: absolute;
    top: 1.74rem;
    bottom: .48rem;
    width: 100%;
    overflow: hidden;
    .nav-menu{
        flex: 0 0 .8rem;//0->怎么平分 0->缩放  .8rem占位空间
        width: .8rem;
        
        .menu-item{
            width: 100%;
            display: table;//转成表格换行
            height: .54rem;
            padding: 0 .12rem;
            background: #f3f5f7;
            &.active {
                background: #fff;
                .text {
                    font-weight: 700;
                }
            }
            .text{
                display: table-cell;
                font-size: .12rem;
                font-weight: 200;
                margin-top: .02rem;
                color: rgb(7,17,27);
                vertical-align: middle;
                @include border-1px(rgba(7,17,27,.1));
                
            }
            &:last-child{
                .text {
                    @include border-none;
                }
            }
            .icon{
                display: inline-block;
                // vertical-align: middle;
                margin-right: .02rem;
                width: .12rem;
                height: .12rem;
                &.decrease {
                @include bg-image("./img/decrease_3");
                }
                &.discount {
                    @include bg-image("./img/discount_3");
                }
                &.guarantee {
                    @include bg-image("./img/guarantee_3");
                }
                &.invoice {
                    @include bg-image("./img/invoice_3");
                }
                &.special {
                    @include bg-image("./img/special_3");
                }
            }
        }
    }
    .foods-wrapper{
        flex: 1;
        .title {
            padding-left: .14rem;
            height: .26rem;
            background-color: #f3f5f7;
            font-size: .12rem;
            line-height: .26rem;
            font-weight: 700;
            color: rgb(147,153,159);
            border-left: 2px solid #d9dde1;
        }
        .food-item{
            display: flex;
            margin: .18rem;
            padding-bottom: .1rem;
            @include border-1px(rgba(7,17,27,.1));
            &:last-child {
                @include border-none;
            }
            .icon {
                flex: 0 0 .57rem;
                width: .57rem;
                height: .57rem;
                margin-right: .1rem;
                img {
                    vertical-align: top;
                }
            }
            .content{
                flex: 1;
                margin-top: .02rem;
                .name{
                    font-size: .14rem;
                    color: rgb(7,17,27);
                    line-height: .14rem;
                }
                .desc, .extra {
                    font-size: .1rem;
                    color: rgb(147,153,159);
                    line-height: .1rem;
                }
                .desc{
                    margin: .08rem 0;
                }
                .extra{
                    .count {
                        margin-right: .14rem;
                    }
                }
                .price{
                    line-height: .24rem;
                    font-weight: 700;
                    font-size: 0;
                    margin-top: .04rem;
                    .new-price{
                        font-size: .14rem;
                        color: rgb(240,20,20);
                    }
                    .old-price{
                        margin-left: .08rem;
                        font-size: .1rem;
                        color: rgb(147,153,159);
                        text-decoration: line-through;
                    }
                }
            }
        }
    }
}
</style>
