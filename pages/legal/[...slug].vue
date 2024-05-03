<template>
  <main class="flex justify-center gap-10 py-10">
    <nav>
      <ContentList path="/legal" v-slot="{ list }">
        <ul>
          <li>
            <b>See All</b>
          </li>
          <li
            v-for="article of list"
            :key="article._path"
            class="hover:text-primary hover:underline"
          >
            <NuxtLink :to="article._path">{{ article.title }}</NuxtLink>
          </li>
        </ul>
        <!-- <div v-for="article in list" :key="article._path">
          <h2>{{ article.title }}</h2>
          <p>{{ article.description }}</p>
        </div> -->
      </ContentList>
    </nav>
    <div class="flex flex-col">
      <!-- <p class="mb-3 font-semibold text-primary">Legal</p> -->
      <ContentDoc class="prose prose-rose max-w-screen-md dark:prose-invert lg:max-w-screen-lg" />
    </div>
    <ContentNavigation v-slot="{ navigation }">
      <ul>
        <li v-for="link of navigation" :key="link._path">
          <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
        </li>
      </ul>
    </ContentNavigation>
  </main>
</template>
<script lang="ts" setup></script>
