import {
  createQuestions,
  type AuthoredQuestion,
  type UnitLesson,
} from "../content-types";
import type { Question, Rubric } from "../types";

const units = [
  "1 · The Global Tapestry",
  "2 · Networks of Exchange",
  "3 · Land-Based Empires",
  "4 · Transoceanic Interconnections",
  "5 · Revolutions",
  "6 · Consequences of Industrialization",
  "7 · Global Conflict",
  "8 · Cold War and Decolonization",
  "9 · Globalization",
];
const framework = {
  title:
    "College Board: AP World History: Modern course framework (1200–present)",
  url: "https://apcentral.collegeboard.org/courses/ap-world-history",
};
const topic = (name: string, subtopics: string[], lesson: string) => ({
  name,
  subtopics,
  lesson,
});
const vocab = (entries: [string, string][]) =>
  entries.map(([term, definition]) => ({ term, definition }));
const timeline = (entries: [string, string, string][]) =>
  entries.map(([date, event, significance]) => ({ date, event, significance }));
const compare = (
  title: string,
  left: string,
  right: string,
  connection: string,
) => ({ title, left, right, connection });
const example = (prompt: string, steps: string[], answer: string) => ({
  prompt,
  steps,
  answer,
});
const lesson = (
  n: number,
  data: Omit<UnitLesson, "id" | "subject" | "unit" | "scope" | "sources">,
): UnitLesson => ({
  id: `world-lesson-${n}`,
  subject: "world",
  unit: units[n - 1],
  scope: "standard",
  sources: [framework],
  ...data,
});

