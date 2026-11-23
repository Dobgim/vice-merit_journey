# Rules for the listing routines

Every routine that adds opportunities to meritleaders.com follows this file. The routine's own
prompt says which run it is (daily or subject search) and points to its run file in this folder.
The site owner changes these rules by editing this file; always use the version in the repo.

## Who the site is for

Students and young professionals in Africa (mainly Cameroon and Nigeria, also Ghana, Kenya and the
rest of the continent) looking for funded study abroad. Most of them want a **master's** or a
**bachelor's** scholarship. Every listing must be open to them.

- Skip anything limited to citizens, residents or organisations of a single country other than
  Cameroon or Nigeria. Examples: grants only for Greek NGOs, a US-only scholarship, a UK-home-students
  award.
- Skip awards limited to one university's current students.

## Daily targets (all of today's runs together, UTC)

Scholarships come first. They are the owner's top priority.

| Type | At least per day |
|---|---|
| Scholarships | 15 |
| Fellowships | 5 |
| Grants | 5 |
| Internships | 5 |
| Competitions | 5 |

**Scholarship level mix per day:**
- **At least 6 master's.**
- **At least 4 bachelor's / undergraduate.**
- **At most 4 that are PhD only.**

A scholarship open to several levels counts for each of them. When today already has 4 PhD-only
scholarships, do not add another PhD-only one; look for master's and bachelor's instead.

**Country spread per day (all types):**
- **At most 3 new listings from any one country.**
- **At most 2 from the United Kingdom.**
- Multi-country or worldwide calls (Erasmus Mundus, international organisations, online) don't
  count towards any country.

When a country is full, move on to another one.

Check the counts with `node scripts/today-counts.mjs` **at the start of the run and again before each
addition.** It prints today's numbers by type, the scholarship levels, the countries, and which
countries are full.

## Where to look: start with today's region

Start with the region for today's weekday (UTC), then cover the others:

| Day | Region to start with |
|---|---|
| Monday | Germany, France, Italy, Spain, Portugal |
| Tuesday | Netherlands, Belgium, Sweden, Finland, Norway, Denmark, Austria, Switzerland |
| Wednesday | Hungary, Poland, Czech Republic, Romania, Türkiye, Ireland, Greece, Cyprus, Malta |
| Thursday | Japan, South Korea, China, Taiwan, Malaysia, Singapore, Thailand, Brunei, India |
| Friday | Canada, United States, Australia, New Zealand |
| Saturday | Saudi Arabia, UAE, Qatar, Kuwait, Oman; Africa (South Africa, Rwanda, Ghana, Kenya, Egypt, Morocco, Mauritius) |
| Sunday | Erasmus Mundus joint master's, and multi-country programmes (World Bank, AfDB, OFID, Mastercard Foundation, Commonwealth) |

**Good sources by level:**
- **Bachelor's:** government scholarships (Türkiye Bursları, Korea GKS undergraduate, MEXT
  undergraduate, Stipendium Hungaricum, Brunei Darussalam, Chinese Government and Chinese
  university scholarships, Romanian, Czech, Mauritius and Gulf state scholarships); international
  undergraduate scholarships at universities in Canada, the USA, Europe and Asia; Mastercard
  Foundation partner universities.
- **Master's:** the Erasmus Mundus catalogue; DAAD (EPOS and others); Swedish Institute; Holland,
  Orange Tulip and Dutch university excellence scholarships; Belgian (VLIR-UOS, ARES), French (Eiffel
  and university), Italian (university and regional DSU) and Swiss university scholarships; Japanese,
  Korean, Chinese, Taiwanese and Malaysian government scholarships; Australian and New Zealand
  university scholarships; Commonwealth and African Union calls.
- **PhD:** only after the master's and bachelor's minimums are met.

**Search ideas** (change the country, field, level and month each time):
- "master's scholarship <country> 2027 international students deadline"
- "undergraduate scholarship <country> 2027 international students"
- "<university> international excellence scholarship 2027"
- "government scholarship 2027 <country> African students"

