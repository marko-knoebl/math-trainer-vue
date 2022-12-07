<template>
  <div
    :style="{
      fontSize: '32px',
      textAlign: 'center',
      position: 'absolute',
      paddingTop: '64px',
      paddingLeft: '128px',
      top: '0px',
      height: '100%',
      width: '100%',
      backgroundColor: correct ? '#7CB342' : '#E53935',
    }"
  >
    {{ correct ? "Richtig!" : "Falsch!" }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  correct: boolean;
}>();
</script>
