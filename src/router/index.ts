import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../home/HomeView.vue";
import TimesTableBingo from "../times-table-bingo/TimesTableBingo.vue";
import EquationsNegative from "../equations-negative/EquationsNegative.vue";
import FractionsExercise from "@/fractions/FractionsExercise.vue";
import BasicArithmeticVue from "@/basic-arithmetic/BasicArithmetic.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
    { path: "/basic-arithmetic", name: "", component: BasicArithmeticVue },
    { path: "/equations-negative", name: "", component: EquationsNegative },
    { path: "/fractions", name: "fractions", component: FractionsExercise },
  ],
});

export default router;
