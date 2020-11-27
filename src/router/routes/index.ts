import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { DEFAULT_LAYOUT_COMPONENT, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '../constant';
import modules from 'globby!/@/router/routes/modules/**/*.@(ts)';

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  routeModuleList.push(modules[key]);
});

export const asyncRoutes = [
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];

// 主框架根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  component: DEFAULT_LAYOUT_COMPONENT,
  meta: {
    title: 'Root',
  },
  children: [],
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/login/Login.vue'),
  meta: {
    title: '登录',
  },
};

export const FHRRecord: AppRouteRecordRaw = {
  path: '/FHR-record',
  name: 'FHR-record',
  component: () => import('/@/views/FHR-record/FHR-record.vue'),
  meta: {
    icon: 'ant-design:history-outlined',
    title: '胎心率记录',
  },
};

// 基础路由 不用权限
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  FHRRecord,
];
