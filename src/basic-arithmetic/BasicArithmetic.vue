<template>
  <MathExercise>
    <CorrectIncorrect
      v-if="exerciseHist.submittedAnswer.value"
      :correct="exerciseHist.answerStatus.value === 'correct'"
    ></CorrectIncorrect>
    <h1>Grundrechnungsarten</h1>
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
        {{ exerciseText }}
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
import { useExerciseNew } from "@/useExerciseNew";
import { computed, ref } from "vue";
import { newExercise, type BasicArithmeticExercise } from "./exercise";

const answerInput = ref<string | number>("");

function onCorrect() {
  answerInput.value = "";
}

const exerciseHist = useExerciseNew(newExercise, onCorrect);

const operators: Record<string, string> = {
  addition: "+",
  subtraction: "-",
  multiplication: "⋅",
  division: ":",
};

const exerciseText = computed(() => {
  const exercise = exerciseHist.exercise.value as BasicArithmeticExercise;
  return (
    exercise.parameters.a +
    " " +
    operators[exerciseHist.exercise.value.parameters.operation] +
    " " +
    exercise.parameters.b +
    " = "
  );
});
</script>
