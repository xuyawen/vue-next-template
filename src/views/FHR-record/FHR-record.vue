<template>
  <div class="FHR-record">
    <x-button
      type="primary"
      size="large"
    >登录</x-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from '/@/components/Button/index.vue'
export default defineComponent({
  components: { XButton: Button },
})
</script>

<style lang="less" scoped>
</style>
