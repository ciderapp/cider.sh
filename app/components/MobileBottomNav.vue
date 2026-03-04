<template>
  <div class="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-50 flex -translate-x-1/2 items-center justify-center gap-1.5 rounded-full border border-border/50 bg-background/80 p-1.5 shadow-xl backdrop-blur-xl md:hidden">
    <UiButton
      size="icon"
      variant="ghost"
      class="h-11 w-11 rounded-full bg-muted/40 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
      @click="mobileNav = true"
    >
      <Icon name="lucide:menu" class="h-5 w-5" />
    </UiButton>

    <NuxtLink to="/downloads">
      <UiButton class="h-11 rounded-full px-6 text-[0.95rem] font-medium" variant="default">
        <Icon name="lucide:shopping-bag" class="mr-2 h-4 w-4" />
        Get Cider
      </UiButton>
    </NuxtLink>

    <NuxtLink to="/taproom">
      <UiButton
        size="icon"
        variant="ghost"
        class="h-11 w-11 rounded-full bg-muted/40 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
      >
        <Icon name="lucide:book-open" class="h-5 w-5" />
      </UiButton>
    </NuxtLink>
  </div>
  
  <MobileNav v-model="mobileNav" />
</template>

<script setup lang="ts">
  const mobileNav = ref(false);
</script>
