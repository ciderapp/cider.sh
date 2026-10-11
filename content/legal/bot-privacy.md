---
title: "Discord Bot Privacy Policy"
description: "Privacy policy for Saki and Cider Discord Bots covering Server Members Intent, Message Content Intent, data storage, and deletion rights."
---

# Discord Bot Privacy Policy

**Last Updated:** October 11, 2026  
**Effective Date:** October 11, 2026  

This Privacy Policy applies to the **Saki** Discord bot (and related Cider Discord Bots, collectively referred to as "the Bot", "we", "us", or "our"), operated by the **Cider Collective** ([cider.sh](https://cider.sh)).

We are committed to protecting user privacy, ensuring transparency in data processing, and complying with the **Discord Developer Terms of Service**, **Discord Developer Policy**, and applicable data protection laws, including the **General Data Protection Regulation (GDPR)** and the **California Consumer Privacy Act (CCPA)**.

---

## 1. Overview & Purpose

The Bot is designed to provide community administration, automated moderation, spam and phishing protection, AI-assisted support ticketing, utilities (such as timezones and media helpers), and server engagement features for Cider community servers and authorized partner servers.

---

## 2. Privileged Gateway Intents & Data Collection

Saki is configured with these Discord Gateway intents: Guilds, Guild Messages, Guild Message Reactions, Message Content, and Server Members (Guild Members). Presence is not used.

### A. Server Members Intent (`GUILD_MEMBERS` / `GuildUsers`)

#### Purpose & Usage:
1. **Sticky Roles:** When server admins leave this feature enabled, Saki restores a member's previous non-admin roles if they leave and rejoin. Discord does not include old roles on the leave event, so Saki stores a role snapshot while the member is present (on join, on role change, and a one-time member-list backfill at startup) and reapplies safe roles on rejoin.

#### What This Intent Is Not Used For:
* Ban, kick, timeout, and similar commands use the member object Discord already sends with the slash command or button, or a one-off REST lookup of that user id.
* Spam risk checks, domain-filter bypass, and staff checks use the same per-user lookup or the interaction member. They do not need a full member list or join/leave events.

#### Data Collected & Stored:
* **Discord User ID**
* **Discord Guild ID**
* **Non-privileged Role IDs**
* **Timestamps** (`UpdatedAtUtc`, `LeftAtUtc`)
* Admin, Manage Server, Manage Roles, Manage Channels, Kick, Ban, and Moderate roles are never auto-restored. Lead Dev and Dev are also excluded.

#### What We Do NOT Collect:
* We do not collect or store user passwords, personal profile biographies, phone numbers, or linked personal accounts.

Server admins can disable sticky roles with `/config stickyroles`.

---

### B. Message Content Intent (`MESSAGE_CONTENT`)

#### Purpose & Usage:
1. **Spam and Scam Protection:** For users with no role or only the member role (staff and supporters skipped), Saki reads message text and URLs, checks hosts against a maintained scam-domain list, and may send the text to Cider's local Saki-ML classifier. Flagged messages can be deleted. A staff alert channel may include a truncated copy of the text.
2. **Image and Embed Host Blocking:** Attachment and embed hosts are checked against guild allow/deny lists and built-in suspicious patterns.
3. **Ban-Trap Honeypot:** Any human message in the configured trap channel causes a delete and an automated ban. The text is not stored.
4. **AI Support:** An explicit @Saki mention reads the question and optional images, opens a thread, and sends the question to Cider's Rise support API. Later messages from that user in the thread are sent as follow-ups. In the regulated support channel, a message without a mention can get a heads-up; a reply to that heads-up uses the original text as the question.
5. **Starboard:** When a message reaches the star threshold, Saki copies its text and attachments into the starboard channel.
6. **Staff Bug Reports (`/report-bug`):** Saki reads the current support thread (default up to 50 messages and a small number of screenshots), sends that context to Rise to draft a GitHub issue, and files the issue only after staff confirm.
7. **Staff Forum Export (`/dump-forum`):** Saki reads forum titles and messages and builds a Markdown file (optional attachment zip) sent only to the staff member. Temp files are deleted after upload.
8. **`/vibecheck`:** On request, Saki reads that user's recent messages in the channel and sends them to a local Ollama model for a one-off score and summary.

#### What We Do Not Do With This Intent:
* There is no keyword auto-reply feature in the running bot. A leftover admin toggle exists and does nothing.
* `/ask`, `/ffmpeg`, and `/ytdlp` take text from slash-command options. They do not scan channel chat.
* Saki does not keep a general chat archive.

#### Data Handling:
* Saki's SQLite database does not store message bodies. Starboard rows are Discord snowflake ids only.
* Support questions, optional images, and session metadata are sent to Cider's Rise support API for an answer. Rise is Cider-hosted. This is inference over Cider's knowledge base, not training on Discord chat. How long Rise keeps a support session is controlled on Rise, not in the bot.
* Staff-confirmed bug reports are drafted on Rise and may be filed to GitHub. That transcript can persist on Rise and in the GitHub issue.
* Spam classification POSTs text to the local Saki-ML service for a score. The bot does not write that text to its database.
* `/vibecheck` sends recent messages to Ollama on Cider-controlled hardware (default local endpoint) for inference only.
* Forum exports exist as a short-lived temp file, then as a file the staff member downloaded. The bot does not keep a copy.
* Flagged text may be posted to a Discord staff-alert channel (still on Discord).
* In-memory only: support-thread session ids (about 24 hours) and heads-up original text (about 30 minutes).
* Bot logs record command name, user id, and username. They do not log general chat.

---

## 3. Persistent Data Storage

The Bot maintains a local SQLite database (`saki.db`) to store minimal operational data:

| Category | Stored Fields | Purpose |
| :--- | :--- | :--- |
| **User Timezones** | Discord User ID, IANA timezone string, Update Timestamp | Used by the `/time` command to display localized times. |
| **Donations / Supporter Records** | Discord User ID, Platform Name, Timestamp, Staff Notes | Used to track supporter role eligibility. |
| **Server Configurations** | Guild ID, Channel IDs (Starboard, Mod Logs, Ban Trap), Role IDs, Feature Toggles, Domain Allow/Deny Lists | Stores per-guild configuration set by server administrators. |
| **Virtual Economy (Casino)** | Discord User ID, Guild ID, Virtual Balance, Bet Logs, Active Session States | Powers opt-in virtual mini-games (PRD Coin). |
| **Sticky Role Snapshots** | Discord User ID, Guild ID, Role IDs, Timestamps | Used to restore non-admin roles on rejoin. |

> **Note on `/verify`:** When users submit an email address with the `/verify` command to claim donor roles, the email is used ephemerally to query the donation platform API. Plaintext emails are not permanently stored in Saki's database.

---

## 4. Third-Party Services & Data Sharing

We do not sell, rent, trade, or monetize user data. Data is shared with third-party service providers solely to the extent necessary to deliver the bot's functionality:

* **Discord Inc.:** Gateway and REST under Discord's terms.
* **Rise (Cider-hosted support API):** Support questions, thread follow-ups, and staff bug-report drafts. Answers use Cider docs (RAG). Not used to train models on Discord messages in the bot.
* **Saki-ML (Cider-hosted classifier):** Message text for a spam score.
* **Ollama (Cider-hosted, used only by `/vibecheck`):** Recent messages from the user who ran the command, inference only.
* **OpenCollective, Ko-fi, and GitHub APIs:** Supporter verification. GitHub also receives issues that staff file with `/report-bug`.

---

## 5. Data Retention & Security

* **Retention Policy:**
  * User data (such as sticky role snapshots, timezones, and virtual casino balances) is usually cleared when a user leaves with intent.
  * Stored account data can be cleared at any time with `/deleteactivity`, or by emailing [support@cider.sh](mailto:support@cider.sh) or [privacy@cider.sh](mailto:privacy@cider.sh) with a Discord User ID.
  * `/deleteactivity` deletes timezone, sticky-role, donation, and casino rows. It does not stop message scanning and does not delete chat, because the bot does not store a chat log.
  * Support session retention on Rise is controlled by Rise, not by this bot.
* **Security Measures:**
  * Stored data is kept in an isolated SQLite database on Cider-controlled infrastructure.
  * Access is restricted to authorized bot maintainers.
  * Administrative credentials and Discord bot tokens are stored via environment variables.

---

## 6. User Rights, Opt-Out, and Data Deletion

Under applicable privacy regulations (including GDPR and CCPA) and Discord Developer Policies, you have the right to access, rectify, opt-out of, or delete personal data associated with your Discord account.

### How to Opt-Out
* **Timezone Data:** Clear or update with `/set-timezone`.
* **Sticky Roles:** Server administrators can disable restoration with `/config stickyroles` or exclude roles with `/config stickyroles exclude-add`.
* **Support and `/vibecheck`:** You can choose not to use `/ask`, @Saki mentions, support-thread replies, or `/vibecheck`.
* **Message Scanning:** There is no per-user switch that stops automated spam, scam, domain, ban-trap, or starboard reads. Server admins can disable spam, scam, and domain filters with `/config`.

### How to Request Data Deletion ("Right to be Forgotten")
To request the complete deletion of stored account data associated with your Discord User ID (including timezone entries, role snapshots, donation logs, and casino ledger records), you have the following options:

1. **Instant Self-Service Command:**
   * Run the `/deleteactivity` slash command in a server with the bot. The bot shows an ephemeral confirmation listing your records and can purge them immediately.

2. **Direct Email Request:**
   * Email **[support@cider.sh](mailto:support@cider.sh)** or **[privacy@cider.sh](mailto:privacy@cider.sh)**.
   * **Subject Line:** `Discord Data Deletion Request - [Your Discord User ID]`
   * **Required Details:** Include your **Discord User ID** (17-19 digit numeric ID).

3. **Discord Support Server / Ticket:**
   * Join the official [Cider Collective Discord Server](https://discord.gg/applemusic) and open a support ticket with your Discord User ID.

4. **Processing Time:**
   * `/deleteactivity` takes effect immediately. Email and ticket requests are typically processed within 72 hours, and within 30 days.

---

## 7. Changes to This Privacy Policy

We may update this Privacy Policy to reflect changes in bot features, legal requirements, or Discord policies. Revisions are published on this page with an updated "Last Updated" date. Continued use of Saki after modifications constitutes acceptance of the updated policy.

---

## 8. Contact & Operator Information

If you have questions, feedback, or concerns regarding this Privacy Policy or our data practices, please contact us:

* **Privacy Contact:** [privacy@cider.sh](mailto:privacy@cider.sh)
* **General Support:** [support@cider.sh](mailto:support@cider.sh)
* **Public Policy:** [https://cider.sh/legal/bot-privacy](https://cider.sh/legal/bot-privacy)
* **Community Discord:** [https://discord.gg/applemusic](https://discord.gg/applemusic)
* **Organization:** Cider Collective
