---
title: "Discord Bot Privacy Policy"
description: "Privacy policy for Saki, Cider's Discord support agent, covering gateway intents, Rise-backed support, starboard, data retention, and deletion requests."
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
* A heads-up in the designated support channel. A reply to that heads-up does not start a thread and does not send leftover chat to Rise. To start support, use @Saki or `/ask`.
* `/resolved` to close a Saki support thread

The first message in a new support thread discloses that answers are AI generated via Cider's support service, that this bot does not use your messages to train models, and how to stop (`/resolved`, or stop replying).

Support questions are processed by a language model hosted on Cider-controlled hardware (via Rise). That processing is inference only. It does not use third-party AI providers.

Saki also runs a starboard. When a message reaches the configured star reaction threshold, Saki copies its text and attachments into the server's starboard channel.

* Ban-trap honeypot: a post in the designated ban-trap channel is deleted and the author is banned, with a 7-day message purge. The message text is not stored.
* Domain lists: attachment and embed hosts are checked against a per-guild whitelist/blacklist (default on).
* Scam-link filter: URLs in message text and attachment/embed hosts are checked against a public community domain list (default on). There is no Saki-ML spam classifier on this path.
* Moderation alerts: if staff set an alert channel, a flagged scam-link hit posts an embed there with truncated original message text (about 1900 characters). That copy lives on Discord in the staff channel. It is not stored in Saki's database.

Staff may also use leftover tools that are still in the bot (`/report-bug` when enabled, `/dump-forum`, `/forum`). Those are staff-only and are not the consumer product.

---

## 2. Gateway Intents and Why We Use Them

Discord "gateway intents" are permissions that tell Discord which events a bot is allowed to receive. Saki uses these intents. Here is what each one is for, in plain language:

* **Guilds:** Lets Saki see the servers it is in and their channels, so it can run where it is invited.
* **Guild Messages:** Lets Saki receive messages in those servers, including mentions and support-thread replies.
* **Message Content:** Lets Saki read message text and attachments when you @Saki, reply in a Saki support thread, or when a message is copied to the starboard. It also lets Saki read ordinary guild messages to check URLs and attachment/embed hosts, and to detect posts in the ban-trap honeypot channel. Discord hides that text unless this intent is approved. `/ask` does not need it, because the question is typed into the slash command.
* **Guild Message Reactions:** Lets Saki see star reactions so it can copy a message to the starboard when the threshold is reached.
* **Server Members (Guild Members):** Lets sticky roles restore a member's previous non-admin roles if they leave and rejoin. Support answers do not use this intent.

Saki does not identify with Presence.

### A. Server Members Intent (`GUILD_MEMBERS` / `GuildUsers`)

#### Purpose & Usage:
1. **Sticky Roles:** If left on, restore a member's previous non-admin roles after they leave and rejoin. Discord does not send old roles on leave, so Saki snapshots roles on join, on role change, and with a startup member-list backfill.

This intent is not used for support answers, `/ask`, mentions, or permission checks. Those use the member object on the interaction or a single-user REST lookup.

#### Data Collected & Stored (when sticky roles run):
* **Discord User ID**
* **Discord Guild ID**
* **Non-privileged Role IDs**
* **Timestamps**
* Admin, Manage Server, Manage Roles, Manage Channels, Kick, Ban, and Moderate roles are never auto-restored. Lead Dev and Dev are also excluded.

Admins can disable sticky roles with `/config stickyroles`.

---

### B. Message Content Intent (`MESSAGE_CONTENT`)

Saki needs message text to:

1. **@Saki mentions:** Read the question (and optional images), open a thread, and send the question to Cider's Rise support API.
2. **Support-thread follow-ups:** Read later messages from that user in the Saki thread and send them as follow-ups to the same Rise session.
3. **Support-channel heads-up:** In the designated support channel, notice a normal post and offer a heads-up. A reply to that heads-up is not sent to Rise. Ordinary chat is never forwarded. Use @Saki or `/ask` to start support.
4. **Starboard:** When a message reaches the star threshold, copy its text and attachments into the starboard channel.
5. **Ban-trap honeypot:** Detect a post in the ban-trap channel, delete it, and ban the author. The message text is not stored.
6. **Domain lists:** Check attachment and embed hosts against the guild whitelist/blacklist.
7. **Scam-link filter:** Check URLs in message text and hosts on attachments/embeds against a public scam-domain list. No Saki-ML classifier is used.
8. **Moderation alerts:** If a staff alert channel is configured, post a truncated copy of flagged message text (about 1900 characters) in that Discord channel. That text is not stored in Saki's database.

`/ask` does not need this intent. The question is a slash-command option.

Staff leftovers that also read message text if someone runs them: `/report-bug` (when enabled) and `/dump-forum`.

