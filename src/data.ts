export const profile = {
  name: 'Kalungi Isaac',
  shortName: 'Kal',
  initials: 'KI',
  role: 'Full-stack developer',
  tagline: 'I build web apps end to end: the interface, the server behind it, and the data model holding it all together.',
  location: 'Kampala, Uganda',
  timezone: 'Africa/Kampala',
  timezoneLabel: 'EAT',
  email: 'izokal91@gmail.com',
  phone: '+256 742 725 522',
  phoneHref: 'tel:+256742725522',
  whatsapp: 'https://wa.me/256742725522',
  github: 'https://github.com/kalungiisaac',
  githubHandle: 'kalungiisaac',
  linkedin: 'https://ug.linkedin.com/in/kalungi-isaac-uganda',
  avatar: '/avatar.jpg',
  socials: [
    { label: 'GitHub', href: 'https://github.com/kalungiisaac' },
    { label: 'LinkedIn', href: 'https://ug.linkedin.com/in/kalungi-isaac-uganda' },
    { label: 'Email', href: 'mailto:izokal91@gmail.com' },
  ],
};

export const nav = [
  { to: '/', label: 'Index' },
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Work' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills', label: 'Toolkit' },
  { to: '/notes', label: 'Notes' },
  { to: '/contact', label: 'Contact' },
];

export const stats = [
  { value: '14', sup: '', label: 'Public repos' },
  { value: '10', sup: '', label: 'Projects written up' },
  { value: '5', sup: '', label: 'Languages shipped' },
  { value: '2024', sup: '', label: 'Building since' },
];

export type Project = {
  slug: string;
  index: string;
  title: string;
  kind: string;
  year: string;
  status: 'Live' | 'Open source' | 'Archived';
  live?: string;
  preview?: string;
  repo: string;
  summary: string;
  stack: string[];
  role: string;
  timeframe: string;
  brief: string;
  challenge: string[];
  approach: { title: string; body: string }[];
  outcome: { title: string; body: string }[];
  learned: string;
  code: { file: string; lines: string[] };
};

