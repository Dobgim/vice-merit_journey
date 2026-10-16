/**
 * Practical background on each destination (language, costs, visas, work
 * rights) for the "Studying in …" part of the overview. Matched against the
 * start of a listing's `country` (e.g. "Switzerland (Geneva)" → Switzerland).
 */

export const destinations = {
  'United Kingdom': ["The UK is home to some of the world’s oldest universities. Master’s degrees usually last one year and PhDs three to four, which keeps the total cost lower than in many countries. Students need a Student visa, which needs a confirmed university offer (CAS) and proof of funds, and pay the Immigration Health Surcharge unless their scholarship covers it.", 'After graduating, the Graduate Route lets students stay and work in the UK for a period (check the current length on gov.uk, as the government has announced changes). Living costs are highest in London; cities like Manchester, Leeds or Cardiff are cheaper.'],
  Germany: ['Most public universities in Germany charge no tuition fees — students pay only a semester contribution of a few hundred euros. Many master’s and PhD programmes are taught in English, but learning some German makes daily life and part-time work much easier.', 'Non-EU students need a student visa and must usually show about €12,000 a year in a blocked account (the amount is updated each year) (scholarships can count instead). Graduates can stay up to 18 months to look for work.'],
  Switzerland: ['Switzerland has some of the world’s best universities and research institutes, and tuition at public universities is relatively low. Living costs, however, are among the highest in the world, so a scholarship or stipend that covers living expenses matters.', 'Teaching is in German, French or Italian depending on the region, with many master’s and most PhD programmes in English. Geneva hosts the UN and dozens of international organisations.'],
  'United States': ['The US has the largest higher-education system in the world, with thousands of universities and colleges. Costs vary widely, so check what a scholarship covers — tuition, housing, health insurance and living costs.', 'International students need an F-1 (or J-1) visa, which requires an I-20 or DS-2019 from the university and proof of funds. After graduating, Optional Practical Training (OPT) allows up to one year of work — or up to three years for STEM graduates.'],
  Canada: ['Canada is known for high-quality, welcoming universities and a multicultural society. Students need a study permit, which requires an acceptance letter and proof of funds.', 'Many graduates can apply for a Post-Graduation Work Permit, and Canadian work experience can lead to permanent residence. Montreal is bilingual, while most other cities are English-speaking.'],
  Australia: ['Australia’s universities are highly ranked and research degrees (MPhil and PhD) are often fully funded for strong candidates. Students need a Student visa (subclass 500) and Overseas Student Health Cover.', 'Graduates can usually apply for a Temporary Graduate visa to work after study. Sydney and Melbourne are the most expensive cities.'],
  'New Zealand': ['New Zealand offers a safe, friendly study environment with internationally recognised universities. Students need a student visa, and scholarship holders usually have their travel and insurance arranged.'],
  China: ['China offers thousands of English-taught programmes and many government-funded scholarships. Students need an X1 student visa (for stays over six months) and a residence permit after arrival.', 'Living costs are moderate outside the biggest cities, and learning basic Mandarin makes daily life much easier.'],
  'Macao, China': ['Macao is a Special Administrative Region of China with its own immigration rules. The University of Macau teaches mainly in English, and students need a student permit from the Macao government once admitted.'],
  Japan: ['Japan offers excellent research facilities and generous government and foundation scholarships. Many graduate programmes, especially in science and engineering, are taught in English.', 'Students need a student visa, supported by a Certificate of Eligibility arranged by the university. Learning basic Japanese helps greatly with daily life.'],
  Singapore: ['Singapore is a regional hub for research and business, with English as the main language of teaching. Students receive a Student’s Pass from the Immigration and Checkpoints Authority after accepting an offer. Living costs are high, so stipends are important.'],
  'Saudi Arabia': ['Saudi Arabia has invested heavily in research universities such as KAUST, which fully funds most graduate students and provides campus housing. A student visa is arranged by the university.'],
  'United Arab Emirates': ['The UAE is a fast-growing education and technology hub. Universities sponsor student visas, and many programmes are taught in English. Abu Dhabi and Dubai have high living costs, which funded scholarships usually cover.'],
  Qatar: ['Qatar hosts several international branch campuses and graduate institutes in Doha. Universities sponsor student residence permits, and funded students usually receive housing.'],
  Oman: ['Oman’s universities offer postgraduate programmes in English and Arabic. The university sponsors the student visa for admitted international students.'],
  Taiwan: ['Taiwan offers many English-taught programmes at well-regarded universities, with low tuition and living costs compared with other developed economies. Scholarship holders need a resident visa for study.'],
  Sweden: ['Sweden’s universities are known for research and an informal, collaborative culture. PhD students are employed on a salary with social benefits. Non-EU students pay tuition at master’s level unless funded. A residence permit for studies (or for doctoral employment) is required.'],
  Denmark: ['Denmark’s universities offer many English-taught programmes. PhD students are salaried employees. Non-EU students need a residence permit, and living costs in Copenhagen are high.'],
  Ireland: ['Ireland is an English-speaking EU country with a growing technology sector. Non-EU students register for an Irish Residence Permit after arriving, and graduates can stay to work under the Third Level Graduate Programme.'],
  Austria: ['Austria offers high-quality education at relatively low tuition. Vienna, consistently ranked one of the world’s most liveable cities, also hosts several UN agencies. Non-EU students need a residence permit for studies.'],
  Italy: ['Italy combines historic universities with modest tuition and a rich culture. Many master’s programmes are taught in English. Students need a national (D) visa for study and a residence permit after arrival.'],
  France: ['France offers low tuition at public universities and many English-taught programmes. Students apply for visas through Campus France in their home country.'],
  Greece: ['Greece is a growing destination for creative and cultural programmes. Non-EU participants need a national visa for longer stays.'],
  Brazil: ['Brazil is Latin America’s largest country and research system. Most teaching is in Portuguese, so language preparation is important. Scholarship holders receive a student visa through the Brazilian embassy.'],
  Russia: ['Russia offers government-funded places for international students. Many programmes are taught in Russian, often after a funded preparatory language year. Students need a student visa arranged with the university’s invitation.'],
  'South Korea': ['South Korea combines strong technology universities with modern cities. Government scholarship students usually take a year of Korean language before their degree. Students need a D-2 (or D-4 for language) visa.'],
  India: ['India has a large and diverse higher-education and research system. Foreign researchers and students need an appropriate research or student visa.'],
  'South Africa': ['South Africa has some of Africa’s top-ranked universities. International students need a study visa, which requires proof of funds and medical cover from a South African scheme.'],
  Kenya: ['Nairobi is a regional hub for the UN, NGOs and research institutes, hosting UNEP and UN-Habitat. Interns and visitors need the right pass or permit for their stay.'],
  Ghana: ['Ghana has a stable democracy and respected universities such as the University of Ghana and KNUST. English is the language of teaching.'],
  Nigeria: ['Nigeria is Africa’s most populous country, with a large university system and active research community.'],
  Namibia: ['Namibia offers a stable environment and growing universities, with English as the official language.'],
  Ethiopia: ['Addis Ababa is the diplomatic capital of Africa, hosting the African Union and the UN Economic Commission for Africa.'],
  Tanzania: ['Tanzania, with Dar es Salaam as its business capital, offers leadership and development programmes in English and Swahili.'],
  Philippines: ['Manila hosts the Asian Development Bank and many regional organisations. English is widely spoken.'],
  Indonesia: ['Jakarta hosts the ASEAN Secretariat. Interns need the appropriate visa arranged with the host.'],
  Thailand: ['Bangkok is a regional hub for the UN in Asia and the Pacific, hosting ESCAP.'],
  "Côte d'Ivoire": ['Abidjan, Côte d’Ivoire’s economic capital, is home to the African Development Bank. French is the main language.'],
  Europe: ['Studying in Europe often means moving between countries — Erasmus Mundus programmes, for example, run in at least two countries. Non-EU students need a residence permit in each country where they study for longer than three months; the consortium usually helps.'],
}

/** The destination profile for a listing's country, or null. */
export function destinationFor(country = '') {
  const c = country.replace(/^(UN offices|Geneva,|Nairobi,).*/, '')
  const key = Object.keys(destinations).sort((a, b) => b.length - a.length).find((k) => c.startsWith(k))
  return key ? { name: key, paragraphs: destinations[key] } : null
}
