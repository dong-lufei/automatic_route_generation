import { createRouter, createWebHistory } from 'vue-router';

// 添加 page.js 页以配置路由自定义数据
const pages = import.meta.glob('../views/**/page.js', {
  eager: true,
  import: 'default'
});
const pageComps = import.meta.glob('../views/**/index.vue');

const routes = Object.entries(pages).map(([path, meta]) => {
  const pageJSPath = path;
  path = path.replace('../views', '').replace('/page.js', '');
  path = path || '/';
  const name = path.split('/').filter(Boolean).join('-') || 'index';
  const comPath = pageJSPath.replace('page.js', 'index.vue');
  return {
    path,
    name,
    component: pageComps[comPath],
    meta
  };
});

export const router = createRouter({
  history: createWebHistory(),
  routes
});
