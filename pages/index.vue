<template>
  <div class="flex center column fullheight padding">
    <div class="title">Cider Collective</div>
    <div class="description">
      A development collective working to make your life and user experience
      more flavorful starting with a glass of Cider 🍺
    </div>
  </div>
</template>

<script setup>
useHead({
  meta: [
    {property: 'og:title', content: 'Cider Collective'},
    {property: 'og:description', content: 'A development collective working to make your life and user experience more flavorful starting with a glass of Cider.'},
    {property: 'og:image', content: 'https://cider.sh/cider.png',}
  ],
})
</script>
