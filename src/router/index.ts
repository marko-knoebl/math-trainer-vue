import BasicArithmetic from "../basic-arithmetic/BasicArithmetic.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../home/HomeView.vue";
import TimesTableBingo from "../times-table-bingo/TimesTableBingo.vue";
import EquationsNegative from "../equations-negative/EquationsNegative.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/times-table-bingo",
      name: "Einmaleins-Bingo",
      component: TimesTableBingo,
    },
    { path: "/equations-negative", name: "", component: EquationsNegative },
    { path: "/basic-arithmetic", name: "", component: BasicArithmetic },
  ],
});

export default router;
