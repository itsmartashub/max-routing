<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3">
        <h1>Routing</h1>
        <hr>
        <!-- <appHeader></appHeader> -->
        <router-view name="header-top"></router-view>
        <transition name="slide" mode="out-in">
          <!-- ovo mode=out-in je da se prvo prethodna komponenta ukloni, pa pojavi/ucita/doda druga -->
          <router-view></router-view>
        </transition>
        <router-view name="header-bottom"></router-view>
        <!-- ovaj routerr view sa name-ovima mozemo staviti u router.js u componentS property, ne component vec components, I recimo kad se ucita neka komponenta zelimo da vidimo samo header-top, a kad se ucita neka druga zelimo header-bottom, tj na jednoj komponenti recimo Home header je na vrhu, a na drugoj, recimo User header je na dnu, ono, menjanje layout-a. Idemo u routes.js da dodamo components -->
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  components: {
    appHeader: Header
  }
}
</script>


<style>
  .slide-leave-active {
    transition: opacity 1s ease;
    opacity: 0;
    animation: slide-out 1s ease-out forwards;
  }

  .slide-leave {
    opacity: 1;
    transform: translateX(0);
  }

  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
  }

  @keyframes slide-out {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-30px);
    }
  }
</style>
