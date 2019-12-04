<template>
  <div id="app">
    <v-header :seller="seller" />
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/ratings'>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/seller'>商家</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import VHeader from '@/components/header/header';
import getData from '@/api/header.js'

export default {
  data(){
    return {
      seller:{}
    }
  },
  async created(){
    this.seller = await getData('/api/seller');
    console.log(this.seller)
  },
  components:{
    VHeader
  }
}
</script>
<style lang="scss">
@import "./common/sass/mixin.scss";
.tab{
  display: flex;
  .tab-item {
    flex: 1;
    height: .4rem;
    line-height: .4rem;
    @include border-1px(rgba(7,17,27,0.1));
    font-size: .14rem;
    text-align: center;
    color: rgb(77,85,93);
    & > a {
      display: block;
      &.active{
        color: rgb(240,20,20);
      }
      
    }
  }
}
</style>
