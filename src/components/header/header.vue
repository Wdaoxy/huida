<template>
    <div class="header">
        <div class="content-wrapper">
        <div class="avatar">
            <img :src="seller.avatar" alt />
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
        <div class="support-count" v-if="seller.supports" @click="showDetail = true">
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
        <img width="100%" height="100%" :src="seller.avatar" alt />
        </div>
        <transition name='fade'>
        <div class="detail" v-if="showDetail">
            <div class="detail-wrapper clearfix">
            <div class="detail-main">
                <div class="detail-title">{{ seller.name }}</div>
                <div class="detail-star">
                <star v-if="seller.score" :size="48" :score="seller.score" />
                </div>
                <header-title title="优惠信息" />
                <ul class="detail-supports">
                <li class="supports-item" v-for="(item, index) in seller.supports" :key="index">
                    <span class="icon" :class="classMap[item.type]"></span>
                    <span class="text">{{ item.description }}</span>
                </li>
                </ul>
                <header-title title="商家公告" />
                <div class="detail-bulletin">
                <p class="bulletin">{{ seller.bulletin }}</p>
                </div>
            </div>
            </div>
            <div class="detail-close" @click="showDetail=false">
            <i class="icon-close"></i>
            </div>
        </div>
        </transition>
    </div>
</template>
<script>
import star from "@/components/star/star.vue";
import HeaderTitle from "@/components/headerTitle/headerTitle.vue";
export default {
    props: {
        seller: {
        type: Object,
        require: true
        }
    },
    data() {
        return {
        showDetail: false
        };
    },
    created() {
        this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"];
    },
    components: {
        star,
        HeaderTitle
    }
};
</script>
<style lang="scss" scoped>
@import "../../common/sass/mixin.scss";

.header {
    color: rgb(255, 255, 255);
    background: rgba(7, 17, 27, 0.5);
    font-size: 0;
    position: relative;
    overflow: hidden;
    .content-wrapper {
        position: relative;
        padding: 0.24rem 0.12rem 0.18rem 0.24rem;
        .avatar {
        display: inline-block;
        width: 0.64rem;
        height: 0.64rem;
        border-radius: 2px;
        img {
            vertical-align: top; //文字相对于基线的位置
            width: 100%;
            height: 100%;
        }
        }
        .content {
        display: inline-block;
        font-size: 0; //修改的是字符26.6667vw 手动修改
        vertical-align: top;
        margin: 0.02rem 0 0.02rem 0.16rem;
        .title {
            margin-bottom: 0.08rem;
            .brand {
            display: inline-block;
            width: 0.3rem;
            height: 0.18rem;
            @include bg-image("./img/brand");
            background-size: 100%;
            margin-right: 0.06rem;
            vertical-align: top;
            }
            .name {
            font-size: 0.16rem;
            font-weight: bold;
            line-height: 0.18rem;
            vertical-align: top;
            }
        }
        .description {
            line-height: 0.12rem;
            font-size: 0.12rem;
            font-weight: 200;
            margin-bottom: 0.1rem;
        }
        .support {
            .icon {
            display: inline-block;
            width: 0.12rem;
            height: 0.12rem;
            margin-right: 0.04rem;
            vertical-align: top;
            &.decrease {
                @include bg-image("./img/decrease_1");
            }
            &.discount {
                @include bg-image("./img/discount_1");
            }
            &.guarantee {
                @include bg-image("./img/guarantee_1");
            }
            &.invoice {
                @include bg-image("./img/invoice_1");
            }
            &.special {
                @include bg-image("./img/special_1");
            }
            }
            .text {
            font-size: 0.1rem;
            font-weight: 200;
            line-height: 0.12rem;
            }
        }
        }
        .support-count {
        position: absolute;
        bottom: 0.14rem;
        right: 0.12rem;
        height: 0.24rem;
        font-size: 0;
        display: flex;
        align-items: center;
        padding: 0 0.08rem;
        border-radius: 0.14rem;
        background-color: rgba(0, 0, 0, 0.2);
        .count {
            line-height: 0.12rem;
            font-size: 0.1rem;
            font-weight: 200;
        }
        .icon-keyboard_arrow_right {
            font-size: 0.1rem;
            font-weight: 200;
        }
        }
    }
    .bulletin-wrappere {
        height: 0.28rem;
        padding: 0 0.24rem;
        background-color: rgba(7, 17, 27, 0.2);
        display: flex;
        align-items: center;
        .bulletin-title {
        width: 0.22rem;
        height: 0.12rem;
        @include bg-image("./img/bulletin");
        }
        .bulletin-text {
        width: 90%;
        margin: 0 0.04rem;
        font-size: 0.1rem;
        font-weight: 200;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        }
        .icon-keyboard_arrow_right {
        font-size: 0.1rem;
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
    .detail {
        &.fade-enter, &.dade-leave-to {
            opacity: 0;
        }
        &.fade-enter-active, &.fade-leave-active {
            transition: .5s;
        }
        &.fade-leave, &.fade-enter-to {
            opacity: 1;
        }
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        z-index: 100;
        background-color: rgba(7, 17, 27, 0.8);
        .detail-wrapper {
        min-height: 100%;
        .detail-main {
            height: 100%;
            margin: 0.64rem 0;
            font-size: 20px;
            .detail-title {
            line-height: 0.16rem;
            font-size: 0.16rem;
            font-weight: 700;
            text-align: center;
            }
            .detail-star {
            margin: 0.16rem 0 0.28rem 0;
            text-align: center;
            }
            .detail-supports {
            width: 80%;
            margin: 0 auto 0.28rem;
            .supports-item {
                padding: 0 0.12rem;
                margin-bottom: 0.12rem;
                .icon {
                display: inline-block;
                vertical-align: top;
                width: 0.16rem;
                height: 0.16rem;
                margin-right: 0.06rem;
                &.decrease {
                    @include bg-image("./img/decrease_2");
                }
                &.discount {
                    @include bg-image("./img/discount_2");
                }
                &.guarantee {
                    @include bg-image("./img/guarantee_2");
                }
                &.invoice {
                    @include bg-image("./img/invoice_2");
                }
                &.special {
                    @include bg-image("./img/special_1");
                }
                }
                .text {
                font-size: 0.12rem;
                line-height: 0.16rem;
                font-weight: 200;
                vertical-align: top;
                }
            }
            }
            .detail-bulletin {
            width: 80%;
            margin: 0 auto;

            .bulletin {
                padding: 0 0.12rem;
                line-height: 0.24rem;
                font-size: 0.12rem;
                font-weight: 200;
                text-align: justify; //字体两端对其
            }
            }
        }
        }
        .detail-close {
        position: relative;
        margin: -0.64rem auto 0;
        font-size: 0.32rem;
        text-align: center;
        height: 0.32rem;
        color: rgba(255, 255, 255, 0.5);
        }
    }
}
</style>
