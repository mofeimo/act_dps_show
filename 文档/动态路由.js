import { createRouter, createWebHistory } from 'vue-router';

const pages = import.meta.glob('../views/**/page.js', {
    eager: true,
    import: 'default'
});
const pagecomps = import.meta.glob('../views/**/index.vue', {
    eager: true,
    import: 'default'
});
const routes = Object.entries(pages).map(([path, meta]) => {
    const pagejs = path;
    path = path.replace('../views', '').replace('/page.js', '')||'/';
    let name = path.split('/').filter(Boolean).join('-')||'index';
    const comppath = pagejs.replace('page.js', 'index.vue');
    return {
        path,
        name,
        component: pagecomps[comppath],
        meta
    }
});

export const router = createRouter({
    history: createWebHistory,
    routes: []
});