export const worldUnits: UnitLesson[] = [
  lesson(1, {
    title: "The Global Tapestry, c.1200–1450",
    overview:
      "Compare how communities built states and organized belief, production, and social hierarchy across seven regions. Explain institutions in their local settings before making a global comparison; no single political pattern describes all societies.",
    topics: [
      topic(
        "East Asia",
        [
          "Song China",
          "Neo-Confucianism",
          "Civil service examinations",
          "Rice and commercial growth",
          "Korea, Japan, Vietnam",
        ],
        "Song rulers used a bureaucracy recruited partly through examinations in Confucian learning. Education cost money, so the system favored wealthy families even though it offered a route beyond hereditary office. Neo-Confucian thinkers renewed Confucian ethics while responding to Buddhist and Daoist ideas. Improved rice cultivation and commercial specialization supported population and city growth. Paper money and printing helped exchange and education. Chinese institutions influenced Korea, Japan, and Vietnam, but local rulers adapted them: Japanese warrior elites did not simply reproduce the Song examination system. Patriarchal family expectations persisted amid these changes.",
      ),
      topic(
        "Dar al-Islam",
        [
          "Abbasid fragmentation",
          "Seljuk Turks",
          "Delhi Sultanate",
          "Sufism",
          "Learning and translation",
        ],
        "Dar al-Islam describes a broad Islamic cultural world, not a single unified empire. As Abbasid political authority weakened, new Muslim-led states used military power and religious legitimacy. Scholars and merchants remained connected across political boundaries through Arabic scholarship, pilgrimage, and commerce. Sufi teachers helped spread Islam through personal religious networks. In South Asia, the Delhi Sultanate governed populations with varied beliefs; conquest did not produce immediate universal conversion. Earlier translation of Greek, Persian, and Indian knowledge provided foundations for further work in mathematics, medicine, and philosophy.",
      ),
      topic(
        "South and Southeast Asia",
        [
          "Hindu and Buddhist institutions",
          "Bhakti movements",
          "Angkor",
          "Srivijaya",
          "Trade and temple patronage",
        ],
        "South Asia contained multiple states and overlapping religious traditions. Bhakti devotion emphasized a personal relationship with a deity and sometimes challenged elite control of religious practice without eliminating social hierarchy. In Southeast Asia, temple patronage and Hindu or Buddhist royal imagery helped legitimize rule. Angkor combined monumental building with agricultural water management. Maritime states such as Srivijaya gained resources from strategic shipping routes. Distinguish agrarian territorial power from control of ports: both could support states, but through different tax bases and geographic advantages.",
      ),
      topic(
        "The Americas",
        [
          "Mexica tribute",
          "Inca administration",
          "Andean agriculture",
          "Maya city-states",
        ],
        "The Mexica, often called Aztecs, expanded a tribute empire centered on Tenochtitlan. Tribute and warfare supported rulers, while chinampa agriculture supplied intensive food production. The Inca governed a large Andean empire through roads, provincial officials, quipu recordkeeping, and labor obligations including the mit’a. Terracing adapted farming to mountain slopes. These states did not depend on Eurasian draft animals or alphabetic writing. Maya political organization commonly involved multiple city-states rather than one permanent unified empire. Political complexity must be assessed through institutions and evidence, not European categories of civilization.",
      ),
      topic(
        "Africa",
        [
          "Mali",
          "Ethiopia",
          "Great Zimbabwe",
          "Kinship and regional diversity",
        ],
        "Mali rulers benefited from access to trans-Saharan commerce and combined Islamic connections with local sources of authority. Mansa Musa’s pilgrimage in 1324 publicized royal wealth and Muslim affiliation. Christian Ethiopia developed its own state and religious traditions. Great Zimbabwe’s stone-built center reflected regional political organization and connections to commerce reaching the Indian Ocean. Some communities organized authority through kinship rather than a large centralized bureaucracy. Africa was neither politically uniform nor isolated; examine specific states, ecological settings, and trading relationships.",
      ),
      topic(
        "Europe",
        [
          "Manorialism",
          "Feudal relationships",
          "Christian churches",
          "Urban growth",
        ],
        "Much of medieval western Europe had fragmented political authority. Lords and vassals formed varied relationships involving land and service; manorialism organized rural production and peasant obligations. The Roman Catholic Church supplied institutions and religious authority across kingdoms. Serfs faced restrictions on movement, though their obligations differed across places and time. Towns, trade, and stronger monarchies gradually complicated this rural pattern. Eastern Orthodox Christianity and Byzantine imperial traditions show why western European institutions should not be generalized to the entire continent.",
      ),
      topic(
        "Comparing state building",
        [
          "Legitimacy",
          "Revenue",
          "Administrative reach",
          "Continuity and change",
        ],
        "A good comparison uses a shared category, such as recruitment, taxation, or religious legitimacy, then explains a meaningful difference. Song examination officials and Inca provincial administrators both helped rulers govern distant populations, but they were recruited and trained differently. A ruler’s claim to sacred authority is evidence of a political strategy, not proof that every subject accepted that claim. Evaluate what an institution enabled and where geography, local elites, or unequal access limited it.",
      ),
    ],
    vocabulary: vocab([
      ["Bureaucracy", "A hierarchy of officials administering a state."],
      [
        "Neo-Confucianism",
        "A renewed Confucian tradition integrating responses to Buddhist and Daoist thought.",
      ],
      ["Tribute", "Goods or payments demanded from subordinate communities."],
      [
        "Mit’a",
        "An Andean system of rotating labor obligations, used by the Inca state.",
      ],
      [
        "Manorialism",
        "Rural economic arrangements linking landed estates and dependent peasants.",
      ],
      [
        "Sufism",
        "Islamic traditions emphasizing spiritual discipline and a personal relationship with God.",
      ],
      ["Bhakti", "Hindu devotional movements emphasizing personal devotion."],
      [
        "Legitimacy",
        "The grounds on which rule is presented and accepted as rightful.",
      ],
    ]),
    concepts: [
      "Religious influence can cross political boundaries.",
      "Centralization is a matter of degree, not an all-or-nothing label.",
      "Agricultural surplus supports specialization and state revenue.",
      "Shared institutional goals can be achieved through different regional systems.",
    ],
    workedExamples: [
      example(
        "Compare one method Song and Inca rulers used to administer territory.",
        [
          "Choose administration as the shared category.",
          "Name examination-trained officials and Inca provincial officials.",
          "Explain how each connected the center to local communities.",
          "Qualify the similarity by distinguishing recruitment and recordkeeping.",
        ],
        "Both states used officials to extend central authority, but Song recruitment emphasized Confucian examinations while Inca administration relied on provincial organization and quipu records. This similarity in administrative purpose did not require identical institutions.",
      ),
    ],
    misconceptions: [
      "Dar al-Islam was not one politically unified state in 1200.",
      "Chinese influence did not make all East Asian political institutions identical.",
      "The historical empire of Ghana and the modern state of Ghana are different.",
      "The Inca and Mexica were distinct societies with different administrative practices.",
    ],
    timeline: timeline([
      [
        "c.1200",
        "Song commercial and administrative institutions flourish",
        "A starting point for comparing existing states.",
      ],
      [
        "1324–1325",
        "Mansa Musa makes the pilgrimage to Mecca",
        "Connects Mali’s royal authority to wider Islamic networks.",
      ],
      [
        "1428",
        "Mexica-led Triple Alliance forms",
        "Supports expansion of a tributary empire.",
      ],
      [
        "15th century",
        "Inca territorial expansion accelerates",
        "Builds a large Andean imperial administration.",
      ],
    ]),
    comparisons: [
      compare(
        "Revenue and obligation",
        "Mexica tributary communities supplied demanded goods.",
        "Inca subjects supplied labor and goods through state obligations.",
        "Both extracted resources, but the organization of obligations differed.",
      ),
      compare(
        "Religious authority",
        "Song elites promoted Confucian ethical learning.",
        "Mali rulers used Islamic connections alongside local traditions.",
        "Belief systems could support rule without erasing other practices.",
      ),
    ],
  }),
  lesson(2, {
    title: "Networks of Exchange, c.1200–1450",
    overview:
      "Explain why exchange expanded, how land and sea networks differed, and how movement transformed societies. Trade carried goods, ideas, people, and pathogens; benefits and harms were distributed unevenly.",
    topics: [
      topic(
        "Silk Roads and the Mongols",
        ["Caravanserai", "Credit", "Mongol conquest", "Luxury goods"],
        "Overland routes linked multiple regional markets rather than one continuous road. High transport costs favored valuable goods such as silk. Caravanserai offered travelers lodging and protection; credit reduced the need to carry money everywhere. Mongol conquest destroyed communities but also placed large stretches of Eurasia under connected political authorities. Protection for merchants and diplomatic travel could reduce some risks. Political integration did not eliminate banditry, war, or local bargaining, and Mongol states eventually fragmented.",
      ),
      topic(
        "Indian Ocean exchange",
        [
          "Monsoons",
          "Dhows",
          "Junks",
          "Diasporic communities",
          "Swahili coast",
        ],
        "Predictable seasonal monsoon winds shaped sailing schedules. Ship capacity made bulk goods more feasible than overland transport. Improved navigational knowledge and vessel design expanded exchange among East Africa, Arabia, South Asia, Southeast Asia, and China. Merchant diasporas developed local family and commercial ties while maintaining connections abroad. Swahili cities linked African products to maritime markets and combined African cultural foundations with Islamic and other oceanic influences. Do not attribute every innovation or voyage to one people.",
      ),
      topic(
        "Trans-Saharan routes",
        ["Camel caravans", "Gold and salt", "Mali", "Islamic learning"],
        "Camel caravans and knowledge of desert routes connected North Africa with West African societies. Gold, salt, textiles, and enslaved people circulated through markets. States could benefit by taxing commerce or controlling strategic towns, without controlling every source of gold. Merchants and scholars helped spread Islam, while local religious traditions persisted. Timbuktu’s learning networks illustrate how economic and cultural exchange reinforced one another.",
      ),
      topic(
        "Cultural and environmental consequences",
        ["Ibn Battuta", "Marco Polo", "Buddhism", "Crops", "Plague"],
        "Travel accounts can reveal connections but also contain selection, exaggeration, and misunderstandings. Explain the traveler’s social position and audience before treating a description as representative. Religious traditions spread through merchants, missionaries, and patronage. Crop diffusion changed diets and agriculture. Increased connections also enabled disease transmission: the Black Death spread across parts of Eurasia and North Africa and caused severe mortality. Trade was one channel of transmission, not evidence that all connected regions experienced identical outcomes.",
      ),
    ],
    vocabulary: vocab([
      [
        "Caravanserai",
        "A lodging place supporting overland traders and animals.",
      ],
      [
        "Monsoon",
        "A seasonally shifting wind system affecting sailing and rainfall.",
      ],
      [
        "Diaspora",
        "A community dispersed from a homeland while retaining connections.",
      ],
      ["Credit", "An arrangement permitting payment or repayment later."],
      [
        "Pax Mongolica",
        "A shorthand for relative security and connected exchange under Mongol rule, with important limits.",
      ],
    ]),
    concepts: [
      "Geography shapes routes without making human institutions irrelevant.",
      "States, commercial practices, and technology jointly reduce trading costs.",
      "Networks transmit disease as well as useful knowledge.",
      "Source perspective limits what a travel account can establish.",
    ],
    workedExamples: [
      example(
        "Explain one cause and one consequence of increased Indian Ocean trade.",
        [
          "Separate cause from consequence.",
          "Link seasonal sailing knowledge to reliable voyages.",
          "Explain how repeated contact supported merchant communities.",
        ],
        "Knowledge of monsoon cycles allowed merchants to plan voyages and return trips more reliably, encouraging exchange. Repeated travel helped establish diaspora communities in ports, which linked local societies to overseas religious and commercial networks.",
      ),
    ],
    misconceptions: [
      "The Silk Roads were many linked routes.",
      "Mongol rule involved both destructive conquest and support for exchange.",
      "The Black Death did not affect every region identically.",
    ],
    timeline: timeline([
      [
        "1206",
        "Chinggis Khan unifies Mongol groups",
        "Creates a foundation for Eurasian conquest.",
      ],
      [
        "13th century",
        "Mongol expansion connects large areas",
        "Changes political and commercial relationships.",
      ],
      [
        "1340s onward",
        "Black Death spreads across many connected regions",
        "Shows environmental costs of exchange.",
      ],
    ]),
    comparisons: [
      compare(
        "Transport and cargo",
        "Silk Roads used costly overland transport suited to high-value cargo.",
        "Indian Ocean ships could carry larger volumes, including bulk goods.",
        "Both required infrastructure and commercial trust; transport costs influenced what circulated.",
      ),
    ],
  }),
  lesson(3, {
    title: "Land-Based Empires, c.1450–1750",
    overview:
      "Compare imperial expansion, administration, and religious legitimacy. Gunpowder mattered alongside revenue, local alliances, geography, and older traditions of rule.",
    topics: [
      topic(
        "Imperial expansion",
        ["Ottomans", "Safavids", "Mughals", "Russia", "Qing"],
        "Ottoman, Safavid, and Mughal rulers built large empires across parts of the Islamic world and South Asia. Firearms and artillery contributed to warfare but did not govern conquered populations by themselves. Russia expanded across northern Eurasia, while the Qing extended authority into Inner Asia. Borders changed through conflict, negotiation, and relationships with local elites. Compare specific military and fiscal systems instead of assuming every empire followed an identical gunpowder model.",
      ),
      topic(
        "Administration and revenue",
        [
          "Devshirme",
          "Janissaries",
          "Mansabdars",
          "Tax collection",
          "Local elites",
        ],
        "Ottoman devshirme recruitment drew boys from Christian communities into service and conversion, including elite military or administrative roles. Mughal mansabdars held ranks tied to service obligations and resources. Rulers often depended on provincial elites and intermediaries to collect revenue. Tax farming exchanged collection rights for payments and could create incentives for harsh extraction. Administrative capacity therefore coexisted with bargaining and limits on direct central control.",
      ),
      topic(
        "Legitimation and religion",
        [
          "Sunni–Shi’a rivalry",
          "Akbar",
          "Divine-right claims",
          "Monumental architecture",
        ],
        "Safavid promotion of Shi’a Islam differentiated it from Sunni Ottoman authority and sharpened political rivalry. Mughal Akbar’s policies accommodated religious diversity and helped integrate non-Muslim elites; later policies varied. European rulers invoked divine right, while palace and temple construction projected wealth and authority in multiple societies. Analyze a monument as a political claim made to an audience, not as automatic proof of popular loyalty.",
      ),
      topic(
        "Continuity, reform, and conflict",
        [
          "Protestant Reformation",
          "Sikhism",
          "Bureaucratic traditions",
          "Resistance",
        ],
        "The Protestant Reformation challenged Roman Catholic authority and contributed to political and religious conflict in Europe. Sikh traditions developed in South Asia in a setting shaped by Hindu and Islamic interactions. Imperial expansion preserved some local institutions while changing ruling elites, revenue demands, and religious policies. Resistance and succession conflicts show that centralization was negotiated and could weaken. Compare continuity and change within an empire instead of treating two centuries as static.",
      ),
    ],
    vocabulary: vocab([
      [
        "Devshirme",
        "Ottoman recruitment levy on boys from Christian communities for imperial service.",
      ],
      [
        "Janissaries",
        "An Ottoman elite infantry force whose composition changed over time.",
      ],
      [
        "Mansabdar",
        "A ranked Mughal official with military and administrative obligations.",
      ],
      [
        "Tax farming",
        "Assigning tax collection rights to intermediaries in exchange for payments.",
      ],
      ["Divine right", "A claim that monarchical authority derives from God."],
    ]),
    concepts: [
      "Military conquest and administration require different resources.",
      "Religious claims can both integrate subjects and intensify conflict.",
      "Local intermediaries enable and constrain central authority.",
    ],
    workedExamples: [
      example(
        "Evaluate the claim that gunpowder alone explains imperial expansion.",
        [
          "Identify what weapons explain: battlefield advantages.",
          "Add administration and revenue as necessary conditions.",
          "Use an Ottoman or Mughal example.",
        ],
        "Gunpowder strengthened Ottoman siege warfare, but expansion also required tax revenue and officials who could maintain armies and govern provinces. Weapons explain some victories; sustained imperial power depended on institutions that mobilized resources.",
      ),
    ],
    misconceptions: [
      "The Ottoman, Safavid, and Mughal states were not religiously identical.",
      "Akbar’s approach did not describe every Mughal ruler.",
      "Centralization did not eliminate all local autonomy.",
    ],
    timeline: timeline([
      [
        "1453",
        "Ottomans capture Constantinople",
        "Demonstrates territorial and symbolic expansion.",
      ],
      [
        "1501",
        "Safavid rule begins in Iran",
        "Shi’a patronage shapes imperial identity.",
      ],
      [
        "1526",
        "Mughal rule begins in northern India",
        "Starts a new imperial dynasty.",
      ],
      [
        "1644",
        "Qing take Beijing",
        "Begins Qing rule of China and later territorial expansion.",
      ],
    ]),
    comparisons: [
      compare(
        "Religious policy",
        "Safavid rulers promoted Shi’a institutions.",
        "Akbar integrated elites across religious boundaries.",
        "Both used religious policy in state building, but the strategies differed.",
      ),
    ],
  }),
  lesson(4, {
    title: "Transoceanic Interconnections, c.1450–1750",
    overview:
      "Trace maritime expansion, the Columbian Exchange, colonial production, and resistance. Global connections grew through cooperation and violence, with severe consequences for Indigenous peoples and enslaved Africans.",
    topics: [
      topic(
        "Maritime expansion",
        [
          "Navigation",
          "Portuguese trading posts",
          "Spanish conquest",
          "Chartered companies",
        ],
        "European voyages drew on navigational knowledge with multiple regional origins, state sponsorship, and demand for trade. Portuguese rulers built a network of forts and ports around Africa and the Indian Ocean; they did not immediately control all Asian commerce. Spanish conquest created territorial empires in the Americas through military campaigns, Indigenous alliances, and disease-related disruption. Dutch and English chartered companies combined private investment with state privileges. Distinguish a fortified trading network from a territorial colony.",
      ),
      topic(
        "The Columbian Exchange",
        ["Disease", "Crops", "Animals", "Demographic change"],
        "After 1492, sustained Atlantic contact moved organisms between hemispheres. Smallpox and other diseases devastated Indigenous populations, interacting with warfare and exploitation. American crops such as maize and potatoes later supported population growth elsewhere; Afro-Eurasian animals and crops transformed American environments. These effects unfolded unevenly and at different speeds. A two-way exchange of organisms did not imply equal power, equal benefit, or voluntary participation.",
      ),
      topic(
        "Labor and social hierarchy",
        [
          "Encomienda",
          "Colonial mit’a",
          "Plantation slavery",
          "Casta classifications",
        ],
        "Colonial economies used several coercive labor systems. Encomienda assigned colonists claims to Indigenous tribute or labor, while the colonial mit’a adapted an earlier Andean obligation to extract labor, especially for mining. Atlantic plantations increasingly depended on the forced transport and enslavement of Africans. Colonial racial classifications attempted to organize privilege, but lived identities and status were more complicated than a neat chart. Explain the legal and economic mechanisms of coercion rather than presenting exploitation as a natural labor supply.",
      ),
      topic(
        "Global trade and resistance",
        ["Silver", "Mercantilism", "Maroon communities", "Pueblo Revolt"],
        "American silver linked Atlantic extraction to European commerce and demand in Asian markets, especially China. Mercantilist policies sought to direct trade and wealth toward metropolitan states. Enslaved people resisted through escape, revolt, and everyday strategies; maroon settlements built autonomous communities. The Pueblo Revolt of 1680 challenged Spanish religious and political domination. Indigenous and African people shaped outcomes as actors, even under unequal power. Avoid treating colonial rule as complete, uncontested control.",
      ),
    ],
    vocabulary: vocab([
      [
        "Columbian Exchange",
        "Movement of organisms between the Americas and Afro-Eurasia after sustained Atlantic contact.",
      ],
      [
        "Mercantilism",
        "Policies seeking state power through managed trade and accumulation of wealth.",
      ],
      [
        "Encomienda",
        "Spanish colonial assignment of claims to Indigenous tribute or labor.",
      ],
      ["Maroon", "A member of a community formed by people escaping slavery."],
      [
        "Joint-stock company",
        "A business funded through pooled shareholder investment.",
      ],
    ]),
    concepts: [
      "Biological exchange and imperial conquest interacted.",
      "Global silver networks linked production, taxation, and demand.",
      "Coercion, resistance, and adaptation must all appear in colonial history.",
    ],
    workedExamples: [
      example(
        "Explain how silver mining connected the Americas and Asia.",
        [
          "Identify American production.",
          "Trace transport and demand.",
          "Explain a social consequence at the production site.",
        ],
        "Silver mined in places such as Potosí entered global trading networks and helped pay for Asian goods. Chinese tax and commercial demand encouraged silver circulation. The connection relied partly on coerced mining labor, so growing global trade could intensify exploitation in the Americas.",
      ),
    ],
    misconceptions: [
      "Disease was not the only cause of Indigenous demographic collapse.",
      "The encomienda and plantation slavery were distinct institutions.",
      "Portugal did not replace all existing Indian Ocean traders.",
    ],
    timeline: timeline([
      [
        "1492",
        "Sustained Atlantic contact begins",
        "Creates new biological and commercial connections.",
      ],
      [
        "1498",
        "Vasco da Gama reaches India by sea",
        "Adds a European route into existing Asian trade.",
      ],
      [
        "1545",
        "Potosí silver deposits begin colonial exploitation",
        "Supports a major global commodity flow.",
      ],
      [
        "1680",
        "Pueblo Revolt",
        "Demonstrates resistance to Spanish colonial power.",
      ],
    ]),
    comparisons: [
      compare(
        "Colonial strategies",
        "Portuguese power often centered on forts and strategic ports.",
        "Spanish American rule established extensive territorial colonies.",
        "Both used coercion and local alliances; their early geographic reach and revenue bases differed.",
      ),
    ],
  }),
  lesson(5, {
    title: "Revolutions, c.1750–1900",
    overview:
      "Connect changing political ideas with industrial production and social movements. Explain why revolutions occurred and whose rights expanded or remained limited.",
    topics: [
      topic(
        "Enlightenment and political revolutions",
        [
          "Natural rights",
          "Social contract",
          "American and French revolutions",
          "Haitian Revolution",
        ],
        "Enlightenment writers debated authority, reason, rights, and government. Revolutionaries adapted those ideas to conflicts over taxation, representation, slavery, and social privilege. The American and French revolutions challenged existing authority but did not immediately establish equal rights for all. The Haitian Revolution confronted colonial domination and slavery directly and produced an independent state. Ideas mattered alongside material pressures and organized action; they were not a single cause that automatically produced revolution.",
      ),
      topic(
        "Nationalism and independence",
        ["Latin America", "Creole elites", "Italian and German unification"],
        "Nationalism linked political sovereignty to a people imagined as sharing an identity. It could promote independence or unification while excluding minorities. Latin American independence movements involved competing elite and popular aims; independence often preserved major inequalities. German and Italian unification illustrate how diplomacy and warfare could support nationalist goals. Compare national claims with who actually gained political participation.",
      ),
      topic(
        "Industrial origins and spread",
        ["Coal", "Steam power", "Factories", "Britain", "Japan"],
        "Britain’s industrialization drew on coal, investment, labor, agricultural change, commercial connections, and institutions. No single factor was sufficient. Mechanized production and steam power increased output and changed where work occurred. Industrialization spread unevenly through private investment and government intervention. Meiji leaders in Japan supported industrial and institutional reforms to strengthen the state in an imperial world. Geographic advantages and access to global resources mattered, but societies made different political choices.",
      ),
      topic(
        "Industrial society and reform",
        ["Urbanization", "Wage labor", "Unions", "Socialism", "Women’s rights"],
        "Factory work changed schedules, discipline, and household labor. Cities grew rapidly, often with poor housing and sanitation. Workers organized unions and demanded reforms. Socialist critiques challenged private control of production and unequal distribution; different socialist movements proposed different methods. Women’s rights advocates exposed contradictions between universal rights language and legal exclusion. Reform improved some conditions gradually without removing every class or gender inequality.",
      ),
    ],
    vocabulary: vocab([
      [
        "Social contract",
        "The idea that legitimate government rests on an agreement among people and rulers.",
      ],
      [
        "Nationalism",
        "Identification with a nation and support for its political interests or sovereignty.",
      ],
      [
        "Industrialization",
        "Expansion of mechanized production and related economic transformations.",
      ],
      ["Capital", "Resources invested to generate production or profit."],
      [
        "Socialism",
        "A family of ideas favoring social or collective control over major productive resources.",
      ],
    ]),
    concepts: [
      "Revolutionary principles and actual inclusion can diverge.",
      "Industrialization has multiple interacting causes.",
      "Political ideologies respond to social and economic conditions.",
    ],
    workedExamples: [
      example(
        "Compare the Haitian and French revolutions in their challenge to hierarchy.",
        [
          "Identify a shared challenge to inherited privilege.",
          "Contrast colonial slavery with metropolitan estate privilege.",
          "Explain the significance of Haiti’s abolition.",
        ],
        "Both movements challenged established authority, but Haiti’s revolution transformed a slave colony into an independent state and abolished slavery. French revolutionary rights debates attacked estate privilege while inclusion remained contested. The Haitian case therefore exposed how rights language could be extended against colonial racial domination.",
      ),
    ],
    misconceptions: [
      "Political independence did not automatically create social equality.",
      "Industrialization did not begin everywhere simultaneously.",
      "Nationalism could unite some people and exclude others.",
    ],
    timeline: timeline([
      [
        "1789",
        "French Revolution begins",
        "Challenges monarchy and estate privilege.",
      ],
      [
        "1791–1804",
        "Haitian Revolution",
        "Overthrows slavery and colonial rule.",
      ],
      [
        "19th century",
        "Industrialization expands beyond Britain",
        "Changes production and state power unevenly.",
      ],
      [
        "1868",
        "Meiji political transformation",
        "Enables state-led reform and industrial growth.",
      ],
    ]),
    comparisons: [
      compare(
        "Industrial strategies",
        "British factories often expanded through private investment.",
        "Meiji authorities actively promoted strategic industry and institutions.",
        "Both used new production technology, but the state’s role differed.",
      ),
    ],
  }),
  lesson(6, {
    title: "Consequences of Industrialization, c.1750–1900",
    overview:
      "Examine how industrial power reshaped empire, commodity production, and migration. Evaluate claims about civilization against the coercive institutions and unequal exchanges of imperial rule.",
    topics: [
      topic(
        "Imperial motives and methods",
        [
          "Raw materials",
          "Strategic rivalry",
          "Racial ideologies",
          "Africa",
          "Asia",
        ],
        "Industrial states sought resources, markets, investment opportunities, and strategic advantages. National rivalry and racial ideologies supplied additional motives and justifications. Steam transport and weaponry could increase military reach, while medicine helped Europeans operate in some environments. Formal colonies, protectorates, and economic influence represented different forms of imperial control. African and Asian societies had their own rivalries and institutions, so imperial expansion depended on local encounters as well as European technology.",
      ),
      topic(
        "Economic imperialism",
        ["Cash crops", "Railways", "Opium Wars", "Unequal treaties"],
        "Colonial economies frequently emphasized commodity exports rather than diversified local production. Railways could connect mines and plantations to ports, benefiting exporters while also creating new local connections. The Opium Wars and subsequent treaties weakened Qing control over foreign trade and expanded foreign privileges. Economic domination could exist without complete territorial annexation. Ask who financed infrastructure, where it led, and who controlled its profits before labeling it development.",
      ),
      topic(
        "Responses and resistance",
        ["1857 rebellion", "Ethiopia at Adwa", "Reform", "Local alliances"],
        "People resisted imperial expansion through warfare, revolt, diplomacy, religious movements, and reforms. The 1857 rebellion challenged British power in India, though its participants had varied aims. Ethiopia’s victory at Adwa in 1896 preserved independence against Italian conquest. Other rulers attempted modernization to strengthen autonomy. Resistance did not require one unified national identity, and collaboration could reflect survival strategies rather than uncomplicated agreement with foreign rule.",
      ),
      topic(
        "Migration and labor",
        [
          "Indenture",
          "Chinese and Indian migrants",
          "Diasporas",
          "Exclusion laws",
        ],
        "Industrial and colonial labor demand moved people across regions. Some migrated voluntarily for wages, while indentured contracts constrained workers through debt, penalties, and unequal bargaining. Indian and Chinese laborers built diaspora communities in the Caribbean, Southeast Asia, and elsewhere. Migration altered family structures and created cultural connections. Receiving societies sometimes imposed racially discriminatory exclusion laws. Distinguish legal categories and degrees of coercion without assuming a contract guaranteed freedom.",
      ),
    ],
    vocabulary: vocab([
      [
        "Imperialism",
        "Extension of a state’s power over other territories or peoples.",
      ],
      [
        "Economic imperialism",
        "Dominance exercised through financial or commercial control rather than necessarily annexation.",
      ],
      ["Cash crop", "A crop grown primarily for sale."],
      [
        "Indentured labor",
        "Labor tied to a contract for a fixed term, often under coercive conditions.",
      ],
      [
        "Unequal treaty",
        "A treaty imposing privileges or obligations through an unequal balance of power.",
      ],
    ]),
    concepts: [
      "Motives and ideological justifications are analytically different.",
      "Infrastructure can increase extraction as well as mobility.",
      "Migration ranges from relatively voluntary movement to severe coercion.",
    ],
    workedExamples: [
      example(
        "Analyze a colonial railway connecting a copper mine to a port.",
        [
          "Identify the route’s economic purpose.",
          "Explain how the route serves export extraction.",
          "Qualify the claim by acknowledging possible local uses.",
        ],
        "The direct mine-to-port route suggests that exporters prioritized moving copper to overseas markets. It could create jobs and passenger connections, but those benefits do not establish that local communities controlled investment or profits. Infrastructure can serve both movement and unequal imperial extraction.",
      ),
    ],
    misconceptions: [
      "The Berlin Conference did not instantly conquer or draw every African boundary.",
      "Formal political independence did not guarantee economic autonomy.",
      "Indenture and chattel slavery were distinct, though both could involve severe coercion.",
    ],
    timeline: timeline([
      [
        "1839–1842",
        "First Opium War",
        "Expands foreign privileges in Qing China.",
      ],
      [
        "1857",
        "Rebellion in India",
        "Challenges British rule and precedes a shift to crown administration.",
      ],
      [
        "1884–1885",
        "Berlin Conference",
        "European states negotiate principles for imperial claims in Africa.",
      ],
      ["1896", "Battle of Adwa", "Ethiopia defeats an Italian invading army."],
    ]),
    comparisons: [
      compare(
        "Forms of domination",
        "British India experienced territorial colonial administration.",
        "Qing China faced foreign privileges and treaty ports while retaining its government.",
        "Imperial influence did not require the same legal form everywhere.",
      ),
    ],
  }),
  lesson(7, {
    title: "Global Conflict, c.1900–present",
    overview:
      "Explain the origins and consequences of world wars, revolutionary states, economic crisis, and mass atrocities. Separate immediate triggers from structural causes and distinguish evidence from propaganda.",
    topics: [
      topic(
        "World War I",
        [
          "Alliances",
          "Militarism",
          "Imperial rivalry",
          "Nationalism",
          "Total war",
        ],
        "The assassination of an Austrian archduke triggered a crisis within a wider setting of alliances, military planning, imperial rivalry, and nationalism. These conditions help explain why a local crisis became a major war; they did not make every decision inevitable. Industrial weaponry and mobilization increased destructive capacity. Total war redirected economies and civilian work toward military needs. Colonial troops and resources made a war centered partly in Europe global in participation and consequences.",
      ),
      topic(
        "Revolution and the interwar order",
        [
          "Russian Revolution",
          "Treaty settlements",
          "Great Depression",
          "Fascism",
        ],
        "War strain contributed to revolution in Russia; Bolshevik victory eventually established a communist state. Peace settlements redrew borders and created grievances without fully resolving national aspirations. The Great Depression produced unemployment and weakened confidence in governments. Fascist movements used ultranationalism, authoritarian leadership, and political violence; communist and democratic governments offered different responses. Economic crisis helps explain support for extremism but does not excuse or fully determine political choices.",
      ),
      topic(
        "World War II",
        [
          "Axis expansion",
          "Appeasement",
          "Industrial mobilization",
          "Atomic weapons",
        ],
        "Japanese, Italian, and German expansion destabilized the international order. Appeasement reflected several calculations and constraints, including memories of the previous war. Fighting in Europe, Asia, and other theaters drew on enormous production and civilian mobilization. Allied victory transformed the balance of power. Atomic bombings introduced a new destructive capability and remain subjects of historical debate requiring attention to available evidence, alternatives, and perspectives.",
      ),
      topic(
        "Mass atrocities and accountability",
        [
          "Armenian genocide",
          "Holocaust",
          "Rwanda",
          "International institutions",
        ],
        "Mass atrocities require analysis of perpetrators, ideology, institutions, war conditions, and victims’ experiences. The Holocaust was the Nazi genocide of European Jews; Nazi persecution also targeted other groups. Genocide is not a synonym for every wartime death. The Armenian genocide during World War I and the 1994 genocide against the Tutsi in Rwanda illustrate different contexts of organized destruction. Postwar trials and human-rights institutions sought accountability but faced enforcement limits. Treat victims as people and historical actors, not only statistics.",
      ),
    ],
    vocabulary: vocab([
      [
        "Total war",
        "Mobilization of broad civilian and economic resources for warfare.",
      ],
      [
        "Fascism",
        "Authoritarian ultranationalist politics emphasizing hierarchy, mobilization, and suppression of opposition.",
      ],
      [
        "Propaganda",
        "Communication designed to shape attitudes in support of a cause or authority.",
      ],
      [
        "Genocide",
        "Acts intended to destroy a national, ethnic, racial, or religious group, in whole or in part.",
      ],
      [
        "Appeasement",
        "Concessions intended to avoid conflict with an aggressive power.",
      ],
    ]),
    concepts: [
      "Triggers differ from deeper causes.",
      "A source can be useful evidence of ideology while unreliable as a factual description.",
      "War changes state power, social roles, and international institutions.",
    ],
    workedExamples: [
      example(
        "Explain why an enlistment poster is useful but limited evidence.",
        [
          "Identify purpose and audience.",
          "Infer what authorities wanted viewers to believe.",
          "Separate desired behavior from actual public response.",
        ],
        "A wartime poster appealing to patriotism reveals how officials tried to recruit soldiers and represent national duty. Its persuasive purpose makes it poor evidence that all citizens supported the war. Recruitment records or personal letters could help test how audiences responded.",
      ),
    ],
    misconceptions: [
      "One assassination does not adequately explain all causes of World War I.",
      "All authoritarian ideologies were not identical.",
      "Official propaganda does not directly measure popular opinion.",
    ],
    timeline: timeline([
      [
        "1914–1918",
        "World War I",
        "Accelerates political upheaval and imperial strain.",
      ],
      [
        "1917",
        "Russian revolutions",
        "Creates a new revolutionary political order.",
      ],
      [
        "1929 onward",
        "Great Depression",
        "Destabilizes economies and shapes state intervention.",
      ],
      [
        "1939–1945",
        "World War II in Europe; Asian conflict began earlier",
        "Transforms global power and civilian vulnerability.",
      ],
      [
        "1945",
        "United Nations established",
        "Creates a new forum for international cooperation.",
      ],
    ]),
    comparisons: [
      compare(
        "State intervention",
        "New Deal policies used public programs within a capitalist democracy.",
        "Soviet planning directed production through state authority.",
        "Both increased intervention, but political institutions and ownership differed.",
      ),
    ],
  }),
  lesson(8, {
    title: "Cold War and Decolonization, c.1900–present",
    overview:
      "Study superpower rivalry alongside the agency of newly independent states. Independence changed political sovereignty while borders, inequality, and outside influence continued to shape choices.",
    topics: [
      topic(
        "Cold War rivalry",
        ["Containment", "NATO", "Warsaw Pact", "Arms race", "Proxy wars"],
        "The United States and Soviet Union competed through military alliances, ideology, aid, intelligence operations, and arms development. Nuclear deterrence discouraged some direct confrontations without preventing proxy wars or crises. Local conflicts had their own histories and aims, so Korea or Vietnam cannot be explained only as superpower chess games. Both sides described their interventions through universal ideals while also pursuing strategic interests.",
      ),
      topic(
        "Decolonization",
        ["India and Pakistan", "Algeria", "Ghana", "Negotiation and war"],
        "World wars weakened European empires while anticolonial organizations expanded. Some independence processes involved negotiation; others included prolonged war. Indian independence and partition in 1947 brought sovereignty and extensive displacement and violence. Algeria’s struggle against French rule differed because settler interests and war shaped negotiations. Ghana’s independence in 1957 became an influential African example. Compare particular processes rather than dividing them neatly into entirely peaceful or violent categories.",
      ),
      topic(
        "New states and development",
        [
          "Non-Aligned Movement",
          "Economic dependence",
          "Land reform",
          "Migration",
        ],
        "Non-aligned leaders sought greater autonomy from the superpower blocs, although states sometimes accepted aid from one or both sides. Governments pursued differing development strategies, including planning, industrialization, and land reform. Colonial export dependence and unequal global markets constrained choices. New borders could intensify conflicts and refugee movements. Independence was a major change in sovereignty, but it did not automatically undo inherited economic or social structures.",
      ),
      topic(
        "Political transformations",
        [
          "Chinese Revolution",
          "Cuban Revolution",
          "Apartheid",
          "Soviet collapse",
        ],
        "The Chinese communist victory of 1949 transformed political institutions and property relations. Revolutionary governments in Cuba and elsewhere interacted with Cold War rivalry. South African opponents of apartheid organized domestically and gained international support; the end of apartheid required political negotiation as well as sustained resistance. Soviet collapse in 1991 reflected economic problems, reforms, political mobilization, and national movements, not one simple external cause.",
      ),
    ],
    vocabulary: vocab([
      [
        "Containment",
        "A United States strategy to limit the spread of Soviet influence and communism.",
      ],
      [
        "Proxy war",
        "A conflict in which outside powers support opposing local participants.",
      ],
      [
        "Decolonization",
        "The process through which colonies gain political independence.",
      ],
      [
        "Nonalignment",
        "An effort to avoid formal subordination to rival superpower blocs.",
      ],
      [
        "Apartheid",
        "South Africa’s institutionalized system of racial segregation and domination.",
      ],
    ]),
    concepts: [
      "Local actors shape conflicts involving outside powers.",
      "Sovereignty and economic independence are distinct.",
      "The end of an empire may produce both liberation and displacement.",
    ],
    workedExamples: [
      example(
        "Explain one continuity and one change after independence.",
        [
          "Define political sovereignty as a category.",
          "Use a specific export structure as economic evidence.",
          "Avoid claiming all colonies had identical experiences.",
        ],
        "Independence transferred formal governing authority from an imperial state to national leaders. Yet an economy dependent on exporting a few commodities could remain vulnerable to foreign demand and finance. Political independence therefore represented substantial change alongside possible economic continuity.",
      ),
    ],
    misconceptions: [
      "Nonaligned states were not necessarily neutral on every issue.",
      "Cold War conflicts had local causes as well as superpower involvement.",
      "Decolonization did not end every form of outside influence.",
    ],
    timeline: timeline([
      [
        "1947",
        "India and Pakistan gain independence",
        "Partition accompanies new sovereignty.",
      ],
      [
        "1949",
        "People’s Republic of China established",
        "Changes the Cold War balance in Asia.",
      ],
      ["1955", "Bandung Conference", "Demonstrates Afro-Asian cooperation."],
      [
        "1962",
        "Algerian independence and Cuban Missile Crisis",
        "Shows intertwined decolonization and superpower rivalry.",
      ],
      ["1991", "Soviet Union dissolves", "Ends the bipolar Cold War order."],
      [
        "1994",
        "South Africa holds a nonracial national election",
        "Marks a major transition from apartheid.",
      ],
    ]),
    comparisons: [
      compare(
        "Paths to independence",
        "India’s independence followed mass mobilization and negotiation, alongside partition violence.",
        "Algeria’s independence followed a prolonged war against French rule.",
        "Both involved popular organization, but settler politics and conflict produced different pathways.",
      ),
    ],
  }),
  lesson(9, {
    title: "Globalization, c.1900–present",
    overview:
      "Evaluate interconnected economies, communication, environmental pressures, and movements for rights. Increasing connection creates opportunities while unequal access and political choices shape outcomes.",
    topics: [
      topic(
        "Technology and health",
        ["Communication", "Transportation", "Vaccines", "Green Revolution"],
        "Air travel, container shipping, and digital communication reduced the time or cost of some exchanges. Medical advances improved survival while unequal access persisted. Green Revolution crop varieties, irrigation, fertilizers, and institutional support increased yields in some regions but could require expensive inputs and create environmental pressures. Technology does not act independently of infrastructure, wealth, public policy, or ecological conditions.",
      ),
      topic(
        "Global economic institutions",
        [
          "Multinational corporations",
          "Supply chains",
          "Trade agreements",
          "International finance",
        ],
        "Production chains often divide design, materials, assembly, and sales among countries. Multinational firms can generate jobs and investment while bargaining over wages, taxation, and regulation. International institutions and trade agreements influence capital flows and national policy choices. Economic liberalization expanded in many places late in the twentieth century, with varied effects. A rising aggregate output measure does not establish that all workers or communities gained equally.",
      ),
      topic(
        "Rights, culture, and resistance",
        [
          "Human rights",
          "Women’s movements",
          "Environmental movements",
          "Cultural diffusion",
        ],
        "Rights movements challenged legal discrimination and exclusions in many societies. International declarations and organizations provided language and forums, while local activists supplied goals and strategies. Music, film, sport, and consumer products circulated widely, but audiences adapted them to local identities. Critics of globalization raised concerns about labor, inequality, sovereignty, and the environment. Shared cultural products do not demonstrate the disappearance of regional difference.",
      ),
      topic(
        "Environmental change and inequality",
        [
          "Fossil fuels",
          "Climate change",
          "Migration",
          "Access to information",
        ],
        "Industrial energy use and land-use change increased greenhouse gas emissions. Environmental costs cross borders, while responsibility and vulnerability differ among communities. Economic inequality shapes access to clean water, medicine, communication, and climate adaptation. Migration connects societies but also produces political conflict over inclusion. Historical analysis distinguishes long-term patterns from one news event and evaluates data with attention to scale, definitions, and missing groups.",
      ),
    ],
    vocabulary: vocab([
      [
        "Globalization",
        "Increasing worldwide connections through production, exchange, communication, and culture.",
      ],
      [
        "Supply chain",
        "Linked stages through which materials and products are produced and distributed.",
      ],
      ["Multinational corporation", "A firm operating in multiple countries."],
      [
        "Green Revolution",
        "Agricultural yield increases associated with new crop varieties and supporting inputs and institutions.",
      ],
      ["Human rights", "Rights claimed for people by virtue of being human."],
    ]),
    concepts: [
      "Greater connection and greater equality are different claims.",
      "Technology’s consequences depend on institutions and access.",
      "Environmental problems combine global causes with unequal local effects.",
    ],
    workedExamples: [
      example(
        "Evaluate the claim that digital communication eliminates inequality.",
        [
          "Identify a real benefit: faster connection.",
          "Identify access limits and unequal power.",
          "Make a qualified argument.",
        ],
        "Digital communication can lower the cost of sharing information and organizing across borders. Yet unequal internet access, language barriers, and control over platforms affect who benefits. It expands opportunities without automatically eliminating economic or political inequality.",
      ),
    ],
    misconceptions: [
      "A global supply chain does not mean every participant has equal bargaining power.",
      "The Green Revolution was more than one new seed.",
      "Cultural exchange does not necessarily erase local identities.",
    ],
    timeline: timeline([
      [
        "1948",
        "Universal Declaration of Human Rights",
        "Provides influential international rights language.",
      ],
      [
        "Mid-20th century onward",
        "Green Revolution expands",
        "Changes food production and input requirements.",
      ],
      [
        "Late 20th century",
        "Digital communication expands",
        "Accelerates information exchange unevenly.",
      ],
      [
        "Late 20th–21st centuries",
        "Global environmental cooperation develops",
        "Attempts collective responses to cross-border problems.",
      ],
    ]),
    comparisons: [
      compare(
        "Connections and costs",
        "Shipping and communication innovations reduce transaction costs.",
        "Resource use and emissions create environmental costs.",
        "An evaluation must assess who gains and who bears costs across scales.",
      ),
    ],
  }),
  {
    id: "world-background-600-1200",
    subject: "world",
    unit: units[0],
    scope: "background",
    title: "Optional background: c.600–1200 (before AP World History: Modern)",
    overview:
      "This optional bridge explains foundations that help contextualize the standard course. These pre-1200 topics are background enrichment, not additional assessed units in AP World History: Modern. Do not substitute this period for the required c.1200–present course.",
    topics: [
      topic(
        "Islam and the early caliphates",
        ["Muhammad", "Hijra", "Umayyads", "Abbasids", "Translation"],
        "Islam emerged in Arabia in the seventh century; the Hijra in 622 marks Muhammad’s migration from Mecca to Medina. Following his death, caliphs led expanding states. The Umayyads governed from Damascus, while the Abbasid revolution in 750 shifted the political center toward Iraq; Baghdad became an important capital and intellectual center. Expansion drew on warfare, administrative adaptation, and existing regional institutions. Conversion occurred over generations and did not simply coincide with conquest. Scholars working in Islamic societies translated and developed knowledge from Greek, Persian, and Indian traditions.",
      ),
      topic(
        "Tang China and Buddhism",
        [
          "Tang administration",
          "Chang’an",
          "Monastic networks",
          "Song transition",
        ],
        "Tang China, 618–907, combined imperial administration with wide cultural and commercial connections. Chang’an attracted travelers and religious communities. Buddhism had reached China earlier through linked routes; monks, merchants, patrons, and translated texts helped sustain its spread. Buddhist monasteries could hold land and attract state support, but rulers also restricted them at times. The Song inherited and changed earlier institutions, including expanding the importance of civil service examinations. Tang and Song are related periods, not interchangeable names.",
      ),
      topic(
        "Byzantium and Christianity",
        [
          "Constantinople",
          "Roman continuity",
          "Orthodox traditions",
          "East–West division",
        ],
        "The Byzantine Empire continued eastern Roman political traditions from Constantinople. Christian institutions and imperial authority interacted, while doctrinal disputes and regional diversity complicated religious unity. Islamic expansion transformed Byzantine control in the eastern Mediterranean without ending Byzantium immediately. The conventional date 1054 marks a major rupture between eastern and western Christian churches, though separation developed over time. Western Catholic and Eastern Orthodox traditions should not be treated as separate religions with no shared history.",
      ),
      topic(
        "Ghana and early Indian Ocean connections",
        [
          "Gold and salt",
          "Camel caravans",
          "Arabian and Asian merchants",
          "Maritime evidence",
        ],
        "Ancient Ghana, centered in parts of the western Sahel rather than the modern country of Ghana, gained resources from trade and political control. Caravans linked North African demand to West African gold and other products. Indian Ocean exchange connected Arabian, African, Indian, Southeast Asian, and Chinese ports before European oceanic expansion. Seasonal sailing knowledge and port networks supported this movement. The ninth-century Tang shipwreck near Belitung offers material evidence of Chinese ceramics entering maritime commerce; one wreck establishes a connection, not the total volume or full diversity of all trade.",
      ),
      topic(
        "Medieval Europe and Vikings",
        [
          "Manors",
          "Christian institutions",
          "Charlemagne",
          "Raiding and commerce",
        ],
        "After western Roman rule fragmented, regional kingdoms and landholding elites developed varied political arrangements. Manors organized much rural production; monasteries and churches supported religious life and learning. Charlemagne’s imperial coronation in 800 connected Frankish power with Roman Christian claims. Scandinavian seafarers raided, traded, settled, and enslaved people across extensive routes. Islamic silver coins and other finds in northern Europe demonstrate exchange connections, often through intermediaries. Describing this period only as isolation or decline obscures its institutions, mobility, and cultural production.",
      ),
    ],
    vocabulary: vocab([
      [
        "Caliph",
        "A leader claiming succession to Muhammad’s political-religious leadership.",
      ],
      ["Hijra", "Muhammad’s migration to Medina in 622."],
      ["Byzantine", "A modern label for the eastern Roman Empire."],
      ["Monastery", "A community devoted to organized religious practice."],
      ["Sahel", "The broad transitional region south of the Sahara."],
      [
        "Viking",
        "A term associated with Scandinavian maritime raiding and expansion; participants also traded and settled.",
      ],
    ]),
    concepts: [
      "The AP Modern boundary is a course organization choice, not the beginning of world connections.",
      "Conquest, conversion, and cultural exchange occur at different rates.",
      "Objects establish connections but rarely prove a unique journey or universal practice.",
    ],
    workedExamples: [
      example(
        "How can a ninth-century Chinese ceramic found in an Indonesian shipwreck support historical reasoning?",
        [
          "Identify the object’s location and origin.",
          "Infer movement through maritime routes.",
          "State the limit of a single archaeological find.",
        ],
        "The ceramic supports the existence of maritime connections carrying Chinese products through Southeast Asian waters before 1200. It cannot by itself show that one merchant traveled the entire route or that all ports exchanged identical goods.",
      ),
    ],
    misconceptions: [
      "These optional pre-1200 topics are not a tenth AP Modern unit.",
      "Early Islamic conquest did not instantly convert all conquered populations.",
      "Vikings engaged in trade and settlement as well as violent raiding.",
      "Medieval Europe was not completely disconnected from other regions.",
    ],
    timeline: timeline([
      ["622", "Hijra", "A foundational date in Islamic history."],
      [
        "618–907",
        "Tang dynasty",
        "An important period of Chinese political and cultural development.",
      ],
      ["661–750", "Umayyad caliphate", "Centers rule in Damascus."],
      [
        "750",
        "Abbasid revolution",
        "Changes the ruling dynasty and political center.",
      ],
      [
        "800",
        "Charlemagne crowned emperor",
        "Links western kingship with Roman Christian imperial claims.",
      ],
      [
        "1054",
        "Conventional date of the East–West Christian schism",
        "Marks a stage in a longer process of religious separation.",
      ],
    ]),
    comparisons: [
      compare(
        "Religious connections",
        "Buddhist monks and merchants circulated texts and practices across Asia.",
        "Muslim merchants and scholars connected regions through exchange and learning.",
        "Neither network required every region to share one state.",
      ),
    ],
    sources: [
      framework,
      {
        title: "The Met: Byzantium and Islam",
        url: "https://www.metmuseum.org/exhibitions/listings/2012/byzantium-and-islam",
      },
      {
        title: "The Met: Tang dynasty",
        url: "https://www.metmuseum.org/it/essays/tang-dynasty-618-906",
      },
      {
        title: "The Met: Trans-Saharan gold trade",
        url: "https://www.metmuseum.org/pt/essays/the-trans-saharan-gold-trade-7th-14th-century",
      },
      {
        title: "UNESCO: Belitong maritime connections",
        url: "https://www.unesco.org/en/iggp/belitong-unesco-global-geopark?hub=67817",
      },
      {
        title: "British Museum: Viking background",
        url: "https://www.britishmuseum.org/sites/default/files/2019-09/Visit_Vikings_KS2_FINAL.pdf",
      },
    ],
  },
];

