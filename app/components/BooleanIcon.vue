<template>
  <Icon
    :name="value ? 'heroicons:check' : 'heroicons:x-mark'"
    :class="value ? 'text-green-500' : 'text-red-500'"
    class="mx-auto h-6 w-6 w-full"
  />
</template>
<script lang="ts" setup>
  const props = defineProps<{
    value: boolean;
  }>();
</script>
