# Rules for the listing routines

Every routine that adds opportunities to meritleaders.com follows this file. The routine's own
prompt says which run it is (daily or subject search) and points to its run file in this folder.
The site owner changes these rules by editing this file; always use the version in the repo.

## The goal: have every scholarship the other sites have

The owner wants meritleaders.com to list **every** open scholarship that other scholarship sites
and consultancies post, and more. If another site has it and we don't, that's a gap to fix.

- Include anything **international applicants** can apply for, from any country, at any level. Don't
  skip a call because of the applicant's nationality or region, as long as it is open to
  international or foreign applicants.
- Skip only calls that no foreign applicant can join (for example, citizens-only national awards, or
  awards only for a university's current students).

## Daily targets (all of today's runs together, UTC)

Scholarships come first. They are the owner's top priority.

| Type | At least per day |
|---|---|
| Scholarships | 25 (only strong ones; see "Strong listings only" below) |
| Fellowships | 5 |
| Grants | 5 |
| Internships | 5 |
| Competitions | 5 |

**Scholarship level mix per day:**
- **At least 8 master's.**
- **At least 5 bachelor's / undergraduate.**
- **At most 6 that are PhD only.**

A scholarship open to several levels counts for each of them.

**Fully funded first:** at least **10 of the day's scholarships must be fully funded**. Search for
fully funded calls first (government scholarships, Erasmus Mundus, foundation and named university
scholarships that cover tuition and living costs) and add partly funded ones only after that. Mark a
call `Fully Funded` only if the official page says it covers full tuition and a living allowance or
stipend. If you can't find 10 real ones, don't relabel partial awards; say so in the final report.

**Strong listings only.** The owner wants powerful listings, not weak ones. Fewer strong listings
are better than many weak ones, so the 25 is a goal, never a reason to add a weak call.
- **At most 5 partially funded scholarships per day**, across all runs.
- A partially funded scholarship qualifies only if it gives **at least one** of:
  - a **full tuition waiver**;
  - **at least 50% of tuition**;
  - **at least US$10,000 a year** (or the same in another currency, for example €9,000, £8,000);
  - a **monthly stipend or living allowance**.
- **Skip:** small fee discounts (10–30%), one-off awards under US$5,000, "up to" awards with no
  minimum, early-payment or alumni discounts, and awards that only reduce a fee the university set
  high on purpose. If the official page gives no amount, skip it.
- Put the real value in `amount` (for example "50% tuition waiver, about €9,000 a year"), so
  visitors can see why it is worth applying.
- The same standard applies to fellowships and grants (a real stipend or a meaningful sum), and
  internships must be **paid** or come with a stipend.

**The other types count too:** fellowships, grants, internships and competitions have their own
time in every run (see the run files). Don't spend the whole run on scholarships. For internships,
look for paid programmes with a fixed application window (UN agencies, international organisations,
development banks, central banks, research institutes, large companies' international programmes).

**Country spread per day (all types):**
- **At most 5 new listings from any one country.**
- **At most 4 from the United Kingdom.**
- Multi-country or worldwide calls (Erasmus Mundus, international organisations, online) don't
  count towards any country.

When a country is full, move on to another one.

Check the counts with `node scripts/today-counts.mjs` **at the start of the run and again before each
addition.**

## Where to look: every region, every day

Search **all regions in every run**, not one region per day:

| Region | Countries |
|---|---|
| Europe | Germany, France, Italy, Spain, Portugal, Netherlands, Belgium, Sweden, Finland, Norway, Denmark, Austria, Switzerland, Ireland, Hungary, Poland, Czech Republic, Romania, Greece, Cyprus, Malta, the UK |
| Asia | China, Japan, South Korea, Taiwan, Hong Kong, Malaysia, Singapore, Thailand, Indonesia, Brunei, India, Pakistan |
| Middle East | Türkiye, Saudi Arabia, UAE, Qatar, Kuwait, Oman, Israel |
| Americas | Canada, the United States, Latin America |
| Africa | South Africa, Rwanda, Ghana, Kenya, Egypt, Morocco, Tunisia, Mauritius, Nigeria, Cameroon |
| Oceania | Australia, New Zealand |
| Multi-country | Erasmus Mundus, World Bank, AfDB, OFID, Mastercard Foundation, Commonwealth, WAHO, African Union |

**Good sources by level:**
- **Bachelor's:**
  - government scholarships (Türkiye Bursları, Korea GKS undergraduate, MEXT undergraduate,
    Stipendium Hungaricum, Brunei Darussalam, Chinese Government and Chinese university
    scholarships, Romanian, Czech, Mauritius and Gulf state scholarships);
  - international undergraduate scholarships at universities in the USA, Canada, Europe and Asia;
  - Mastercard Foundation partner universities.
- **Master's:**
  - the Erasmus Mundus catalogue;
  - DAAD (EPOS, In-Region and others) and the Swedish Institute;
  - Eiffel and French university scholarships;
  - Holland, Orange Tulip and Dutch university excellence scholarships;
  - Belgian (VLIR-UOS, ARES), Italian (university and DSU), Spanish and Swiss scholarships;
  - Qatar (HBKU, Doha Institute) and Saudi scholarships;
  - Japanese (MEXT university recommendation), Korean, Chinese, Taiwanese and Malaysian scholarships;
  - Australian and New Zealand university scholarships;
  - Oxford, Cambridge and other UK named scholarships.
- **PhD:** funded PhD positions and doctoral schools, after the master's and bachelor's minimums.

## Coverage check against other scholarship sites (every daily run)

Look at the newest posts on these sites and add every qualifying call we don't have yet:
- scholarshipsads.com (its "latest scholarships" page)
- opportunitydesk.org
- scholars4dev.com
- opportunitiesforafricans.com
- afterschoolafrica.com
- scholarshipregion.com
- wemakescholars.com

Use WebSearch, for example with `allowed_domains: ["scholarshipsads.com"]` and a query like "latest
scholarships 2027". For each scholarship they list:
1. `grep` our data for it.
2. If it's missing, find the funder's own page and check it there (see "Checking official pages").
3. Add it if it qualifies.

**These sites are for finding calls only. The link we publish is always the funder's own page.**

## Run length: don't stop early

Earlier runs stopped after about 4 minutes and 40 searches. That is not acceptable.

**Minimum effort per run:**
- **Daily run:** at least 90 WebSearch queries: at least 50 for scholarships (including the
  coverage check, and at least 20 aimed at fully funded calls) and **at least 8 for each** of
  fellowships, grants, internships and competitions. At least 35 candidate calls checked on the
  funder's own site.
- **Subject run:** at least 55 queries: at least half for scholarships, and **at least 5 per subject
  for each** of fellowships, grants, internships and competitions. At least 20 candidates checked.

Keep a running tally. When a search only finds calls that are already listed, change the angle and
keep going. **Ending a run before these minimums is a failure.** The final report must state the
number of queries and candidates checked, per type.

## What qualifies (all must be true)

1. **Open now** to new applicants: not "opening soon", not closed, not invitation-only.
2. **A deadline**, one of two kinds:
   - **A specific closing date** (YYYY-MM-DD), at least 3 days from today, confirmed on the funder's
     own domain. If sources disagree, use the earliest date and say so in `note`.
   - **No single date, but open now** (deadline varies by course, rounds, or rolling). Examples: Gates
     Cambridge, DAAD In-Region, MEXT university recommendation. Set `deadline: null` and explain the
     timing in `note` (for example "Deadline depends on your course: 3 December 2026 or 7 January
     2027"). The site shows this note in place of a date.
3. **The funder's own link.** `url` is the funder's own page for this call. Never an aggregator,
   a general index or a search link.
4. **Open to international applicants** (see the goal above).
5. **Not already on the site.** Run `grep -ri` on the programme name, its key words (search the
   distinctive words, not the full title: "Earth Prize", "Social Justice", "Global Talent"), **and
   the official URL** across `src/data/*.js`, and check `retiredSlugs` in
   `src/data/fixes-oct21-2026.js`. The same call is often already listed under a slightly
   different name. `node scripts/today-counts.mjs` lists any of today's rows that match an
   existing listing: **before every commit, delete each of today's rows it flags as the same
   call** (update the existing row instead if something changed).
6. **Funded** (fully, or partly at the level in "Strong listings only"), or, for a competition, a
   prize. If applying costs money, put the fee in `note` and add 'Application fee' to `tags`.

**The quality rules always win over the numbers.** Never invent a date or a requirement.

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

- **`funding`:** exactly `'Fully Funded'` or `'Partially Funded'`, spelled and capitalised like
  that. The site's filters and badges match this text exactly, so anything else (for example
  "Partial Funding" or "Fully funded") hides the listing from the funding filters.
  `node scripts/today-counts.mjs` warns about any other value; fix it before committing.

- **`level`:** write the real levels plainly, so the counts work. Examples: "Master’s",
  "Bachelor’s", "Bachelor’s and Master’s", "PhD".
- **`country`:** the host country's plain name (for example "Germany", "United Kingdom").
- **`added`:** the exact UTC time from `date -u +%Y-%m-%dT%H:%M:00Z`. Never a future date.
- **`summary`:** one plain sentence.
- **`eligibility`:** 3 to 8 short items from the official call (nationality or region, level and
  degree, age, grades, language, work experience, other conditions).
  - **Always include the English requirement as the call states it**, with every alternative it
    accepts, for example "English: IELTS 6.5, TOEFL 90 or Duolingo 120; exempt if your degree was
    taught in English (MOI letter)". Students search for scholarships without IELTS, and the site's
    "Scholarships without IELTS" page is built from this line. Only write an alternative the
    official call actually names.
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