type Difficulty = Question["difficulty"];
const periods = [
  "1200–1450",
  "1200–1450",
  "1450–1750",
  "1450–1750",
  "1750–1900",
  "1750–1900",
  "1900–present",
  "1900–present",
  "1900–present",
];
const seeds: AuthoredQuestion[] = [];
function historicalTags(
  n: number,
  region: string,
  skill: string,
  scope: Question["scope"] = "standard",
): string[] {
  const skillNames: Record<string, string> = {
    "Developments and processes": "Developments and Processes",
    "Continuity and change": "Continuity and Change",
    "Sourcing and situation": "Sourcing",
    "Claims and evidence": "Claims and Evidence",
    Argumentation: "Historical argumentation",
  };
  const regionAliases: Record<string, string[]> = {
    Eurasia: [
      "Afro-Eurasia",
      "Europe",
      "Middle East",
      "East Asia",
      "South Asia",
    ],
    Caribbean: ["Americas"],
    "Atlantic world": ["Americas", "Africa", "Europe"],
    Arabia: ["Middle East", "Dar al-Islam"],
    "Eastern Mediterranean": ["Europe", "Middle East"],
    "Western Europe": ["Europe"],
    "Northern Europe": ["Europe"],
    Russia: ["Europe"],
    "West Africa": ["Africa"],
    "Southern Africa": ["Africa"],
    Asia: ["Southeast Asia"],
    "Africa and Asia": ["Africa", "East Asia", "South Asia"],
    "Afro-Asia": [
      "Africa",
      "East Asia",
      "South Asia",
      "Southeast Asia",
      "Middle East",
      "Afro-Eurasia",
    ],
    "Northern Europe and Islamic world": [
      "Europe",
      "Dar al-Islam",
      "Middle East",
    ],
  };
  const canonicalRegions = [
    "East Asia",
    "South Asia",
    "Southeast Asia",
    "Dar al-Islam",
    "Middle East",
    "Africa",
    "Europe",
    "Americas",
    "Indian Ocean",
    "Global",
    "Afro-Eurasia",
  ];
  const regions = [
    region,
    ...(regionAliases[region] ?? []),
    ...canonicalRegions.filter((r) => region.includes(r)),
  ];
  if (region.includes("Caribbean")) regions.push("Americas");
  if (region.includes("Middle East") && n <= 3) regions.push("Dar al-Islam");
  return [
    ...new Set([
      scope === "background" ? "600–1200" : periods[n - 1],
      ...regions,
      skillNames[skill] ?? skill,
    ]),
  ];
}
function mc(
  n: number,
  key: string,
  topicName: string,
  difficulty: Difficulty,
  region: string,
  skill: string,
  prompt: string,
  options: string[],
  correct: number,
  explanation: string,
  hint: string,
  scope: Question["scope"] = "standard",
) {
  seeds.push({
    id: `world-v2-${key}`,
    unit: units[n - 1],
    topic: topicName,
    subtopic: topicName,
    difficulty,
    type: "MCQ",
    prompt,
    options,
    answer: options[correct],
    explanation,
    hint,
    tags: historicalTags(n, region, skill, scope),
    scope,
  });
}
function ms(
  n: number,
  key: string,
  topicName: string,
  difficulty: Difficulty,
  region: string,
  prompt: string,
  options: string[],
  correct: number[],
  explanation: string,
  hint: string,
) {
  seeds.push({
    id: `world-v2-${key}`,
    unit: units[n - 1],
    topic: topicName,
    difficulty,
    type: "Multiple select",
    prompt,
    options,
    answer: correct.map((i) => options[i]).join("|"),
    explanation,
    hint,
    tags: historicalTags(n, region, "Comparison"),
    scope: "standard",
  });
}
function written(
  n: number,
  key: string,
  topicName: string,
  difficulty: Difficulty,
  region: string,
  skill: string,
  type: "SAQ" | "DBQ" | "LEQ",
  prompt: string,
  answer: string,
  explanation: string,
  hint: string,
  rubric: Rubric[],
  scope: Question["scope"] = "standard",
) {
  seeds.push({
    id: `world-v2-${key}`,
    unit: units[n - 1],
    topic: topicName,
    difficulty,
    type,
    prompt,
    answer,
    example: answer,
    explanation,
    hint,
    rubric,
    tags: [
      ...historicalTags(n, region, skill, scope),
      ...(type === "LEQ" || type === "DBQ" ? ["Contextualization"] : []),
      "Classroom rubric",
    ],
    scope,
  });
}
const point = (criterion: string, guidance: string, points = 1): Rubric => ({
  criterion,
  points,
  guidance,
});
function essayRubric(
  thesis: string,
  context: string,
  evidence: string,
  reasoning: string,
): Rubric[] {
  return [
    point("Defensible thesis", thesis),
    point("Relevant broader context", context),
    point("Specific evidence", evidence, 2),
    point("Historical reasoning", reasoning),
    point(
      "Qualification and complexity",
      "Develop a meaningful qualification, explain interacting causes, or assess a counterargument with evidence; a token “however” alone is insufficient.",
    ),
  ];
}

