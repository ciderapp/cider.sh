---
title: "Discord Bot Privacy Policy"
description: "Privacy policy for Saki and Cider Discord Bots covering Guild Members Intent, Message Content Intent, data storage, and deletion rights."
---

# Discord Bot Privacy Policy

**Last Updated:** August 17, 2026  
**Effective Date:** August 17, 2026  

This Privacy Policy applies to the **Saki** Discord bot (and related Cider Discord Bots, collectively referred to as "the Bot", "we", "us", or "our"), operated by the **Cider Collective** ([cider.sh](https://cider.sh)).

We are committed to protecting user privacy, ensuring transparency in data processing, and complying with the **Discord Developer Terms of Service**, **Discord Developer Policy**, and applicable data protection laws, including the **General Data Protection Regulation (GDPR)** and the **California Consumer Privacy Act (CCPA)**.

---

## 1. Overview & Purpose

The Bot is designed to provide community administration, automated moderation, spam & phishing protection, AI-assisted support ticketing, utilities (such as timezones and media helpers), and server engagement features for Cider community servers and authorized partner servers.

---

## 2. Privileged Gateway Intents & Data Collection

To perform essential moderation, security, and utility operations, the Bot requires access to specific **Discord Privileged Gateway Intents**.

### A. Guild Members Intent (`GUILD_MEMBERS` / `GuildUsers`)

#### Purpose & Usage:
1. **Sticky Roles (Role Persistence):** When enabled by server administrators, the Bot restores a user's previous non-administrative roles if they leave and rejoin the guild. Because Discord's member-remove events do not include historical role metadata, the Bot captures role snapshots while members are present or during startup synchronization.
2. **Moderation Hierarchy & Safety Safeguards:** To inspect role positions and permissions before executing moderation actions (such as `/ban`, `/kick`, `/timeout`, `/unmute`, `/votekick`) to prevent unauthorized actions.
3. **Supporter & Contributor Role Assignment:** To verify and assign donor and supporter roles across platforms (e.g., OpenCollective, Ko-fi, GitHub Sponsors) using `/verify` or `/approve`.
4. **Server Economy & Participant Mapping:** To associate virtual server rewards (e.g., PRD Coin) with guild members.

#### Data Collected & Stored:
* **Discord User ID** (`ulong` format)
* **Discord Guild ID** (`ulong` format)
* **Assigned Role IDs** (List of non-privileged role IDs; administrative and staff roles with elevated permissions are strictly excluded from automated restoration for security reasons)
* **Timestamps** (Snapshot timestamp and leave timestamp)

#### What We Do NOT Collect:
* We do not collect or store user passwords, personal profile biographies, phone numbers, or linked external personal accounts without explicit user submission.

---

### B. Message Content Intent (`MESSAGE_CONTENT`)

#### Purpose & Usage:
1. **Anti-Spam & Phishing/Scam Link Protection:** Real-time scanning of incoming messages to detect known phishing URLs, scam domains, token grabbers, and mass-spam patterns.
2. **Automated Honeypot / Ban Trap Protection:** Real-time monitoring of designated honeypot channels (e.g., `#ban-trap`) to automatically detect, ban, and purge malicious raid bots and spam accounts.
3. **AI Support Assistant & Support Threads (`/ask`, Support Flow):** Processing user questions and conversational context when users ask questions or reply within support threads handled by Saki (via local LLM / Ollama or the Rise support API).
4. **Starboard System:** Retrieving message text, embeds, and attachments when messages reach the configured star reaction threshold so they can be reposted to the server's starboard channel.
5. **Staff Bug Reporting (`/report-bug`):** Collecting recent messages and screenshot attachments in a designated support thread when an authorized staff member initiates an issue report to GitHub / Rise.
6. **Command Handling & Media Utilities:** Inspecting URLs for transcoding/metadata operations (such as `yt-dlp` or `ffmpeg`) and handling configured automated community responses.

#### Data Storage vs. Ephemeral Processing:
* **Ephemeral Processing (In-Memory Only):**
  * Anti-spam analysis, scam link checks, and regular chat inspection happen **strictly in-memory** during message transit.
  * Message contents analyzed for spam classification (sent to the local/microservice ML spam classifier) are **never written to a persistent database or stored on disk**.
* **Persistent Records Involving Messages:**
  * **Starboard Entries:** Stored as mapping identifiers (`GuildId`, `SourceChannelId`, `SourceMessageId`, `StarboardChannelId`, `StarboardMessageId`). The content itself resides within the public Discord starboard channel.
  * **Bug Reports:** Thread context selected for bug reports is forwarded to the designated GitHub issue tracker / Rise backend solely upon explicit staff command invocation.
  * **No General Chat Logging:** The Bot does **NOT** maintain a persistent backlog or historical archive of user chat messages.

---

## 3. Persistent Data Storage

The Bot maintains a local SQLite database to store minimal operational data:

| Category | Stored Fields | Purpose |
| :--- | :--- | :--- |
| **User Timezones** | Discord User ID, IANA/System Timezone string, Update Timestamp | Used by the `/time` command to display localized times. |
| **Donations / Supporter Records** | Discord User ID, Platform Name (e.g., OpenCollective), Timestamp, Staff Notes | Used to track supporter role eligibility and grant perks. |
| **Server Configurations** | Guild ID, Channel IDs (Starboard, Mod Logs, Ban Trap), Role IDs, Feature Toggles, Domain Whitelist/Blacklist | Stores per-guild configuration set by server administrators. |
| **Virtual Economy (Casino)** | Discord User ID, Guild ID, Virtual Balance, Bet Logs, Active Session States | Powers opt-in virtual mini-games (PRD Coin). |

> **Note on `/verify`:** When users submit an email address with the `/verify` command to claim donor roles, the email is used ephemerally to query the donation platform API. Plaintext emails are **not** permanently stored in the Bot's database.

---

## 4. Third-Party Services & Data Sharing

We do **not** sell, rent, trade, or monetize user data. Data is shared with third-party service providers solely to the extent necessary to deliver the bot's functionality:

* **Discord Inc.:** Gateway communication, interaction handling, and REST API calls under Discord's Terms of Service and Privacy Policy.
* **ML Spam Classifier (Saki-ML):** Message text evaluated in-memory for spam scores.
* **Ollama / Rise AI Support Backend:** Support queries and thread context sent for automated troubleshooting and GitHub issue generation.
* **OpenCollective / Ko-fi / GitHub API:** Verification of supporter status for donor role allocation.

---

## 5. Data Retention & Security

* **Retention Period:** 
  * User configuration (Timezones, Sticky Roles, Casino wallets) is retained until the user requests deletion or the server removes the bot.
  * Ephemeral message data is discarded immediately after processing.
* **Security Measures:** 
  * Data is stored securely in an isolated SQLite database on our protected server infrastructure.
  * Access is restricted to authorized bot maintainers.
  * Administrative credentials and Discord bot tokens are stored via encrypted environment variables.

---

## 6. User Rights, Opt-Out, and Data Deletion

Under applicable privacy regulations (including GDPR and CCPA), you have the right to access, rectify, opt-out of, or delete any personal data associated with your Discord account.

### How to Opt-Out
* **Timezone Data:** You may clear or update your timezone at any time using `/time set`.
* **Sticky Roles:** Server administrators can disable the feature server-wide via `/config sticky-roles enable:False` or exclude specific roles with `/config sticky-roles exclude-role`.
* **Bot Interaction:** You can choose not to interact with commands or opt-in mini-games.

### How to Request Data Deletion ("Right to be Forgotten")
To request the complete deletion of all data associated with your Discord User ID (including timezone entries, role snapshots, donation logs, and casino ledger records), you may contact us using any of the methods below:

1. **Email Request (Recommended):**
   * **Primary Privacy Email:** [privacy@cider.sh](mailto:privacy@cider.sh)
   * **Support Email:** [support@cider.sh](mailto:support@cider.sh)
   * **Subject Line:** `Discord Data Deletion Request - [Your Discord User ID]`
   * **Required Details:** Please include your **Discord User ID** (17–19 digit numeric ID) so we can locate and purge your records.

2. **Discord Support Server / Ticket:**
   * Join the official [Cider Collective Discord Server](https://discord.gg/cider) and open a support ticket with staff.

3. **Processing Time:**
   * All verified deletion requests will be processed within **30 days** (and typically within 72 hours).

---

## 7. Changes to This Privacy Policy

We may periodically update this Privacy Policy to reflect changes in bot features, legal requirements, or Discord policies. Any revisions will be published on this page with an updated "Last Updated" date. Continued use of the Bot after modifications constitutes acceptance of the updated policy.

---

## 8. Contact & Operator Information

If you have questions, feedback, or concerns regarding this Privacy Policy or our data practices, please contact us:

* **Privacy Contact:** [privacy@cider.sh](mailto:privacy@cider.sh)
* **General Support:** [support@cider.sh](mailto:support@cider.sh)
* **GitHub Repository:** [https://github.com/ciderapp/Saki](https://github.com/ciderapp/Saki)
* **Community Discord:** [https://discord.gg/cider](https://discord.gg/cider)
* **Organization:** Cider Collective
