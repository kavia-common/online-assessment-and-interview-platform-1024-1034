<script setup lang="ts">
import Sidebar from '@/components/common/Sidebar.vue'
import Topbar from '@/components/common/Topbar.vue'
</script>

<template>
  <div class="main-layout">
    <Sidebar />
    <div class="main-content">
      <Topbar />
      <div style="margin-top: 1rem;">
        <slot />
      </div>
    </div>
  </div>
</template>
