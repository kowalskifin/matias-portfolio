export type CaseScreenshot = {
  path: string;
  filename: string;
  label: string;
};

export type CaseEntry = {
  id: string;
  filename: string;
  title: string;
  description: string;
  meta: string;
  available: boolean;
  isPersonal?: boolean;
  screenshots?: CaseScreenshot[];
  content: string | null;
};

export const casesData: CaseEntry[] = [
  {
    id: "case-alicent",
    filename: "case_01_zero_to_one.txt",
    title: "case_01_zero_to_one.txt",
    description:
      "Building a procurement intelligence tool from nothing. 0→1, 30 customers, funding round didn't close.",
    meta: "Alicent · 2024–2025 · Founding PM",
    available: true,
    content: `// case_01_zero_to_one.txt
// Alicent · Jan 2024 – Feb 2025

CONTEXT

Alicent was an early-stage AI startup building a procurement
intelligence tool for Finnish companies competing for public
contracts. I joined as a founding team member. No product,
no customers, no playbook.

WHAT WAS NEEDED

Companies bidding for public contracts spent hours manually
searching procurement databases and guessing which opportunities
matched their capabilities. The signal was buried in noise.

WHAT I DID

Ran 30–40 customer interviews to define the problem and shape
the product direction.

Designed the product with our frontend developer — a tool that
crawls public procurement databases, cross-references company
capabilities, and surfaces best-fit opportunities automatically.

Once we had something to show, I helped sell it. Cold outreach
via LinkedIn and Apollo. Sales calls. Onboarding. Of the first
30 customers, I personally brought in around 10.

WHAT CHANGED

We went from no product to a live tool with 30 paying clients.
Companies stopped guessing and started spending time on bids
that actually fit.

The funding round didn't close — the team was early and investors
didn't back us at that stage. But the product was real enough
that the company restructured and kept going. It's still live today.

WHAT I LEARNED

The product isn't always the variable when a round doesn't close.
I came out knowing how to run discovery from scratch, sell before
it's finished, and own something end to end — including when it
doesn't go to plan.

// EOF`,
  },
  {
    id: "case-aibidia",
    filename: "case_02_series_a_growth.txt",
    title: "case_02_series_a_growth.txt",
    description: "Taking a broken product to a closed loop and 300% usage growth.",
    meta: "Aibidia · 2025–present · Coming soon",
    available: false,
    content: null,
  },
  {
    id: "case-nordea",
    filename: "case_03_bnpl_launch.txt",
    title: "case_03_bnpl_launch.txt",
    description: "Launching BNPL from scratch across Nordic markets.",
    meta: "Nordea · 2022–2024 · Coming soon",
    available: false,
    content: null,
  },
  {
    id: "case-noted",
    filename: "noted_case_study.txt",
    title: "noted_case_study.txt",
    description: "Building a focus tool for brains that think too much.",
    meta: "Personal project · 2025–present · Live",
    available: true,
    isPersonal: true,
    screenshots: [
      {
        path: "/case-images/noted/noted_landing.png",
        filename: "noted_landing.png",
        label: "Landing page",
      },
      {
        path: "/case-images/noted/noted_morning.png",
        filename: "noted_morning.png",
        label: "Morning view",
      },
      {
        path: "/case-images/noted/noted_today.png",
        filename: "noted_today.png",
        label: "Today view",
      },
      {
        path: "/case-images/noted/noted_chaos.png",
        filename: "noted_chaos.png",
        label: "Chaos view",
      },
    ],
    content: `// noted_case_study.txt
// Personal project · 2025–present · noted-smoky.vercel.app

CONTEXT

I built Noted because I couldn't find a focus tool that actually
understood the problem. Notion, Todoist, every productivity app
gives you infinite space to add things. That's the opposite of
what helps when your brain is scattered. More structure doesn't
fix distraction. Less input does.

WHAT WAS NEEDED

You can only genuinely focus on a few things at once. Every focus
tool I tried ignored this. They let you add unlimited tasks,
unlimited notes, unlimited projects. You end up with a perfectly
organised list of 47 things you're not doing.

I wanted something that forced the constraint rather than worked
around it.

WHAT I BUILT

Three views, each solving a different moment in the day.

Morning: you start here. The app asks what actually matters today.
Not what's on your list. What actually matters. You pick from your
backlog, get a small dopamine hit from committing to it, and start
with intention rather than opening Slack.

[📎 noted_morning.png — Morning view]

Today: only shows the things you picked. Nothing else. Your mind
isn't scattered because there's nothing to scatter across. You work
the list, you close it, you're done.

[📎 noted_today.png — Today view]

Chaos: this was the hardest design problem. In every other app
stray thoughts go into your notes and contaminate your focus list.
In Noted, Chaos is separate. You dump the thought, a worry, an
idea, something you need to remember, and it sits there
acknowledged but out of the way. It doesn't become a task unless
you decide it does. You wrote it down. Your brain can let go of it.

[📎 noted_chaos.png — Chaos view]

Built solo with Next.js and Supabase. Live at
noted-smoky.vercel.app. Around 10 users in soft launch right now.

WHAT CHANGED

Using it myself works well. The moment I started onboarding other
people I learned something important: what's obvious to the builder
is invisible to everyone else. Words I'd chosen carefully confused
first-time users because they didn't have the context I had when I
designed it. Small copy changes had more impact than any feature
I added.

Adding complexity also breaks things in unexpected ways. When Chaos
needed to talk to Today and Today needed to talk to Morning,
features that worked perfectly alone started failing. Data
relationships are harder than UI.

WHAT I LEARNED

Building your own product forces a different kind of rigor than
being a PM at a company. At a company you can say build this and
leave the why implicit. When you're the designer, PM, and only
user the why has to be explicit, otherwise you build the wrong
thing and there's nobody to catch it.

The other thing was the gap between builder knowledge and user
knowledge. I knew exactly what every interaction meant because I
designed it. They didn't. You can read about that gap. You only
really feel it when someone stares at your product confused and
you realise the thing that feels obvious to you has never been
explained to anyone.

// EOF`,
  },
  {
    id: "release-notes-pipeline",
    filename: "release_notes_pipeline.txt",
    title: "release_notes_pipeline.txt",
    description: "Automating release communication across product and engineering.",
    meta: "Personal · Coming soon",
    available: false,
    isPersonal: true,
    content: null,
  },
];
