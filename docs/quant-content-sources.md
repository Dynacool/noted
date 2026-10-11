# SAT, AMC, and AP CSA original content audit

Reviewed October 11, 2026. `lib/study/content/quant-code.ts` contains 204 new original exercises: 68 SAT, 68 AMC, and 68 AP CSA. Each subject retains its separate existing 12-question bank through the root integration, yielding 80 per subject. The asset also provides ten unit lessons: two SAT, four AMC, and four current AP CSA units.

The SAT additions comprise 34 Math questions and 34 Reading & Writing MCQs. All four mathematics domains and all four reading/writing domains are covered. The collection includes original passages, paired texts, tables expressed as textual data, research notes, and editing stimuli. The concise application topic labels “Problem Solving” and “Geometry” cover the official Problem-Solving and Data Analysis and Geometry and Trigonometry domains.

AMC additions cover algebra, geometry, number theory, and counting/probability, with 17 exercises in each unit. They use varied methods including functional equations, floor reasoning, telescoping, similarity, circle intersections, prime constraints, integer factorization, bijections, derangements, conditioned dice outcomes, and geometric probability. These are instructional exercises rather than an official contest or score predictor. Some spatial and advanced algebra topics are more appropriate for AMC 12.

CSA additions comprise 45 MCQs, seven multiple-select exercises, and 16 Java programming exercises. Every programming exercise has task-specific criteria, points, guidance, and an example implementation. All four current units have 17 exercises each. The 2025 course framework lists recursion and recursive searching/sorting in Unit 4, so new recursion exercises are standard content. Inheritance does not appear in that framework; the root migration marks legacy inheritance exercises supplemental. These rubrics are authored instructional rubrics, not official College Board scoring guides.

## Primary sources

Sources establish curriculum organization or documented API behavior. No released exam questions or copyrighted passages were reproduced.

- [College Board: SAT Math content domains](https://satsuite.collegeboard.org/sat/whats-on-the-test/math/types)
- [College Board: SAT Reading and Writing content domains](https://satsuite.collegeboard.org/sat/whats-on-the-test/reading-writing)
- [MAA: AMC 10 and AMC 12 descriptions and content scope](https://maa.org/student-programs/amc/)
- [College Board: AP Computer Science A current four-unit course framework](https://apcentral.collegeboard.org/courses/ap-computer-science-a)
- [College Board: 2025 AP CSA Course at a Glance](https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-course-at-a-glance.pdf), including Unit 4 topics 4.16 and 4.17
- [Oracle: String API](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html)
- [Oracle: ArrayList API](https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html)
- [Oracle: Scanner API](https://docs.oracle.com/javase/8/docs/api/java/util/Scanner.html)

## Verification

The module was transpiled and evaluated with TypeScript and Node. Structural checks confirmed 204 distinct stable IDs, 68 questions per subject, ten lessons, 34 SAT Reading & Writing MCQs, correct option membership, distinct MCQ options, valid multiple-select delimiter usage, and complete rubric/example fields. Every question's subject/unit/topic/subtopic matches an explicitly authored parent lesson and subtopic.

All 31 numerical SAT answers and all 68 numerical-valued AMC answers were independently recomputed. Sixteen additional exhaustive checks enumerated integer solutions, divisors, permutations, digit restrictions, lattice paths, spaced seats, circular adjacency, constrained compositions, derangements, coin strings, and subset parity. This caught and corrected the inclusion-exclusion result for integers divisible by 3 or 7 but not both: 33 + 14 - 8 = 39.

Java snippets and example methods received a manual type, bounds, mutation, return-path, and trace review. Independent executable semantic models verified digit sums, run counts, longest contiguous increasing runs, safe duplicate removal, and column maxima, including empty, repeated, tied, and negative inputs where their contracts permit them. The environment has a Java 8 runtime but no `javac`; the Java examples were not compiler-tested. Do not describe these semantic checks as Java compilation.
