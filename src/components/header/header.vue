<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">{{ seller.description }}/{{ seller.deliveryTime }}分钟送达</div>
                <div class="support" v-if="seller.supports">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{ seller.supports[0].description }}</span>
                </div>
            </div>
            <div class="support-count" v-if="seller.supports">
                <span class="count">{{ seller.supports.length }}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrappere">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{ seller.bulletin }}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img width="100%" height="100%" :src="seller.avatar" alt="">
        </div>
    </div>
</template>
<script>
export default {
    props:{
        seller:{
            type: Object,
            require: true
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
}
</script>
<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
.header {
    color: rgb(255,255,255);
    background: rgba(7,17,27,0.5);
    font-size: 0;
    position: relative;
    overflow: hidden;
    .content-wrapper{
        position: relative;
        padding: .24rem .12rem .18rem .24rem;
        .avatar {
            display: inline-block;
            width: .64rem;
            height: .64rem;
            border-radius: 2px;
            img{
                vertical-align: top;//文字相对于基线的位置
                width: 100%;
                height: 100%;
            }
        }
        .content {
            display: inline-block;
            font-size: 0;//修改的是字符26.6667vw 手动修改
            vertical-align: top;
            margin: .02rem 0 .02rem .16rem;
            .title {
                margin-bottom: .08rem;
                .brand {
                    display: inline-block;
                    width: .3rem;
                    height: .18rem;
                    @include bg-image('./img/brand');
                    background-size: 100%;
                    margin-right: .06rem;
                    vertical-align: top;
                }
                .name{
                    font-size: .16rem;
                    font-weight: bold;
                    line-height: .18rem;
                    vertical-align: top;
                }
            }
            .description{
                line-height: .12rem;
                font-size: .12rem;
                font-weight:200;
                margin-bottom: .1rem;
            }
            .support {
                .icon{
                    display: inline-block;
                    width: .12rem;
                    height: .12rem;
                    margin-right: .04rem;
                    vertical-align: top;
                    &.decrease{
                        @include bg-image('./img/decrease_1')
                    }
                    &.discount{
                        @include bg-image('./img/discount_1')
                    }
                    &.guarantee{
                        @include bg-image('./img/guarantee_1')
                    }
                    &.invoice{
                        @include bg-image('./img/invoice_1')
                    }
                    &.special{
                        @include bg-image('./img/special_1')
                    }
                }
                .text {
                    font-size: .1rem;
                    font-weight: 200;
                    line-height: .12rem;
                }
            }
        }
        .support-count {
            position: absolute;
            bottom: .14rem;
            right: .12rem;
            height: .24rem;
            font-size: 0;
            display: flex;
            align-items: center;
            padding: 0 .08rem;
            border-radius: .14rem;
            background-color: rgba(0,0,0,.2);
            .count {
                line-height: .12rem;
                font-size: .1rem;
                font-weight: 200;
            }
            .icon-keyboard_arrow_right{
                font-size: .1rem;
                font-weight: 200;
            }
        }
    }
    .bulletin-wrappere {
        height: .28rem;
        padding:  0 .24rem;
        background-color: rgba(7,17,27,.2);
        display: flex;
        align-items: center;
        .bulletin-title{
            width: .22rem;
            height: .12rem;
            @include bg-image('./img/bulletin')
        }
        .bulletin-text{
            width: 90%;
            margin:  0 .04rem;
            font-size: .1rem;
            font-weight: 200;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .icon-keyboard_arrow_right {
            font-size: .1rem;
        }
    }
    .background {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 1.34rem;
        font-size: 0;
        filter: blur(10px);
    }
}
</style>
