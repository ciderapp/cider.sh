<template>
  <NuxtLink
    :to="to"
    class="sg-focus group items-center gap-4 rounded-[16px] border border-signal/50 bg-ink-panel p-4 transition-colors hover:border-signal md:gap-5 md:p-5"
    :class="visibility[device]"
  >
    <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-signal text-ink" aria-hidden="true">
      <Icon :name="icon" class="h-5 w-5" />
    </span>
    <span class="min-w-0 flex-1">
      <span class="block text-[15px] font-semibold leading-snug md:text-base">{{ title }}</span>
      <span class="mt-0.5 block text-pretty text-sm leading-snug text-chalk-dim">{{ description }}</span>
    </span>
    <Icon
      name="lucide:arrow-right"
      class="h-4 w-4 shrink-0 text-chalk-dim transition-transform group-hover:translate-x-0.5 group-hover:text-chalk"
      aria-hidden="true"
    />
  </NuxtLink>
</template>

<script lang="ts" setup>
  // A card pointing visitors on one kind of device at the app made for it. It stays hidden
  // everywhere else. (Single template root, so classes from the parent fall through.)
  defineProps<{
    device: "android" | "ios";
    title: string;
    description: string;
    to: string;
    icon: string;
  }>();

  // Written out in full so Tailwind picks up the variant classes
  const visibility = {
    android: "hidden android:flex",
    ios: "hidden ios:flex",
  };
</script>
