<script setup lang="ts">
defineOptions({ name: 'CandidateQuestionnaireView' })
</script>

<template>
  <div>
    <div class="page-header"><h2>Questionnaire</h2></div>
    <div class="card" style="padding:1rem; display:grid; gap:.5rem;">
      <input class="input" placeholder="University" />
      <input class="input" placeholder="Experience (years)" />
      <textarea class="input" rows="5" placeholder="Tell us about yourself"></textarea>
      <button class="btn btn-primary">Submit</button>
    </div>
  </div>
</template>
