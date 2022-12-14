<template>
  <MathExercise>
    <CorrectIncorrect
      v-if="exerciseHist.submittedAnswer.value"
      :correct="exerciseHist.answerStatus.value === 'correct'"
    />
    <h1>Einfache Gleichungen</h1>
    <div>
      <select v-model="numberSet">
        <option value="positive">nur positive Zahlen</option>
        <option value="positive-or-negative">
          positive und negative Zahlen
        </option>
      </select>
    </div>
    <form
      @submit.prevent="exerciseHist.submitAnswer(String(answerInput))"
      :style="{
        fontSize: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }"
    >
      <div>
        {{ (exerciseHist.exercise.value as any).toString() }}
      </div>
      <div>
        x =
        <input
          v-model="answerInput"
          type="number"
          :style="{ fontSize: '24px' }"
        />
      </div>
      <div>
        <button type="submit">überprüfen</button>
        <button type="button" @click="exerciseHist.skip()">
          überspringen (bringt Miuspunkt)
        </button>
      </div>
    </form>
    <ExerciseStatistics :statistics="exerciseHist.stats.value" />
  </MathExercise>
</template>

<script setup lang="ts">
import CorrectIncorrect from "@/components/CorrectIncorrect.vue";
import ExerciseStatistics from "@/components/ExerciseStatistics.vue";
import MathExercise from "@/MathExercise.vue";
import { useExerciseNew } from "@/useExercise";
import { ref, watchEffect } from "vue";
import { newExercise } from "./exercise";

const numberSet = ref<"positive" | "positive-or-negative">("positive");

const answerInput = ref<string | number>("");

function onCorrect() {
  answerInput.value = "";
}

const exerciseHist = useExerciseNew(
  () => newExercise(numberSet.value === "positive-or-negative"),
  onCorrect
);

watchEffect(() => {
  exerciseHist.newExercise();
});
</script>
