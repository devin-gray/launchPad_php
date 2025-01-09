import { createRouter, createWebHistory } from "vue-router";
import Welcome from '@/Pages/Welcome.vue';
import { usePage } from '@inertiajs/vue3';
import type { AuthUser } from '@/types';

export const scrollPositions = {} as any; // Store scroll positions by route

const router = createRouter({
  history: createWebHistory(""),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return { el: to.hash };
    } else if (to.params['id']) {
      return { left: 0, top: 0 };
    } else {
      return { left: scrollPositions[from.fullPath]?.left || 0, top: scrollPositions[from.fullPath]?.top || 0 };
    }
  },
  routes: [
    {
      path: "/",
      name: "welcome",
      component: Welcome,
    },
    {
      path: "/pricing",
      name: "pricing",
      component: () => import("@/Pages/Pricing.vue")
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("@/Pages/Blog.vue")
    },
    {
      path: "/blog/:slug",
      name: "Published Post",
      component: () => import("@/Pages/PublishedPost.vue")
    },
    {
      path: "/features",
      name: "features",
      component: () => import("@/Pages/Features.vue")
    },
    {
      path: "/success",
      name: "success",
      component: () => import("@/Pages/Success.vue")
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/Pages/Admin.vue"),
      meta: { requiresAuth: true, roles: ['admin'] },
    },
    {
      path: "/admin/user-management",
      name: "User Management",
      component: () => import("@/Pages/UserManagement.vue"),
      meta: { requiresAuth: true, roles: ['admin'] },
    },
    {
      path: "/admin/blog",
      name: "Blog Editor",
      component: () => import("@/Pages/BlogEditor.vue"),
      meta: { requiresAuth: true, roles: ['admin'] },
    },
    {
      path: "/admin/edit-post/:id",
      name: "Edit Post",
      component: () => import("@/Pages/EditPost.vue"),
      meta: { requiresAuth: true, roles: ['admin'] },
    }
  ],
});

router.beforeEach((to, from, next) => {
  const user = usePage().props.auth.user as unknown as AuthUser | undefined;

  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    if (!user) {
      return next('/login');
    }

    // Check role-based access
    if (to.meta.roles && !user.roles.some(role => (to.meta.roles as string[]).includes(role.slug))) {
      return next('/login');
    }
  }

  next();
});

export default router;
