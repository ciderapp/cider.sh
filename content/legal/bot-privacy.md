---
title: "Discord Bot Privacy Policy"
description: "Privacy policy for Saki, Cider's Discord support agent, covering Message Content Intent, Rise-backed support, leftover data, and deletion rights."
---

# Discord Bot Privacy Policy

**Last Updated:** October 11, 2026  
**Effective Date:** October 11, 2026  

This Privacy Policy applies to the **Saki** Discord bot (and related Cider Discord Bots, collectively referred to as "the Bot", "we", "us", or "our"), operated by the **Cider Collective** ([cider.sh](https://cider.sh)).

We are committed to protecting user privacy, ensuring transparency in data processing, and complying with the **Discord Developer Terms of Service**, **Discord Developer Policy**, and applicable data protection laws, including the **General Data Protection Regulation (GDPR)** and the **California Consumer Privacy Act (CCPA)**.

---

## 1. Overview & Purpose

Saki is Cider Collective's Discord support agent for Cider community servers. The active product is AI-assisted troubleshooting:

* The `/ask` slash command
* An explicit @Saki mention, which can open a support thread
* Follow-up messages from that user in a Saki support thread
* A heads-up in the designated support channel, with an optional reply that starts a thread from what the user already typed
* `/resolved` to close a Saki support thread

Staff may also use leftover tools that are still in the bot (`/report-bug` when enabled, `/dump-forum`, `/forum`). Those are staff-only and are not the consumer product.

---

## 2. Privileged Gateway Intents & Data Collection

Saki identifies with Guilds, Guild Messages, Message Content, and (if sticky roles remain enabled) Server Members. Presence is not used. Guild Message Reactions are not required for support.

### A. Server Members Intent (`GUILD_MEMBERS` / `GuildUsers`)

#### Purpose & Usage:
1. **Sticky Roles (leftover):** If left on, restore a member's previous non-admin roles after they leave and rejoin. Discord does not send old roles on leave, so Saki snapshots roles on join, on role change, and with a startup member-list backfill.

This intent is not used for support answers, `/ask`, mentions, or permission checks. Those use the member object on the interaction or a single-user REST lookup.

If sticky roles are turned off in production and the handlers are retired, this intent can be dropped.

#### Data Collected & Stored (when sticky roles run):
* **Discord User ID**
* **Discord Guild ID**
* **Non-privileged Role IDs**
* **Timestamps**
* Admin, Manage Server, Manage Roles, Manage Channels, Kick, Ban, and Moderate roles are never auto-restored. Lead Dev and Dev are also excluded.

Admins can disable sticky roles with `/config stickyroles`.

---

### B. Message Content Intent (`MESSAGE_CONTENT`)

Discord hides message text, embeds, and attachments on ordinary guild messages unless this intent is approved. Saki needs those fields to:

1. **@Saki mentions:** Read the question on an @Saki mention (and optional images), open a thread, and send the question to Cider's Rise support API.
2. **Support-thread follow-ups:** Read later messages from that user in the Saki thread and send them as follow-ups to the same Rise session.
3. **Support-channel heads-up:** In the regulated support channel, notice a normal post, offer a heads-up, and (if the user replies to that heads-up) use the original message text as the question.

`/ask` does not need this intent. The question is a slash-command option.

Staff leftovers that also read message text if someone runs them: `/report-bug` (when enabled) and `/dump-forum`.

#### What We Do Not Do as the Active Product:
* We do not send chat to a spam classifier.
* We do not send chat to a local language model. `/vibecheck` is not a supported product.
* We do not run keyword auto-replies.
* We do not keep a general chat archive in Saki's database.

#### Data Handling:
* Support questions, optional images, and metadata (Discord user id, username, channel/thread ids, a source tag) go to Cider's Rise support API.
* Rise is Cider-hosted. Answers use Cider's knowledge base (retrieval plus inference). Discord messages are not used to train models in this bot.
* Rise session retention is not defined in the Saki bot. `/deleteactivity` does not delete Rise sessions.
* Thread session ids are held in memory for about 24 hours. Heads-up original text is held in memory for about 30 minutes.
* Bot logs record command name, user id, and username, not general chat.
* If staff confirm `/report-bug`, a transcript may be filed to GitHub via Rise.

---

## 3. Persistent Data Storage

Active support state lives on Rise, not in Saki's SQLite file.

The bot may still have leftover local tables from older features (timezones, donations, guild settings, casino, sticky-role snapshots). Those are not the support product. `/deleteactivity` can remove leftover local rows for your user id.

---

## 4. Third-Party Services & Data Sharing

We do not sell, rent, trade, or monetize user data.

* **Discord Inc.:** Gateway and REST under Discord's terms.
* **Rise (Cider-hosted support API):** Questions, follow-ups, optional images, session metadata, and staff bug-report drafts if that tool is enabled.

GitHub receives an issue only if staff confirm `/report-bug`.

---

## 5. Data Retention & Security

* **Retention Policy:**
  * Rise decides how long a support session is kept. The Discord bot has no session-delete call and no published TTL.
  * In-memory maps expire as noted above. That does not erase Rise.
  * Leftover local rows can be cleared with `/deleteactivity`, or by emailing [privacy@cider.sh](mailto:privacy@cider.sh) / [support@cider.sh](mailto:support@cider.sh) with your Discord User ID.
* **Security Measures:**
  * Local data is on Cider-controlled infrastructure.
  * Access is limited to authorized maintainers.

---

## 6. User Rights, Opt-Out, and Data Deletion

Under applicable privacy regulations (including GDPR and CCPA) and Discord Developer Policies, you have the right to access, rectify, opt-out of, or delete personal data associated with your Discord account.

### Active Support
* There is no command that opts you out of AI processing if you @Saki or keep talking in a Saki thread.
* You can choose not to use `/ask`, @Saki, or support-thread replies.
* `/resolved` archives and locks your Saki thread. It does not delete the Rise session.

### Leftover Local Data
* `/deleteactivity` clears timezone, sticky-role, donation, and casino rows only.

### How to Request Data Deletion
1. **Instant Self-Service Command:**
   * Run `/deleteactivity` for leftover local rows. This is immediate for those rows.
2. **Direct Email Request:**
   * Email **[privacy@cider.sh](mailto:privacy@cider.sh)** or **[support@cider.sh](mailto:support@cider.sh)**.
   * **Subject Line:** `Discord Data Deletion Request - [Your Discord User ID]`
3. **Discord Support Server / Ticket:**
   * Open a ticket in the official [Cider Collective Discord Server](https://discord.gg/applemusic).
4. **Processing Time:**
   * `/deleteactivity` is immediate for local rows. Email and tickets are typically handled within 72 hours, and within 30 days. Rise session deletion needs a Rise-side action.

---

## 7. Changes to This Privacy Policy

We may update this page when the bot, the law, or Discord's rules change. The "Last Updated" date will change. Continued use after an update means you accept the new policy.

---

## 8. Contact & Operator Information

If you have questions, feedback, or concerns regarding this Privacy Policy or our data practices, please contact us:

* **Privacy Contact:** [privacy@cider.sh](mailto:privacy@cider.sh)
* **General Support:** [support@cider.sh](mailto:support@cider.sh)
* **Public Policy:** [https://cider.sh/legal/bot-privacy](https://cider.sh/legal/bot-privacy)
* **Community Discord:** [https://discord.gg/applemusic](https://discord.gg/applemusic)
* **Organization:** Cider Collective
