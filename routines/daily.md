# Daily run (last run of the day, 23:00 UTC)

Read `routines/listing-rules.md` first and follow it.

1. `git pull --rebase origin main`.
2. Note today's UTC date with `date -u +%Y-%m-%d`. Keep using it for the whole run.
3. Run `node scripts/today-counts.mjs`. This is what today's earlier runs (the subject searches)
   already added.
4. **Scholarships first.** Bring today's totals up to the scholarship targets: 15 in total, at least 6
   master's and at least 4 bachelor's, with at most 4 PhD-only. Start with today's region from the
   rules file. Respect the country limits.
5. Commit and push the scholarships.
6. Then bring fellowships, grants, internships and competitions up to 5 each. Start with the one that
   is furthest behind, and commit and push after each type.

**Commit message:** `Daily update YYYY-MM-DD (<type>): add N open calls with fixed deadlines`, plus
a list of the names and deadlines.

**Final report:**
- today's totals per type, and the scholarship levels (from `node scripts/today-counts.mjs`);
- each added call (name, type, level, country, deadline, link);
- what you skipped and why;
- the number of queries and candidates checked, per type.
