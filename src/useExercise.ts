import { computed, ref } from "vue";
import type { Ref } from "vue";
import type { Exercise } from "@/Exercise";

const SHOW_CORRECT_DURATION = 2000;

export type ExerciseHistory = {
  exercise: Ref<Exercise>;
  /** latest submitted answer - can have a value for some seconds */
  submittedAnswer: Ref<string | null>;
  submitAnswer: (answer: string) => void;
  skip: () => void;
  newExercise: () => void;
  answerStatus: Ref<"correct" | "incorrect" | "none">;
  stats: Ref<{
    correct: number;
    incorrect: number;
  }>;
};

export function useExerciseNew(
  exerciseCreator: () => Exercise,
  onCorrect: () => void
): ExerciseHistory {
  const exercise = ref(exerciseCreator());
  const submittedAnswer = ref<string | null>(null);
  // correct / incorrect / none
  const answerStatus = computed(() => {
    if (!submittedAnswer.value) {
      return "none";
    }
    if (exercise.value.verify(submittedAnswer.value)) {
      return "correct";
    } else {
      return "incorrect";
    }
  });
  const stats = ref({ correct: 0, incorrect: 0 });
  function submitAnswer(answer: string) {
    const correct = exercise.value.verify(answer);
    if (correct) {
      stats.value.correct++;
    } else {
      stats.value.incorrect++;
    }
    submittedAnswer.value = answer;
    setTimeout(() => {
      if (correct) {
        exercise.value = exerciseCreator();
        onCorrect();
      }
      submittedAnswer.value = null;
    }, SHOW_CORRECT_DURATION);
  }
  function skip() {
    stats.value.incorrect++;
    exercise.value = exerciseCreator();
  }
  function newExercise() {
    exercise.value = exerciseCreator();
  }
  return {
    exercise: exercise,
    /** latest submitted answer - can have a value for some seconds */
    submittedAnswer: submittedAnswer,
    submitAnswer: submitAnswer,
    skip,
    newExercise,
    answerStatus: answerStatus,
    stats,
  };
}