export const projects: Project[] = [
  {
    slug: 'kali-game-store',
    index: '01',
    title: 'Kali Game Store',
    kind: 'Game discovery and wishlist app',
    year: '2026',
    status: 'Live',
    live: 'https://kalungiisaac.github.io/Kali_Game_Store_one/',
    repo: 'https://github.com/kalungiisaac/Kali_Game_Store_one',
    summary:
      'A game library on top of the RAWG catalogue: search by name, see what is about to release, keep a wishlist between visits, and read a detail page for each title.',
    stack: ['Vanilla JS', 'Vite', 'RAWG API', 'IGDB proxy', 'Anime.js'],
    role: 'Solo build',
    timeframe: 'Started 2025, still shipping',
    brief:
      'RAWG has a huge catalogue but a bare, developer-facing interface. I wanted a storefront feel on top of it: fast search, a clear upcoming-release view, a wishlist that survives a refresh, and a detail page with real screenshots.',
    challenge: [
      'Every view depends on a remote API, so loading states, failures and rate limits had to feel intentional rather than look like broken pages.',
      'The wishlist needs to persist without a backend or user accounts.',
      'IGDB holds richer artwork than RAWG, but its API needs Twitch credentials that must never reach the browser.',
    ],
    approach: [
      {
        title: 'Storefront shell in plain JavaScript',
        body: 'No framework on purpose. The app is split into ES modules per view (index, game details, upcoming, wishlist, comparison) built with Vite, so I could focus on the UI and DOM work the way a storefront widget would.',
      },
      {
        title: 'Readable screens for a slow API',
        body: 'Search and catalogue screens render skeleton cards while data arrives and keep an empty state for zero results, so a slow request reads as loading, not as an error.',
      },
      {
        title: 'Wishlist that survives the refresh',
        body: 'The wishlist lives in localStorage with a small wrapper that keeps the badge count and the wishlist page in sync across tabs.',
      },
      {
        title: 'IGDB behind a proxy',
        body: 'An optional Node proxy holds the Twitch credentials on the server and exposes a small endpoint the front end calls when IGDB data is available, falling back to RAWG alone.',
      },
    ],
    outcome: [
      {
        title: 'A public storefront',
        body: 'The app runs as a static site on GitHub Pages with catalogue browse, search, upcoming releases, game detail pages and a persistent wishlist.',
      },
      {
        title: 'Keys stay off the client',
        body: 'The browser only ever talks to public read endpoints. Anything token-based, like IGDB, goes through the proxy, so no credential ships in the bundle.',
      },
    ],
    learned:
      'Plain JavaScript scales further than people expect when you split it by view. And any state a user creates (a wishlist, a filter, a theme) should survive a reload or it may as well not exist.',
  code: {
    file: "wishlist.js",
    lines: [
      "// wishlist.js: one source of truth across every tab",
      "const KEY = 'kgs:wishlist'",
      "",
      "export function getWishlist() {",
      "  return JSON.parse(localStorage.getItem(KEY) ?? '[]')",
      "}",
      "",
      "export function toggleGame(game) {",
      "  const list = getWishlist()",
      "  const next = list.some((g) => g.id === game.id)",
      "    ? list.filter((g) => g.id !== game.id)",
      "    : [...list, game]",
      "  localStorage.setItem(KEY, JSON.stringify(next))",
      "  window.dispatchEvent(new StorageEvent('storage', { key: KEY }))",
      "}",
    ],
  },
  },
  {
    slug: 'sacrament-meetings',
    index: '02',
    title: 'Sacrament Meetings',
    kind: 'Next.js meeting planner for a ward',
    year: '2026',
    status: 'Live',
    live: 'https://wdd430-portfolio-kal23.vercel.app',
    repo: 'https://github.com/kalungiisaac/wdd430-portfolio',
    summary:
      'A planner for a local ward that lets members browse upcoming sacrament meeting agendas, speakers and hymns, and print a simple programme for Sunday.',
    stack: ['Next.js App Router', 'React 19', 'TypeScript', 'Tailwind CSS 4'],
    role: 'Solo build',
    timeframe: '2026',
    brief:
      'Sacrament programmes are usually a printed sheet handed out on Sunday. The ward needed the information online in advance, searchable by speaker, and printable for people who prefer paper.',
    challenge: [
      'Audiences differ: a member checking this Sunday on a phone, a clerk printing the programme, and someone looking up when they last spoke.',
      'Printing has to strip the web chrome and keep only the programme, without building a separate print page.',
    ],
    approach: [
      {
        title: 'Server components first',
        body: 'Meeting lists and detail pages render on the server so they are fast and indexable, with small client components only where interaction is needed, such as sign-in.',
      },
      {
        title: 'Typed routes',
        body: 'TypeScript strict mode throughout, with typed route params for meetings and speakers so a renamed parameter fails at build time.',
      },
      {
        title: 'A quiet design system',
        body: 'Serif headings, restrained green, and a Tailwind 4 theme built on CSS variables so colours and spacing come from tokens rather than one-off values.',
      },
      {
        title: 'Print as a first-class layout',
        body: 'Tailwind print variants hide navigation and buttons, so Ctrl+P on any meeting page produces a clean programme.',
      },
    ],
    outcome: [
      {
        title: 'A working ward tool',
        body: 'Live on Vercel with meeting and speaker indexes, a standalone page for the current meeting, and printed programmes that come out clean.',
      },
    ],
    learned:
      'Designing for print alongside the screen forces decisions about what is essential. Half the page disappeared and the result got clearer.',
  code: {
    file: "app/meetings/page.tsx",
    lines: [
      "import { getUpcomingMeetings } from '@/lib/meetings'",
      "",
      "export default async function Meetings() {",
      "  const meetings = await getUpcomingMeetings()",
      "",
      "  return (",
      "    <section className=\"meetings\">",
      "      {meetings.map((m) => (",
      "        <MeetingCard key={m.id} meeting={m} />",
      "      ))}",
      "    </section>",
      "  )",
      "}",
    ],
  },
  },
  {
    slug: 'cse-340-service-network',
    index: '03',
    title: 'CSE 340 Service Network',
    kind: 'Server-rendered Node app',
    year: '2026',
    status: 'Open source',
    repo: 'https://github.com/kalungiisaac/CSE-340-KAL',
    summary:
      'A Service Network that connects volunteers to service opportunities in their community. Pages are rendered on a Node and Express server with EJS, backed by PostgreSQL and deployed on Render.',
    stack: ['Node.js', 'Express', 'EJS', 'PostgreSQL', 'Render'],
    role: 'Coursework, solo',
    timeframe: 'Spring 2026',
    brief:
      'Build a real multi-page app with a traditional server-rendered stack, so that frameworks like Next.js are understood rather than trusted. The theme: a network that promotes service, with partner organizations and available projects.',
    challenge: [
      'Keeping a growing Express app organised once routes, controllers and views pile up.',
      'Making forms and sessions safe by default: validation on the server, escaped output, protected routes.',
      'Deploying a real server, not a static site, with PostgreSQL connection details kept out of the repo.',
    ],
    approach: [
      {
        title: 'Structure before features',
        body: 'The src folder splits into controllers, models, middleware and views. Each feature gets a route module, a controller function and an EJS view, so the app stays navigable as it grows.',
      },
      {
        title: 'Server-side validation',
        body: 'Middleware validates forms on the server first; client hints are an extra, never the only check.',
      },
      {
        title: 'Shared layouts',
        body: 'EJS partials for head, header and footer keep every page consistent without duplicating markup across the home, organizations, projects and about pages.',
      },
    ],
    outcome: [
      {
        title: 'A deployed service network',
        body: 'Home, organizations and projects pages, with a Render deployment config (render.yaml) that builds and starts the Express server.',
      },
      {
        title: 'A learning repo beside it',
        body: 'CSE-340-learn holds the smaller exercises from the same course, so the patterns are visible step by step.',
      },
    ],
    learned:
      'Server rendering, sessions and middleware clicked once I built them by hand. Next.js and Express stopped feeling like magic.',
  code: {
    file: "routes/projects.js",
    lines: [
      "const router = express.Router()",
      "",
      "router.get('/', projectsController.list)",
      "router.get('/:id', projectsController.show)",
      "",
      "router.post(",
      "  '/:id/join',",
      "  isAuthenticated,",
      "  validateJoin,",
      "  projectsController.join",
      ")",
      "",
      "export default router",
    ],
  },
  },
  {
    slug: 'cse-341-contacts-api',
    index: '04',
    title: 'CSE 341 Contacts API',
    kind: 'REST API with Swagger docs',
    year: '2026',
    status: 'Open source',
    repo: 'https://github.com/kalungiisaac/CSE341',
    summary:
      'An Express and MongoDB contacts API with Swagger documentation, GitHub OAuth sign-in and separate contact and professional resource routes.',
    stack: ['Node.js', 'Express', 'MongoDB', 'Passport', 'Swagger UI'],
    role: 'Coursework, solo',
    timeframe: 'Summer 2026',
    brief:
      'Design and ship an API another team could use without reading the server code: clear routes, a documented contract, and authentication that protects the write endpoints.',
    challenge: [
      'Designing endpoints and status codes that behave predictably across two resource types.',
      'Keeping docs in sync with the code as routes changed.',
      'Connecting to MongoDB reliably from a hosted environment when local DNS is unreliable.',
    ],
    approach: [
      {
        title: 'Routes as a contract',
        body: 'RESTful routes grouped by resource (contacts, professional), with controllers kept separate from routing so each piece stays small.',
      },
      {
        title: 'Docs that ship with the app',
        body: 'A swagger.json served by the API itself through swagger-ui-express, so the docs live next to the routes they describe.',
      },
      {
        title: 'OAuth sign-in early',
        body: 'Passport with GitHub OAuth and express-session were wired in before write endpoints were exposed, so protected routes were the default.',
      },
      {
        title: 'A seeding script',
        body: 'A small seed script loads users and professional images into MongoDB from JSON, so a fresh database can be brought up in one command.',
      },
    ],
    outcome: [
      {
        title: 'A usable, documented API',
        body: 'Public on GitHub with Swagger docs covering the endpoints and a seed script to rebuild the data.',
      },
    ],
    learned:
      'An API is a product. Naming, status codes and docs matter as much as the query behind them.',
  code: {
    file: "routes/contacts.js",
    lines: [
      "router.get('/', async (req, res, next) => {",
      "  try {",
      "    const contacts = await Contact.find().lean()",
      "    res.status(200).json(contacts)",
      "  } catch (err) {",
      "    next(err)",
      "  }",
      "})",
      "",
      "router.post('/', isAuthenticated, validateContact, createContact)",
    ],
  },
  },
  {
    slug: 'sleep-outside',
    index: '05',
    title: 'Sleep Outside',
    kind: 'Storefront team build',
    year: '2026',
    status: 'Open source',
    repo: 'https://github.com/kalungiisaac/Team-1-SleepOutside',
    summary:
      'A camping gear storefront built as a team: product pages, a cart, checkout and tests, running on vanilla JavaScript with Vite, ESLint, Prettier and Jest.',
    stack: ['Vanilla JS', 'Vite', 'Jest', 'ESLint', 'Prettier'],
    role: 'Team of four',
    timeframe: 'Early 2026',
    brief:
      'A multi-page e-commerce front end where the product data, cart and checkout have to stay consistent across pages, built with a team and a shared code style.',
    challenge: [
      'Four people, one codebase: agreeing on structure, formatting and review before writing features.',
      'Keeping cart and checkout state correct across full page navigations.',
      'Writing tests for logic that talks to a remote product API.',
    ],
    approach: [
      {
        title: 'Agree on the rules first',
        body: 'Shared ESLint and Prettier configs plus conventional commits meant diffs stayed small and reviews stayed about behaviour.',
      },
      {
        title: 'Modules per page',
        body: 'Each page (home, product list, product detail, cart, checkout) has its own module importing shared helpers for fetching products and managing the cart.',
      },
      {
        title: 'Tests where the risk is',
        body: 'Jest covers the cart and checkout logic, the part where a bug means a lost order.',
      },
    ],
    outcome: [
      {
        title: 'A working storefront',
        body: 'Product browsing, a persistent cart and a checkout flow, built on a Vite dev and build setup with linting and tests in place.',
      },
    ],
    learned:
      'A team is a codebase more than a group chat. Shared tooling and small diffs did more for speed than any meeting.',
  code: {
    file: "src/cart.mjs",
    lines: [
      "import { getLocalStorage, setLocalStorage } from './utils.mjs'",
      "",
      "const KEY = 'so-cart'",
      "",
      "export function addToCart(product) {",
      "  const cart = getLocalStorage(KEY) ?? []",
      "  const found = cart.find((item) => item.Id === product.Id)",
      "  if (found) found.quantity += 1",
      "  else cart.push({ ...product, quantity: 1 })",
      "  setLocalStorage(KEY, cart)",
      "}",
    ],
  },
  },
  {
    slug: 'wdd231-chamber',
    index: '06',
    title: 'WDD 231: Chamber and market',
    kind: 'Multi-page HTML, CSS and JS',
    year: '2026',
    status: 'Open source',
    repo: 'https://github.com/kalungiisaac/wdd231',
    summary:
      'Weekly builds from a web front-end course, including a chamber of commerce site with directory, discover and join pages, and a farmers market site that loads its data from JSON.',
    stack: ['HTML', 'CSS', 'JavaScript', 'JSON', 'Responsive'],
    role: 'Coursework, solo',
    timeframe: 'Late 2025 to early 2026',
    brief:
      'Practise the platform without a framework: semantic HTML, responsive layouts, accessible forms, and fetching JSON data into a page.',
    challenge: [
      'Keeping several pages consistent with shared CSS and small scripts.',
      'Making directories and forms usable on small screens and with a keyboard.',
    ],
    approach: [
      {
        title: 'One stylesheet, a theme layer',
        body: 'Shared styles and CSS variables across the chamber pages, so a colour or spacing change lands everywhere at once.',
      },
      {
        title: 'Data as files',
        body: 'The chamber directory and the farmers market products load from JSON and render with small, readable scripts rather than hard-coded markup.',
      },
      {
        title: 'Forms that explain themselves',
        body: 'Join and enquiry forms use real labels, sensible input types and a thank-you page that confirms what was submitted.',
      },
    ],
    outcome: [
      {
        title: 'A working chamber site',
        body: 'Home, directory, discover, join and thank-you pages, plus the farmers market project, all in plain HTML, CSS and JavaScript.',
      },
    ],
    learned:
      'The platform is deep. Doing directories, filters and forms without a framework made me notice the accessibility work frameworks do not do for you.',
  code: {
    file: "scripts/directory.mjs",
    lines: [
      "const res = await fetch('data/members.json')",
      "const members = await res.json()",
      "",
      "const url = new URL(location.href)",
      "const mode = url.searchParams.get('view') ?? 'grid'",
      "",
      "render(members, mode)",
      "",
      "filter.addEventListener('change', (e) => {",
      "  render(members.filter(byLevel(e.target.value)), mode)",
      "})",
    ],
  },
  },
  {
    slug: 'wdd131-wander',
    index: '07',
    title: 'WDD 131: Account and store',
    kind: 'Plain HTML, CSS and JS project',
    year: '2025',
    status: 'Open source',
    repo: 'https://github.com/kalungiisaac/wdd131',
    summary:
      'A small site from my first front-end course with a site plan, product listing, account and review pages, plus the course exercises that led there.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    role: 'Coursework, solo',
    timeframe: 'Late 2025',
    brief:
      'Plan, then build a multi-page site by hand: information architecture, a site plan, then the pages it describes.',
    challenge: [
      'Learning to plan before building: writing a site plan made the page list obvious.',
      'Getting responsive layout and images right on phones without a CSS framework.',
    ],
    approach: [
      {
        title: 'Plan first',
        body: 'The siteplan.html page set out the pages, purpose and audience before any layout work started.',
      },
      {
        title: 'Build page by page',
        body: 'Products, account and review pages share a stylesheet and small scripts, with accessible forms for account and review input.',
      },
    ],
    outcome: [
      {
        title: 'A shipped first project',
        body: 'A complete multi-page site alongside the course exercises (temples, forms, media queries) that each taught one platform feature.',
      },
    ],
    learned:
      'A site plan sounds like bureaucracy until the first build. Then it is the most useful page in the repo.',
  code: {
    file: "scripts/reviews.js",
    lines: [
      "document.querySelector('form').addEventListener('submit', (e) => {",
      "  e.preventDefault()",
      "  const key = `review-${sku}`",
      "  const count = Number(localStorage.getItem(key) ?? 0) + 1",
      "  localStorage.setItem(key, count)",
      "  document.querySelector('.count').textContent = count",
      "})",
    ],
  },
  },
  {
    slug: 'cse210',
    index: '08',
    title: 'CSE 210',
    kind: 'C# object-oriented projects',
    year: '2025',
    status: 'Open source',
    repo: 'https://github.com/kalungiisaac/cse210-kal',
    summary:
      'Weekly C# console projects used to practise object-oriented design: classes, inheritance, interfaces, events and a .NET solution organised by week.',
    stack: ['C#', '.NET', 'OOP', 'Unit tests'],
    role: 'Coursework, solo',
    timeframe: 'Late 2025',
    brief:
      'Learn object-oriented design with a statically typed language before relying on it in a bigger codebase.',
    challenge: [
      'Breaking a problem into classes that each do one thing, without over-engineering.',
      'Getting comfortable with types, interfaces and compiler feedback instead of runtime guesswork.',
    ],
    approach: [
      {
        title: 'Small, testable classes',
        body: 'Each programme split into focused classes that can be tested without a console.',
      },
      {
        title: 'Interfaces for change',
        body: 'Where behaviour could vary (scoring, display, persistence), the programme depends on an interface rather than a concrete class.',
      },
      {
        title: 'Organised by week',
        body: 'A single .NET solution with week01 to week07 projects, plus notes like Inheritance.txt kept next to the code that taught them.',
      },
    ],
    outcome: [
      {
        title: 'OOP foundations',
        body: 'The patterns I use in TypeScript today started here: composition over deep inheritance, explicit types, and small units.',
      },
    ],
    learned:
      'A compiler is a collaborator. Knowing what a type error means early makes me write better TypeScript now.',
  code: {
    file: "week05/Program.cs",
    lines: [
      "List<Goal> goals = new List<Goal>();",
      "goals.Add(new SimpleGoal(\"Read\", 50));",
      "goals.Add(new EternalGoal(\"Pray\", 10));",
      "",
      "int total = 0;",
      "foreach (Goal goal in goals)",
      "{",
      "    total += goal.RecordEvent();",
      "}",
    ],
  },
  },
  {
    slug: 'python-study-flow',
    index: '09',
    title: 'Python toolbox',
    kind: 'Scripts and small tools',
    year: '2024 to 2026',
    status: 'Open source',
    repo: 'https://github.com/kalungiisaac/kalungi256256',
    summary:
      'Where Python started: a folder of scripts for study and daily tasks, including a study planner, a finance tracker, a meal price calculator, data analysis and a word-guessing game.',
    stack: ['Python', 'Scripting', 'Data analysis'],
    role: 'Solo, ongoing',
    timeframe: 'Ongoing since 2024',
    brief:
      'Learn Python by building things I would actually use: study planning, tracking money, working out recipes, and small games to keep it fun.',
    challenge: [
      'Writing scripts that stay useful rather than staying exercises.',
      'Handling input, files and calculations without a GUI toolkit in most cases.',
    ],
    approach: [
      {
        title: 'One problem per file',
        body: 'Each script solves one concrete problem: the finance tracker records spending, the meal calculator works out price per portion, the study scripts split time across subjects.',
      },
      {
        title: 'Data analysis milestones',
        body: 'Later scripts move from single calculations to reading data and summarising it, the bridge to SQL and the data model work I do now.',
      },
      {
        title: 'Keep the games',
        body: 'The word-guessing and adventure games are the reason I kept going. Learning sticks better when the output is fun.',
      },
    ],
    outcome: [
      {
        title: 'A habit, not a course',
        body: 'A public folder of Python scripts that has grown for two years and seeded the study planning, finance and analysis tools I still reach for.',
      },
    ],
    learned:
      'The first language teaches you how to learn. Python made every later language feel like learning new vocabulary rather than a new world.',
  code: {
    file: "meal_calculator.py",
    lines: [
      "def price_per_portion(price: float, servings: int) -> float:",
      "    if servings <= 0:",
      "        raise ValueError(\"servings must be positive\")",
      "    return round(price / servings, 2)",
      "",
      "",
      "print(price_per_portion(24000, 6))  # 4000.0",
    ],
  },
  },
  {
    slug: 'nextjs-ward-planner',
    index: '10',
    title: 'Next.js ward planner',
    kind: 'App Router team build',
    year: '2026',
    status: 'Open source',
    repo: 'https://github.com/kalungiisaac/wdd430-portfolio-1',
    summary:
      'A team Next.js build of the sacrament meeting planner, forked and extended from a teammate’s scaffold: App Router structure, shared components and a deployed preview on Vercel.',
    stack: ['Next.js', 'TypeScript', 'React', 'Vercel'],
    preview: 'https://wdd430-portfolio-brown.vercel.app',
    role: 'Team build',
    timeframe: 'September 2026',
    brief:
      'Build the meeting planner as a team on a shared Next.js codebase, agreeing on folder structure and components before features, with a working deployment for each milestone.',
    challenge: [
      'Working in someone else’s structure: the repo started as a teammate’s scaffold.',
      'Keeping App Router conventions consistent across a team: server components by default, client only where needed.',
    ],
    approach: [
      {
        title: 'Read the scaffold first',
        body: 'Before adding pages, I mapped app, components and what each route rendered, so new work fitted the existing conventions.',
      },
      {
        title: 'Small, shared components',
        body: 'Reusable cards and layout pieces in components so every page kept the same look as the team moved fast.',
      },
      {
        title: 'Preview deployments as review',
        body: 'Every change went through a Vercel preview link, so design review happened on the real thing.',
      },
    ],
    outcome: [
      {
        title: 'A deployed team project',
        body: 'A working Next.js planner with a live preview (wdd430-portfolio-brown.vercel.app) and the team conventions written into AGENTS.md and CLAUDE.md for consistency.',
      },
    ],
    learned:
      'Team codebases reward reading over rewriting. The fastest way in was to understand the scaffold and extend it, not replace it.',
  code: {
    file: "components/MeetingCard.tsx",
    lines: [
      "export function MeetingCard({ meeting }: { meeting: Meeting }) {",
      "  return (",
      "    <article className=\"card\">",
      "      <time dateTime={meeting.date}>{formatDate(meeting.date)}</time>",
      "      <h3>{meeting.topic}</h3>",
      "      <p>{meeting.speaker}</p>",
      "    </article>",
      "  )",
      "}",
    ],
  },
  },
];

