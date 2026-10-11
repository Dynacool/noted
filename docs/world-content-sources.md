# AP World History content provenance

`lib/study/content/world.ts` adds 74 original standard questions and 16 optional pre-1200 background questions. It does not replace the original bank. Standard distribution: Unit 1 has 10 questions; Units 2–9 have 8 each. The file supplies nine standard unit lessons and one clearly labeled optional background lesson.

All questions, explanations, lesson prose, worked arguments, and stimuli were authored for Noted. No released exam passages or questions are reproduced. Sources labeled **constructed classroom sources** are invented instructional perspectives, not purported authentic primary sources. Their stated roles, purposes, and audiences support sourcing practice; they should never be cited as historical records.

## Framework and assessment boundary

- [College Board: AP World History: Modern course](https://apcentral.collegeboard.org/courses/ap-world-history): checked October 11, 2026. Defines the modern course’s c.1200–present boundary and nine-unit structure.
- [Current course and exam description, effective Fall 2026](https://apcentral.collegeboard.org/media/pdf/ap-world-history-modern-course-and-exam-description.pdf): official framework reference.
- [AP history exam updates](https://apcentral.collegeboard.org/courses/ap-history-exam-updates): announces SAQ/LEQ changes effective May 2027; course content unchanged. Noted’s original written exercises use explicitly labeled **classroom rubrics**, not claims of exact official exam scoring or format. DBQ exercises have seven invented documents and a seven-point classroom rubric. LEQ exercises have a six-point classroom rubric. SAQs have task-specific criteria.

The optional 600–1200 lesson and questions provide contextual enrichment about Islam, caliphates, Tang China, Byzantium, Ghana, early Indian Ocean exchange, Buddhism, Christianity, medieval Europe, and Vikings. They are `scope: 'background'`; they must be excluded from standard AP Modern practice unless the user chooses expanded scope.

## Focused historical verification

- [Columbia University: Song dynasty teaching module](https://afe.easia.columbia.edu/songdynasty-module/site-map.html): educational reference for Song commercial growth, rice cultivation, scholar-officials, and examinations.
- [The Metropolitan Museum of Art: Byzantium and Islam](https://www.metmuseum.org/exhibitions/listings/2012/byzantium-and-islam): transition from Byzantine southern provinces to Umayyad/Abbasid authority and continuity of regional traditions.
- [The Met: Tang dynasty](https://www.metmuseum.org/it/essays/tang-dynasty-618-906): Tang chronology and cultural context.
- [The Met: Buddhist object from Tang China](https://www.metmuseum.org/art/collection/search/54080): material evidence and catalog chronology for Tang Buddhism.
- [The Met: Buddhism along the Silk Road](https://www.metmuseum.org/exhibitions/listings/2012/buddhism): religious exchange across connected communities.
- [The Met: Trans-Saharan gold trade](https://www.metmuseum.org/pt/essays/the-trans-saharan-gold-trade-7th-14th-century): Ghana/Mali and gold-trade connections. The lesson avoids treating modern Ghana and the earlier empire as the same location.
- [UNESCO: Belitong maritime connections](https://www.unesco.org/en/iggp/belitong-unesco-global-geopark?hub=67817): maritime links among Chinese, Southeast Asian, and western Asian networks before European expansion. Classroom archaeological questions deliberately distinguish evidence of connection from proof of aggregate volume or an individual itinerary.
- [British Museum: Viking background](https://www.britishmuseum.org/sites/default/files/2019-09/Visit_Vikings_KS2_FINAL.pdf): raiding, trade, settlement, and long-distance connections.
- [British Museum: Vikings on the Eastern Way](https://www.britishmuseum.org/sites/default/files/2024-09/Silk_Roads_Exhibition_activity_cards_KS3.pdf): Islamic silver and the coercive trading of captives, avoiding an exclusively peaceful picture of exchange.
- [Smithsonian National Museum of African Art: Battle of Adwa](https://africa.si.edu/collection/object/nmafa_2003-19-1): Ethiopian victory over the Italian invading army in 1896 and its significance for independence.
- [United States Holocaust Memorial Museum: Introduction to the Holocaust](https://encyclopedia.ushmm.org/content/en/article/introduction-to-the-holocaust): Nazi state-sponsored genocide of European Jews, with careful distinction from persecution of other groups.
- [USHMM: Final Solution in depth](https://encyclopedia.ushmm.org/content/en/article/final-solution-in-depth): institutional progression from discriminatory policies to genocide.
- [USHMM: What is genocide?](https://www.ushmm.org/genocide-prevention/learn-about-genocide-and-other-mass-atrocities/what-is-genocide): protected-group intent distinction. The educational definition is used to avoid equating every wartime death with genocide.

## Validation

The World file passed a focused strict TypeScript check. A runtime content audit checks required fields, answers drawn from options, valid unit references, written-response examples, and stable unique IDs. Question tags identify historical period, region, and reasoning skill. Standard unit names match `subjects.ts` exactly.

Every question’s `topic` is normalized to an exact lesson parent name in its unit and scope; its original authored label is preserved in `subtopic` and registered in that parent’s subtopics. All 90 questions map to lesson parents, and all 44 lesson parents have at least one relevant practice question. Standard and background lessons sharing Unit 1 are matched separately by scope. Targeted trans-Saharan and religious-reform questions ensure those note sections also have meaningful practice links.
