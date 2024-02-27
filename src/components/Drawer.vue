<script setup>
import axios from 'axios';
import { ref, computed, inject } from 'vue';

import DrawerHead from './DrawerHead.vue'
import CardItemList from './CardItemList.vue';
import InfoBlock from './InfoBlock.vue';

const props = defineProps({
    totalPrice: Number,
    vatPrice: Number
})

const { cart } = inject('cart');

const isCreatingOrder = ref(false);
const orderId = ref(null);

const createOrder = async () => {
    try {
        isCreatingOrder.value = true;

        const { data } = await axios.post('https://7b6f0b1e26b59458.mokky.dev/orders', {
            items: cart.value,
            totalPrice: props.totalPrice.valueOf(),
        })

        cart.value = [];

        orderId.value = data.id;
    } catch (error) {
        console.log(error)
    } finally {
        isCreatingOrder.value = false
    }
}

const cartIsEmpty = computed(() => cart.value.length === 0);
const ButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value);
</script>

<template>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
    <div class="fixed top-0 right-0 h-full w-96 bg-white z-20 p-10">
        <DrawerHead />

        <div v-if="!totalPrice || orderId" class="flex h-full items-center">
            <InfoBlock v-if="!totalPrice && !orderId" title="Корзина пустая"
                description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ." image-url="/package-icon.png" />

            <InfoBlock v-if="orderId" title="Заказ оформлен!"
                :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
                image-url="/order-success-icon.png" />
        </div>

        <div v-else>
            <CardItemList />

            <div class="flex flex-col gap-4 my-7">
                <div class="flex gap-2">
                    <span>Итого:</span>
                    <div class="flex-1 border-b borde-dashed"></div>
                    <b>{{ totalPrice }} руб.</b>
                </div>

                <div class="flex gap-2">
                    <span>Налог 5%:</span>
                    <div class="flex-1 border-b borde-dashed"></div>
                    <b>{{ vatPrice }} руб.</b>
                </div>

                <button :disabled="ButtonDisabled" @click="createOrder"
                    class="bg-lime-500 hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300 transition w-full rounded-xl py-3 mt-4 text-white cursor-pointer">
                    Оформить заказ
                </button>
            </div>
        </div>
    </div>
</template>