export const experience: { year: string; role: string; org: string; detail: string; now?: boolean }[] = [
  {
    year: 'Now',
    role: 'Open to internships and volunteering',
    org: 'Junior teams and non-profits',
    detail:
      "Available for a software internship, a junior role or volunteer work on a team's site or internal tool. I take a scoped feature, ask questions early and bring it back working, with the trade-offs written down.",
    now: true,
  },
  {
    year: '2025 to now',
    role: 'Full-stack student engineer',
    org: 'BYU-Pathway Worldwide',
    detail:
      'Building complete web applications across the stack: React and TypeScript on the front, Node and Express on the back, Next.js for full-stack apps. Team projects with real deployments on Vercel and Render.',
  },
  {
    year: '2025 to now',
    role: 'Front-end developer',
    org: 'Self-directed and open source',
    detail:
      'Shipping interactive projects with vanilla JavaScript, Vite and third-party APIs: a game catalogue on RAWG, a ward meeting planner on Next.js, and coursework APIs, all public on GitHub.',
  },
  {
    year: '2024',
    role: 'Learning the fundamentals',
    org: 'Python, C# and the web platform',
    detail:
      'Built foundations across languages: object-oriented design in C#, scripting in Python, and semantic, accessible HTML and CSS on every project since.',
  },
];

