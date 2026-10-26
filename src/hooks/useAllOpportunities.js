import { useMemo } from 'react'
import { byDeadline } from '../lib/deadline'
import { useOpportunities } from './useScholarships'

/** Every open opportunity of every type as { kind, item }, nearest deadline first. */
export default function useAllOpportunities() {
  const scholarships = useOpportunities('scholarships')
  const fellowships = useOpportunities('fellowships')
  const grants = useOpportunities('grants')
  const internships = useOpportunities('internships')
  const competitions = useOpportunities('competitions')
  return useMemo(
    () =>
      [
        ...scholarships.map((item) => ({ kind: 'scholarships', item })),
        ...fellowships.map((item) => ({ kind: 'fellowships', item })),
        ...grants.map((item) => ({ kind: 'grants', item })),
        ...internships.map((item) => ({ kind: 'internships', item })),
        ...competitions.map((item) => ({ kind: 'competitions', item })),
      ].sort((a, b) => byDeadline(a.item, b.item)),
    [scholarships, fellowships, grants, internships, competitions]
  )
}
