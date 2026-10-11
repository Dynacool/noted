import { subjects } from "./subjects";
import type { Question, QuestionType, Rubric } from "./types";
// Original authored exercises. The compact seed format is expanded into the public import schema.
type Seed = [number, string, string, string, string, string[]?, QuestionType?];
const seeds: Record<string, Seed[]> = {
  sat: [
    [0, "Algebra", "Solve $3x+7=22$.", "5", "Subtract 7, then divide 15 by 3."],
    [
      0,
      "Algebra",
      "A line passes through (2, 5) and (6, 13). What is its slope?",
      "2",
      "Slope is (13−5)/(6−2)=2.",
    ],
    [
      0,
      "Advanced Math",
      "What is the positive root of $x^2-5x-14=0$?",
      "7",
      "Factor as (x−7)(x+2)=0.",
    ],
    [
      0,
      "Problem Solving",
      "A jacket costs $80 before a 15% discount. What is its sale price in dollars?",
      "68",
      "80(1−0.15)=68.",
    ],
    [
      0,
      "Geometry",
      "A right triangle has legs 6 and 8. Find the hypotenuse.",
      "10",
      "The Pythagorean theorem gives √(36+64)=10.",
    ],
    [
      0,
      "Advanced Math",
      "If $f(x)=2x^2-3$, find $f(4)$.",
      "29",
      "Substitute 4: 2(16)−3=29.",
    ],
    [
      1,
      "Information & Ideas",
      "A study finds that trees reduce afternoon pavement temperature. Which conclusion is best supported?",
      "Tree shade can reduce local surface temperatures.",
      "The result supports a local temperature effect, but no claim about all climates.",
      [
        "Tree shade can reduce local surface temperatures.",
        "Trees eliminate all urban heat.",
        "All pavement types have equal temperature.",
        "Trees cause colder winters.",
      ],
      "MCQ",
    ],
    [
      1,
      "Craft & Structure",
      "In “The researcher offered a tentative explanation,” tentative most nearly means:",
      "provisional",
      "Tentative means offered with uncertainty, subject to revision.",
      ["provisional", "hostile", "complete", "irrelevant"],
      "MCQ",
    ],
    [
      1,
      "Expression of Ideas",
      "Choose the transition: “The first trial failed. ___, the second trial succeeded.”",
      "However",
      "The sentences contrast failure with success.",
      ["However", "Similarly", "For example", "Therefore"],
      "MCQ",
    ],
    [
      1,
      "Standard English Conventions",
      "Choose the correct sentence.",
      "Each of the students has a notebook.",
      "The singular subject Each takes has.",
      [
        "Each of the students has a notebook.",
        "Each of the students have a notebook.",
        "Each students has a notebook.",
        "Each of students have notebooks.",
      ],
      "MCQ",
    ],
    [
      0,
      "Problem Solving",
      "The mean of 4, 8, 10, and $k$ is 9. Find $k$.",
      "14",
      "The sum must be 36; 36−22=14.",
    ],
    [
      1,
      "Standard English Conventions",
      "Which punctuation correctly joins two independent clauses?",
      "The sun set; the air cooled.",
      "A semicolon joins related independent clauses.",
      [
        "The sun set; the air cooled.",
        "The sun set, the air cooled.",
        "The sun set the air cooled.",
        "The sun; set the air cooled.",
      ],
      "MCQ",
    ],
  ],
  amc: [
    [
      0,
      "Equations",
      "If $a+b=10$ and $ab=21$, find $a^2+b^2$.",
      "58",
      "(a+b)²−2ab=100−42=58.",
    ],
    [
      0,
      "Sequences",
      "Find the sum of the first 20 positive odd integers.",
      "400",
      "The sum of the first n positive odd integers is n².",
    ],
    [
      1,
      "Triangles",
      "An equilateral triangle has side 6. Its area is $k\\sqrt{3}$. Find $k$.",
      "9",
      "Area is s²√3/4=9√3.",
    ],
    [
      1,
      "Circles",
      "A circle of radius 5 contains a chord of length 6. Find the distance from its center to the chord.",
      "4",
      "The perpendicular bisects the chord; √(25−9)=4.",
    ],
    [
      2,
      "Divisibility",
      "How many positive divisors does 72 have?",
      "12",
      "72=2³3², giving (3+1)(2+1)=12.",
    ],
    [
      2,
      "Modular Arithmetic",
      "Find the remainder when $3^{20}$ is divided by 7.",
      "2",
      "Powers have period 6. 20≡2 mod 6, and 3²≡2 mod 7.",
    ],
    [
      3,
      "Counting",
      "How many three-digit numbers have distinct digits, using only 1, 2, 3, 4, and 5?",
      "60",
      "There are 5×4×3 choices.",
    ],
    [
      3,
      "Probability",
      "Two fair dice are rolled. What is the probability their sum is 7? Give a decimal or fraction.",
      "1/6",
      "There are 6 favorable ordered outcomes among 36.",
    ],
    [
      0,
      "Equations",
      "If $x+1/x=3$, find $x^2+1/x^2$.",
      "7",
      "Square the equation to obtain x²+2+1/x²=9.",
    ],
    [
      2,
      "Divisibility",
      "Find the smallest positive integer divisible by both 18 and 24.",
      "72",
      "The LCM uses 2³3²=72.",
    ],
    [
      3,
      "Counting",
      "How many subsets of {1, 2, 3, 4, 5} contain exactly two elements?",
      "10",
      "Choose two from five: 5×4/2=10.",
    ],
    [
      1,
      "Triangles",
      "A triangle has side lengths 13, 14, 15. Find its area.",
      "84",
      "Heron’s formula with s=21 gives √(21×8×7×6)=84.",
    ],
  ],
  precalc: [
    [
      0,
      "Composition",
      "If $f(x)=x^2$ and $g(x)=x+3$, find $f(g(2))$.",
      "25",
      "g(2)=5, so f(5)=25.",
    ],
    [
      0,
      "Inverse Functions",
      "For $f(x)=3x-4$, find $f^{-1}(8)$.",
      "4",
      "Solve 3x−4=8 to get x=4.",
    ],
    [
      1,
      "Unit Circle",
      "Find $\\sin(\\pi/6)$.",
      "1/2",
      "The sine of 30° is 1/2.",
    ],
    [
      1,
      "Identities",
      "If $\\cos\theta=3/5$ and θ is in quadrant I, find $\\sin\theta$.",
      "4/5",
      "sin²θ=1−9/25=16/25; take the positive root.",
    ],
    [
      2,
      "Roots",
      "Find the sum of the roots of $x^3-6x^2+11x-6$.",
      "6",
      "By Vieta’s formula, the sum is the negative coefficient of x².",
    ],
    [
      2,
      "Division",
      "Find the remainder when $x^3+2x-1$ is divided by $x-2$.",
      "11",
      "Evaluate at x=2: 8+4−1=11.",
    ],
    [
      3,
      "Growth",
      "A population starts at 100 and doubles every 3 years. What is it after 9 years?",
      "800",
      "Three doublings give 100×2³=800.",
    ],
    [3, "Equations", "Solve $2^{x+1}=32$.", "4", "32=2⁵, so x+1=5."],
    [4, "Properties", "Evaluate $\\log_3(81)$.", "4", "3⁴=81."],
    [
      4,
      "Equations",
      "Solve $\\ln x=2$. Give a decimal rounded to 3 places.",
      "7.389",
      "Exponentiate both sides: x=e²≈7.389.",
    ],
    [
      5,
      "Arithmetic",
      "An arithmetic sequence starts 7, 11, 15. Find its 20th term.",
      "83",
      "a₂₀=7+19(4)=83.",
    ],
    [
      5,
      "Geometric",
      "Find the infinite sum $6+3+1.5+\\cdots$.",
      "12",
      "With |r|<1, S=a/(1−r)=6/(1−1/2)=12.",
    ],
  ],
  world: [
    [
      0,
      "Song China",
      "Which development most directly supported commercial growth in Song China?",
      "Expanded use of paper money",
      "Paper money facilitated exchange in a growing commercial economy.",
      [
        "Expanded use of paper money",
        "Closure of all markets",
        "End of canal transport",
        "A ban on urban trade",
      ],
      "MCQ",
    ],
    [
      1,
      "Silk Roads",
      "Caravanserai primarily aided Silk Road trade by providing:",
      "Lodging and security for merchants",
      "These facilities supported long-distance caravans.",
      [
        "Lodging and security for merchants",
        "Ocean navigation",
        "Abolition of tariffs everywhere",
        "Uniform religious beliefs",
      ],
      "MCQ",
    ],
    [
      2,
      "Empire Building",
      "Which factor helped the Ottoman, Safavid, and Mughal empires expand?",
      "Use of gunpowder weapons",
      "Artillery and firearms supported conquest and centralization.",
      [
        "Use of gunpowder weapons",
        "Industrial steam engines",
        "Complete religious uniformity",
        "Universal elected governments",
      ],
      "MCQ",
    ],
    [
      3,
      "Columbian Exchange",
      "Which crop originated in the Americas and spread to Afro-Eurasia?",
      "Maize",
      "Maize was domesticated in the Americas.",
      ["Maize", "Wheat", "Rice", "Barley"],
      "MCQ",
    ],
    [
      4,
      "Enlightenment",
      "Which idea challenged hereditary absolute monarchy?",
      "Government derives legitimacy from the consent of the governed",
      "Consent challenges a monarch’s automatic hereditary right to rule.",
      [
        "Government derives legitimacy from the consent of the governed",
        "Kings rule solely by divine right",
        "Society must forbid public debate",
        "Political rights depend only on ancestry",
      ],
      "MCQ",
    ],
    [
      5,
      "Imperialism",
      "Industrialization encouraged nineteenth-century imperialism partly through demand for:",
      "Raw materials and overseas markets",
      "Industrial economies sought inputs and outlets for manufactured products.",
      [
        "Raw materials and overseas markets",
        "An end to shipping",
        "Fewer resources",
        "Subsistence-only agriculture",
      ],
      "MCQ",
    ],
    [
      6,
      "World Wars",
      "Which development contributed to the global spread of the Great Depression?",
      "Interconnected trade and financial systems",
      "Trade contraction and financial crises transmitted economic shocks.",
      [
        "Interconnected trade and financial systems",
        "The internet",
        "A single worldwide currency",
        "A complete end to colonial ties",
      ],
      "MCQ",
    ],
    [
      7,
      "Cold War",
      "The Non-Aligned Movement sought to:",
      "Avoid formal alignment with either Cold War bloc",
      "Nonalignment aimed at independent foreign policy, though countries varied in practice.",
      [
        "Avoid formal alignment with either Cold War bloc",
        "Join NATO collectively",
        "Restore European colonial rule",
        "Ban all diplomacy",
      ],
      "MCQ",
    ],
    [
      8,
      "Technology",
      "Container shipping contributed to globalization by:",
      "Reducing the cost of moving goods",
      "Standardized containers improved loading and transport efficiency.",
      [
        "Reducing the cost of moving goods",
        "Eliminating every tariff",
        "Ending manufacturing",
        "Preventing international trade",
      ],
      "MCQ",
    ],
    [
      1,
      "Indian Ocean",
      "Identify one role of monsoon winds in Indian Ocean trade, and explain one resulting effect on merchants.",
      "",
      "Seasonal winds enabled predictable routes; merchants scheduled voyages and sometimes stayed in port cities between seasons.",
      undefined,
      "SAQ",
    ],
    [
      4,
      "Industrialization",
      "Develop an argument evaluating the extent to which industrialization changed labor systems during 1750–1900.",
      "",
      "A defensible argument can emphasize wage labor and factory discipline while noting continued coerced and agricultural labor.",
      undefined,
      "LEQ",
    ],
    [
      3,
      "Maritime Empires",
      "Original classroom document set: A: A fictional port ledger from 1600 records silver exchanged for textiles. B: A fictional labor petition from 1650 describes coerced plantation work. C: A fictional royal decree from 1700 restricts colonial commerce. Using these three teaching documents, evaluate how maritime empires shaped economic relationships, 1450–1750. This is a short DBQ exercise, not a full AP DBQ.",
      "",
      "A strong response links silver flows, coerced labor, and mercantilist restrictions, explains the decree’s royal purpose, and adds specific outside evidence.",
      undefined,
      "DBQ",
    ],
  ],
  csa: [
    [
      0,
      "Expressions",
      "In Java, what value does the integer expression 17 / 5 produce?",
      "3",
      "Integer division truncates toward zero.",
    ],
    [
      0,
      "Loops",
      "What is printed?\n```java\nint s = 0;\nfor (int i = 1; i <= 4; i++) s += i;\nSystem.out.println(s);\n```",
      "10",
      "The loop sums 1+2+3+4.",
    ],
    [
      1,
      "Classes",
      "What is the main purpose of a constructor?",
      "Initialize a new object",
      "A constructor initializes instance state when an object is created.",
      [
        "Initialize a new object",
        "Destroy an object",
        "Always return an int",
        "Declare a package",
      ],
      "MCQ",
    ],
    [
      1,
      "Inheritance",
      "If a subclass overrides an instance method, which version runs when called through a superclass reference to that subclass object?",
      "The subclass version",
      "Dynamic dispatch uses the runtime object’s method implementation.",
      [
        "The subclass version",
        "Always the superclass version",
        "Both automatically",
        "Neither",
      ],
      "MCQ",
    ],
    [
      2,
      "Traversal",
      "What is the sum of {2, 4, 6, 8}?",
      "20",
      "Add all four array elements.",
    ],
    [
      2,
      "2D Arrays",
      "For int[][] a = new int[3][4], what is a[0].length?",
      "4",
      "Each row contains 4 elements.",
    ],
    [
      3,
      "Methods",
      'An ArrayList starts [A, B, C]. After add(1, "X"), what is get(2)?',
      "B",
      "Insertion shifts B and C right.",
      ["A", "B", "C", "X"],
      "MCQ",
    ],
    [
      3,
      "Removal",
      "Why can removing items in a forward-indexed loop skip elements?",
      "Later elements shift to lower indices",
      "After removal, the next element occupies the removed index. Incrementing skips it.",
      [
        "Later elements shift to lower indices",
        "The list doubles in size",
        "All iterators stop permanently",
        "Indices start at one",
      ],
      "MCQ",
    ],
    [
      4,
      "Tracing",
      "Find f(4).\n```java\nint f(int n) {\n  if (n == 0) return 1;\n  return 2 * f(n - 1);\n}\n```",
      "16",
      "f(n)=2ⁿ with f(0)=1.",
    ],
    [
      5,
      "Searching",
      "Binary search requires which property of the input array?",
      "Sorted order",
      "Sorted order allows eliminating half of the search interval.",
      [
        "Sorted order",
        "Distinct values only",
        "An odd length",
        "All values positive",
      ],
      "MCQ",
    ],
    [
      4,
      "Base Cases",
      "Write a recursive Java method factorial(int n) for n ≥ 0. Include a base case.",
      "",
      "Return 1 at n=0 and n*factorial(n−1) otherwise.",
      undefined,
      "Java",
    ],
    [
      5,
      "Sorting",
      "Write a Java method countPositive(int[] values) that returns how many elements are greater than zero.",
      "",
      "Traverse all elements, count those >0, and return the count.",
      undefined,
      "Java",
    ],
  ],
  stats: [
    [
      0,
      "Center",
      "Find the median of 2, 3, 7, 8, 10.",
      "7",
      "The middle of five sorted values is the third value.",
    ],
    [
      0,
      "Spread",
      "Which measure of spread is more resistant to outliers?",
      "Interquartile range",
      "IQR summarizes the central 50% and resists extremes.",
      ["Interquartile range", "Range", "Standard deviation", "Variance"],
      "MCQ",
    ],
    [
      1,
      "Regression",
      "A regression model is $\\hat y=3+2x$. Predict y at x=5.",
      "13",
      "Substitute x=5: 3+10=13.",
    ],
    [
      2,
      "Experiments",
      "Why randomly assign subjects to treatments?",
      "To balance potential confounders across groups",
      "Random assignment supports causal comparisons by reducing systematic differences.",
      [
        "To balance potential confounders across groups",
        "To guarantee a representative sample",
        "To eliminate all variation",
        "To prove every effect is large",
      ],
      "MCQ",
    ],
    [
      3,
      "Conditional Probability",
      "If P(A and B)=0.12 and P(B)=0.4, find P(A|B).",
      "0.3",
      "Conditional probability is 0.12/0.4=0.3.",
    ],
    [
      3,
      "Random Variables",
      "A fair coin is tossed 10 times. Find the expected number of heads.",
      "5",
      "For a binomial variable, E(X)=np=10(0.5)=5.",
    ],
    [
      4,
      "Standard Error",
      "A population has standard deviation 12. Find the standard deviation of the sample mean for independent samples of size 36.",
      "2",
      "σ/√n=12/6=2.",
    ],
    [
      5,
      "Intervals",
      "A 95% confidence interval for a population proportion is (0.42, 0.58). What is the margin of error?",
      "0.08",
      "Half the interval width: (0.58−0.42)/2=0.08.",
    ],
    [
      6,
      "t Procedures",
      "For a one-sample t procedure with n=16, how many degrees of freedom are used?",
      "15",
      "The degrees of freedom are n−1.",
    ],
    [
      7,
      "Goodness of Fit",
      "A chi-square goodness-of-fit test has 5 categories and no estimated parameters. Find its degrees of freedom.",
      "4",
      "df=k−1=4.",
    ],
    [
      8,
      "Slope Tests",
      "For a regression slope test with n=20, find the degrees of freedom.",
      "18",
      "Simple linear regression slope inference uses n−2.",
    ],
    [
      2,
      "Experiments",
      "(a) Design a randomized experiment comparing two study methods for 40 students. (b) Explain how random assignment helps. (c) State one limitation on generalizing if the students volunteer from one school.",
      "",
      "Randomly assign 20 students to each method; hold instruction and assessment conditions constant. Assignment balances confounders. Volunteers from one school do not establish broad representativeness.",
      undefined,
      "FRQ",
    ],
  ],
  chem: [
    [
      0,
      "Moles",
      "How many moles are in 18.0 g of water? Use 18.0 g/mol.",
      "1",
      "n=mass/molar mass=18/18=1 mol.",
    ],
    [
      0,
      "Limiting Reactants",
      "For $2H_2+O_2\\to2H_2O$, 3 mol H₂ and 2 mol O₂ react. How many moles of water form?",
      "3",
      "H₂ is limiting; its 1:1 mole ratio with water gives 3 mol.",
    ],
    [
      1,
      "Electrons",
      "How many electrons does a neutral sodium atom (atomic number 11) have?",
      "11",
      "A neutral atom has equal proton and electron counts.",
    ],
    [
      1,
      "Periodic Trends",
      "Across a period from left to right, atomic radius generally:",
      "Decreases",
      "Increasing effective nuclear charge draws valence electrons closer.",
      ["Decreases", "Increases", "Always stays constant", "Becomes zero"],
      "MCQ",
    ],
    [
      2,
      "Polarity",
      "Which molecule is polar?",
      "H₂O",
      "Water’s bent geometry gives a net dipole.",
      ["H₂O", "CO₂", "CH₄", "N₂"],
      "MCQ",
    ],
    [
      2,
      "Intermolecular Forces",
      "Which interactions can occur between water molecules? Select all that apply.",
      "Hydrogen bonding|London dispersion|Dipole–dipole",
      "Water exhibits dispersion, dipole–dipole forces, and hydrogen bonding.",
      [
        "Hydrogen bonding",
        "London dispersion",
        "Dipole–dipole",
        "Metallic bonding",
      ],
      "Multiple select",
    ],
    [
      3,
      "Redox",
      "In $Zn+Cu^{2+}\\to Zn^{2+}+Cu$, which species is oxidized?",
      "Zn",
      "Zinc loses two electrons; oxidation is electron loss.",
      ["Zn", "Cu²⁺", "Cu", "Neither"],
      "MCQ",
    ],
    [
      3,
      "Net Ionic Equations",
      "For aqueous AgNO₃ mixed with NaCl, which solid precipitates?",
      "AgCl",
      "Silver chloride is insoluble; Na⁺ and NO₃⁻ are spectator ions.",
      ["AgCl", "NaNO₃", "NaAg", "NO₂"],
      "MCQ",
    ],
    [
      4,
      "Enthalpy",
      "A reaction releases 50 kJ per mole. What is ΔH in kJ/mol?",
      "-50",
      "Energy released means ΔH is negative.",
    ],
    [
      5,
      "K Expressions",
      "For $N_2+3H_2\\rightleftharpoons2NH_3$, select the correct equilibrium expression.",
      "[NH₃]² / ([N₂][H₂]³)",
      "Concentration exponents follow the balanced coefficients.",
      [
        "[NH₃]² / ([N₂][H₂]³)",
        "[NH₃] / ([N₂]+[H₂])",
        "[N₂][H₂] / [NH₃]",
        "[NH₃]³ / [H₂]²",
      ],
      "MCQ",
    ],
    [
      6,
      "pH",
      "Find the pH of a solution with $[H^+]=10^{-3}$ M.",
      "3",
      "pH=−log₁₀[H⁺]=3.",
    ],
    [
      5,
      "Le Chatelier",
      "For the exothermic equilibrium $2SO_2(g)+O_2(g)\\rightleftharpoons2SO_3(g)$: (a) predict the effect of increasing temperature on SO₃ yield; (b) predict the effect of decreasing volume; (c) explain whether a catalyst changes the equilibrium yield.",
      "",
      "Heat is a product, so heating shifts left. Compression favors the side with fewer gas moles, right. A catalyst speeds approach to equilibrium but does not change K or yield.",
      undefined,
      "FRQ",
    ],
  ],
};
const rubrics: Record<string, Rubric[]> = {
  SAQ: [
    {
      criterion: "Identify a historical development",
      points: 1,
      guidance: "Identify seasonal monsoon wind patterns.",
    },
    {
      criterion: "Explain an effect",
      points: 1,
      guidance:
        "Connect predictable winds to sailing schedules or extended port stays.",
    },
  ],
  LEQ: [
    {
      criterion: "Thesis",
      points: 1,
      guidance: "Make a defensible claim about the extent of labor change.",
    },
    {
      criterion: "Contextualization",
      points: 1,
      guidance: "Describe relevant preindustrial conditions.",
    },
    {
      criterion: "Evidence",
      points: 2,
      guidance:
        "Use specific historical examples and explain how they support the argument.",
    },
    {
      criterion: "Reasoning",
      points: 2,
      guidance:
        "Analyze change and continuity; qualify the argument with meaningful nuance.",
    },
  ],
  DBQ: [
    {
      criterion: "Thesis",
      points: 1,
      guidance:
        "Make a defensible claim about maritime economic relationships.",
    },
    {
      criterion: "Context",
      points: 1,
      guidance: "Situate the argument in expanding oceanic networks.",
    },
    {
      criterion: "Document evidence",
      points: 2,
      guidance:
        "Use at least two supplied documents and connect them to the argument.",
    },
    {
      criterion: "Outside evidence",
      points: 1,
      guidance:
        "Explain a specific historical example beyond the supplied documents.",
    },
    {
      criterion: "Sourcing and reasoning",
      points: 2,
      guidance:
        "Explain one document’s purpose or perspective and develop a qualified argument.",
    },
  ],
};
export const bank: Question[] = Object.entries(seeds).flatMap(
  ([subject, rows]) =>
    rows.map((r, i) => {
      const [u, topic, prompt, answer, explanation, options, type] = r;
      const format = type ?? "Numerical";
      let rubric = rubrics[format];
      if (format === "FRQ")
        rubric =
          subject === "stats"
            ? [
                {
                  criterion: "Experimental design",
                  points: 2,
                  guidance:
                    "Randomly assign 20 students per method and control other conditions.",
                },
                {
                  criterion: "Random assignment",
                  points: 1,
                  guidance:
                    "Explain balancing confounders, not obtaining a representative sample.",
                },
                {
                  criterion: "Scope of inference",
                  points: 1,
                  guidance:
                    "Explain limited generalization from volunteers at one school.",
                },
              ]
            : [
                {
                  criterion: "Temperature",
                  points: 1,
                  guidance:
                    "Predict less SO₃ and explain the endothermic reverse shift.",
                },
                {
                  criterion: "Pressure",
                  points: 1,
                  guidance:
                    "Predict more SO₃ because the product side has fewer gas moles.",
                },
                {
                  criterion: "Catalyst",
                  points: 1,
                  guidance:
                    "State that K and yield are unchanged; equilibrium is reached faster.",
                },
              ];
      if (format === "Java")
        rubric =
          i === 10
            ? [
                {
                  criterion: "Base case",
                  points: 1,
                  guidance: "Return 1 for n=0.",
                },
                {
                  criterion: "Recursive step",
                  points: 2,
                  guidance: "Return n * factorial(n-1), reducing n.",
                },
                {
                  criterion: "Valid Java method",
                  points: 1,
                  guidance:
                    "Use an int return type and int parameter; compile-ready syntax.",
                },
              ]
            : [
                {
                  criterion: "Traversal",
                  points: 1,
                  guidance: "Visit every array element.",
                },
                {
                  criterion: "Condition and counting",
                  points: 2,
                  guidance:
                    "Increment only for values strictly greater than zero.",
                },
                {
                  criterion: "Return and syntax",
                  points: 1,
                  guidance:
                    "Return the count with a valid int method signature.",
                },
              ];
      return {
        id: `${subject}-${i + 1}`,
        subject,
        unit: subjects.find((s) => s.id === subject)!.units[u].name,
        topic,
        subtopic: topic,
        difficulty: i % 3 === 0 ? "Easy" : i % 3 === 1 ? "Medium" : "Hard",
        type: format,
        prompt,
        answer,
        explanation,
        options,
        hint:
          format === "Numerical"
            ? "Identify the relevant relationship, then substitute the given values."
            : format === "MCQ"
              ? "Eliminate claims that go beyond the evidence or conflict with the core concept."
              : "Use the rubric to organize your response and justify each part.",
        tags:
          subject === "world"
            ? [
                [
                  "1200–1450",
                  "1200–1450",
                  "1450–1750",
                  "1450–1750",
                  "1750–1900",
                  "1750–1900",
                  "1900–present",
                  "1900–present",
                  "1900–present",
                  "1200–1450",
                  "1750–1900",
                  "1450–1750",
                ][i],
                [
                  "East Asia",
                  "Global",
                  "South Asia",
                  "Americas",
                  "Europe",
                  "Global",
                  "Global",
                  "Global",
                  "Global",
                  "Indian Ocean",
                  "Europe",
                  "Global",
                ][i],
                format === "MCQ" ? "Causation" : "Historical argumentation",
              ]
            : subject === "csa"
              ? [format === "Java" ? "Programming" : "Code tracing"]
              : subject === "stats"
                ? [format === "Numerical" ? "Calculation" : "Interpretation"]
                : [],
        source: "Preloaded",
        collection: "Core curriculum",
        rubric,
        example: rubric ? explanation : undefined,
        tolerance: 0.001,
      } satisfies Question;
    }),
);
