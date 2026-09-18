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
  thumbnailUrl?: string;
  buttons: DiscordButton[];
}

/**
 * Adds a Discord component embed to the page head (SSR-only).
 * 
 * @param options - Configuration for the embed: title, description, buttons
 */
export function useDiscordComponentEmbed(options: DiscordComponentEmbedOptions) {
  const components: any[] = [];

  // Add Section with Text Display and optional Thumbnail accessory
  if (options.title || options.description) {
    const parts: string[] = [];
    if (options.title) {
      parts.push(`# ${options.title}`);
    }
    if (options.description) {
      parts.push(options.description);
    }

    // Prefer Section (type 9) with Text Display + Thumbnail accessory when thumbnailUrl is provided
    if (options.thumbnailUrl) {
      components.push({
        type: 9, // Section
        components: [
          {
            type: 10, // Text Display
            content: parts.join('\n'),
          },
        ],
        accessory: {
          type: 11, // Thumbnail
          media: {
            url: options.thumbnailUrl,
          },
        },
      });
    } else {
      // Fall back to standalone Text Display for backward compatibility
      components.push({
        type: 10, // Text Display
        content: parts.join('\n'),
      });
    }
  }

  // Add Action Row with link buttons
  if (options.buttons.length > 0) {
    components.push({
      type: 1, // Action Row
      components: options.buttons.map(button => ({
        type: 2, // Button
        style: 5, // Link style
        label: button.label,
        url: button.url,
      })),
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
        key: 'discord-component-embed',
        id: 'discord:component-embed',
        type: 'application/json',
        tagPriority: 'high',
        innerHTML: JSON.stringify(payload),
      },
    ],
  });
}
