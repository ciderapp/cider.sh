---
title: "Discord Bot Privacy Policy"
description: "Privacy policy for Saki, Cider's Discord support bot: how support, starboard, and safety tools use your data."
---

# Discord Bot Privacy Policy

**Last Updated:** October 11, 2026  
**Effective Date:** October 12, 2026  

This Privacy Policy applies to the **Saki** Discord bot (and related Cider Discord bots, together "the Bot", "we", "us", or "our"), operated by the **Cider Collective** ([cider.sh](https://cider.sh)).

We are committed to protecting your privacy and following the **Discord Developer Terms of Service**, the **Discord Developer Policy**, and applicable privacy laws, including the **General Data Protection Regulation (GDPR)** and the **California Consumer Privacy Act (CCPA)**.

---

## 1. What Saki Does

Saki is Cider Collective's Discord support bot for Cider community servers. It helps with Cider questions and also runs a few server tools.

**Support**

* Ask a question with the `/ask` command.
* Mention @Saki, which can open a support thread.
* Reply in that Saki support thread to continue the same question.
* In the support channel, Saki may post a short note that you can get help by mentioning @Saki or using `/ask`. A reply to that note does not start a thread and does not send your earlier message to Cider's support service.
* Close a Saki support thread with `/resolved`.

The first message in a new support thread says that answers are written by AI through Cider's support service, that your messages are not used to train models, and how to stop (use `/resolved`, or stop replying).

Support questions are processed by a language model hosted on computers Cider controls. That model is used only to answer your question.

**Starboard**

When a message gets enough star reactions, Saki copies its text and files into the server's starboard channel.

**Safety tools**

* **Ban-trap channel:** If someone posts in the server's ban-trap channel, that post is deleted and the poster is banned. Their messages from the last 7 days are also removed. Saki does not store the text of that post.
* **Allowed and blocked sites:** Links in files and link previews are checked against lists the server sets (on by default).
* **Scam-link checks:** Web addresses in a message, and links in files and link previews, are checked against a public community list of known scam sites (on by default).
* **Staff alerts:** If staff choose an alert channel, a flagged link can post a staff message there with a shortened copy of the original text (about 1900 characters). The alert is posted in Discord. Saki's database does not store that copy.

Staff can also use `/report-bug` to file a bug from a support thread, or export a forum with `/dump-forum` / `/forum`. Those tools are for staff only.

---

## 2. Gateway Intents and Why We Use Them

Discord "gateway intents" are permissions that tell Discord which events a bot may receive. Saki uses these:

* **Servers (Guilds):** So Saki can see the servers it is in and their channels.
* **Server messages (Guild Messages):** So Saki can receive messages, including mentions and support-thread replies.
* **Message Content:** So Saki can read message text and files when you mention @Saki, reply in a support thread, or when a message is copied to the starboard. Saki also reads ordinary server messages to check links and to notice posts in the ban-trap channel. Discord hides that text unless this permission is approved. `/ask` does not need it, because you type the question into the command.
* **Message reactions (Guild Message Reactions):** So Saki can see star reactions and copy a message to the starboard when enough people star it.
* **Server Members:** So sticky roles can give someone back their previous non-admin roles if they leave and rejoin. Support answers do not use this permission.

Saki does not track whether you are online.

### A. Server Members

**Why we use it**

Sticky roles, if left on, give a member back their previous non-admin roles after they leave and rejoin. Discord does not send the old roles when someone leaves, so Saki saves a copy of their roles when they join, when their roles change, and when the bot starts.

Support answers use the person who ran the command. They do not use this permission.

**What is stored when sticky roles are on**

* Your Discord user ID
* The server ID
* Non-admin role IDs
* When that copy was saved

If someone leaves the server, Saki keeps that copy for 30 days so their roles can be given back if they rejoin. After 30 days from when they left, the copy is deleted automatically and is not used to restore roles. If they are still in the server, the copy is updated when their roles change.

Admin and powerful roles (such as Administrator, Manage Server, Manage Roles, Kick, Ban, and Moderate) are never restored automatically. Staff and developer roles are also left out.

Server admins can turn sticky roles off with `/config stickyroles`.

---

### B. Message Content

Saki reads message text to:

1. **@Saki mentions:** Read your question (and any images), open a thread, and send the question to Cider's support service.
2. **Support-thread replies:** Read later messages from you in that thread and send them as follow-ups.
3. **Support-channel note:** Notice a post in the support channel and offer a short how-to. A reply to that note is not sent to Cider's support service. Use @Saki or `/ask` to start support.
4. **Starboard:** Copy the text and files of a starred message into the starboard channel.
5. **Ban-trap channel:** Notice a post there, delete it, and ban the author. That text is not stored.
6. **Site lists:** Check links in files and link previews against the server's allow and block lists.
7. **Scam-link checks:** Check web addresses in the message and links in files and link previews against a public list of known scam sites.
8. **Staff alerts:** If staff set an alert channel, post a shortened copy of a flagged message there (about 1900 characters). The copy is posted in Discord, not stored in Saki's database.

`/ask` does not need this permission. The question is part of the command.

Staff tools that read messages when used: `/report-bug` and `/dump-forum`.

---

### C. Message Reactions

Saki uses this permission for the starboard. When enough people add a star to a message, Saki copies that message's text and files into the starboard channel. Saki's database stores only Discord IDs for the original message and the starboard copy, not the message text.

---

### How support data is handled

* Your question, any images you attach, and a small set of IDs (your Discord user ID and the channel or thread IDs) go to Cider's support service. Your Discord username is not sent with that request.
* Cider's support service runs on Cider's own systems. A language model on computers Cider controls is used only to answer your question. Your Discord messages are not used to train models.
* Cider's support service deletes a support session, including the question, follow-ups, and images, 30 days after the last activity in that session. The Discord bot does not delete those sessions. `/deleteactivity` does not delete them.
* Saki remembers which support thread belongs to which conversation for about 24 hours, and remembers a recent how-to note for about 30 minutes so it can tell if someone replies to it. It does not store the original channel text from that note.
* Starboard records in Saki's database are Discord IDs only. The copied text lives in the starboard channel on Discord.
* Bot logs record the command name and your user ID and username. They do not record ordinary chat.
* If staff confirm `/report-bug`, a copy of that thread may be filed as a GitHub issue through Cider's support service.

### What we do not do

* We do not sell, rent, or trade your data.
* We do not keep a general archive of chat history.
* We do not use your messages to train models.
* We do not send support questions to outside AI companies.

---

## 3. What Saki Stores

Active support conversations live in Cider's support service, not in the Discord bot's local database. The support service deletes those sessions 30 days after the last activity. The Discord bot does not delete them.

Saki's local database may store:

* Server settings for site lists, the scam-link check, the staff alert channel, and an optional public notice channel for the ban-trap
* Which messages were copied to the starboard (Discord IDs only)
* Timezone, donation, mini-game, and sticky-role records if you used those features. A sticky-role copy for someone who has left is kept for 30 days after they leave, then deleted.

`/deleteactivity` can remove timezone, sticky-role, donation, and mini-game records for your user ID. It does not remove server settings, starboard posts, or support sessions.

---

## 4. Who We Share Data With

We do not sell, rent, trade, or monetize user data.

* **Discord:** Discord is the platform Saki runs on. Messages and bot actions pass through it. Starboard copies and staff alerts are posted in Discord channels.
* **Cider's support service:** Support questions, follow-ups, optional images, and the IDs listed above are sent to Cider's own support service. A language model running on Cider-controlled computers writes the answer. Staff bug-report drafts also go this way.
* **Public scam-site list:** Saki downloads a public list of known scam websites and compares link domains against it locally. Nothing from your messages is sent out for this check.

If staff confirm `/report-bug`, GitHub receives the issue they file.

---

## 5. How Long We Keep Data and How We Protect It

* Cider's support service deletes a support session 30 days after the last activity in that session. The Discord bot cannot delete support sessions.
* Sticky-role copies for people who have left are deleted 30 days after they leave.
* The short-lived records described above expire on their own. They do not control the support session.
* You can clear some local records with `/deleteactivity`, or by emailing [privacy@cider.sh](mailto:privacy@cider.sh) or [support@cider.sh](mailto:support@cider.sh) with your Discord user ID.
* Local data is kept on systems Cider controls. Access is limited to people who maintain the bot.

---

## 6. Your Rights and How to Ask Us to Delete Data

Under privacy laws such as GDPR and CCPA, and under Discord's rules, you can ask to see, correct, or delete personal data tied to your Discord account.

There is no setting that turns off AI help if you mention Saki or keep talking in a Saki support thread. New threads include a notice that answers are AI generated.

To stop, do not mention the bot, do not use `/ask`, and do not reply in a Saki support thread. `/resolved` archives and locks a Saki thread you own. It does not delete the support session.

`/deleteactivity` clears timezone, sticky-role, donation, and mini-game records only.

To request deletion, email **[support@cider.sh](mailto:support@cider.sh)** or **[privacy@cider.sh](mailto:privacy@cider.sh)** with the subject `Discord Data Deletion Request - [Your Discord User ID]`, or open a ticket in the [Cider Collective Discord](https://discord.gg/applemusic).

`/deleteactivity` takes effect right away for those local records. Email and tickets are usually handled within 72 hours, and within 30 days. Deleting a support session has to be done by Cider staff on the support service. The Discord bot cannot delete support sessions.

---

## 7. Changes to This Privacy Policy

We may update this page when the bot, the law, or Discord's rules change. The "Last Updated" date will change. If you keep using Saki after an update, that means you accept the new policy.

---

## 8. How to Contact Us

If you have questions about this Privacy Policy or how we handle data, please contact us:

* **Privacy:** [privacy@cider.sh](mailto:privacy@cider.sh)
* **Support:** [support@cider.sh](mailto:support@cider.sh)
* **This policy:** [https://cider.sh/legal/bot-privacy](https://cider.sh/legal/bot-privacy)
* **Community Discord:** [https://discord.gg/applemusic](https://discord.gg/applemusic)
* **Organization:** Cider Collective