// Original classroom practice. No stimulus reproduces a released examination source.
mc(
  1,
  "song-recruitment",
  "East Asia",
  "Easy",
  "East Asia",
  "Developments and processes",
  "Which institution most directly helped Song rulers recruit officials through demonstrated knowledge rather than exclusively hereditary rank?",
  [
    "A hereditary warrior caste",
    "Civil service examinations in Confucian learning",
    "An elected national parliament",
    "A plantation labor contract",
  ],
  1,
  "Civil service examinations tested classical learning and provided a recruitment mechanism, although wealth and access to education still affected opportunity. The other institutions describe different contexts.",
  "Focus on how officials were selected.",
);
mc(
  1,
  "song-rice",
  "East Asia",
  "Medium",
  "East Asia",
  "Causation",
  "How could the spread of early-ripening rice contribute to Song commercial growth?",
  [
    "It eliminated all regional trade.",
    "It replaced all human agricultural labor.",
    "It supported food surpluses and population growth that sustained specialized production.",
    "It ended the need for taxation.",
  ],
  2,
  "More reliable and productive cultivation could support more people and greater specialization. Agriculture and commerce reinforced one another; the crop did not eliminate labor, taxation, or exchange.",
  "Trace food production to population and occupations.",
);
mc(
  1,
  "islam-political-unity",
  "Dar al-Islam",
  "Medium",
  "Middle East and South Asia",
  "Comparison",
  "Which statement best describes Dar al-Islam around 1200?",
  [
    "Several states shared Islamic religious and intellectual connections.",
    "One emperor governed every Muslim community from Spain to India.",
    "Islamic learning stopped when Abbasid political unity weakened.",
    "All subjects of Muslim rulers practiced the same religion.",
  ],
  0,
  "Shared learning, commerce, and religious institutions connected societies even when political authority was divided among multiple states. Political fragmentation did not erase cultural links.",
  "Separate cultural connections from a single government.",
);
mc(
  1,
  "angkor-port",
  "South and Southeast Asia",
  "Medium",
  "Southeast Asia",
  "Comparison",
  "A student compares Angkor’s agricultural water management with Srivijaya’s influence over shipping routes. Which conclusion is best supported?",
  [
    "Both relied entirely on Atlantic plantation exports.",
    "Only maritime societies could form states.",
    "Religion had no political role in either society.",
    "States could mobilize resources through different geographic and economic strategies.",
  ],
  3,
  "Agricultural management and strategic maritime commerce offered different resource bases. Both could sustain political authority, and both interacted with religious legitimation.",
  "Identify the difference in each state’s resource base.",
);
mc(
  1,
  "inca-labor",
  "The Americas",
  "Easy",
  "Americas",
  "Developments and processes",
  "Which practice most directly helped the Inca mobilize labor for roads and other state projects?",
  [
    "Universal wage contracts with private factories",
    "The Ottoman devshirme",
    "Rotating mit’a obligations",
    "A transatlantic slave trade",
  ],
  2,
  "The Inca mit’a required labor service from communities. It predates the Spanish colonial adaptation of that system and is distinct from Ottoman recruitment or Atlantic slavery.",
  "Recall the Andean labor institution.",
);
mc(
  1,
  "africa-evidence",
  "Africa",
  "Hard",
  "Africa",
  "Claims and evidence",
  "A map shows Mali connected to trans-Saharan routes, Great Zimbabwe connected to southern African trade, and Ethiopia with Christian institutions. Which generalization is best supported?",
  [
    "Every African state used the same religious tradition.",
    "African state building took diverse forms and interacted with wider networks.",
    "African political organization required European intervention.",
    "All African communities were centralized empires.",
  ],
  1,
  "These contrasting examples show regional diversity and external connections. They do not demonstrate religious uniformity or one form of political organization.",
  "The three examples differ in both institutions and geography.",
);
ms(
  1,
  "hierarchy-comparison",
  "Comparing state building",
  "Medium",
  "Global",
  "Select all historically defensible statements about societies c.1200–1450.",
  [
    "Song examinations removed every barrier related to family wealth.",
    "Western European manorialism organized agricultural labor and obligations.",
    "Mexica tribute supported an expanding empire.",
    "All South Asian people converted to Islam after the Delhi Sultanate expanded.",
    "Religious institutions could support political legitimacy in multiple regions.",
  ],
  [1, 2, 4],
  "Manorial obligations, imperial tribute, and religious legitimation are defensible patterns. Examinations did not create equal educational access, and conquest did not instantly or universally change religious practice.",
  "Be suspicious of claims using “every” or “all.”",
);
written(
  1,
  "europe-saq",
  "Europe",
  "Medium",
  "Europe",
  "Causation",
  "SAQ",
  "(a) Identify one feature of manorialism in western Europe c.1200. (b) Explain how that feature supported a landed elite. (c) Explain one development c.1200–1450 that could weaken a purely rural pattern of social organization.",
  "(a) Dependent peasants provided rents or labor to a lord’s estate. (b) These obligations supplied the lord with resources without requiring the lord to perform the farming. (c) Growing towns and trade expanded opportunities for specialized work and exchange, creating economic activity outside the manor.",
  "A complete answer links the institution to resource extraction and then explains a historically plausible change. Urban growth varied, so do not claim every manor vanished.",
  "Use one rural obligation, its beneficiary, and one urban development.",
  [
    point(
      "Identify an institution",
      "Name rents, labor services, serf restrictions, or another accurate manorial feature.",
    ),
    point(
      "Explain elite support",
      "Explain how the identified obligation provided income, labor, or control to a lord.",
    ),
    point(
      "Explain a change",
      "Connect towns, trade, wage work, or stronger monarchies to a shift beyond a solely manorial rural structure.",
    ),
  ],
);
written(
  1,
  "belief-networks-saq",
  "South and Southeast Asia",
  "Hard",
  "South Asia and Middle East",
  "Comparison",
  "SAQ",
  "(a) Identify one similarity between Sufi networks and bhakti movements in the period c.1200–1450. (b) Explain one difference in their religious settings. (c) Explain why the spread of a devotional movement does not by itself prove the end of social hierarchy.",
  "(a) Both emphasized personal devotion and could reach people outside elite scholarly institutions. (b) Sufi traditions operated within Islam, whereas bhakti devotion developed within Hindu traditions and centered on devotion to deities. (c) A devotional critique of elite authority did not necessarily change legal status, wealth, caste practices, or political institutions, so religious participation could expand while inequalities continued.",
  "Compare a shared practice without erasing theological differences. The last part requires a distinction between religious ideals and social outcomes.",
  "Distinguish devotional access from control of land or law.",
  [
    point(
      "Similarity",
      "Identify personal devotion, teachers, or networks reaching broader audiences.",
    ),
    point(
      "Difference",
      "Accurately distinguish Islamic Sufi traditions from Hindu bhakti settings without treating either as uniform.",
    ),
    point(
      "Qualification",
      "Explain that greater devotional access did not necessarily remove economic, legal, gender, or caste hierarchy.",
    ),
  ],
);
written(
  1,
  "administration-leq",
  "Comparing state building",
  "Hard",
  "East Asia and Americas",
  "Argumentation",
  "LEQ",
  "Evaluate the extent to which rulers used similar administrative methods to strengthen states c.1200–1450. Develop an argument using Song China and the Inca Empire. This is an original classroom long-essay exercise.",
  "Both Song and Inca rulers strengthened government by using officials and record systems to connect central authority with local communities, but their administrative institutions differed substantially. Expanding states needed food, labor, and information to govern territory. Song officials were recruited partly through examinations in Confucian learning and operated in a monetized commercial society. Inca provincial administration used quipu records and organized labor obligations such as the mit’a to support roads and projects. These institutions served the shared purpose of mobilizing resources, yet examination learning differed from Andean recruitment and recordkeeping. Geography also shaped administration: Andean roads and labor coordination addressed mountain distances, while Song government drew on a dense agrarian and urban economy. The similarity lies in institutional goals, not identical structures or equal participation.",
  "Use shared categories such as recruitment, information, and mobilization. An argument should explain why similarity in function can coexist with important institutional differences.",
  "Compare administrative functions, then qualify the resemblance.",
  essayRubric(
    "Make a qualified claim about similar administrative purposes and different methods.",
    "Situate the argument in the expansion or complexity of agrarian states.",
    "Use accurate Song examinations and Inca officials, quipu, roads, or mit’a evidence; explain at least two examples.",
    "Organize a comparison around recruitment, recordkeeping, revenue, or administrative reach.",
  ),
);

mc(
  2,
  "silk-cargo",
  "Silk Roads",
  "Easy",
  "Eurasia",
  "Causation",
  "Why did expensive overland transport often favor silk and other high-value goods on the Silk Roads?",
  [
    "Merchants could never trade food locally.",
    "High value relative to weight helped justify transport costs.",
    "Silk was the only material known in Asia.",
    "All trade occurred without intermediaries.",
  ],
  1,
  "A valuable, relatively light cargo could bear high transport costs. This explains a tendency in long-distance exchange, not a ban on all other goods or local trade.",
  "Compare the cargo’s value with the cost of moving it.",
);
mc(
  2,
  "monsoon-timing",
  "Indian Ocean",
  "Easy",
  "Indian Ocean",
  "Causation",
  "Which environmental feature most directly shaped the timing of many Indian Ocean voyages c.1200–1450?",
  [
    "Seasonally reversing monsoon winds",
    "Permanent Arctic sea ice",
    "Atlantic hurricane forecasts",
    "The absence of coastal settlements",
  ],
  0,
  "Mariners planned around seasonal monsoon patterns to support outbound and return sailing. The other choices do not describe the relevant sailing system.",
  "Think about predictable seasonal winds.",
);
mc(
  2,
  "mongol-balance",
  "Silk Roads",
  "Medium",
  "Eurasia",
  "Continuity and change",
  "Which interpretation best accounts for both destruction and increased exchange associated with Mongol expansion?",
  [
    "Conquest caused no civilian losses.",
    "Commerce became impossible throughout every Mongol territory.",
    "Mongol states ended all local cultures.",
    "Violent conquest could be followed by policies supporting travel and commerce across connected territories.",
  ],
  3,
  "Military expansion could destroy settlements while subsequent rule protected certain merchants and travelers. These effects occurred in different settings and phases rather than canceling each other out.",
  "Differentiate conquest from policies after conquest.",
);
mc(
  2,
  "traveler-limit",
  "Travel accounts",
  "Hard",
  "Afro-Eurasia",
  "Sourcing and situation",
  "Constructed classroom source: A wealthy traveler says, “The port’s leading merchants welcomed me, so all inhabitants must prosper.” What is the strongest reason to qualify this claim?",
  [
    "A traveler can never supply useful evidence.",
    "The source’s age makes its contents automatically false.",
    "Contact with wealthy merchants does not establish the conditions of all residents.",
    "Ports never included poor people.",
  ],
  2,
  "The traveler’s social contacts create a sampling and perspective limitation. The account may reveal elite hospitality while leaving laborers, women, or marginalized groups largely unobserved.",
  "Ask whom the traveler actually encountered.",
);
ms(
  2,
  "exchange-enablers",
  "Trans-Saharan exchange",
  "Medium",
  "Africa",
  "Select all developments that could support trans-Saharan exchange c.1200–1450.",
  [
    "Camel caravans adapted to desert transport",
    "Knowledge of routes and water sources",
    "Nineteenth-century steam railways",
    "Merchant connections between North and West African markets",
    "Elimination of all political borders",
  ],
  [0, 1, 3],
  "Camels, route knowledge, and merchant relationships supported desert transport and market connections. Steam railways belong to a later period, and exchange continued across political boundaries.",
  "Consider desert transport, survival knowledge, and commercial trust.",
);
written(
  2,
  "plague-saq",
  "Environmental consequences",
  "Medium",
  "Eurasia",
  "Causation",
  "SAQ",
  "(a) Identify one way expanded exchange could contribute to plague transmission in the fourteenth century. (b) Explain one social or economic consequence of severe population loss. (c) Explain why a trade connection alone cannot prove identical outcomes in two regions.",
  "(a) Movement of people, animals, and goods along connected routes could carry infected hosts and vectors between communities. (b) In some places population loss reduced available labor, changing bargaining over wages or obligations. (c) Exposure, ecological conditions, local institutions, and population density varied, so connection establishes a possible pathway rather than equal mortality or equal social effects.",
  "Disease transmission and its consequences require separate causal links. Accept regionally qualified labor, religious, or political consequences rather than universal claims.",
  "A shared route can produce different local effects.",
  [
    point(
      "Transmission pathway",
      "Identify movement along trade or travel networks as a means of spreading infected hosts or vectors.",
    ),
    point(
      "Consequence",
      "Explain a plausible consequence of mortality, such as labor scarcity or social disruption, with qualification.",
    ),
    point(
      "Regional variation",
      "Explain why ecology, exposure, density, or institutions could change outcomes.",
    ),
  ],
);
written(
  2,
  "diaspora-saq",
  "Indian Ocean",
  "Hard",
  "Indian Ocean",
  "Sourcing and situation",
  "SAQ",
  "Constructed classroom source: A merchant writing to his business partner in 1400 describes relatives in a foreign port arranging lodging, credit, and introductions. (a) Identify the network illustrated. (b) Explain one way it supported trade. (c) Explain one limitation of using this letter to describe all residents of the port.",
  "(a) The letter illustrates a merchant diaspora or kin-based commercial network. (b) Relatives supplied trustworthy contacts and credit, reducing the risks of doing business far from home. (c) Its business purpose and elite merchant viewpoint emphasize useful commercial connections, so it provides limited evidence about people outside that network or about the port’s overall prosperity.",
  "The letter is invented for classroom analysis. Identify its institutional function and explain how purpose constrains its coverage.",
  "Trust and perspective are the central concepts.",
  [
    point(
      "Network",
      "Identify a merchant diaspora, family network, or overseas commercial community.",
    ),
    point(
      "Trading mechanism",
      "Explain how credit, lodging, introductions, or trust reduced risk or costs.",
    ),
    point(
      "Source limitation",
      "Link the merchant’s audience or commercial purpose to incomplete coverage of other residents.",
    ),
  ],
);
written(
  2,
  "exchange-comparison-leq",
  "Networks of exchange",
  "Hard",
  "Afro-Eurasia",
  "Comparison",
  "LEQ",
  "Compare the causes of increased Silk Roads and Indian Ocean exchange c.1200–1450. Argue which similarities and differences mattered most.",
  "Both networks expanded when institutions and knowledge reduced the risks of long-distance exchange, but overland political protection and maritime environmental knowledge operated differently. Merchants sought markets for valuable goods across existing regional networks. On the Silk Roads, caravanserai and credit supported travel, and Mongol political connections protected some routes after destructive conquest. In the Indian Ocean, knowledge of monsoon winds and ships capable of large cargoes made repeated voyages more feasible. Diaspora communities provided trust and contacts in both kinds of exchange. These similarities show that technology alone is insufficient: merchants also needed reliable relationships and infrastructure. Yet seasonal winds were a distinctive constraint at sea, while overland merchants faced the costs of moving animals and goods across multiple land environments. Neither network became completely safe or politically uniform.",
  "Develop a causal comparison; merely listing commodities does not explain expansion. Distinguish common commercial institutions from route-specific geography.",
  "Use one institutional similarity and one environmental difference.",
  essayRubric(
    "State a defensible comparison of causes, with a meaningful difference.",
    "Describe preexisting regional commerce or demand for long-distance goods.",
    "Use at least two accurate examples from each network, such as caravanserai, Mongol protection, monsoons, ship capacity, or diaspora contacts.",
    "Explain how the examples reduce costs or risks, then compare their importance.",
  ),
);

