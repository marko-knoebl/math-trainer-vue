<template>
  <div :style="{ position: 'relative' }">
    <CorrectIncorrect
      v-if="correctMessageDisplayed || incorrectMessageDisplayed"
      :correct="correctMessageDisplayed"
    ></CorrectIncorrect>
    <h1>Grundrechnungsarten</h1>
    <form
      v-if="currentExercise"
      @submit.prevent="checkAnswer()"
      :style="{ marginTop: '16px', marginBottom: '16px' }"
    >
      <div :style="{ fontSize: '24px' }">
        <div v-if="currentExercise.type === 'addition'">
          {{ currentExercise.a }} + {{ currentExercise.b }} =
          <input v-model="answer" type="number" />
        </div>
        <div v-else-if="currentExercise.type === 'subtraction'">
          {{ currentExercise.a }} - {{ currentExercise.b }} =
          <input v-model="answer" type="number" />
        </div>
        <div v-else-if="currentExercise.type === 'multiplication'">
          {{ currentExercise.a }} ⋅ {{ currentExercise.b }} =
          <input v-model="answer" type="number" />
        </div>
        <div v-else-if="currentExercise.type === 'division'">
          {{ currentExercise.a }} : {{ currentExercise.b }} =
          <input v-model="answer" type="number" />
        </div>
        <div :style="{ marginTop: '16px' }">
          <button type="submit">überprüfen</button>{{ " " }}
          <button type="button" @click="skipExercise()">
            überspringen (bringt Miuspunkt)
          </button>
        </div>
      </div>
    </form>
    <ExerciseStatistics :statistics="statistics" />
  </div>
</template>

<script lang="ts">
import { randIntInclusive } from "../randInt";
import { computed, onMounted, ref } from "vue";
import CorrectIncorrect from "@/components/CorrectIncorrect.vue";
import ExerciseStatistics from "@/components/ExerciseStatistics.vue";

type Exercise = {
  type: "addition" | "subtraction" | "multiplication" | "division";
  a: number;
  b: number;
  result: number;
};

export default {
  name: "BasicArithmetic",
  setup() {
    const operations = ref([
      { name: "addition", active: true },
      { name: "subtraction", active: true },
      { name: "multiplication", active: true },
      { name: "division", active: true },
    ]);
    const currentExercise = ref<Exercise | null>(null);
    const answer = ref<string | number>("");
    const statistics = ref({ correct: 0, incorrect: 0 });
    const correctMessageDisplayed = ref(false);
    const incorrectMessageDisplayed = ref(false);
    const relCorrect = computed(() => {
      const tot = statistics.value.correct + statistics.value.incorrect;
      if (tot === 0) {
        return 0;
      }
      return statistics.value.correct / tot;
    });
    const percentageStr = computed(() => {
      const tot = statistics.value.correct + statistics.value.incorrect;
      if (tot === 0) {
        return "";
      }
      const rel = statistics.value.correct / tot;
      const percent = rel * 100;
      const percentString = percent.toFixed(0);
      return percentString + "%";
    });
    function newExercise() {
      const activeOperations = operations.value.filter((op) => op.active);
      const randIndex = Math.floor(Math.random() * activeOperations.length);
      const operation = activeOperations[randIndex];
      if (operation.name === "addition") {
        newAddition(1000);
      } else if (operation.name === "subtraction") {
        newSubtraction(1000);
      } else if (operation.name === "multiplication") {
        newMultiplication(50);
      } else if (operation.name === "division") {
        newDivision(50);
      }
      answer.value = "";
    }
    function newAddition(limit: number) {
      const result = randIntInclusive(0, limit);
      const a = randIntInclusive(0, result);
      const b = result - a;
      currentExercise.value = {
        type: "addition",
        a: a,
        b: b,
        result: result,
      };
    }
    function newSubtraction(limit: number) {
      const a = randIntInclusive(0, limit);
      const b = randIntInclusive(0, a);
      const result = a - b;
      currentExercise.value = {
        type: "subtraction",
        a: a,
        b: b,
        result: result,
      };
    }
    function newMultiplication(limit: number) {
      const a = randIntInclusive(0, limit);
      const b = randIntInclusive(0, limit);
      const result = a * b;
      currentExercise.value = {
        type: "multiplication",
        a: a,
        b: b,
        result: result,
      };
    }
    function newDivision(limit: number) {
      const result = randIntInclusive(0, limit);
      const b = randIntInclusive(0, limit);
      const a = result * b;
      currentExercise.value = {
        type: "division",
        a: a,
        b: b,
        result: result,
      };
    }
    function checkAnswer() {
      console.log(answer.value);
      console.log(currentExercise.value?.result);
      if (answer.value === currentExercise.value?.result) {
        displayCorrectMessage();
        statistics.value.correct++;
        newExercise();
      } else {
        displayIncorrectMessage();
        statistics.value.incorrect++;
      }
    }
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
    function skipExercise() {
      statistics.value.incorrect++;
      newExercise();
    }
    onMounted(newExercise);
    return {
      operations,
      currentExercise,
      answer,
      statistics,
      relCorrect,
      percentageStr,
      correctMessageDisplayed,
      incorrectMessageDisplayed,
      newExercise,
      skipExercise,
      checkAnswer,
    };
  },
  components: { CorrectIncorrect, ExerciseStatistics },
};
</script>
