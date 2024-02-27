import { createApp } from 'vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { createRouter, createWebHistory } from 'vue-router';
import './assets/styles/main.scss';
import App from './App.vue';

const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('./pages/Home.vue'),
        },
        {
            path: '/favorites',
            name: 'Favorites',
            component: () => import('./pages/Favorites.vue')
        }
    ]
})

app.use(autoAnimatePlugin)
app.use(router)
app.mount('#app')