mc(
  3,
  "gunpowder-institutions",
  "Empire Building",
  "Easy",
  "Middle East",
  "Causation",
  "Which combination best explains the ability of large early modern empires to sustain military expansion?",
  [
    "Firearms without supplies or revenue",
    "Revenue, administration, and military technology working together",
    "Universal democratic participation",
    "The complete absence of local elites",
  ],
  1,
  "Armies needed weapons, payment, food, transport, and organization. Gunpowder helped warfare, but fiscal and administrative institutions made sustained campaigns possible.",
  "A weapon cannot pay or supply an army.",
);
mc(
  3,
  "safavid-identity",
  "Religious legitimacy",
  "Medium",
  "Middle East",
  "Comparison",
  "Safavid promotion of Shi’a Islam most directly contributed to which development?",
  [
    "The end of all Islamic political divisions",
    "Identical religious institutions in Iran and western Europe",
    "A distinct imperial identity and rivalry with Sunni Ottoman rulers",
    "Universal religious neutrality in state policy",
  ],
  2,
  "State patronage of Shi’a institutions helped differentiate Safavid authority and contributed to rivalry with the Sunni Ottoman state. Both political and religious interests mattered.",
  "Identify the neighboring empire’s different affiliation.",
);
mc(
  3,
  "mansabdar",
  "Administration",
  "Easy",
  "South Asia",
  "Developments and processes",
  "In Mughal administration, a mansabdar was best described as:",
  [
    "A ranked official with military and service obligations",
    "A European elected member of parliament",
    "An Andean labor tax",
    "An independent ruler exempt from imperial service",
  ],
  0,
  "Mansabdars held ranks linked to obligations and resources within Mughal service. This institution integrated elites into imperial administration rather than guaranteeing their complete independence.",
  "Think of rank and service.",
);
mc(
  3,
  "monument-sourcing",
  "Legitimation",
  "Hard",
  "Global",
  "Sourcing and situation",
  "Constructed classroom source: A court inscription praises a palace as proof that the ruler is “the rightful protector of all subjects.” What can a historian most directly infer?",
  [
    "Every subject agreed with the ruler.",
    "No resources were diverted to construction.",
    "The ruler faced no rivals.",
    "The court sought to present the ruler as legitimate and protective.",
  ],
  3,
  "The inscription is direct evidence of a court’s intended public message. It does not independently measure agreement, rivals, or construction costs.",
  "Distinguish the claim being promoted from its acceptance.",
);
ms(
  3,
  "imperial-tools",
  "Continuity and religious reform",
  "Medium",
  "Eurasia",
  "Select all defensible statements about religious and institutional change c.1450–1750.",
  [
    "Protestant movements challenged Roman Catholic authority in Europe.",
    "Sikh traditions developed in South Asia amid Hindu and Islamic interactions.",
    "Every imperial ruler adopted identical religious policies.",
    "New ruling dynasties could adapt older administrative traditions.",
    "Religious disputes had no political significance.",
  ],
  [0, 1, 3],
  "Protestant reform, the development of Sikh traditions, and adaptation of earlier institutions illustrate change alongside continuity. Religious policy varied, and disputes could shape political conflict.",
  "Distinguish genuine changes from claims of complete uniformity.",
);
written(
  3,
  "akbar-saq",
  "Religious policy",
  "Medium",
  "South Asia",
  "Causation",
  "SAQ",
  "(a) Identify one way Akbar accommodated religious diversity. (b) Explain how such a policy could strengthen Mughal rule. (c) Explain why that example should not be generalized to every Mughal ruler.",
  "(a) Akbar incorporated non-Muslim elites into imperial service and supported religious accommodation. (b) Including local elites could reduce opposition and expand the pool of officials able to govern diverse populations. (c) Mughal rulers made different choices in different contexts, and later religious policies did not always follow Akbar’s approach.",
  "Connect accommodation to governance without claiming that tolerance was complete or permanent.",
  "Consider elite integration and variation across reigns.",
  [
    point(
      "Policy",
      "Identify incorporation of non-Muslim elites, religious dialogue, or another accurate accommodation under Akbar.",
    ),
    point(
      "Political effect",
      "Explain how inclusion could promote cooperation, reduce resistance, or strengthen administration.",
    ),
    point(
      "Chronological qualification",
      "Explain variation among rulers or changing conditions; do not attribute Akbar’s approach to all reigns.",
    ),
  ],
);
written(
  3,
  "tax-farming-saq",
  "Revenue collection",
  "Hard",
  "Eurasia",
  "Causation",
  "SAQ",
  "Constructed classroom source: A provincial tax collector pays the treasury a fixed sum for collection rights and keeps additional receipts. (a) Identify the system. (b) Explain one advantage for the central state. (c) Explain one possible problem for subjects or long-term rule.",
  "(a) This is tax farming. (b) It can provide the treasury with predictable payments and outsource collection where direct administration is costly. (c) The collector’s incentive to maximize receipts can lead to harsh demands that burden subjects and provoke resistance, potentially weakening legitimacy.",
  "An incentive-based explanation is stronger than labeling the collector good or bad. The benefits and costs can coexist.",
  "Who receives the fixed payment, and who gains from extra collection?",
  [
    point("Identify", "Name tax farming."),
    point(
      "State advantage",
      "Explain predictable revenue, lower administrative burden, or mobilization of local collection capacity.",
    ),
    point(
      "Possible cost",
      "Explain an incentive for overcollection and connect it to hardship, resistance, or weakened legitimacy.",
    ),
  ],
);
written(
  3,
  "religion-leq",
  "Legitimation",
  "Hard",
  "Eurasia",
  "Argumentation",
  "LEQ",
  "Evaluate the extent to which religious policy strengthened land-based empires c.1450–1750. Use at least two empires.",
  "Religious policy often strengthened empires by presenting rule as legitimate or incorporating influential communities, but it could also intensify conflict. Large empires governed populations whose religious practices differed. Safavid rulers promoted Shi’a Islam as part of an imperial identity, supporting institutions that distinguished their authority from the Sunni Ottomans. Akbar’s incorporation of non-Muslim elites offered a different strategy: accommodation helped build alliances in diverse South Asia. Religious policy therefore did not strengthen rule through only one mechanism. The Safavid–Ottoman rivalry also shows a limit, since sharper identities could reinforce hostility across borders. In both cases military power, revenue, and administration remained necessary. Religion could support cooperation or mobilization, but its effect depended on whom a policy included and whom it alienated.",
  "Explain political mechanisms, not merely rulers’ personal beliefs. A qualified comparison can show how different policies served similar goals.",
  "Religious unity and accommodation are distinct strategies.",
  essayRubric(
    "Make a qualified argument about religion’s contribution and limits.",
    "Situate the argument in diverse populations, imperial expansion, or rivalry.",
    "Use accurate policies in at least two empires, including concrete evidence such as Shi’a patronage or Akbar’s elite integration.",
    "Explain how legitimacy, cooperation, or conflict connects policy to imperial strength.",
  ),
);

mc(
  4,
  "exchange-crop",
  "Columbian Exchange",
  "Easy",
  "Global",
  "Developments and processes",
  "Which movement is an example of the Columbian Exchange?",
  [
    "Potatoes moving from the Americas into Afro-Eurasia",
    "Coal moving from one English mine to another",
    "Silk moving between two Chinese cities before 1200",
    "An Ottoman official receiving a new rank",
  ],
  0,
  "Potatoes are an American crop whose spread after sustained Atlantic contact is part of the Columbian Exchange. Domestic transfers and administrative appointments do not fit that definition.",
  "Identify movement between hemispheres after 1492.",
);
mc(
  4,
  "portuguese-reach",
  "Maritime Empires",
  "Medium",
  "Indian Ocean",
  "Continuity and change",
  "What is the most accurate description of early Portuguese expansion in the Indian Ocean?",
  [
    "It instantly removed every Asian merchant.",
    "It involved forts and strategic ports within an already active trading world.",
    "It began before any African or Asian maritime commerce.",
    "It created uniform territorial rule over all Asia.",
  ],
  1,
  "Portuguese forts and coercive maritime strategies entered existing networks. Asian and African traders continued to operate; control of particular ports was not complete continental conquest.",
  "Distinguish a port network from control of an entire continent.",
);
mc(
  4,
  "silver-demand",
  "Global silver",
  "Medium",
  "Americas and East Asia",
  "Causation",
  "Which development helps explain why American silver entered commercial networks reaching China?",
  [
    "China had no taxation or markets.",
    "American mines produced only goods for local consumption.",
    "Chinese tax and commercial demand created a market for silver.",
    "Silver could not cross ocean routes.",
  ],
  2,
  "Demand for silver in Chinese fiscal and commercial systems helped connect American production to Asian markets. Several routes and intermediaries participated in this circulation.",
  "Consider demand as well as production.",
);
mc(
  4,
  "colonial-mita",
  "Labor systems",
  "Hard",
  "Americas",
  "Continuity and change",
  "Spanish colonial adaptation of the Andean mit’a is best analyzed as:",
  [
    "The invention of all Andean labor obligations by Europeans",
    "An unchanged institution serving exactly the same rulers and purposes",
    "A fully voluntary modern wage system",
    "A continuity in labor mobilization combined with new colonial purposes and coercion",
  ],
  3,
  "An older obligation was adapted within Spanish colonial extraction, especially mining. Institutional continuity does not mean unchanged beneficiaries, working conditions, or political context.",
  "Separate a borrowed form from its new use.",
);
ms(
  4,
  "exchange-effects",
  "Columbian Exchange",
  "Medium",
  "Global",
  "Select all defensible consequences of transoceanic contact c.1450–1750.",
  [
    "Disease contributed to Indigenous demographic collapse.",
    "American crops spread to Afro-Eurasia.",
    "Atlantic slavery forcibly moved large numbers of Africans.",
    "All participants benefited equally.",
    "Every colonial labor system had identical legal rules.",
  ],
  [0, 1, 2],
  "Biological exchange and forced migration transformed populations and societies. Power and benefits were unequal, and labor systems differed in legal structure and practice.",
  "Look for specific changes rather than absolute equivalence.",
);
written(
  4,
  "resistance-saq",
  "Resistance",
  "Medium",
  "Americas",
  "Causation",
  "SAQ",
  "(a) Identify one form of resistance to colonial domination c.1450–1750. (b) Explain what it challenged. (c) Explain why resistance complicates a claim of complete colonial control.",
  "(a) The Pueblo Revolt of 1680 is one example. (b) Participants challenged Spanish political and religious domination, including coercive demands and interference with local practices. (c) Their ability to organize a revolt and expel Spanish authorities for a period shows that colonial rule faced coordinated opposition and could be interrupted. Maroon communities offer another valid example of resistance to slavery.",
  "A specific example should support a claim about contested power. Resistance can be historically significant even when it does not permanently end an empire.",
  "Name an action, its target, and what it reveals about power.",
  [
    point(
      "Example",
      "Identify the Pueblo Revolt, maroon communities, an enslaved uprising, or another accurate example.",
    ),
    point(
      "Target",
      "Explain the political, religious, or labor demands that participants opposed.",
    ),
    point(
      "Power qualification",
      "Explain how organized resistance limits a claim of complete or uncontested colonial control.",
    ),
  ],
);
written(
  4,
  "labor-comparison-saq",
  "Labor systems",
  "Hard",
  "Americas",
  "Comparison",
  "SAQ",
  "(a) Identify one similarity between encomienda and Atlantic plantation slavery. (b) Explain one difference in legal or labor organization. (c) Explain why treating both as simply “workers choosing jobs” is inaccurate.",
  "(a) Both enabled colonial elites to extract labor or resources through coercive power. (b) Encomienda assigned claims over Indigenous tribute or labor, while plantation chattel slavery treated enslaved people as property and commonly made status hereditary. (c) Violence, restricted movement, and imposed obligations limited or denied meaningful choice, so the language of free employment hides the institutions of domination.",
  "Compare coercion without collapsing distinct legal systems into one. Regional practice changed, so describe broad institutional distinctions carefully.",
  "Ask what was assigned or owned in each system.",
  [
    point(
      "Similarity",
      "Identify coercive extraction of labor/resources or elite economic benefit.",
    ),
    point(
      "Difference",
      "Distinguish tribute/labor claims over Indigenous communities from ownership and hereditary status in chattel slavery.",
    ),
    point(
      "Explain coercion",
      "Explain restrictions, violence, or imposed obligations that undermine a claim of free choice.",
    ),
  ],
);
written(
  4,
  "atlantic-labor-dbq",
  "Colonial labor and resistance",
  "Hard",
  "Atlantic world",
  "Argumentation",
  "DBQ",
  `Evaluate the extent to which expanding Atlantic commerce strengthened colonial elites c.1500–1750. Use the documents and relevant outside evidence. All seven documents below are CONSTRUCTED CLASSROOM SOURCES: invented voices designed around broad historical patterns, not authentic quotations or historical records.

Document 1 — A hypothetical Spanish mining administrator, memorandum to the crown, c.1600: Colonial labor levies keep silver extraction operating; the administrator requests continued access to workers.
Document 2 — A hypothetical Caribbean plantation owner, letter to investors, c.1700: Export receipts rise, but the owner complains about resistance and the costs of enforcing enslavement.
Document 3 — A hypothetical Indigenous community petition, c.1650: Families report that imposed labor absences disrupt farming and request reduced obligations.
Document 4 — A hypothetical Atlantic merchant, accounting note, c.1700: Profits depend on moving commodities through several ports and obtaining credit from partners.
Document 5 — A hypothetical maroon community member, oral account represented as a classroom narrative, c.1700: Escape and collective defense allow a settlement to resist plantation authority.
Document 6 — A hypothetical royal customs official, report, c.1650: The official advocates restricting foreign trade to increase imperial revenue.
Document 7 — A hypothetical missionary, appeal to colonial authorities, c.1600: The writer criticizes abuses against Indigenous laborers while accepting continued colonial administration.

This exercise uses a seven-point classroom rubric; it is not an official exam question.`,
  "Atlantic commerce strengthened colonial elites substantially by connecting coerced production to overseas markets and imperial revenue, but that power remained contested. European expansion after 1492 linked colonial extraction to growing oceanic networks. Documents 1 and 2 show administrators and owners seeking control over labor to maintain silver and plantation output; document 4 shows how merchant credit and multiple ports connected that output to profit. The mining administrator’s appeal to the crown is especially useful as evidence of official demand for labor, but its purpose makes it unlikely to give a balanced description of workers’ suffering. Document 3 supplies a contrasting community perspective by describing disrupted farming. Outside the documents, Potosí’s mining economy illustrates how colonial mit’a obligations could support global silver flows. Document 6 shows an official preference for trade restrictions that would direct revenue toward imperial authorities. Yet documents 2 and 5 also reveal enforcement costs and organized escape, so elites did not possess complete control. A plantation owner writing to investors might emphasize profits while presenting resistance as a financial problem, rather than acknowledging enslaved people’s claims to freedom. Document 7’s criticism could challenge abusive practices while preserving colonial rule, showing that reform and anticolonial independence were different positions. Thus Atlantic expansion increased elite extraction and commercial opportunity, while labor disruption, resistance, and competing moral claims limited its security.",
  "Group documents by extraction, commercial institutions, and contested power. Analyze why specific creators would emphasize particular claims; do not treat invented voices as actual archival evidence.",
  "Use documents to prove an argument, then explain at least one perspective or purpose.",
  [
    point(
      "Thesis",
      "Make a defensible, qualified claim about commerce and elite power.",
    ),
    point(
      "Context",
      "Explain maritime expansion, colonial conquest, or earlier Atlantic connections.",
    ),
    point(
      "Document evidence",
      "Award 1 for accurately using at least three documents; award 2 for using at least four to support the argument, with explanations rather than only labels.",
      2,
    ),
    point(
      "Outside evidence",
      "Use and explain a specific relevant example absent from the documents, such as Potosí, the Pueblo Revolt, or an identifiable trade route.",
    ),
    point(
      "Sourcing",
      "Explain how perspective, audience, purpose, or situation affects the usefulness of at least two constructed documents.",
    ),
    point(
      "Complexity",
      "Develop the interaction of extraction with resistance, reform, or different elite interests using evidence.",
    ),
  ],
);

