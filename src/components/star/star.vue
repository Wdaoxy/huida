<template>
    <div class="star" :class="starType">
        <span 
        :key="index" 
        v-for="(classItem,index) in starClasses" 
        class="star-item" 
        :class="classItem"></span>
    </div>
</template>
<script>
const LENGTH = 5;//星星个数
const CLS_ON = 'on';//全兴class
const CLS_HALF = 'ohalf';//半兴class
const CLS_OFF = 'off';//没兴class

export default {
    
    props: {
        size:{//大小
            type: Number,
            required: true
        },
        score: {//分数
            type: Number,
            required: true
        }
    },
    computed: {
        starType() { //用来计算不同星星尺寸class名
            return 'star-' + this.size
        },
        starClasses(){//用来计算显示什么星星，全星/半星的class名
            let result = [];
            let score = Math.floor(this.score * 2)/ 2;//星星的分是
            //区别是整数还是小数
            let floorNum = score % 1 !==0;//小数
            let intiger = parseInt(score);
            for (var i=0; i<intiger; i++){
                result.push(CLS_ON);//有几个整数放几个星
            }
            if(floorNum){
                result.push(CLS_HALF);//有小数就放半颗心
            }
            while(LENGTH > result.length){
                result.push(CLS_OFF);
            }
            return result;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
.star{
    font-size: 0;
    .star-item {
        display: inline-block;
        &:last-child {
            margin-right: 0 !important;
        }
    }
    &.star-48 > .star-item{
        width: .2rem;
        height: .19rem;
        margin-right: .2rem;
        
        &.on{
            @include bg-image('./img/star48_on')
        }
        &.half{
            @include bg-image('./img/star48_half')
        }
        &.off{
            @include bg-image('./img/star48_off')
        }
        
    }
    &.star-36 > .star-item{
        width: .15rem;
        height: .15rem;
        margin-right: .06rem;
        &:last-child {
            margin-right: 0 !important;
        }
        &.on{
            @include bg-image('./img/star36_on')
        }
        &.half{
            @include bg-image('./img/star36_half')
        }
        &.off{
            @include bg-image('./img/star36_off')
        }
        
    }
    &.star-24 > .star-item{
        width: .1rem;
        height: .1rem;
        margin-right: .03rem;
        &:last-child {
            margin-right: 0 !important;
        }
        &.on{
            @include bg-image('./img/star24_on')
        }
        &.half{
            @include bg-image('./img/star24_half')
        }
        &.off{
            @include bg-image('./img/star24_off')
        }
        
    }
}
</style>