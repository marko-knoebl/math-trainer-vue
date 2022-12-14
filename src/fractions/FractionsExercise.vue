<template>
  <MathExercise>
    <CorrectIncorrect
      v-if="exerciseHist.submittedAnswer.value"
      :correct="exerciseHist.answerStatus.value === 'correct'"
    ></CorrectIncorrect>
    <h1>Brüche</h1>
    <div>
      {{ exerciseHist.exercise.value.parameters.numA }} /
      {{ exerciseHist.exercise.value.parameters.denA }} *
      {{ exerciseHist.exercise.value.parameters.numB }} /
      {{ exerciseHist.exercise.value.parameters.denB }}
    </div>
    <form @submit.prevent="exerciseHist.submitAnswer(answerInput)">
      <input v-model="answerInput" />
      <button type="submit">überprüfen</button>
    </form>
    <ExerciseStatistics :statistics="exerciseHist.stats.value" />
  </MathExercise>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MathExercise from "@/MathExercise.vue";
import CorrectIncorrect from "@/components/CorrectIncorrect.vue";
import { newExercise } from "./FractionsExercise";
import { useExerciseNew } from "@/useExercise";
import ExerciseStatistics from "@/components/ExerciseStatistics.vue";

const answerInput = ref("");

function onCorrect() {
  answerInput.value = "";
}

const exerciseHist = useExerciseNew(newExercise, onCorrect);
</script>