mc(
  5,
  "rights-contradiction",
  "Enlightenment",
  "Medium",
  "Atlantic world",
  "Claims and evidence",
  "A revolutionary declaration proclaims universal rights while the new government excludes women and enslaved people from equal citizenship. Which interpretation best fits this evidence?",
  [
    "Rights language never influenced anyone.",
    "Every social hierarchy ended immediately.",
    "Revolutionary principles could exceed the groups granted rights in practice.",
    "The declaration proves equal participation for all residents.",
  ],
  2,
  "The evidence shows a gap between proclaimed universality and actual inclusion. Such contradictions also supplied later activists with arguments for expanding rights.",
  "Compare the principle with its implementation.",
);
mc(
  5,
  "haitian-change",
  "Political revolutions",
  "Easy",
  "Caribbean",
  "Developments and processes",
  "Which outcome most clearly distinguishes the Haitian Revolution from independence movements that preserved slavery?",
  [
    "The destruction of slavery and creation of an independent state",
    "The establishment of a new slave colony",
    "The restoration of French plantation authority without change",
    "The creation of a European monarchy in Paris",
  ],
  0,
  "Haitian revolutionaries abolished slavery and secured independence. This directly challenged colonial racial domination as well as foreign sovereignty.",
  "Consider both political independence and labor status.",
);
mc(
  5,
  "coal-causation",
  "Industrialization",
  "Medium",
  "Europe",
  "Causation",
  "Which explanation of Britain’s industrialization is strongest?",
  [
    "Coal alone made all other conditions irrelevant.",
    "Several factors, including coal, capital, labor, and commercial institutions, interacted.",
    "Factories emerged without markets or investment.",
    "Industrialization occurred because every country had identical resources.",
  ],
  1,
  "Coal mattered alongside investment, workers, markets, and institutions. A multicausal explanation accounts for why access to one resource was not sufficient everywhere.",
  "Look for interacting causes rather than one inevitable factor.",
);
mc(
  5,
  "nationalism-exclusion",
  "Nationalism",
  "Hard",
  "Europe",
  "Comparison",
  "A nationalist movement promotes political unity for a majority language group while restricting minority-language schools. What does this illustrate?",
  [
    "Nationalism always guarantees equal minority rights.",
    "National identity has no connection to state policy.",
    "Unification makes cultural conflict impossible.",
    "Nationalism can integrate one group while excluding others.",
  ],
  3,
  "Political solidarity can be built around boundaries of membership that disadvantage minority groups. Unity and equal inclusion are distinct outcomes.",
  "Ask who belongs to the movement’s imagined nation.",
);
ms(
  5,
  "industrial-society",
  "Industrial society",
  "Medium",
  "Global",
  "Select all developments commonly associated with nineteenth-century industrialization.",
  [
    "Expansion of mechanized factory production",
    "Rapid urban growth in industrial regions",
    "Workers organizing for wages and conditions",
    "Immediate disappearance of all child labor",
    "Equal industrial growth in every country",
  ],
  [0, 1, 2],
  "Factories, urbanization, and worker organization are major patterns. Child labor required contested reforms, and industrialization was uneven across regions.",
  "Separate trends from claims of immediate universal change.",
);
written(
  5,
  "meiji-saq",
  "Industrialization",
  "Medium",
  "East Asia",
  "Causation",
  "SAQ",
  "(a) Identify one industrial or institutional reform associated with Meiji Japan. (b) Explain one reason leaders pursued reform. (c) Explain why copying selected foreign practices did not mean abandoning all Japanese institutions or identity.",
  "(a) The government supported modern industry and infrastructure and reformed military and educational institutions. (b) Leaders sought to strengthen state power and resist unequal treatment in an imperial international order. (c) They selected and adapted foreign methods while preserving or reshaping local institutions, including imperial symbolism, so adaptation was not simply replacement of all traditions.",
  "A strong response names a reform, links it to state strength, and explains selective adaptation.",
  "Consider policy choices under external pressure.",
  [
    point(
      "Reform",
      "Identify industrial investment, railways, military reorganization, education, or another accurate Meiji reform.",
    ),
    point(
      "Purpose",
      "Connect reform to state strength, autonomy, or competition with industrial powers.",
    ),
    point(
      "Adaptation",
      "Explain selection or adaptation alongside retained or reshaped local institutions.",
    ),
  ],
);
written(
  5,
  "factory-source-saq",
  "Industrial society",
  "Hard",
  "Europe",
  "Sourcing and situation",
  "SAQ",
  "Constructed classroom source: A factory owner addressing investors in 1840 celebrates higher output but does not discuss injuries or working hours. (a) Identify one claim the source can support. (b) Explain why its audience helps account for an omission. (c) Identify another kind of evidence that would help assess workers’ conditions.",
  "(a) It supports a claim that this owner wanted investors to associate mechanization with increased output. (b) Investors were interested in returns, giving the owner an incentive to emphasize productivity and omit costs borne by workers. (c) Factory inspectors’ reports, workers’ letters, payroll records, or injury records could help assess hours, pay, and safety.",
  "The source documents a promotional claim, not all factory conditions. Corroboration requires evidence addressing the omitted subject.",
  "Relate the audience to what the author chooses to report.",
  [
    point(
      "Supported claim",
      "Identify the owner’s promotion of productivity or investment opportunity; do not infer universal worker benefit.",
    ),
    point(
      "Audience and omission",
      "Explain the incentive to emphasize profitability to investors and understate labor costs.",
    ),
    point(
      "Corroboration",
      "Name an appropriate source and explain its relevance to hours, wages, injuries, or conditions.",
    ),
  ],
);
written(
  5,
  "industrial-causes-leq",
  "Industrialization",
  "Hard",
  "Europe and East Asia",
  "Argumentation",
  "LEQ",
  "Evaluate the relative importance of state policy and economic resources in the spread of industrialization c.1750–1900. Use Britain and Japan.",
  "Industrialization depended on resources and investment, but state policy shaped how they were organized; its direct role was especially visible in Meiji Japan. Expanding markets and agricultural changes created opportunities for mechanized production. Britain’s coal, commercial wealth, and private investment supported factories and steam power, while legal and political institutions also influenced the conditions for enterprise. Japan’s leaders confronted a world in which industrial strength affected sovereignty and military power. They supported infrastructure and industrial enterprises and reorganized education and the military, helping mobilize skills and capital. The comparison shows that economic inputs were necessary but did not produce identical paths automatically. British private enterprise did not operate outside all state influence, and Japanese state investment later interacted with private firms. Thus the balance differed, with resources creating opportunities and policy determining how societies pursued them.",
  "Use comparison to assess relative importance. Avoid an absolute private-versus-state division; both cases involved institutions and investment.",
  "Explain how resources became productive capacity.",
  essayRubric(
    "Make a qualified assessment of state policy relative to resources.",
    "Describe expanding markets, mechanization, or imperial competition.",
    "Use specific British coal/capital/factory evidence and Japanese Meiji policy evidence.",
    "Explain mechanisms and compare the state’s degree of direct intervention.",
  ),
);

mc(
  6,
  "imperial-justification",
  "Imperialism",
  "Easy",
  "Global",
  "Claims and evidence",
  "A colonial official claims conquest will “civilize” another people. This claim is best analyzed as:",
  [
    "Neutral proof that all colonized people benefited",
    "An ideological justification for imperial domination",
    "Evidence that resources and strategic rivalry were irrelevant",
    "A statement accepted by every local community",
  ],
  1,
  "Civilizing rhetoric often legitimized unequal rule and racial hierarchy. It must be compared with policies and outcomes rather than accepted as a neutral assessment.",
  "Separate a justification from demonstrated consequences.",
);
mc(
  6,
  "railway-route",
  "Economic imperialism",
  "Medium",
  "Africa",
  "Causation",
  "A colonial railway mainly links a mine to an export port. Which inference is most directly supported by its route?",
  [
    "Exporting extracted resources was a major priority.",
    "Every village received equal transport access.",
    "The colony controlled all investment decisions.",
    "Mining profits were automatically distributed equally.",
  ],
  0,
  "The route prioritizes moving mine output to overseas markets. It may have other uses, but the route alone cannot establish universal access, local control, or equal benefits.",
  "Follow the commodity from origin to destination.",
);
mc(
  6,
  "adwa-significance",
  "Resistance",
  "Medium",
  "Africa",
  "Developments and processes",
  "Why is Ethiopia’s victory at Adwa in 1896 significant in the history of imperialism?",
  [
    "It ended all imperialism worldwide.",
    "It made Ethiopia a British colony.",
    "It began the French Revolution.",
    "It defeated an Italian invasion and preserved Ethiopian independence.",
  ],
  3,
  "Adwa demonstrated successful military resistance to European conquest. Its importance does not mean every outside pressure or later imperial threat disappeared.",
  "Identify the invader and the political outcome.",
);
mc(
  6,
  "indenture-freedom",
  "Migration",
  "Hard",
  "Indian Ocean and Caribbean",
  "Comparison",
  "Why is a signed indenture contract insufficient by itself to establish that labor migration was fully voluntary?",
  [
    "Contracts always made workers owners of plantations.",
    "Indenture had no term or obligations.",
    "Debt, penalties, and unequal bargaining could severely constrain workers’ choices.",
    "All indentured workers had the same legal status as hereditary chattel slaves.",
  ],
  2,
  "A contract could exist within coercive conditions. Historical analysis must examine recruitment, enforcement, mobility, and rights while maintaining distinctions between indenture and slavery.",
  "Examine the choices available before and after signing.",
);
ms(
  6,
  "imperial-motives",
  "Imperialism",
  "Medium",
  "Global",
  "Select all plausible motives for nineteenth-century industrial imperial expansion.",
  [
    "Demand for raw materials",
    "Strategic rivalry among states",
    "Investment and market opportunities",
    "A universal desire to transfer all colonial profits to local workers",
    "National prestige",
  ],
  [0, 1, 2, 4],
  "Economic goals, strategic competition, and prestige could interact. Equal redistribution to colonial workers was not a general motive of imperial expansion.",
  "Include economic and political incentives.",
);
written(
  6,
  "unequal-treaty-saq",
  "Economic imperialism",
  "Medium",
  "East Asia",
  "Causation",
  "SAQ",
  "(a) Identify one way unequal treaties limited Qing sovereignty. (b) Explain why this could be considered imperial influence without full annexation. (c) Explain one reason a historian should distinguish different forms of imperialism.",
  "(a) Treaties imposed foreign commercial privileges and restricted the Qing government’s control over aspects of trade or legal jurisdiction. (b) Foreign states gained leverage while the Qing government continued to exist, so domination did not require taking over all territory. (c) Distinguishing formal colonies from treaty-based influence clarifies which institutions controlled taxation, law, and political decisions.",
  "Political power can be constrained through treaties and commercial privileges. Precise institutional distinctions improve comparisons.",
  "Sovereignty is more than a flag or a surviving ruler.",
  [
    point(
      "Restriction",
      "Identify imposed commercial access, foreign legal privileges, or another accurate limitation.",
    ),
    point(
      "Imperial influence",
      "Explain foreign leverage despite survival of the Qing state.",
    ),
    point(
      "Analytical distinction",
      "Explain how different forms produce different control over law, finance, or administration.",
    ),
  ],
);
written(
  6,
  "migration-diaspora-saq",
  "Migration",
  "Hard",
  "Global",
  "Continuity and change",
  "SAQ",
  "(a) Identify one nineteenth-century migrant labor flow involving Indian or Chinese workers. (b) Explain one cause. (c) Explain one way migrant communities could preserve connections while adapting to a new setting.",
  "(a) Indian indentured workers migrated to Caribbean plantation colonies; Chinese laborers also moved to places such as Southeast Asia and the Americas. (b) Plantation, mining, and infrastructure demand combined with recruitment systems and pressures at home to encourage or constrain movement. (c) Migrants maintained religious practices and family ties while developing local institutions, languages, and commercial relationships.",
  "Use a specific route, then explain labor demand and cultural adaptation. Do not assume every migrant had the same experience or degree of choice.",
  "Connect a receiving economy to community formation.",
  [
    point(
      "Flow",
      "Identify a historically valid Indian or Chinese migrant flow.",
    ),
    point(
      "Cause",
      "Explain labor demand, recruitment, economic pressure, or another appropriate cause.",
    ),
    point(
      "Community change and continuity",
      "Explain retained ties or practices alongside adaptation to the receiving society.",
    ),
  ],
);
written(
  6,
  "imperial-economy-leq",
  "Consequences of imperialism",
  "Hard",
  "Africa and Asia",
  "Argumentation",
  "LEQ",
  "Evaluate the extent to which imperial rule transformed local economies c.1750–1900. Use evidence from at least two regions.",
  "Imperial rule often redirected production and infrastructure toward external demand, but local institutions and responses shaped the degree of change. Industrial states sought commodities, investment, and strategic advantages. In parts of Africa, mines and export-oriented railways connected resource extraction to overseas markets. In India, colonial commercial policies and plantation production linked labor and land to imperial demand. In Qing China, treaty privileges expanded foreign access without complete territorial annexation, showing a different form of economic pressure. These changes could create jobs and transport connections while concentrating control over investment and profits elsewhere. Local producers still made choices, resisted demands, or maintained subsistence production, and the scale varied by location. The most defensible conclusion is substantial reorientation in many economies rather than the disappearance of all local economic activity.",
  "Explain changes in production, ownership, infrastructure, or trade and qualify geographic variation. Do not assume any railway guarantees equal development.",
  "Ask who controlled production and where commodities went.",
  essayRubric(
    "Argue a degree of transformation with a relevant qualification.",
    "Describe industrial demand, imperial expansion, or earlier local economic organization.",
    "Explain specific evidence from at least two regions, such as export railways, cash crops, mines, or treaty privileges.",
    "Connect institutions of power to changes in production or distribution, rather than only listing colonies.",
  ),
);

mc(
  7,
  "war-trigger",
  "World War I",
  "Easy",
  "Europe",
  "Causation",
  "Which statement best distinguishes a trigger from underlying causes of World War I?",
  [
    "The assassination crisis was a trigger operating within alliance tensions, militarism, nationalism, and imperial rivalry.",
    "One assassination explains every long-term cause without additional context.",
    "Industrial production made diplomatic choices irrelevant.",
    "There were no tensions before June 1914.",
  ],
  0,
  "The immediate crisis matters, but longer-term conditions explain why it escalated. A multilevel explanation also recognizes decisions by leaders rather than treating war as inevitable.",
  "Separate what started the crisis from what made escalation possible.",
);
mc(
  7,
  "total-war",
  "World Wars",
  "Easy",
  "Global",
  "Developments and processes",
  "Which action best illustrates total war?",
  [
    "Keeping all civilian production separate from military needs",
    "Mobilizing factories, food supplies, and civilian labor for the war effort",
    "Limiting all fighting to voluntary sporting contests",
    "Ending every form of government economic intervention",
  ],
  1,
  "Total war involves broad mobilization beyond the battlefield. Civilian industry, labor, food production, and propaganda become parts of military strategy.",
  "Look for mobilization beyond soldiers.",
);
mc(
  7,
  "depression-response",
  "Interwar order",
  "Medium",
  "Global",
  "Comparison",
  "Which comparison of interwar economic responses is most accurate?",
  [
    "All governments abolished private ownership.",
    "The New Deal and Soviet planning had identical political institutions.",
    "Both the New Deal and Soviet planning expanded state intervention, but within different systems of ownership and government.",
    "No government responded to unemployment or production problems.",
  ],
  2,
  "Both involved intervention, but the New Deal operated within a capitalist democracy while Soviet planning involved state direction under communist one-party rule. Similar tools do not mean identical systems.",
  "Compare intervention and institutions separately.",
);
mc(
  7,
  "propaganda-sampling",
  "World War II",
  "Hard",
  "Global",
  "Sourcing and situation",
  "Constructed classroom source: A wartime poster shows cheerful workers and proclaims unanimous support for production targets. Which additional evidence would best help test the claim of unanimous support?",
  [
    "Only another poster from the same campaign",
    "The poster’s bright colors alone",
    "A later advertisement for unrelated clothing",
    "Workers’ letters, absenteeism records, and reports of labor disputes",
  ],
  3,
  "Evidence of workers’ views and behavior can test the poster’s universal claim. Repetition by the same propaganda campaign does not independently corroborate it.",
  "Choose evidence about actual responses.",
);
ms(
  7,
  "global-war",
  "World Wars",
  "Medium",
  "Global",
  "Select all reasons the world wars should be studied as global conflicts.",
  [
    "Colonial troops and resources participated.",
    "Fighting and political consequences extended across multiple regions.",
    "Imperial networks linked distant economies to mobilization.",
    "Only Europeans experienced consequences.",
    "All regions experienced identical destruction.",
  ],
  [0, 1, 2],
  "Participation, resource mobilization, and consequences crossed continents. A global scope does not imply identical experiences or that every society was equally involved.",
  "Global connection and uniform experience are different.",
);
written(
  7,
  "russia-saq",
  "Revolutions",
  "Medium",
  "Russia",
  "Causation",
  "SAQ",
  "(a) Identify one condition that weakened Russian imperial authority during World War I. (b) Explain how it contributed to revolutionary instability. (c) Explain why wartime strain alone does not fully explain the Bolsheviks’ eventual success.",
  "(a) Military defeats, shortages, and disruption weakened the imperial government. (b) They reduced public confidence and intensified existing tensions over political authority and economic hardship. (c) Bolshevik organization, political appeals, competing movements, and decisions during the revolutionary crisis also shaped the outcome, so general strain did not determine which faction would prevail.",
  "Separate conditions enabling revolution from factors explaining a particular movement’s victory.",
  "Why did authority weaken, and why did one group gain power?",
  [
    point(
      "Condition",
      "Identify military losses, shortages, economic disruption, or a related wartime strain.",
    ),
    point(
      "Instability",
      "Explain how the condition undermined legitimacy or intensified social/political conflict.",
    ),
    point(
      "Additional cause",
      "Explain a specific political or organizational factor in Bolshevik success.",
    ),
  ],
);
written(
  7,
  "atrocity-analysis-saq",
  "Mass atrocities",
  "Hard",
  "Europe",
  "Claims and evidence",
  "SAQ",
  "(a) Identify the group at the center of the Holocaust. (b) Explain why a historian distinguishes genocide from all wartime deaths. (c) Explain one way state institutions helped implement Nazi persecution and mass murder.",
  "(a) The Holocaust was the Nazi genocide of European Jews. (b) Genocide involves intent to destroy a protected group, in whole or in part; battlefield deaths alone do not establish that intent. (c) State institutions used laws, records, policing, deportation systems, and camps to identify, exclude, transport, and murder targeted people. Other groups also suffered Nazi persecution and mass killing, which requires careful attention to distinct policies and experiences.",
  "Use precise language about intent and institutions. A response should explain organized mechanisms without reducing victims to impersonal statistics.",
  "Distinguish the purpose of destruction from the fact of death.",
  [
    point(
      "Identify",
      "Identify European Jews as the central target of the Holocaust.",
    ),
    point(
      "Distinction",
      "Explain intent to destroy a national, ethnic, racial, or religious group rather than equating all war deaths with genocide.",
    ),
    point(
      "Implementation",
      "Explain a specific legal, bureaucratic, policing, deportation, or camp mechanism.",
    ),
  ],
);
written(
  7,
  "war-state-leq",
  "Global conflict",
  "Hard",
  "Global",
  "Continuity and change",
  "LEQ",
  "Evaluate the extent to which the world wars changed the relationship between states and civilian populations. Use evidence from both wars.",
  "The world wars greatly expanded states’ demands on civilian labor, production, and information, though the forms and consequences differed across political systems. Industrial armies needed sustained supplies and finance. During World War I, governments redirected factories, rationed resources, and used recruitment propaganda to mobilize people beyond the battlefield. World War II intensified industrial mobilization and exposed civilians to strategic bombing, occupation, and persecution. State records and policing could serve mass violence, as Nazi institutions implemented deportation and genocide. At the same time, women’s wartime work and colonial participation could generate later demands for rights without immediately creating equality. Not every expansion of state power had the same purpose: economic coordination and organized persecution must be analytically distinguished. Some emergency practices receded after war, while greater expectations of state intervention and international rights protections persisted. The wars therefore changed civilian-state relations substantially, but neither uniformly nor only in a beneficial direction.",
  "Compare mobilization, coercion, and postwar consequences. Explain how evidence shows change while distinguishing states and groups.",
  "Use one economic and one social or political mechanism.",
  essayRubric(
    "Make a qualified claim about the degree and character of change.",
    "Situate the wars in industrial warfare, imperial networks, or earlier state-society relations.",
    "Use specific examples from both wars, such as rationing, factories, propaganda, bombing, colonial troops, or state persecution.",
    "Explain continuity/change or compare different effects on groups and political systems.",
  ),
);

