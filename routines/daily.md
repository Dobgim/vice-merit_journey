# Daily run (last run of the day, 23:00 UTC)

Read `routines/listing-rules.md` first and follow it.

1. `git pull --rebase origin main`.
2. Note today's UTC date with `date -u +%Y-%m-%d`. Keep using it for the whole run.
3. Run `node scripts/today-counts.mjs`. This is what today's earlier runs (the subject searches)
   already added.
4. **Coverage check first:** go through the newest posts on the scholarship sites listed in the
   rules file and add every qualifying scholarship we don't have.
5. **Fully funded scholarships next:** search all regions for fully funded calls until today has at
   least 10 (see the rules file). Commit and push.
6. **Then the other types:** bring fellowships, grants, internships and competitions up to 5 each,
   with at least 8 queries for each type even if it is already at 5. Start with the one that is
   furthest behind, and commit and push after each type.
7. **Then top up the scholarships** to the targets: 25 in total, at least 8 master's and 5
   bachelor's, with at most 6 PhD-only. Respect the country limits. Commit and push.

**Commit message:** `Daily update YYYY-MM-DD (<type>): add N open calls with fixed deadlines`, plus
a list of the names and deadlines.

**Final report:**
- today's totals per type, the scholarship levels and the fully funded count (from
  `node scripts/today-counts.mjs`), and which targets were missed and why;
- each added call (name, type, level, country, deadline, link);
- what you skipped and why;
- the number of queries and candidates checked, per type.
