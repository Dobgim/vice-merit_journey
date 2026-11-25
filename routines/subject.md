# Subject search run (evening, before the daily run)

Read `routines/listing-rules.md` first and follow it. The routine's prompt gives this run's subjects.
Stay on those subjects. A separate daily run covers everything else.

1. `git pull --rebase origin main`.
2. Note today's UTC date with `date -u +%Y-%m-%d`.
3. Run `node scripts/today-counts.mjs`.
4. For each subject, one at a time:
   - **Scholarships first:** at least 6 queries for master's and bachelor's scholarships in that
     subject, at least 2 of them for fully funded ones, for example:
     - "<subject> master's scholarship 2027 international students"
     - "<subject> undergraduate scholarship 2027"
     - "<sub-field> Erasmus Mundus"
     - "<subject> scholarship <country> 2027"
     Search every region (Europe, Asia, Middle East, Americas, Africa, Oceania).
   - **Then the other types:** at least 5 queries each for fellowships, grants, internships and
     competitions in that subject (for example "<subject> fellowship 2027", "<subject> research
     grant 2027", "<subject> paid internship 2027 international", "<subject> competition 2027
     prize").
   - Use the subject's sub-fields. For example, for civil engineering also search structural,
     geotechnical, transport, construction and water.
   - Respect the country limits in the rules file.
5. Commit and push after each subject.

**Commit message:** `Subject search YYYY-MM-DD (<subjects>): add N open calls`, plus a list of names,
subjects, levels and deadlines. Add the subject as the first tag of each row.

**Final report**, grouped by subject:
- each added call (name, type, level, country, deadline, link);
- what you skipped and why;
- today's totals from `node scripts/today-counts.mjs`;
- the number of queries and candidates checked.
