<template>
  <ConfigProvider>
    <router-view />
  </ConfigProvider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
export default defineComponent({
  name: 'App',
  components: { ConfigProvider },
})
</script>
