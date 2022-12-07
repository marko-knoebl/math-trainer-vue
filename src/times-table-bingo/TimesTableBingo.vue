<template>
  <div>
    <h1>Malsätzchen-Bingo</h1>
    <div>
      <button @click="addNewExercise()">Rechnung hinzufügen</button>
    </div>
    <div
      :style="{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        paddingTop: '16px',
      }"
    >
      <div
        v-for="exercise in allExercises"
        :key="exercise.a + '-' + exercise.b"
        :style="{
          flexBasis: '56px',
          border: '1px solid black',
          textAlign: 'center',
        }"
      >
        {{ exercise.a }} x {{ exercise.b }}
      </div>
    </div>
    <div>
      <label>
        <input type="checkbox" v-model="showSolutions" />
        Ergebnisse anzeigen
      </label>
    </div>
    <div
      v-if="showSolutions"
      :style="{ display: 'flex', flexWrap: 'wrap', paddingTop: '16px' }"
    >
      <div v-for="result in results" :key="result" :style="{ width: '48px' }">
        {{ result }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";

type Exercise = {
  a: number;
  b: number;
};

function random1to10() {
  return Math.ceil(Math.random() * 10);
}

export default {
  setup() {
    const allExercises = ref<Array<Exercise>>([]);
    const showSolutions = ref(false);

    const results = computed(() =>
      allExercises.value.map((exercise) => exercise.a * exercise.b)
    );

    function addNewExercise() {
      for (let i = 0; i < 100; i++) {
        const a = random1to10();
        const b = random1to10();
        if (!results.value.includes(a * b)) {
          allExercises.value.push({ a: a, b: b });
          return;
        }
      }
    }

    return { allExercises, showSolutions, results, addNewExercise };
  },
};
</script>