export const skills: { group: string; index: string; items: { name: string; note: string }[] }[] = [
  {
    group: 'Front end',
    index: '01',
    items: [
      { name: 'React', note: 'Day to day' },
      { name: 'TypeScript', note: 'Day to day' },
      { name: 'Next.js', note: 'Server components' },
      { name: 'Vite', note: 'Default build tool' },
      { name: 'Tailwind CSS', note: '4, token-based' },
      { name: 'HTML and CSS', note: 'Semantic first' },
    ],
  },
  {
    group: 'Back end',
    index: '02',
    items: [
      { name: 'Node.js', note: 'Server and tooling' },
      { name: 'Express', note: 'REST APIs' },
      { name: 'MongoDB', note: 'Documents' },
      { name: 'PostgreSQL', note: 'Relational' },
      { name: 'REST design', note: 'Contracts and docs' },
      { name: 'Sessions and auth', note: 'OAuth basics' },
    ],
  },
  {
    group: 'Languages',
    index: '03',
    items: [
      { name: 'JavaScript', note: 'ES modules' },
      { name: 'TypeScript', note: 'Strict mode' },
      { name: 'Python', note: 'Scripting' },
      { name: 'C#', note: 'OOP, .NET' },
      { name: 'SQL', note: 'Queries' },
    ],
  },
  {
    group: 'Tooling and ops',
    index: '04',
    items: [
      { name: 'Git and GitHub', note: 'Daily' },
      { name: 'Vercel', note: 'Next.js deploys' },
      { name: 'Render', note: 'Node services' },
      { name: 'GitHub Pages', note: 'Static sites' },
      { name: 'Vite build', note: 'Bundling' },
      { name: 'ESLint, Prettier', note: 'Consistency' },
    ],
  },
];

