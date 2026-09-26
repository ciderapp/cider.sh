<template>
  <section aria-labelledby="home-testimonials-title" class="bg-ink text-chalk">
    <div class="sg-shell py-14 md:py-[72px] lg:py-28">
      <div class="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        <h2
          id="home-testimonials-title"
          class="max-w-[7.5em] text-[52px] font-extrabold uppercase leading-[0.9] tracking-[-0.045em] md:max-w-[9em] md:text-[88px]"
        >
          Don't just take our word for it
        </h2>
        <div class="flex flex-col gap-2.5 lg:items-end lg:gap-3.5">
          <HomeFlapCounter :value="memberCount" />
          <span class="font-label text-xs text-chalk-mute">Community members, to be exact</span>
        </div>
      </div>

      <div
        ref="track"
        class="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] lg:mt-14 lg:gap-6 [&::-webkit-scrollbar]:hidden"
        @scroll.passive="onScroll"
      >
        <figure
          v-for="(item, i) in testimonies"
          :key="item.author"
          class="flex h-[440px] w-[85%] shrink-0 snap-start flex-col rounded-[20px] border border-ink-line bg-ink-panel p-6 md:w-[calc(50%-8px)] lg:w-[calc((100%-48px)/3)] lg:p-8"
          :aria-label="`Testimonial ${i + 1} of ${testimonies.length}`"
        >
          <blockquote class="line-clamp-[12] text-pretty text-[17px] leading-[1.45] lg:line-clamp-[11] lg:text-lg">
            &ldquo;{{ item.quote }}&rdquo;
          </blockquote>
          <figcaption class="mt-auto border-t border-ink-line pt-5">
            <span class="block text-xl font-bold tracking-[-0.02em] lg:text-[22px]">{{ item.author }}</span>
            <span class="mt-1.5 block font-label text-xs text-signal">{{ item.position }}</span>
          </figcaption>
        </figure>
      </div>

      <div class="mt-5 flex items-center gap-4 lg:mt-10 lg:gap-6">
        <span class="flex flex-1 gap-1 lg:flex-none lg:gap-1.5" aria-hidden="true">
          <span
            v-for="(item, i) in testimonies"
            :key="item.author"
            class="block h-[3px] flex-1 transition-colors lg:w-10 lg:flex-none"
            :class="i === active ? 'bg-signal' : 'bg-ink-line'"
          />
        </span>
        <span class="font-label text-xs text-chalk-mute" aria-live="polite">{{ active + 1 }} / {{ testimonies.length }}</span>
        <span class="flex gap-2 lg:ml-auto">
          <button type="button" class="sg-ibtn sg-ibtn--lg" aria-label="Previous testimonial" :disabled="active === 0" @click="go(active - 1)">
            <Icon name="lucide:arrow-left" class="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="sg-ibtn sg-ibtn--lg"
            aria-label="Next testimonial"
            :disabled="active === testimonies.length - 1"
            @click="go(active + 1)"
          >
            <Icon name="lucide:arrow-right" class="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        </span>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  const memberCount = "13,567";

  const testimonies = [
    {
      author: "Kai",
      position: "Proud Cider User",
      quote:
        "After making the switch to Apple Music mid-2022, a Windows music client was all I needed to solidify the switch. Cider brings that and more to the table, with integrations for Last.fm, Spotify, and Discord, making it THE definitive music client for chronically online peeps.",
    },
    {
      author: "SoNothing",
      position: "UI Enthusiast (aka Nit-picker)",
      quote:
        "Cider completely changes the game for the desktop Apple Music experience. Gone are the blindingly ugly light mode of iTunes and the awful performance on official clients, replaced by an absolute beauty that zips around like a supercar. I for one welcome our new music overlords.",
    },
    {
      author: "Daniel",
      position: "Cider User",
      quote:
        "The only real drawback to Apple Music for me was the lack of a decent app for Windows. This seems to be a godsend for Window users. About 3 minutes into the trial period I knew this was the solution I was hoping for.",
    },
    {
      author: "RylanFM",
      position: "New Cider Enthusiast",
      quote:
        "I was a bit skeptical having never even heard of Cider until the afternoon I got it. A couple weeks in and I can confidently say that this is one of the best purchases I have ever made. The UI is so clean and intuitive. I have a vertical monitor and immersive mode looks amazing. Everyone in the Discord server was so kind and helped me get it set up in just a few minutes. I highly recommend giving Cider a try!",
    },
    {
      author: "Bjorn",
      position: "Apple Enthusiast",
      quote:
        "I'm a huge believer in trying a product before paying for it. I have to say, this is 100% worth $3.99 to play Apple Music. This does exactly what you need, is extremely smooth and not full of bloatware. Recommend this for anyone who is sick of iTunes, but loves Apple Music on their iPhone.",
    },
  ];

  const track = ref<HTMLElement | null>(null);
  const active = ref(0);

  function step() {
    const el = track.value;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return card.offsetWidth + gap;
  }

  function onScroll() {
    const el = track.value;
    const size = step();
    if (!el || !size) return;
    // Pin to the last card once the track can't scroll any further.
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    active.value = atEnd ? testimonies.length - 1 : Math.round(el.scrollLeft / size);
  }

  function go(index: number) {
    const el = track.value;
    if (!el) return;
    const target = Math.max(0, Math.min(index, testimonies.length - 1));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: target * step(), behavior: reduceMotion ? "auto" : "smooth" });
    active.value = target;
  }
</script>
