<template>
    <div class="detail-name">
        <div class="line"></div>
        <div class="text">{{ title }}</div>
        <div class="line"></div>
    </div>
</template>
<script>
export default {
    props:{
        title:{
            required: true,
            type: String
        }
    }
}
</script>
<style lang="scss" scoped>
.detail-name {
    display: flex;
    width: 80%;
    margin: 0 auto .24rem;
    .line {
        flex: 1;
        position: relative;
        top: -.06rem;
        border-bottom: 1px solid rgba(255,255,255,.2)
    }
    .text{
        margin: 0 .12rem;
        line-height: .14rem;
        font-size: .14rem;
        font-weight: 700;
    }
}
</style>