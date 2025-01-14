<script setup lang="ts">
  interface Props {
    header: string;
  }

  const props = defineProps<Props>();
</script>

<template>
  <UiCollapsible class="flex flex-col">
    <div style="display: flex; align-items: center; justify-content: space-between">
      <UiCollapsibleTrigger>
        {{ props.header }}
      </UiCollapsibleTrigger>
    </div>

    <UiCollapsibleContent
      class="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden"
    >
      <ContentSlot :use="$slots.default" unwrap="span" class="text-md" />
    </UiCollapsibleContent>
  </UiCollapsible>
</template>