Aggregators are fine for **finding** leads, never as the link.

## Run length: don't stop early

Earlier runs stopped after about 4 minutes and 40 searches, with 0 scholarships. That is not
acceptable.

**Minimum effort per run:**
- **Daily run:** at least 60 WebSearch queries, at least 35 of them for scholarships, and at least 25
  candidate calls checked on the funder's own site.
- **Subject run:** at least 45 queries, at least half of them for scholarships, and at least 20
  candidates checked.

Keep a running tally. When a search only finds calls that are already listed, change the angle
(another country, university, field or level) and keep going. **Ending a run before these minimums is
a failure.** The final report must state the number of queries and candidates checked, per type.

## What qualifies (all must be true)

1. The application window is open today to new applicants. Not "opening soon", not closed, not
   invitation-only, not limited to people who passed an earlier stage.
2. One specific closing date (YYYY-MM-DD), at least 5 days from today, confirmed on the funder's own
   domain.
   - Rolling, "varies by country/embassy/course", "year-round" or estimated deadlines do not qualify.
   - If sources disagree, use the earliest date and say so in `note`.
3. `url` is the funder's own page for this call. Never a general index, a homepage (unless it is the
   call), a search link, or an aggregator (opportunitydesk, opportunitiesforyouth,
   globalsouthopportunities, opportunitiesforafricans, advance-africa, scholars4dev, fundsforngos,
   scholarshipsads, wemakescholars, scholarshipunion, internshala…).
4. It is open to applicants from Africa (see "Who the site is for").
5. It is not already on the site. Run `grep -ri` on the programme name and key words across
   `src/data/*.js`, and check `retiredSlugs` in `src/data/fixes-oct21-2026.js`.
6. It is funded (fully or partly), or, for a competition, has a prize. If applying costs money, put
   the fee in `note` and add 'Application fee' to `tags`.

**The quality rules always win over the numbers.** Never pad.

## Checking official pages in the sandbox

Direct web access (curl, WebFetch) to funder sites is usually blocked. Use WebSearch for everything.

To check a call on the funder's site, run WebSearch with `allowed_domains` set to the funder's domain
(for example `["tudelft.nl"]`). The result lists the official pages with their URLs and summarises
them. That counts as checking the official page. Only use a URL that WebSearch returned from the
funder's own domain.

## How to add a listing

Append rows to the right array in `src/data/listings-auto.js` (`scholarshipRows`, `fellowshipRows`,
`grantRows`, `internshipRows`, `competitionRows`). Follow the existing rows exactly.

**Fields:** `name`, `org`, `country`, `flag`, `level`, `funding` (scholarships) or `category` (others),
`focus`, `who`, `amount`, `summary`, `deadline`, `opens` (only if known), `note`, `url`, `logoDomain`,
`tags`, `added`, `eligibility`, `documents`.

- **`level`:** write the real levels plainly, so the counts work. Examples: "Master’s",
  "Bachelor’s", "Bachelor’s and Master’s", "PhD".
- **`country`:** the host country's plain name (for example "Germany", "United Kingdom").
- **`added`:** the exact UTC time from `date -u +%Y-%m-%dT%H:%M:00Z`. Never a future date.
- **`summary`:** one plain sentence.
- **`eligibility`:** 3 to 8 short items from the official call (nationality or region, level and
  degree, age, grades, language, work experience, other conditions).
- **`documents`:** everything the call asks applicants to submit.
- Write only what the official call states. Never guess.
- Use ’ or double quotes for apostrophes.
- Do not edit any other data file.

## Check, commit, push

1. Try `npm install` then `npm run build`. If npm can't download packages, re-read your edits for
   JavaScript syntax.
2. Never commit `package-lock.json`. Revert it with `git checkout package-lock.json`.
3. Commit only `src/data/listings-auto.js`, after each type (scholarships first), so nothing is lost
   if the run is cut short. Use the commit message format given in the run file.
4. Run `git pull --rebase origin main`, then push to main. If pushing is refused, push a branch and
   open a pull request.