export const heroTicker = [
  'Shipping end to end',
  'React + TypeScript',
  'Node + Express',
  'Next.js App Router',
  'Kampala, Uganda',
];

export const process = [
  {
    no: '01',
    title: 'Frame the problem',
    body: 'Read the brief twice. Write down who uses the thing, what breaks in the first week, and what success looks like before choosing a stack.',
    tag: 'Discovery',
  },
  {
    no: '02',
    title: 'Sketch the surface',
    body: 'Wireframes and type tests in the browser. Cut anything that does not help the main task, then design the states: empty, loading, error, done.',
    tag: 'Design',
  },
  {
    no: '03',
    title: 'Build end to end',
    body: 'Data model first, then the API, then the interface that talks to it. Ship the thinnest working version early and grow it.',
    tag: 'Build',
  },
  {
    no: '04',
    title: 'Print it, then ship',
    body: 'Check it at 360px wide, on a slow connection and in print. Deploy, then write down what I would do differently.',
    tag: 'Review',
  },
];

export type Note = {
  slug: string;
  title: string;
  date: string;
  read: string;
  tag: string;
  dek: string;
  body: string[];
};

export const notes: Note[] = [
  {
    slug: 'loading-states-are-the-design',
    title: 'Loading states are the design',
    date: '2026-10-02',
    read: '3 min',
    tag: 'Interface',
    dek: 'Most of what users see on a slow API is not your layout, it is your waiting room.',
    body: [
      'When I built Kali Game Store, almost every screen was waiting on RAWG. For the first version the loading experience was an empty page and a spinner, and it felt broken even when the API responded in under a second.',
      'The fix was not faster requests. It was sketching the loading screen as carefully as the finished one: skeleton cards in the same grid, shimmer limited to two tones, and an empty state that explains what to do when a search finds nothing.',
      'Now I design four states for every screen before I write a line of markup: empty, loading, error and done. The error state gets real copy, not a console warning, and the empty state gets the one action worth taking next.',
    ],
  },
  {
    slug: 'plain-javascript-still-scales',
    title: 'Plain JavaScript still scales',
    date: '2026-09-11',
    read: '4 min',
    tag: 'Architecture',
    dek: 'A storefront of five views, one build step and no framework. What held it together.',
    body: [
      'Kali Game Store has a catalogue, search, an upcoming-release timeline, a wishlist, a comparison view and a game detail page. All of it runs on vanilla JavaScript with Vite, and it stays readable because of one rule: one view, one module.',
      'Each module imports what it needs, exports a mount function, and never reaches into another view. Shared concerns (API calls, formatting, storage) live in small helpers that do one thing.',
      'Frameworks earn their place when state is shared and complex. For a catalogue that fetches and renders, plain JavaScript with clear boundaries was faster to ship and easier to explain. The wishlist in localStorage is the only shared state, and it fits in one file.',
    ],
  },
  {
    slug: 'server-components-saved-my-ward-app',
    title: 'What server components actually saved me',
    date: '2026-06-14',
    read: '5 min',
    tag: 'Next.js',
    dek: 'Meetings and speakers render on the server, and the page got smaller as a result.',
    body: [
      'The sacrament meeting planner mostly reads data: lists of meetings, a current week, speaker indexes. With React client components that would have meant fetch-on-mount, loading spinners and a bigger bundle shipped to phones in a chapel with patchy signal.',
      'Moving those pages into Next.js server components removed the fetch-and-spin pattern entirely. Data is read on the server, HTML arrives ready, and only the small interactive parts (sign-in, forms) ship JavaScript.',
      'The mental shift: default to the server, opt into the client. Once I stopped reaching for use client by reflex, the bundle got noticeably lighter and the pages felt instant on a phone.',
    ],
  },
  {
    slug: 'designing-for-print',
    title: 'Designing for print made my UI better',
    date: '2026-05-03',
    read: '3 min',
    tag: 'Design',
    dek: 'Ctrl+P is a ruthless design review. It deletes everything that is not the point.',
    body: [
      'The meeting planner needed a printable programme. I expected that to be an extra task at the end. Instead it turned into the best review of the on-screen layout.',
      'Tailwind print variants hide navigation, buttons and decoration. Whatever remains is the programme, and if it does not fit on one page, the hierarchy is wrong. That constraint made me drop a sidebar, merge two blocks and increase the type of the one thing that mattered.',
      'Now I keep a print pass in the checklist for any page where someone might want a copy. It is the fastest way to find out what the page is actually for.',
    ],
  },
  {
    slug: 'kampala-and-the-latency-budget',
    title: 'Building with a latency budget from Kampala',
    date: '2026-03-22',
    read: '4 min',
    tag: 'Performance',
    dek: 'Shipping from Uganda means every kilobyte and every round trip is felt, not theoretical.',
    body: [
      'Much of my web is on a connection where a 3 MB hero image takes a noticeable pause. That makes performance concrete: the portrait on this site is compressed to under 20 kB, code samples wait until they are near the viewport, and fonts load with display swap.',
      'The budget I aim for on a cold visit: under a second to first text, no layout shift, and nothing heavy before the page is readable. Anything optional is lazy, skipped when the device asks for reduced motion, and never blocks the first screen.',
      'Fast on a good connection is not the test. Fast on the connection most of the world actually has is.',
    ],
  },
];
