# STEM content provenance and checks

The lessons and questions in `lib/study/content/stem.ts` are original Noted instructional content, not copied released exam questions or official scoring guidelines. Framework references establish the scope and sequencing; the rubrics are Noted practice rubrics.

## Content inventory

| Subject       | New questions | MCQ | Multiple select | Numerical | Multipart FRQ | Unit lessons |
| ------------- | ------------: | --: | --------------: | --------: | ------------: | -----------: |
| AP Statistics |            68 |  21 |               7 |        30 |            10 |            5 |
| Chemistry     |            68 |  26 |               7 |        28 |             7 |            7 |
| Precalculus   |            68 |  15 |               6 |        33 |            14 |            6 |

Precalculus includes two explicitly labeled calculus enrichment FRQs (`precalc-v2-67` and `precalc-v2-68`), with `scope: extension`. They provide derivative/accumulation grading practice and do not assert that calculus is required precalculus material. Every standard question resolves to its subject/unit lesson, an exact parent topic, and its own named subtopic. Numerical answers use explicit tolerances; every FRQ has question-specific point criteria and a worked reference response.

## AP Statistics scope

Verified against the [College Board AP Statistics course page](https://apcentral.collegeboard.org/courses/ap-statistics), the [CED effective Fall 2026](https://apcentral.collegeboard.org/media/pdf/ap-statistics-course-and-exam-description-effective-fall-2026.pdf), and the [revision summary](https://apcentral.collegeboard.org/courses/ap-statistics/future-revisions) on October 11, 2026.

The current five-unit structure is used. The standard practice set includes chi-square **homogeneity and independence** (CED topics 3.14–3.15), and residual-plot assessment, including curvature (5.4). Chi-square goodness of fit and inference for regression slopes are excluded from the new standard material. The original `stats-10` goodness-of-fit and `stats-11` slope-inference questions should remain preserved as enrichment.

Legacy migration: old units 1 and 3 map to current 1; old 4 to current 2; old 6 to current 3; old 7 to current 4; old 2 to current 5. Old sampling-distribution material maps by estimator: sample proportions to current 3 and sample means to current 4. Old two-way-table chi-square material maps to current 3; removed goodness-of-fit and slope inference retain extension scope. Existing saved attempt snapshots should retain their historical question metadata.

## General Chemistry crosswalk

Chemistry remains a general high-school subject using the existing seven unit names. For students also reviewing AP Chemistry, the [current College Board course page](https://apcentral.collegeboard.org/courses/ap-chemistry) provides this scope reference:

| AP Chemistry unit                        | Related Noted unit(s)           |
| ---------------------------------------- | ------------------------------- |
| 1: Atomic Structure and Properties       | Atomic Structure; Stoichiometry |
| 2: Compound Structure and Properties     | Bonding                         |
| 3: Properties of Substances and Mixtures | Bonding; Stoichiometry          |
| 4: Chemical Reactions                    | Reactions; Stoichiometry        |
| 5: Kinetics                              | Reactions                       |
| 6: Thermochemistry                       | Thermodynamics                  |
| 7: Equilibrium                           | Equilibrium                     |
| 8: Acids and Bases                       | Acids & Bases                   |
| 9: Thermodynamics and Electrochemistry   | Thermodynamics; Reactions       |

This is a conceptual crosswalk, not a claim of complete AP Chemistry exam coverage. The content emphasizes introductory structure, reaction stoichiometry, rates, equilibrium, and acid–base reasoning. The retained general precalculus units similarly are not presented as the AP Precalculus framework.

Further reading links: [OpenStax Chemistry 2e](https://openstax.org/details/books/chemistry-2e) and [OpenStax Precalculus 2e](https://openstax.org/details/books/precalculus-2e). Textbook references are navigation aids; Noted question language and explanations are original.

## Validation

The module passed standalone strict TypeScript compilation with the repository's TypeScript compiler. All 204 generated questions passed the repository's `validateQuestions` schema, including option/answer consistency, positive rubric points, numerical answer formatting, distinct IDs, and allowed scope labels.

All **91 numerical answers** were recalculated from separate arithmetic/probability/trigonometric/logarithmic expressions in an in-memory audit and compared with the authored tolerances. Computational FRQ checks included binomial-tail probability, Bayes counts, confidence interval endpoints, chi-square statistic, paired t intervals, rate constants, limiting-reactant yields, calorimetry signs, equilibrium substitutions, buffer neutralization, trig roots, polynomial expansion/division, growth and half-life models, savings thresholds, geometric travel distance, and accumulation area. Domain restrictions, sampling/design assumptions, finite buffer capacity, and causal scope were reviewed directly in the explanations and rubrics.

The asset audit also checked all standard unit/topic/subtopic links and required worked references for every FRQ. Application-wide integration, build, and browser validation are performed by the main task.