mc(
  8,
  "containment",
  "Cold War",
  "Easy",
  "Global",
  "Developments and processes",
  "The United States policy of containment primarily sought to:",
  [
    "End all international trade",
    "Prevent the spread of Soviet influence and communism",
    "Make every colony independent immediately",
    "Replace every national government with the United Nations",
  ],
  1,
  "Containment aimed to limit expansion of Soviet power and communism through diplomatic, economic, and military measures. Its implementation varied across regions.",
  "Recall the strategic objective rather than every policy tool.",
);
mc(
  8,
  "proxy-agency",
  "Cold War",
  "Medium",
  "Asia",
  "Causation",
  "Why is it incomplete to describe the Vietnam War only as a contest between the United States and Soviet Union?",
  [
    "Vietnamese participants had no political goals.",
    "Decolonization was unrelated to Asian history.",
    "Local nationalism, revolutionary goals, and earlier colonial conflict also shaped the war.",
    "Outside powers never intervened.",
  ],
  2,
  "Superpower involvement interacted with local and regional histories. Vietnamese actors had goals and decisions that cannot be reduced to external direction.",
  "Add local actors and the colonial past to the explanation.",
);
mc(
  8,
  "partition-consequence",
  "Decolonization",
  "Easy",
  "South Asia",
  "Developments and processes",
  "Which development accompanied the independence and partition of British India in 1947?",
  [
    "Large-scale migration and communal violence",
    "The disappearance of all religious identities",
    "Immediate political union of India and China",
    "Continuation of direct British colonial rule without change",
  ],
  0,
  "Partition created India and Pakistan alongside extensive displacement and violence. Sovereignty and severe human costs occurred together.",
  "Consider the movement of people across new boundaries.",
);
mc(
  8,
  "nonaligned-purpose",
  "New states",
  "Hard",
  "Afro-Asia",
  "Claims and evidence",
  "A newly independent government joins nonaligned cooperation but accepts a loan from a superpower. Which interpretation is most defensible?",
  [
    "Nonalignment required refusing every form of foreign contact.",
    "The loan proves the government had no goals of its own.",
    "Every nonaligned state followed identical policies.",
    "Nonalignment sought autonomy from formal bloc subordination while allowing pragmatic relationships.",
  ],
  3,
  "Nonalignment was an effort to preserve autonomy, not a ban on all aid or diplomacy. A loan’s conditions and the government’s wider policies must be examined before inferring full alignment.",
  "Distinguish formal subordination from selective cooperation.",
);
ms(
  8,
  "decolonization-drivers",
  "Decolonization",
  "Medium",
  "Global",
  "Select all factors that could contribute to twentieth-century decolonization.",
  [
    "Organized anticolonial movements",
    "War-related weakening of imperial states",
    "Claims to national self-determination",
    "The disappearance of every colonial economic relationship immediately after war",
    "International pressure and shifting legitimacy of empire",
  ],
  [0, 1, 2, 4],
  "Popular organization, imperial weakness, self-determination claims, and international conditions could reinforce one another. Political independence did not immediately erase economic connections.",
  "Combine local mobilization with changes in imperial power.",
);
written(
  8,
  "independence-comparison-saq",
  "Decolonization",
  "Medium",
  "Africa and South Asia",
  "Comparison",
  "SAQ",
  "(a) Identify one similarity between Indian and Algerian independence movements. (b) Explain one important difference in the processes of independence. (c) Explain why describing India’s independence as entirely peaceful would be misleading.",
  "(a) Both involved organized challenges to European colonial authority and claims to national sovereignty. (b) Algeria’s independence followed a prolonged war shaped by French settler interests, while India’s transfer of power involved mass mobilization and negotiation. (c) The process in India included repression and conflict, and partition in 1947 produced extensive violence and displacement, so negotiation did not mean an absence of violence.",
  "A useful comparison gives both a shared goal and different conditions, then corrects an oversimplification.",
  "Compare the path to sovereignty and the human consequences.",
  [
    point(
      "Similarity",
      "Identify anticolonial organization, sovereignty claims, or mass participation.",
    ),
    point(
      "Difference",
      "Explain Algeria’s prolonged war and settler context against India’s negotiated transfer with mass mobilization.",
    ),
    point(
      "Qualification",
      "Explain partition violence or repression rather than calling the entire process peaceful.",
    ),
  ],
);
written(
  8,
  "apartheid-saq",
  "Political transformations",
  "Hard",
  "Southern Africa",
  "Causation",
  "SAQ",
  "(a) Identify one mechanism of apartheid. (b) Explain one way opponents challenged it. (c) Explain why international pressure alone is an incomplete explanation for its end.",
  "(a) Apartheid legally restricted political rights, residence, movement, and access to institutions along racial lines. (b) Opponents organized protests, labor action, political movements, and campaigns against discriminatory rule. (c) International sanctions and solidarity interacted with sustained domestic resistance and political negotiations; ignoring local actors hides the organization and choices central to change.",
  "Identify an institution and a mechanism of opposition. Avoid making international actors the sole agents of liberation.",
  "Connect law, domestic organization, and outside pressure.",
  [
    point(
      "Mechanism",
      "Identify a specific racial restriction on voting, residence, movement, schooling, or another institution.",
    ),
    point(
      "Resistance",
      "Explain a domestic protest, labor, political, or organizational strategy.",
    ),
    point(
      "Multicausal explanation",
      "Explain the interaction of domestic mobilization, negotiations, and outside pressure.",
    ),
  ],
);
written(
  8,
  "sovereignty-dbq",
  "Decolonization and development",
  "Hard",
  "Afro-Asia",
  "Argumentation",
  "DBQ",
  `Evaluate the extent to which newly independent states achieved autonomy c.1945–1990. Use the documents and outside evidence. All seven documents are CONSTRUCTED CLASSROOM SOURCES: invented perspectives for analysis, not authentic quotations or archival records.

Document 1 — A hypothetical independence leader, public speech, 1957: National officials will now decide laws, but rebuilding the economy will require resources.
Document 2 — A hypothetical finance minister, private cabinet note, 1965: Export earnings depend heavily on one commodity whose price is set in international markets.
Document 3 — A hypothetical nonaligned delegate, conference statement, 1961: Cooperation should allow states to resist pressure to enter either superpower bloc.
Document 4 — A hypothetical superpower diplomat, aid proposal, 1968: Assistance is offered together with requested military access and policy cooperation.
Document 5 — A hypothetical farmer, petition to national officials, 1970: Land reform promises have not yet changed the family’s access to farmland.
Document 6 — A hypothetical education minister, report, 1975: The national government directs new schools and training programs to build domestic expertise.
Document 7 — A hypothetical displaced family member, recollection recorded in 1960: New borders brought national independence but separated relatives and made return difficult.

Use the seven-point classroom rubric; this is not an official AP exam question.`,
  "Newly independent states gained substantial formal political autonomy, but economic dependence, geopolitical pressure, and internal inequality limited how freely they could pursue national goals. European imperial weakness after the world wars interacted with organized anticolonial movements. Document 1 describes the important change from colonial officials to national lawmakers, while document 6 shows national control over education and skills policy. Yet document 2 reveals how commodity dependence leaves revenue vulnerable to decisions and prices outside the state’s control. Because the finance minister writes privately to a cabinet, the note may emphasize risks more candidly than a celebratory public address. Document 3 shows nonaligned cooperation as an effort to preserve choices between Cold War blocs, but document 4 demonstrates that aid could carry strategic demands. The diplomat’s purpose is to obtain cooperation, so assistance should be analyzed as a bargain rather than neutral generosity. Outside these constructed sources, the Bandung Conference of 1955 illustrates Afro-Asian attempts to build influence beyond colonial relationships and bloc subordination. Document 5 qualifies the meaning of independence for citizens: a national government could possess sovereignty while unequal land access continued. Document 7 similarly shows that liberation and displacement could coexist, as also occurred with India’s partition in 1947. These limits do not make independence meaningless. They show that political sovereignty, economic autonomy, and equal access to resources are separate dimensions of change, and that states pursued them under different constraints.",
  "Organize evidence around political sovereignty, economic constraints, bloc pressure, and citizens’ experiences. Each source is constructed, so sourcing analysis evaluates the stated role and purpose rather than authentic authorship.",
  "A state can govern itself while facing outside constraints or unequal internal outcomes.",
  [
    point(
      "Thesis",
      "Make a qualified claim distinguishing formal sovereignty from other dimensions of autonomy.",
    ),
    point(
      "Context",
      "Explain imperial weakening, anticolonial organization, or the Cold War setting.",
    ),
    point(
      "Document evidence",
      "Award 1 for accurately using at least three documents; award 2 for using at least four to support the argument through explanation.",
      2,
    ),
    point(
      "Outside evidence",
      "Explain a specific relevant example absent from the documents, such as Bandung, a particular independence struggle, or India’s partition.",
    ),
    point(
      "Sourcing",
      "Explain how perspective, purpose, audience, or situation affects at least two constructed sources.",
    ),
    point(
      "Complexity",
      "Develop the interaction of political change with economic continuity, internal inequality, or strategic pressure using evidence.",
    ),
  ],
);

mc(
  9,
  "supply-chain",
  "Global Economy",
  "Easy",
  "Global",
  "Developments and processes",
  "A product is designed in one country, assembled in another, and sold across several continents. This most directly illustrates:",
  [
    "The disappearance of all trade",
    "A global supply chain",
    "A medieval manor",
    "A single country performing every production stage",
  ],
  1,
  "A supply chain links stages of production and distribution across locations. Cross-border organization does not establish equal wages or power at each stage.",
  "Follow the stages of making and selling the product.",
);
mc(
  9,
  "green-revolution",
  "Technology",
  "Medium",
  "Global",
  "Causation",
  "Which explanation of Green Revolution yield increases is most complete?",
  [
    "A seed alone worked identically without water or nutrients everywhere.",
    "Agricultural institutions had no role.",
    "New crop varieties interacted with irrigation, fertilizers, and supporting institutions.",
    "All ecological costs disappeared.",
  ],
  2,
  "Higher yields often depended on a package of inputs and institutions. Cost and environmental effects varied, so results cannot be attributed to a seed alone.",
  "Think about what a crop needs to grow and reach farmers.",
);
mc(
  9,
  "digital-inequality",
  "Technology",
  "Medium",
  "Global",
  "Claims and evidence",
  "A claim that internet access automatically creates equal political influence is weakened most directly by evidence that:",
  [
    "Access, platform control, language, and resources remain unequal.",
    "Messages can travel quickly.",
    "Some people communicate internationally.",
    "Digital technology exists.",
  ],
  0,
  "Unequal access and control show why connection does not guarantee equal influence. Fast communication is a benefit but does not test equality by itself.",
  "Evaluate distribution, not just speed.",
);
mc(
  9,
  "climate-scale",
  "Environmental change",
  "Hard",
  "Global",
  "Causation",
  "Which historical argument best connects industrialization to contemporary climate pressures?",
  [
    "Only one country has ever used fossil fuels.",
    "Environmental outcomes are independent of production and energy use.",
    "Every community contributed and experienced impacts equally.",
    "Long-term fossil-fuel use increased emissions while responsibility and vulnerability remained uneven.",
  ],
  3,
  "Industrial energy use is a major long-term driver of emissions, but contributions and capacity to adapt differ across countries and communities. Global processes can have unequal local effects.",
  "Combine a long-term cause with uneven consequences.",
);
ms(
  9,
  "rights-globalization",
  "Rights and culture",
  "Medium",
  "Global",
  "Select all historically defensible statements about globalization and rights movements.",
  [
    "International rights language can support local activism.",
    "Circulating cultural products may be adapted to local identities.",
    "Cross-border production can generate both opportunities and labor concerns.",
    "Greater trade proves all societies have identical cultures.",
    "Global connections necessarily eliminate legal discrimination.",
  ],
  [0, 1, 2],
  "International norms, cultural adaptation, and unequal economic effects are compatible with growing connections. Trade does not automatically homogenize cultures or remove discrimination.",
  "Connection creates possibilities; institutions shape outcomes.",
);
written(
  9,
  "yield-data-saq",
  "Technology and food",
  "Medium",
  "Global",
  "Claims and evidence",
  "SAQ",
  "Constructed classroom data description: A farming region reports increased average grain yields after adopting new varieties, irrigation, and fertilizers, but the report omits farm size, input costs, and water use. (a) Identify one supported conclusion. (b) Explain one unsupported conclusion. (c) Identify additional evidence needed to evaluate who benefited.",
  "(a) Average recorded yields increased in the reporting region after the combined changes. (b) The report does not establish that every farmer’s income increased, because costs and distribution are missing. (c) Farm-level yields, input expenses, debt, landholding size, and water access would help show which producers could adopt the package and whether gains exceeded costs.",
  "Distinguish average output from income and distribution. A before-and-after association also does not isolate the effect of each input.",
  "An average can hide differences among farmers.",
  [
    point(
      "Supported claim",
      "Identify the reported regional yield increase without claiming an isolated cause or universal benefit.",
    ),
    point(
      "Limit",
      "Explain why the data cannot establish equal income gains, affordability, or environmental sustainability.",
    ),
    point(
      "Additional evidence",
      "Specify farm-level distribution, costs, debt, water use, or access data and explain its purpose.",
    ),
  ],
);
written(
  9,
  "culture-saq",
  "Culture and globalization",
  "Hard",
  "Global",
  "Continuity and change",
  "SAQ",
  "(a) Identify one way twentieth-century communication or transport expanded cultural exchange. (b) Explain how local adaptation could preserve difference within that exchange. (c) Explain why the worldwide popularity of one film or sport does not establish complete cultural uniformity.",
  "(a) Broadcasting, air travel, and later digital networks circulated music, film, and sport more widely. (b) Audiences could translate, reinterpret, or combine imported forms with local practices. (c) Popularity of one product does not measure all language, religion, social customs, or political identities, so shared consumption can coexist with durable differences.",
  "Use a mechanism of circulation and a mechanism of adaptation. Avoid treating culture as either entirely static or completely homogenized.",
  "Shared products can carry different meanings.",
  [
    point(
      "Exchange mechanism",
      "Identify and explain a relevant communication or transport change.",
    ),
    point(
      "Adaptation",
      "Explain translation, reinterpretation, combination, or localization.",
    ),
    point(
      "Evidence limit",
      "Explain why one widely consumed product cannot establish uniformity across all cultural practices.",
    ),
  ],
);
written(
  9,
  "globalization-leq",
  "Globalization and inequality",
  "Hard",
  "Global",
  "Argumentation",
  "LEQ",
  "Evaluate the extent to which globalization reduced inequality in the twentieth and early twenty-first centuries. Use economic and technological evidence.",
  "Globalization expanded access to markets and information in many settings, but it did not consistently reduce inequality because access and bargaining power remained uneven. Transportation and communication innovations lowered some costs of exchange. Global production chains created employment and investment opportunities, yet firms and workers occupied different positions in those chains and had different control over wages and profits. Digital communication gave activists and students new tools while communities lacking infrastructure or resources remained disadvantaged. Agricultural innovations could increase food output, but Green Revolution inputs required water, capital, and institutional support that were not equally available. These examples show why aggregate growth or faster communication is insufficient evidence of equal benefits. Some groups gained substantial opportunities, and policy could distribute gains more broadly, but global connection itself did not guarantee that result. The extent of inequality reduction depended on local institutions, rights, investment, and the measure of inequality being considered.",
  "Assess distribution and institutions rather than equating connection with equality. Specify what your evidence can show and acknowledge regional or group differences.",
  "Distinguish rising output from who receives the gains.",
  essayRubric(
    "Make a qualified judgment about inequality, specifying limits or dimensions.",
    "Describe accelerating global connections, industrial development, or postwar institutions.",
    "Explain at least two specific economic/technological examples, such as supply chains, digital access, or agricultural inputs.",
    "Connect each example to distribution, access, or bargaining power rather than merely naming technology.",
  ),
);

