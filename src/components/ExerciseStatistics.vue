<template>
  <div
    v-if="statistics.correct + statistics.incorrect"
    :style="{ fontSize: '24px', backgroundColor: '#E53935' }"
  >
    <div
      :style="{
        width: `${relCorrect * 100}%`,
        backgroundColor: '#7CB342',
        padding: '8px',
      }"
    >
      {{ statistics.correct }} von
      {{ statistics.correct + statistics.incorrect }} richtig ({{
        percentageStr
      }})
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  statistics: { correct: number; incorrect: number };
}>();

const relCorrect = computed(() => {
  const tot = props.statistics.correct + props.statistics.incorrect;
  if (tot === 0) {
    return 0;
  }
  return props.statistics.correct / tot;
});
const percentageStr = computed(() => {
  const tot = props.statistics.correct + props.statistics.incorrect;
  if (tot === 0) {
    return "";
  }
  const rel = props.statistics.correct / tot;
  const percent = rel * 100;
  const percentString = percent.toFixed(0);
  return percentString + "%";
});
</script>
