<template>
  <UiContainer class="py-16">
    <p class="mb-3 text-center font-semibold text-primary lg:text-left">Learn More</p>
    <h3 class="mb-4 text-center text-3xl font-semibold lg:mb-5 lg:text-left lg:text-4xl">
      The perfect client for Apple Music users
    </h3>
    <p class="mb-10 max-w-[760px] text-center text-lg text-muted-foreground lg:mb-16 lg:text-left lg:text-xl">
      Cider not only provides a refreshing alternative to Apple's official music client, but it also
      transforms your entire music experience with its emphasis on design and user experience.
    </p>
    <div class="grid grid-cols-1 lg:grid-cols-2 lg:py-16">
      <div class="grid grid-cols-1 place-items-center gap-5 gap-y-10 py-10 text-center md:grid-cols-2 lg:text-left">
        <template v-for="(s, i) in stats" :key="i">
          <div>
            <h4 class="mb-2 text-5xl font-bold text-primary lg:mb-3 lg:text-6xl">
              {{ s.value }}
            </h4>
            <p class="text-lg font-medium">
              {{ s.text }}
            </p>
            <p class="mt-2 line-clamp-2 hidden text-muted-foreground lg:block">
              {{ s.description }}
            </p>
          </div>
        </template>
      </div>
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <NuxtImg src="/og.png" alt="Share team inboxes feature"
        class="h-[300px] w-full rounded-lg object-cover shadow-sm lg:h-[520px]" />
    </div>

    <div class="flex max-w-screen-2xl flex-col items-center">
      <h2 class="mx-auto mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">
        Feature Comparison
      </h2>
      <p class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl">
        Check how Cider stacks up against the competition.
      </p>
      <div class="my-10 w-full overflow-x-auto rounded-md border">
        <UiTable>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead>Feature</UiTableHead>
              <UiTableHead>Cider</UiTableHead>
              <UiTableHead>Cider Classic</UiTableHead>
              <UiTableHead>AM Web</UiTableHead>
              <UiTableHead>macOS AM App</UiTableHead>
              <UiTableHead>Windows AM App</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody class="last:border-b">
            <template v-for="(f, i) in features" :key="f.name">
              <UiTableRow>
                <UiTableCell class="text-md font-semibold">{{ f.name }} <sup :id="'fnref-' + f.footnote"><a :href="'#fn-' + f.footnote"
                      aria-describedby="footnote-label">{{ f.footnote }}</a></sup></UiTableCell>
                <UiTableCell class="text-center font-medium">
                  <BooleanIcon :value="f.cider2" />
                </UiTableCell>
                <UiTableCell class="text-center font-medium">
                  <BooleanIcon :value="f.cider1" />
                </UiTableCell>
                <UiTableCell>
                  <BooleanIcon :value="f.musicWeb" />
                </UiTableCell>
                <UiTableCell>
                  <BooleanIcon :value="f.musicMac" />
                </UiTableCell>
                <UiTableCell>
                  <BooleanIcon :value="f.musicWin" />
                </UiTableCell>
              </UiTableRow>
            </template>
          </UiTableBody>
        </UiTable>
      </div>
    </div>

    <UiContainer class="py-16 text-center lg:py-24">
      <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">
        Frequently Asked Questions
      </h2>

      <p class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl">
        Everything you need to know about the product.
      </p>
    </UiContainer>
    <section class="mx-auto max-w-full">
      <UiAccordion :default-value="['item-4']" type="multiple">
        <template v-for="i in items" :key="i.value">
          <UiAccordionItem :value="i.value">
            <UiAccordionHeader>
              <UiAccordionTrigger class="text-lg">{{ i.title }}</UiAccordionTrigger>
            </UiAccordionHeader>
            <UiAccordionContent>
              <p class="text-base text-muted-foreground">{{ i.content }}</p>
            </UiAccordionContent>
          </UiAccordionItem>
        </template>
      </UiAccordion>
    </section>

    <section
      class="mx-auto mt-16 flex flex-col items-center gap-6 rounded-lg bg-muted/50 py-8 text-center dark:bg-muted/20">
      <p class="text-lg font-semibold">Still have questions?</p>
      <p class="text-muted-foreground">
        Can't find the answer you're looking for? Feel free to contact our Support Team.
      </p>
      <UiButton to="https://discord.gg/applemusic">
        <Icon name="simple-icons:discord" size="20px" /> Get in touch on Discord
      </UiButton>
    </section>

    <section class="mt-4">
      <p id="footnote-label" class="sr-only">Footnotes</p>
      <ol class="text-muted-foreground text-xs">
        <li id="fn-1">
          1. Support for Adjustable Vocals not currently included. <a href="#fnref-1"
            aria-label="Back to reference">↩</a>
        </li>
      </ol>
    </section>
  </UiContainer>
