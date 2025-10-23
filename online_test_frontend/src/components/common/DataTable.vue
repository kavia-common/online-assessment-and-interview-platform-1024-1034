<script setup lang="ts" generic="T extends Record<string, any>">
defineProps<{ items: T[]; columns: { key: string; label: string }[] }>()
</script>

<template>
  <div class="card" style="overflow:auto;">
    <table style="width:100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th v-for="c in columns" :key="c.key" style="text-align:left; padding:.6rem; border-bottom:1px solid var(--ocean-border);">
            {{ c.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in items" :key="idx">
          <td v-for="c in columns" :key="c.key" style="padding:.6rem; border-bottom:1px solid var(--ocean-border);">
            {{ row[c.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
