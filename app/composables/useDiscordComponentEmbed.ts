/**
 * Discord Component Embed composable
 * 
 * Experimental: Based on discord-api-docs#8606 (still open as of implementation).
 * Discord may not yet fully support component embeds. Classic og:* tags remain as fallback.
 * 
 * Injects a <script> tag with type="application/json" and id="discord:component-embed"
 * containing a Discord component payload for rich embeds when shared in Discord.
 */

export interface DiscordButton {
  label: string;
  url: string;
}

export interface DiscordComponentEmbedOptions {
  title?: string;
  description?: string;
  buttons: DiscordButton[];
  imageUrl?: string;
}

/**
 * Adds a Discord component embed to the page head (SSR-only).
 * 
 * @param options - Configuration for the embed: title, description, buttons, and optional imageUrl
 */
export function useDiscordComponentEmbed(options: DiscordComponentEmbedOptions) {
  const site = useSiteConfig();
  
  const components: any[] = [];

  // Add Text Display component if title or description provided
  if (options.title || options.description) {
    components.push({
      type: 1, // Text Display
      text: [
        options.title && { content: options.title, tag: 'heading' },
        options.description && { content: options.description },
      ].filter(Boolean),
    });
  }

  // Add Action Row with link buttons
  if (options.buttons.length > 0) {
    components.push({
      type: 2, // Action Row
      components: options.buttons.map(button => ({
        type: 2, // Button
        style: 5, // Link style
        label: button.label,
        url: button.url,
      })),
    });
  }

  // Optional: Add Media Gallery if imageUrl provided
  if (options.imageUrl) {
    components.push({
      type: 16, // Media Gallery
      items: [
        {
          media: {
            url: options.imageUrl.startsWith('http') ? options.imageUrl : `${site.url}${options.imageUrl}`,
          },
        },
      ],
    });
  }

  const payload = {
    component: {
      type: 17, // Component Embed
      accent_color: 14425780, // #dc0f54
      spoiler: false,
      components,
    },
  };

  useHead({
    script: [
      {
        id: 'discord:component-embed',
        type: 'application/json',
        tagPriority: 'high',
        // CRITICAL: children must be raw JSON string of the payload object
        children: JSON.stringify(payload),
      },
    ],
  });
}