</template>

<script lang="ts" setup>
const features = [
  {
    name: "iCloud Library",
    cider1: true,
    cider2: true,
    musicWeb: true,
    musicMac: true,
    musicWin: true,
  },
  {
    name: "Community Driven",
    cider1: true,
    cider2: true,
    musicWeb: false,
    musicMac: false,
    musicWin: false,
  },
  {
    name: "Chromecast",
    cider1: true,
    cider2: true,
    musicWeb: true,
    musicMac: false,
    musicWin: false,
  },
  {
    name: "AirPlay",
    cider1: true,
    cider2: true,
    musicWeb: false,
    musicMac: true,
    musicWin: true,
  },
  {
    name: "Native Last.fm and Discord Integration",
    cider1: true,
    cider2: true,
    musicWeb: false,
    musicMac: false,
    musicWin: false,
  },

  {
    name: "Apple Music Sing",
    footnote: 1,
    cider1: true,
    cider2: true,
    musicWeb: true,
    musicMac: false,
    musicWin: false,
  },
  {
    name: "Seamless Library Browsing",
    cider1: false,
    cider2: true,
    musicWeb: false,
    musicMac: true,
    musicWin: false,
  },
  {
    name: "Visual Customization",
    cider1: true,
    cider2: true,
    musicWeb: false,
    musicMac: false,
    musicWin: false,
  },
  {
    name: "Audio Enhancements",
    cider1: true,
    cider2: true,
    musicWeb: false,
    musicMac: false,
    musicWin: false,
  },
  {
    name: "Custom Themes and Plugins",
    cider1: true,
    cider2: true,
    musicWeb: false,
    musicMac: false,
    musicWin: false,
  },
];

const items = [
  {
    value: "item-1",
    title: "Do you collect my data?",
    content:
      "No! We have a strict no data collection policy. We do not collect any personal data.",
  },
  {
    value: "item-2",
    title: "Is it free to use?",
    content:
      "Cider is a paid application, itch.io, donation or Microsoft Store. Purchasing through itch.io or through donation will allow you to get the latest updates and features through Taproom.",
  },
  {
    value: "item-3",
    title: "Can I customize with my own theme?",
    content:
      "Absolutely! We provide a powerful theming system that lets you create your own custom theme or choose from a selection of approved community themes available on the Cider Marketplace.",
  },
  {
    value: "item-4",
    title: "Is signing into Cider safe?",
    content: "Yes. We only use the Apple Music API to access your library.",
  },
  {
    value: "item-5",
    title: "Is there a free trial available?",
    content: "Unfortunately, we do not offer a free trial.",
  },
];

const stats = [
  {
    text: "GitHub Stars",
    value: "7.1K+",
    description: "Cider Classic has earned over 7.1K stars on GitHub. We know our stuff.",
  },
  {
    text: "Enjoyment Factor",
    value: "600%",
    description: "Cider is filled with cool quirks and features. Many more yet to come.",
  },
  {
    text: "Open-Source Integrations",
    value: "10+",
    description:
      "We offer first-party integrations for Discord and Last.fm with much more available through plugins made by the community.",
  },
  {
    text: "Customization",
    value: "Unlimited",
    description:
      "Your Client, Your Style. Don't let large companies dictate how your apps should look and feel.",
  },
];
</script>
