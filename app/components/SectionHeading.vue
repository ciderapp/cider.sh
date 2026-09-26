<template>
  <div
    class="reveal"
    :class="align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl text-left'"
  >
    <p v-if="eyebrow" class="eyebrow" :class="align === 'center' ? 'justify-center' : ''">
      <Icon v-if="icon" :name="icon" class="h-3.5 w-3.5" aria-hidden="true" />
      {{ eyebrow }}
    </p>
    <component
      :is="as"
      class="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
    >
      <slot name="title">{{ title }}</slot>
    </component>
    <p
      v-if="description || $slots.default"
      class="mt-4 text-base text-muted-foreground sm:text-lg"
      :class="align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'"
    >
      <slot>{{ description }}</slot>
    </p>
  </div>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      /** Small uppercase label above the title */
      eyebrow?: string;
      /** Optional icon rendered before the eyebrow */
      icon?: string;
      title?: string;
      description?: string;
      align?: "center" | "left";
      /** Heading element to render */
      as?: "h1" | "h2" | "h3";
    }>(),
    { align: "center", as: "h2" }
  );
</script>
