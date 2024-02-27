<script setup>
import { ref, watch, provide, computed } from 'vue';

import HeaderApp from './components/HeaderApp.vue';
import Drawer from './components/Drawer.vue';

// Cart | start

const cart = ref([]);

const drawerOpen = ref(false);

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0));

const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100));



const closeDrawer = () => {
  drawerOpen.value = false;
}

const openDrawer = () => {
  drawerOpen.value = true;
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(cart, () => {
  localStorage.setItem('cart', JSON.stringify(cart.value))
}, { deep: true })

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart,
});

// Cart | end

</script>

<template>
  <div v-auto-animate>
    <Drawer v-if="drawerOpen" :total-price="totalPrice" :vat-price="vatPrice" />
  </div>

  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14 mb-14">
    <HeaderApp :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10">
      <router-view />
    </div>
  </div>
</template>

<style scoped></style>