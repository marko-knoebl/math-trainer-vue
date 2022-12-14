<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      position: 'relative',
    }"
  >
    <CorrectIncorrect
      v-if="correctMessageDisplayed || incorrectMessageDisplayed"
      :correct="correctMessageDisplayed"
    />
    <h1>Gleichungen</h1>
    <form
      v-if="currentExercise"
      @submit.prevent="checkAnswer()"
      :style="{ fontSize: '24px' }"
    >
      <div>{{ exerciseString }}</div>
      <input v-model="answer" type="number" />
      <div>
        <button type="submit">überprüfen</button>
        <button type="button" @click="skipExercise()">
          überspringen (bringt Miuspunkt)
        </button>
      </div>
    </form>
    <ExerciseStatistics :statistics="statistics" />
  </div>
</template>

<script lang="ts">
import CorrectIncorrect from "@/components/CorrectIncorrect.vue";
import ExerciseStatistics from "@/components/ExerciseStatistics.vue";
import { ref, computed, onMounted } from "vue";
import { randIntInclusive, randSign } from "../myMath";

type Exercise = {
  coeffLeft: number;
  constLeft: number;
  coeffRight: number;
  constRight: number;
  x: number;
};

function createExercise() {
  let x = randIntInclusive(1, 10) * randSign();
  let coeffLeft = randIntInclusive(1, 10) * randSign();
  let constLeft = randIntInclusive(1, 10) * randSign();
  let coeffRight = randIntInclusive(1, 10) * randSign();
  let constRight = coeffLeft * x + constLeft - coeffRight * x;
  return { x, coeffLeft, constLeft, coeffRight, constRight };
}

function createPositiveExercise() {
  let x = randIntInclusive(1, 10);
  let coeffLeft = randIntInclusive(1, 10);
  let constLeft = randIntInclusive(1, 10);
  let coeffRight = randIntInclusive(1, 10);
  let constRight = coeffLeft * x + constLeft - coeffRight * x;
  return { x, coeffLeft, constLeft, coeffRight, constRight };
}

function exerciseToString(exercise: Exercise) {
  let s = "";
  s += exercise.coeffLeft + "x";
  s += exercise.constLeft < 0 ? " - " : " + ";
  s += Math.abs(exercise.constLeft);
  s += " = ";
  s += exercise.coeffRight + "x";
  s += exercise.constRight < 0 ? " - " : " + ";
  s += Math.abs(exercise.constRight);
  return s;
}

function isAnswerCorrect(exercise: Exercise, answer: string) {
  let answerNum = Number(answer);
  return exercise.x === answerNum;
}

export default {
  name: "EquationsNegative",
  setup() {
    let currentExercise = ref(createPositiveExercise());
    function newExercise() {
      currentExercise.value = createPositiveExercise();
    }
    let exerciseString = computed(() =>
      exerciseToString(currentExercise.value)
    );

    let answer = ref("");

    const statistics = ref({ correct: 0, incorrect: 0 });

    function displayCorrectMessage() {
      correctMessageDisplayed.value = true;
      setTimeout(() => {
        correctMessageDisplayed.value = false;
      }, 1000);
    }
    function displayIncorrectMessage() {
      incorrectMessageDisplayed.value = true;
      setTimeout(() => {
        incorrectMessageDisplayed.value = false;
      }, 1000);
    }

    function checkAnswer() {
      if (isAnswerCorrect(currentExercise.value, answer.value)) {
        displayCorrectMessage();
        statistics.value.correct++;
        newExercise();
      } else {
        displayIncorrectMessage();
        statistics.value.incorrect++;
      }
    }

    function skipExercise() {
      statistics.value.incorrect++;
      newExercise();
    }

    let correctMessageDisplayed = ref(false);
    let incorrectMessageDisplayed = ref(false);
    return {
      currentExercise,
      exerciseString,
      newExercise,
      checkAnswer,
      correctMessageDisplayed,
      incorrectMessageDisplayed,
      answer,
      statistics,
      skipExercise,
    };
  },
  components: { CorrectIncorrect, ExerciseStatistics },
};
</script>
