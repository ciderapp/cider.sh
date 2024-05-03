<template>
  <UiContainer class="py-16">
    <p class="mb-3 text-center font-semibold text-primary lg:text-left">Learn More</p>
    <h3 class="mb-4 text-center text-3xl font-semibold lg:mb-5 lg:text-left lg:text-4xl">
      The perfect Client for Apple Music users
    </h3>
    <p
      class="mb-10 max-w-[760px] text-center text-lg text-muted-foreground lg:mb-16 lg:text-left lg:text-xl"
    >
      Not only does Cider offer a refreshing alternative to Apple's native music client, it
      completely changes the way you experience music. With a focus on design and user experience.
    </p>
    <div class="grid grid-cols-1 lg:grid-cols-2 lg:py-16">
      <div
        class="grid grid-cols-1 place-items-center gap-5 gap-y-10 py-10 text-center md:grid-cols-2 lg:text-left"
      >
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
      <NuxtImg
        src="/og.png"
        alt="Share team inboxes feature"
        class="h-[300px] w-full rounded-lg object-cover shadow-sm lg:h-[520px]"
      />
    </div>

    <div class="flex max-w-screen-2xl flex-col items-center">
      <h2 class="mx-auto mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">
        Feature Comparison
      </h2>
      <p class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl">
        Check how Cider Stacks up against the competition.
      </p>
      <div class="my-10 w-full overflow-x-auto rounded-md border">
        <UiTable>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead>Feature</UiTableHead>
              <UiTableHead>Cider</UiTableHead>
              <UiTableHead>Cider Legacy</UiTableHead>
              <UiTableHead>AM Web</UiTableHead>
              <UiTableHead>MacOS AM App</UiTableHead>
              <UiTableHead>Windows AM App</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody class="last:border-b">
            <template v-for="(f, i) in features" :key="f.name">
              <UiTableRow>
                <UiTableCell class="text-md font-semibold">{{ f.name }}</UiTableCell>
                <UiTableCell class="text-center font-medium">
                  <BooleanIcon :value="f.cider2" />
                </UiTableCell>
                <UiTableCell class="text-center font-medium">
                  <BooleanIcon :value="f.cider1" />
                </UiTableCell>
                <UiTableCell><BooleanIcon :value="f.musicWeb" /></UiTableCell>
                <UiTableCell><BooleanIcon :value="f.musicMac" /></UiTableCell>
                <UiTableCell><BooleanIcon :value="f.musicWin" /></UiTableCell>
              </UiTableRow>
            </template>
          </UiTableBody>
        </UiTable>
      </div>
    </div>

    <UiContainer class="py-16 text-center lg:py-24">
      <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">
        Frequently asked questions
      </h2>

      <p class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl">
        Everything you need to know about the product and billing.
      </p>
    </UiContainer>
    <section class="mx-auto max-w-[768px]">
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
      class="mx-auto mt-16 flex flex-col items-center gap-6 rounded-lg bg-muted/50 py-8 text-center dark:bg-muted/20"
    >
      <p class="text-lg font-semibold">Still have questions?</p>
      <p class="text-muted-foreground">
        Can't find the answer you're looking for? Please chat to our friendly team.
      </p>
      <UiButton to="https://discord.gg/applemusic"
        ><Icon name="simple-icons:discord" size="20px" /> Get in touch on Discord</UiButton
      >
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
      superscript: { text: "1", footnote: "Support for Adjustable Vocals not currently included." },
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
      superscript: {
        text: "2",
        footnote:
          "These features can range from Adaptive Colors, to setting the player position to enabling/disabling various UI elements.",
      },
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
      name: "Listen Together",
      cider1: false,
      cider2: true,
      musicWeb: false,
      musicMac: false,
      musicWin: false,
    },
    {
      name: "Custom Themes and Plugins",
      superscript: {
        text: "3",
        footnote: "Cider 2 is currently in beta, and is pending this feature.",
      },
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
      title: "Is it free to use?",
      content:
        "Cider Legacy is free to use, with Cider 2 being closed beta which you will have to pay for (It won't cost more than a cup of coffee).",
    },
    {
      value: "item-2",
      title: "What happens after the beta?",
      content:
        "After the beta, Cider-2's frontend source will be on a public repo. We will also have a free version available (Not final). Some features will be locked behind a paywall thru Cider Connect,  but the core experience will remain free",
    },
    {
      value: "item-3",
      title: "Can I customize with my own theme?",
      content:
        "Yes! You can customize Cider with your own theme, or choose from a selection of themes. Cider 2 will have a more robust theming engine.",
    },
    {
      value: "item-4",
      title: "Is there a free trial available?",
      content: "Unfortunately, we do not offer a free trial.",
    },
    {
      value: "item-5",
      title: "Is it safe to use?",
      content:
        "Cider is safe to use, we do not collect any personal data. We do not have access to your Apple Music account, we only use the Apple Music API to access your library.",
    },
  ];
  const stats = [
    {
      text: "Github Stars",
      value: "6.9K+",
      description: "Cider is a cummunity-lead project. We rely on donations.",
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
        "Cider includes integration like Discord and Last.FM, with the community we have more plugins like Raycast and Nanoleaf. See more in Cider Marketplace",
    },
    {
      text: "Client Styles",
      value: "Unlimited",
      description:
        "Your client, Your style. Dont get limited on large companies dictating how you want your apps to look and feel.",
    },
  ];
</script>