---

### C. Guild Message Reactions Intent (`GUILD_MESSAGE_REACTIONS`)

Saki uses this intent for the starboard. When enough star reactions are added to a message, Saki copies that message's text and attachments into the configured starboard channel. The database stores only Discord snowflake ids for the source and starboard messages, not the message body.

---

#### Data Handling:
* Support questions, optional images, and session metadata go to Cider's Rise support API. The metadata is only a source tag, Discord user id, and the relevant channel id, thread id, and parent channel id. Username is not sent.
* Rise is Cider-hosted. Support questions are processed by a language model hosted on Cider-controlled hardware. That processing is inference only. It does not use third-party AI providers. Discord messages are not used to train models in this bot.
* Rise session retention is not defined in the Saki bot. `/deleteactivity` does not delete Rise sessions.
* Thread session ids are held in memory for about 24 hours. Heads-up message and user ids are held in memory for about 30 minutes. Original channel text is not stored for heads-up.
* Starboard rows in Saki's database are Discord ids only. The copied text lives in the public Discord starboard channel.
* Bot logs record command name, user id, and username, not general chat.
* If staff confirm `/report-bug`, a transcript may be filed to GitHub via Rise.

#### What We Do Not Do:
* We do not run a Saki-ML spam classifier or send chat to Ollama.
* Message text used for link, host, and ban-trap checks is not stored in Saki's database.
* We do not keep a general chat archive in Saki's database.
* If staff set an alert channel, truncated flagged text may appear in a staff embed on Discord.
* We do not send leftover channel text to Rise when you reply to a heads-up.
* We do not send your Discord username to Rise as session metadata.
* We do not send support questions to third-party AI providers.
* We do not use Discord messages to train models.

---

## 3. Persistent Data Storage

Active support state lives on Rise, not in Saki's SQLite file.

Guild settings for domain lists, the scam-link toggle, the alert channel, and an optional ban-trap public notify channel are live configuration.

The bot may still have leftover local tables from older features (timezones, donations, casino, sticky-role snapshots). Those are not the support product. `/deleteactivity` can remove leftover local rows for your user id.

Starboard mappings stored locally are Discord snowflake ids only (`GuildId`, source channel/message ids, starboard channel/message ids).

---

## 4. Third-Party Services & Data Sharing

We do not sell, rent, trade, or monetize user data.

* **Discord Inc.:** Gateway and REST under Discord's terms. Starboard copies and staff alert embeds remain on Discord.
* **Rise (Cider-hosted support API):** Questions, follow-ups, optional images, and session metadata (`source`, Discord user id, channel/thread/parent channel ids). Username is not sent. Rise processes those questions with a language model hosted on Cider-controlled hardware, inference only. Staff bug-report drafts if that tool is enabled.
* **Discord-AntiScam scam-links list:** Saki downloads the public list.json from GitHub raw to match hosts. Message text is not sent to that project.

GitHub receives an issue only if staff confirm `/report-bug`.

---

## 5. Data Retention & Security

* **Retention Policy:**
  * Rise decides how long a support session is kept. The Discord bot has no session-delete call and no published TTL.
  * In-memory maps expire as noted above. That does not erase Rise.
  * Leftover local rows can be cleared with `/deleteactivity`, or by emailing [privacy@cider.sh](mailto:privacy@cider.sh) or [support@cider.sh](mailto:support@cider.sh) with your Discord User ID.
* **Security Measures:**
  * Local data is on Cider-controlled infrastructure.
  * Access is limited to authorized maintainers.

---

## 6. User Rights, Opt-Out, and Data Deletion

Under applicable privacy regulations (including GDPR and CCPA) and Discord Developer Policies, you have the right to access, rectify, or request deletion of personal data associated with your Discord account.

### No Per-User Opt-Out Yet
There is no per-user switch that turns off AI processing if you mention Saki or keep talking in a Saki support thread. New threads include an AI disclosure on the first message.

To stop, do not mention the bot, do not use `/ask`, and do not reply in a Saki support thread. `/resolved` archives and locks a Saki thread you own. It does not delete the Rise session.

### Leftover Local Data
`/deleteactivity` clears timezone, sticky-role, donation, and casino rows only. It does not delete Rise support sessions.

### How to Request Data Deletion
Email **[support@cider.sh](mailto:support@cider.sh)** or **[privacy@cider.sh](mailto:privacy@cider.sh)** with subject `Discord Data Deletion Request - [Your Discord User ID]`, or open a ticket in the official [Cider Collective Discord Server](https://discord.gg/applemusic).

`/deleteactivity` is immediate for leftover local rows. Email and tickets are typically handled within 72 hours, and within 30 days. Rise session deletion needs a Rise-side action. The bot cannot do it today.

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