// Optional enrichment: explicitly excluded from standard AP Modern scope.
mc(
  1,
  "bg-hijra",
  "Background · Islam",
  "Easy",
  "Arabia",
  "Developments and processes",
  "Optional background c.600–1200: The Hijra of 622 refers to:",
  [
    "Muhammad’s migration from Mecca to Medina",
    "The Ottoman capture of Constantinople",
    "The first Portuguese voyage to India",
    "The establishment of the Inca Empire",
  ],
  0,
  "The Hijra is Muhammad’s migration to Medina and a foundational date in Islamic history. The other events occurred much later and belong to different contexts.",
  "Focus on early Islamic history.",
  "background",
);
mc(
  1,
  "bg-umayyad-center",
  "Background · Umayyads",
  "Easy",
  "Middle East",
  "Developments and processes",
  "Optional background c.600–1200: Which city served as the principal capital of the Umayyad caliphate centered in the Middle East?",
  ["Paris", "Damascus", "Tenochtitlan", "Beijing"],
  1,
  "The Umayyad caliphate of 661–750 governed from Damascus. Later Umayyad rule in Iberia is a distinct political development, so the geographic qualification matters.",
  "Choose the eastern Mediterranean city.",
  "background",
);
mc(
  1,
  "bg-abbasid-change",
  "Background · Abbasids",
  "Medium",
  "Middle East",
  "Continuity and change",
  "Optional background c.600–1200: Which description best captures the transition from Umayyad to Abbasid rule?",
  [
    "Islam ended as a religious tradition.",
    "Every existing administrative practice was abandoned.",
    "A new dynasty shifted the political center toward Iraq while Islamic institutions and earlier knowledge traditions continued.",
    "A European parliament became ruler of the caliphate.",
  ],
  2,
  "The Abbasid revolution in 750 changed ruling authority and political geography without erasing Islamic institutions or all earlier administrative traditions. Baghdad became a major center.",
  "Distinguish dynastic change from complete cultural replacement.",
  "background",
);
mc(
  1,
  "bg-tang-openness",
  "Background · Tang China",
  "Medium",
  "East Asia",
  "Claims and evidence",
  "Optional background c.600–1200: Evidence of foreign merchants and Buddhist communities in Tang China most directly challenges which claim?",
  [
    "Chinese rulers used administrative institutions.",
    "Trade could support cultural contact.",
    "Religious traditions circulated along networks.",
    "Tang China was completely isolated from the wider world.",
  ],
  3,
  "Foreign merchants and religious communities provide evidence of connections. Their presence does not prove every policy was tolerant or every region equally connected.",
  "Ask which absolute claim the evidence contradicts.",
  "background",
);
mc(
  1,
  "bg-byzantine-continuity",
  "Background · Byzantium",
  "Easy",
  "Eastern Mediterranean",
  "Continuity and change",
  "Optional background c.600–1200: The Byzantine Empire is best understood as:",
  [
    "An eastern continuation of Roman imperial traditions centered on Constantinople",
    "A state created by the Haitian Revolution",
    "A unified empire governing all of medieval western Europe",
    "A kingdom located in the Andes",
  ],
  0,
  "Byzantine is a modern term for the eastern Roman Empire. Its institutions changed over centuries, but Roman continuity is central to understanding its identity and political traditions.",
  "Consider eastern Roman continuity.",
  "background",
);
mc(
  1,
  "bg-ghana-location",
  "Background · Ghana",
  "Easy",
  "West Africa",
  "Developments and processes",
  "Optional background c.600–1200: Which distinction about ancient Ghana is accurate?",
  [
    "It occupied exactly the same territory as the modern state of Ghana.",
    "It was a western Sahelian empire distinct from the modern country bearing its name.",
    "It had no connections to trans-Saharan commerce.",
    "It was an island kingdom in the Indian Ocean.",
  ],
  1,
  "Ancient Ghana was centered farther north in the western Sahel. Its resources and authority interacted with trade routes, and it must not be placed automatically within modern Ghana’s borders.",
  "Modern names do not always indicate the same historical location.",
  "background",
);
mc(
  1,
  "bg-indian-ocean-before-europe",
  "Background · Early Indian Ocean",
  "Medium",
  "Indian Ocean",
  "Continuity and change",
  "Optional background c.600–1200: Ninth-century maritime exchange between China, Southeast Asia, and western Asian merchants demonstrates that:",
  [
    "European voyages created all Asian maritime trade.",
    "No ships carried ceramics.",
    "Indian Ocean connections existed long before Portuguese arrival.",
    "Every cargo followed an identical uninterrupted route.",
  ],
  2,
  "Archaeological and historical evidence documents pre-European maritime networks. It supports earlier connections without establishing uniform routes, complete control, or the itinerary of every merchant.",
  "Compare the ninth century with voyages after 1498.",
  "background",
);
mc(
  1,
  "bg-buddhist-spread",
  "Background · Buddhism",
  "Medium",
  "Asia",
  "Causation",
  "Optional background c.600–1200: Which combination best explains how Buddhism spread across parts of Asia?",
  [
    "Only conquest by a single permanent Buddhist empire",
    "The absence of travel or translation",
    "Universal forced conversion by every Chinese ruler",
    "Monks, merchants, translation, and patronage across connected routes",
  ],
  3,
  "Religious diffusion involved movement of people and texts, local support, and adaptation. It did not require one empire governing every Buddhist community or uniform policies from all rulers.",
  "Think about people, texts, and institutional support.",
  "background",
);
mc(
  1,
  "bg-christian-division",
  "Background · Christianity",
  "Medium",
  "Europe and Eastern Mediterranean",
  "Continuity and change",
  "Optional background c.600–1200: What is the best way to interpret the conventional date 1054 for the East–West Christian schism?",
  [
    "As a major stage in a longer separation between eastern and western churches",
    "As the first existence of Christianity anywhere",
    "As the immediate disappearance of all shared Christian traditions",
    "As a date proving every Christian community agreed on politics",
  ],
  0,
  "1054 marks an important rupture, but the separation developed over time amid institutional and doctrinal disputes. Shared Christian origins and many traditions continued.",
  "A conventional date can mark a process rather than create it entirely.",
  "background",
);
mc(
  1,
  "bg-charlemagne",
  "Background · Medieval Europe",
  "Medium",
  "Western Europe",
  "Sourcing and situation",
  "Optional background c.600–1200: Charlemagne’s imperial coronation in 800 most directly shows:",
  [
    "The absence of Christian institutions in politics",
    "An effort to connect Frankish rulership with Roman Christian imperial legitimacy",
    "Complete political unity of all Christian kingdoms",
    "The founding of a modern democratic nation-state",
  ],
  1,
  "The coronation joined royal power to Roman and Christian imperial claims. It did not produce universal Christian political unity or modern democratic institutions.",
  "Focus on symbols of rightful authority.",
  "background",
);
mc(
  1,
  "bg-viking-activities",
  "Background · Vikings",
  "Easy",
  "Northern Europe",
  "Developments and processes",
  "Optional background c.600–1200: Which description best reflects Scandinavian maritime activity in the Viking period?",
  [
    "Only peaceful tourism",
    "Only farming with no travel",
    "Raiding, trading, settlement, and participation in enslavement networks",
    "Industrial steam transport",
  ],
  2,
  "Scandinavian maritime expansion combined commerce, settlement, and violence, including the taking and trading of captives. Reducing it to one activity distorts the evidence.",
  "Choose a description that includes both exchange and coercion.",
  "background",
);
mc(
  1,
  "bg-object-inference",
  "Background · Vikings",
  "Hard",
  "Northern Europe and Islamic world",
  "Claims and evidence",
  "Optional background c.600–1200: Islamic silver coins found in a Scandinavian hoard most directly support which conclusion?",
  [
    "Every person in Scandinavia converted to Islam.",
    "The hoard’s owner personally visited every mint that made the coins.",
    "No intermediate trader handled the coins.",
    "Silver moved through networks connecting northern Europe with the Islamic world.",
  ],
  3,
  "The objects establish movement and connection, but coins can pass through many hands. They do not by themselves prove personal itineraries, conversion, or direct trade without intermediaries.",
  "Distinguish a connection from a particular person’s journey.",
  "background",
);
written(
  1,
  "bg-caliphates-saq",
  "Background · Islam and caliphates",
  "Hard",
  "Middle East",
  "Continuity and change",
  "SAQ",
  "Optional background c.600–1200: (a) Identify one political change associated with the Abbasid revolution. (b) Explain one cultural or institutional continuity. (c) Explain why Islamic conquest does not by itself establish the timing of conversion among local populations.",
  "(a) The Abbasids replaced the Umayyad ruling dynasty and shifted the political center toward Iraq. (b) Islamic institutions, Arabic scholarship, and adaptation of earlier regional administrative and intellectual traditions continued. (c) Conversion occurred over generations and depended on local institutions, relationships, and individual choices, so a change in rulers did not immediately change every subject’s beliefs.",
  "The answer distinguishes political, institutional, and religious timelines. Avoid describing a dynasty’s replacement as the disappearance of all earlier culture.",
  "Conquest and conversion are different processes.",
  [
    point(
      "Political change",
      "Identify dynastic replacement or the shift toward Iraq and Baghdad.",
    ),
    point(
      "Continuity",
      "Explain an accurate Islamic, scholarly, or administrative continuity.",
    ),
    point(
      "Different timing",
      "Explain why political conquest does not demonstrate immediate universal conversion.",
    ),
  ],
  "background",
);
written(
  1,
  "bg-maritime-evidence-saq",
  "Background · Early Indian Ocean",
  "Hard",
  "Indian Ocean",
  "Claims and evidence",
  "SAQ",
  "Optional background c.600–1200: Archaeologists find Chinese ceramics in a ninth-century shipwreck near Belitung. (a) Identify one historical connection this supports. (b) Explain one claim it cannot establish by itself. (c) Explain what additional evidence could improve an argument about the scale of exchange.",
  "(a) The find supports maritime movement of Chinese products through Southeast Asian waters before European oceanic expansion. (b) One wreck cannot establish the total annual volume of trade or prove that one merchant personally traveled the entire route. (c) Additional wrecks, port excavations, distribution patterns, and dated commercial records could help assess frequency, destinations, and scale.",
  "A material object supports a bounded inference. Multiple kinds of evidence are needed to move from the existence of a route to claims about its scale.",
  "Existence and volume are different questions.",
  [
    point(
      "Connection",
      "Identify Chinese–Southeast Asian maritime exchange before 1200.",
    ),
    point(
      "Limit",
      "Explain why one find cannot establish total volume, a universal route, or a complete individual journey.",
    ),
    point(
      "Corroboration",
      "Identify another relevant body of evidence and explain how it informs scale or frequency.",
    ),
  ],
  "background",
);
written(
  1,
  "bg-europe-networks-saq",
  "Background · Medieval Europe and Vikings",
  "Medium",
  "Europe",
  "Comparison",
  "SAQ",
  "Optional background c.600–1200: (a) Identify one institution that organized life in medieval western Europe. (b) Explain one way Scandinavian seafarers connected Europe to wider networks. (c) Explain why calling the entire period isolated is misleading.",
  "(a) Manorial estates organized rural labor and obligations; churches and monasteries also structured religious and intellectual life. (b) Scandinavian traders and raiders traveled across seas and rivers, exchanging goods and captives through networks reaching the eastern Mediterranean and Islamic markets. (c) Objects, travel, religious institutions, and commerce show connections even where political authority was fragmented and local rural life predominated.",
  "Regional fragmentation is not equivalent to complete isolation. Include the coercive dimensions of Viking exchange rather than presenting it only as peaceful trade.",
  "Political unity and commercial connection are separate.",
  [
    point(
      "Institution",
      "Identify a manor, church, monastery, kingdom, or another accurate medieval institution.",
    ),
    point(
      "Connection",
      "Explain seaborne or riverine trade, settlement, or raiding linking regions.",
    ),
    point(
      "Correct generalization",
      "Use connections or institutions to explain why complete isolation is an oversimplification.",
    ),
  ],
  "background",
);
written(
  1,
  "bg-networks-leq",
  "Background · Networks 600–1200",
  "Hard",
  "Afro-Eurasia",
  "Argumentation",
  "LEQ",
  "Optional background c.600–1200: Evaluate the extent to which religious and commercial networks connected societies before the standard AP World History: Modern starting date. Use at least two regions.",
  "Religious and commercial networks connected many Afro-Eurasian societies before 1200, although links varied in intensity and did not create one uniform world. Islamic states and communities developed across large areas, while scholars translated and expanded Greek, Persian, and Indian knowledge. In Asia, Buddhist monks, patrons, and merchants circulated texts and practices across routes linking South Asia, Central Asia, and China. Tang Chinese ceramics in maritime archaeological contexts provide another kind of evidence for the movement of products through Southeast Asian waters. Scandinavian finds of Islamic silver demonstrate connections reaching northern Europe, though not necessarily direct journeys by each owner. These examples show that fragmented political authority did not prevent exchange. Yet they do not establish equal participation, uniform beliefs, or universal prosperity; networks also involved conquest and enslavement. The pre-1200 period therefore supplies important context for later connections while remaining distinct from the standard AP Modern scope.",
  "Build a qualified argument from multiple kinds of evidence. Label this work as optional background, not an added assessed AP Modern unit.",
  "Compare connections without claiming a single political or cultural system.",
  essayRubric(
    "Make a qualified claim about the degree of pre-1200 connection.",
    "Describe regional states, religious expansion, or existing trade routes.",
    "Explain specific evidence from at least two regions, such as Buddhist texts, Abbasid learning, Tang maritime goods, or Viking silver.",
    "Connect the evidence to mechanisms of exchange and explain limits of uniformity or scale.",
  ),
  "background",
);

const standardTopicParents: Record<number, Record<string, string>> = {
  2: {
    "Silk Roads": "Silk Roads and the Mongols",
    "Indian Ocean": "Indian Ocean exchange",
    "Trans-Saharan exchange": "Trans-Saharan routes",
    "Travel accounts": "Cultural and environmental consequences",
    "Environmental consequences": "Cultural and environmental consequences",
    "Networks of exchange": "Silk Roads and the Mongols",
  },
  3: {
    "Empire Building": "Imperial expansion",
    "Religious legitimacy": "Legitimation and religion",
    Administration: "Administration and revenue",
    Legitimation: "Legitimation and religion",
    "Religious policy": "Legitimation and religion",
    "Revenue collection": "Administration and revenue",
    "Continuity and religious reform": "Continuity, reform, and conflict",
  },
  4: {
    "Columbian Exchange": "The Columbian Exchange",
    "Maritime Empires": "Maritime expansion",
    "Global silver": "Global trade and resistance",
    "Labor systems": "Labor and social hierarchy",
    Resistance: "Global trade and resistance",
    "Colonial labor and resistance": "Labor and social hierarchy",
  },
  5: {
    Enlightenment: "Enlightenment and political revolutions",
    "Political revolutions": "Enlightenment and political revolutions",
    Industrialization: "Industrial origins and spread",
    Nationalism: "Nationalism and independence",
    "Industrial society": "Industrial society and reform",
  },
  6: {
    Imperialism: "Imperial motives and methods",
    "Economic imperialism": "Economic imperialism",
    Resistance: "Responses and resistance",
    Migration: "Migration and labor",
    "Consequences of imperialism": "Economic imperialism",
  },
  7: {
    "World War I": "World War I",
    "World Wars": "World War I",
    "Interwar order": "Revolution and the interwar order",
    "World War II": "World War II",
    Revolutions: "Revolution and the interwar order",
    "Mass atrocities": "Mass atrocities and accountability",
    "Global conflict": "World War II",
  },
  8: {
    "Cold War": "Cold War rivalry",
    Decolonization: "Decolonization",
    "New states": "New states and development",
    "Political transformations": "Political transformations",
    "Decolonization and development": "New states and development",
  },
  9: {
    "Global Economy": "Global economic institutions",
    Technology: "Technology and health",
    "Environmental change": "Environmental change and inequality",
    "Rights and culture": "Rights, culture, and resistance",
    "Technology and food": "Technology and health",
    "Culture and globalization": "Rights, culture, and resistance",
    "Globalization and inequality": "Environmental change and inequality",
  },
};
const backgroundTopicParents: Record<string, string> = {
  "Background · Islam": "Islam and the early caliphates",
  "Background · Umayyads": "Islam and the early caliphates",
  "Background · Abbasids": "Islam and the early caliphates",
  "Background · Islam and caliphates": "Islam and the early caliphates",
  "Background · Tang China": "Tang China and Buddhism",
  "Background · Buddhism": "Tang China and Buddhism",
  "Background · Byzantium": "Byzantium and Christianity",
  "Background · Christianity": "Byzantium and Christianity",
  "Background · Ghana": "Ghana and early Indian Ocean connections",
  "Background · Early Indian Ocean": "Ghana and early Indian Ocean connections",
  "Background · Networks 600–1200": "Ghana and early Indian Ocean connections",
  "Background · Medieval Europe": "Medieval Europe and Vikings",
  "Background · Vikings": "Medieval Europe and Vikings",
  "Background · Medieval Europe and Vikings": "Medieval Europe and Vikings",
};

export const worldQuestions: Question[] = createQuestions(
  "world",
  "world-v2",
  seeds,
).map((question) => {
  const unitNumber = units.indexOf(question.unit) + 1;
  const parentName =
    question.scope === "background"
      ? backgroundTopicParents[question.topic]
      : (standardTopicParents[unitNumber]?.[question.topic] ?? question.topic);
  const unitLesson = worldUnits.find(
    (entry) => entry.unit === question.unit && entry.scope === question.scope,
  );
  const parent = unitLesson?.topics.find((entry) => entry.name === parentName);
  if (!parent)
    throw new Error(
      `World question ${question.id} has no matching lesson topic.`,
    );
  if (!parent.subtopics.includes(question.subtopic))
    parent.subtopics.push(question.subtopic);
  return { ...question, topic: parent.name };
});
