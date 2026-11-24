import type { FaqItem } from '../types/synthesis';

export const ASSETS = {
  heroWorkspace: '/src/assets/images/hero_synthesis_workspace_1795521460128.jpg',
  platformCollaboration: '/src/assets/images/platform_collaboration_1795521461969.jpg',
  aboutStudio: '/src/assets/images/about_studio_architecture_1795521463425.jpg',
} as const;

export interface ProofMetric {
  value: string;
  label: string;
  context: string;
}

export const HOME_PROOF_METRICS: ProofMetric[] = [
  {
    value: '6.4 hrs',
    label: 'Weekly reporting reclaimed per lead',
    context: 'Measured across 40+ B2B product teams',
  },
  {
    value: '38%',
    label: 'Faster cross-team blocker resolution',
    context: 'Median cycle reduction after 90 days',
  },
  {
    value: '99.95%',
    label: 'Connector sync reliability',
    context: 'Continuous webhook & warehouse ingestion',
  },
  {
    value: '14 days',
    label: 'Typical enterprise deployment window',
    context: 'Zero schema rewrites or manual CSV imports',
  },
];

export interface CapabilityBentoItem {
  index: string;
  title: string;
  summary: string;
  detail: string;
  spanTwo?: boolean;
}

export const HOME_CAPABILITIES: CapabilityBentoItem[] = [
  {
    index: '01',
    title: 'Cross-System Data Unification',
    summary:
      'Connect issue trackers, code repositories, incident logs, and warehouse metrics into one canonical operational model.',
    detail:
      'Synthesis normalizes Jira, Linear, GitHub, PagerDuty, and Snowflake records continuously so engineering and product teams never reconcile conflicting spreadsheets before a weekly review.',
    spanTwo: true,
  },
  {
    index: '02',
    title: 'Automated Stakeholder Briefs',
    summary:
      'Publish factual weekly delivery summaries backed directly by live commit, sprint, and release evidence.',
    detail:
      'Replace Friday slide-deck assembly with structured operational briefs that highlight slipped dependencies and completed milestones automatically.',
  },
  {
    index: '03',
    title: 'Dependency & Drift Detection',
    summary:
      'Surface blocked handoffs and schedule drift across squads days before a release milestone slips.',
    detail:
      'Trace upstream API changes, pending security reviews, and open pull requests across every dependent initiative in real time.',
  },
  {
    index: '04',
    title: 'Scoped Governance & Audit Trails',
    summary:
      'Enforce role-based visibility across executive, engineering, and customer-facing teams without duplicating tools.',
    detail:
      'Every automated summary and metric calculation links back to its source ticket, timestamp, and owner for complete auditability.',
    spanTwo: true,
  },
];

export interface WorkflowRoleView {
  id: 'product' | 'engineering' | 'executive';
  label: string;
  headline: string;
  description: string;
  timeframe: string;
  kpis: { label: string; value: string; delta: string }[];
  signals: {
    area: string;
    owner: string;
    state: string;
    note: string;
  }[];
}

export const WORKFLOW_ROLE_VIEWS: WorkflowRoleView[] = [
  {
    id: 'product',
    label: 'Product Leadership',
    headline: 'Quarter-level roadmap certainty without status chasing',
    description:
      'Track initiative progress against committed customer delivery dates with live engineering signals linked to each milestone.',
    timeframe: 'Q4 Release Cycle · Week 7 of 12',
    kpis: [
      { label: 'Committed Milestones On Track', value: '14 / 16', delta: '+2 vs last week' },
      { label: 'Blocked Cross-Squad Handoffs', value: '2', delta: 'Down from 5' },
      { label: 'Customer-Requested Scope Shipped', value: '84%', delta: 'Target 80%' },
    ],
    signals: [
      {
        area: 'Self-Serve Billing Portal',
        owner: 'Core Commerce Squad',
        state: 'On Schedule',
        note: 'Stripe webhook migration verified in staging; documentation review finishes Thursday.',
      },
      {
        area: 'EU Data Residency Controls',
        owner: 'Platform Security',
        state: 'Attention Needed',
        note: 'Waiting on regional KMS key rotation approval from Compliance before final cutover.',
      },
      {
        area: 'Audit Log CSV Export',
        owner: 'Enterprise Readiness',
        state: 'Shipped',
        note: 'Released to 100% of Growth and Enterprise workspaces with automated retention checks.',
      },
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering Ops',
    headline: 'Identify review bottlenecks and incident drag early',
    description:
      'Monitor pull request cycle times, deployment frequency, and unplanned maintenance load across every service boundary.',
    timeframe: 'Rolling 14-Day Window · 18 Active Repositories',
    kpis: [
      { label: 'Median PR Review Turnaround', value: '3.4 hrs', delta: '-1.1 hrs improvement' },
      { label: 'Production Deployments', value: '47', delta: '98.9% clean rollouts' },
      { label: 'Unplanned Maintenance Share', value: '14%', delta: 'Within 20% budget' },
    ],
    signals: [
      {
        area: 'Ingestion Pipeline Worker',
        owner: 'Data Infrastructure',
        state: 'Healthy',
        note: 'p99 queue latency steady at 180ms following batch checkpoint refactor.',
      },
      {
        area: 'Identity SAML Middleware',
        owner: 'Access Engineering',
        state: 'Review Bottleneck',
        note: '3 security-sensitive pull requests awaiting secondary maintainer sign-off > 24h.',
      },
      {
        area: 'Warehouse Connector Sync',
        owner: 'Integrations Squad',
        state: 'Healthy',
        note: 'Incremental Snowflake delta sync reduced compute credits by 31% this sprint.',
      },
    ],
  },
  {
    id: 'executive',
    label: 'Executive Briefing',
    headline: 'Board-ready operational clarity updated every morning',
    description:
      'Connect R&D capacity allocation directly to enterprise commitments, SLA adherence, and strategic initiatives.',
    timeframe: 'Executive Digest · Updated Today 08:00 UTC',
    kpis: [
      { label: 'Strategic Roadmap Allocation', value: '71%', delta: '+6% QoQ' },
      { label: 'Enterprise SLA Adherence', value: '99.97%', delta: 'Zero Sev-1 breaches' },
      { label: 'Net Onboarding Time-to-Value', value: '11 days', delta: '-4 days vs Q3' },
    ],
    signals: [
      {
        area: 'EMEA Enterprise Rollout',
        owner: 'Solutions & Platform',
        state: 'On Schedule',
        note: '4 of 5 regional anchor accounts live on dedicated single-tenant clusters.',
      },
      {
        area: 'Q1 Capacity Planning Model',
        owner: 'VP Engineering & Finance',
        state: 'Ready for Review',
        note: 'Headcount allocation scenarios reconciled with actual sprint velocity across 9 squads.',
      },
      {
        area: 'SOC 2 Type II Renewal',
        owner: 'Security Governance',
        state: 'Verified',
        note: 'All 64 automated control evidence checks passing with continuous audit trail.',
      },
    ],
  },
];

export interface CaseOutcome {
  organization: string;
  industry: string;
  headlineMetric: string;
  before: string;
  outcome: string;
  quote: string;
  person: string;
  role: string;
}

export const CUSTOMER_OUTCOMES: CaseOutcome[] = [
  {
    organization: 'Northstar Freight Systems',
    industry: 'Supply Chain Software · 240 Employees',
    headlineMetric: '6.5 Hours Saved Weekly Per Engineering Manager',
    before:
      'Eight product and platform squads maintained separate Jira boards and manually compiled Friday Google Slides for leadership.',
    outcome:
      'Synthesis automated cross-squad dependency tracking and executive briefs within two weeks, cutting weekly status meetings by half.',
    quote:
      'We stopped spending Monday mornings reconciling three different spreadsheets just to know whether our Q4 shipper portal would launch on time.',
    person: 'Claire Bennett',
    role: 'VP of Product, Northstar Freight Systems',
  },
  {
    organization: 'Meridian Financial Cloud',
    industry: 'B2B Treasury Platform · 480 Employees',
    headlineMetric: '41% Faster Blocker Resolution Across 12 Squads',
    before:
      'Critical API dependencies between core ledger and compliance teams frequently surfaced days after sprint commitments.',
    outcome:
      'Real-time cross-repository drift alerts flagged stalled handoffs early, preserving 96% on-time delivery for enterprise client rollouts.',
    quote:
      'Synthesis gives engineering leads and executive sponsors the exact same ground truth without forcing developers into new reporting habits.',
    person: 'David Takahashi',
    role: 'Head of Engineering Operations, Meridian Financial Cloud',
  },
];

export interface PlatformPillar {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  technicalSpec: string;
}

export const PLATFORM_PILLARS: PlatformPillar[] = [
  {
    id: 'unification',
    index: '01',
    title: 'Canonical Operational Graph',
    subtitle: 'Normalize every ticket, commit, incident, and metric into one schema.',
    description:
      'Instead of building brittle one-off dashboards per tool, Synthesis maps relationships between strategic initiatives, engineering epics, pull requests, and production incidents automatically.',
    capabilities: [
      'Bi-directional metadata sync with Linear, Jira, GitHub, and GitLab',
      'Warehouse metric ingestion from Snowflake, BigQuery, and PostgreSQL',
      'Automatic entity linking between customer accounts and engineering epics',
    ],
    technicalSpec: 'Incremental event ingestion · < 90s sync latency · Zero schema lock-in',
  },
  {
    id: 'briefs',
    index: '02',
    title: 'Automated Executive Briefings',
    subtitle: 'Consistent written reporting generated from verified activity.',
    description:
      'Generate structured weekly and monthly operational digests tailored to each audience—complete with source citations back to the underlying tickets and releases.',
    capabilities: [
      'Audience-specific templates for Product, Engineering, and Board reviews',
      'Diff-based highlights showing what changed since the previous cycle',
      'Direct delivery to Slack channels, email digests, or Notion workspaces',
    ],
    technicalSpec: 'Citation-backed summaries · Scheduled cadence · Versioned history',
  },
  {
    id: 'dependencies',
    index: '03',
    title: 'Dependency & Risk Radar',
    subtitle: 'Detect schedule drift before commitments are missed.',
    description:
      'Synthesis monitors review queues, blocked handoffs, and scope creep across squads, alerting owners when upstream delays threaten downstream launch milestones.',
    capabilities: [
      'Cross-squad critical path visualization across shared services',
      'Configurable drift thresholds for PR review wait time and scope expansion',
      'Automated blocker escalation routes mapped to squad leads',
    ],
    technicalSpec: 'Real-time graph evaluation · Custom SLA rules · Slack & PagerDuty hooks',
  },
  {
    id: 'governance',
    index: '04',
    title: 'Enterprise Governance & Access Control',
    subtitle: 'Strict permission boundaries with complete auditability.',
    description:
      'Control precisely which teams see sensitive financial metrics, incident postmortems, or customer-specific commitments while maintaining unified executive visibility.',
    capabilities: [
      'SAML 2.0 SSO, SCIM provisioning, and granular workspace RBAC',
      'Immutable audit logs exportable to SIEM providers',
      'SOC 2 Type II certified infrastructure with EU or US data residency',
    ],
    technicalSpec: 'AES-256 encryption at rest · TLS 1.3 in transit · Dedicated VPC option',
  },
];

export const INTEGRATIONS_LIST = [
  { name: 'Linear', category: 'Issue Tracking', syncType: 'Real-time Webhooks' },
  { name: 'Jira Software', category: 'Issue Tracking', syncType: 'Two-Way REST & Webhooks' },
  { name: 'GitHub', category: 'Code & CI/CD', syncType: 'PRs, Reviews & Releases' },
  { name: 'GitLab', category: 'Code & CI/CD', syncType: 'Merge Requests & Pipelines' },
  { name: 'Snowflake', category: 'Data Warehouse', syncType: 'Incremental SQL Sync' },
  { name: 'BigQuery', category: 'Data Warehouse', syncType: 'Scheduled & Event Views' },
  { name: 'PagerDuty', category: 'Incident Response', syncType: 'SLA & Escalation Metrics' },
  { name: 'Slack', category: 'Communications', syncType: 'Digest & Alert Delivery' },
  { name: 'Okta & Entra ID', category: 'Identity', syncType: 'SAML 2.0 & SCIM' },
];

export interface SolutionTrack {
  id: 'product' | 'engineering' | 'revops';
  roleTitle: string;
  audience: string;
  headline: string;
  painPoint: string;
  synthesisApproach: string;
  deliverables: string[];
  benchmark: string;
}

export const SOLUTIONS_TRACKS: SolutionTrack[] = [
  {
    id: 'product',
    roleTitle: 'Product Leadership',
    audience: 'VPs of Product, Group PMs, Product Operations',
    headline: 'Keep roadmaps aligned with live engineering reality',
    painPoint:
      'Roadmaps live in slide decks while execution happens in issue trackers and repositories—leaving product leaders blind to silent scope drift until release week.',
    synthesisApproach:
      'Synthesis ties every roadmap initiative directly to underlying epics, PR velocity, and customer commitments, updating confidence states automatically.',
    deliverables: [
      'Live roadmap confidence tracking backed by sprint throughput',
      'Customer-commitment heatmaps linking enterprise accounts to deliverables',
      'Zero-prep weekly stakeholder digests',
    ],
    benchmark: '72% reduction in manual status-gathering meetings',
  },
  {
    id: 'engineering',
    roleTitle: 'Engineering Operations',
    audience: 'CTOs, VPs of Engineering, Staff & Platform Leads',
    headline: 'Protect developer focus while giving leadership clear visibility',
    painPoint:
      'Engineers lose hours writing repetitive status updates, while leadership lacks clear visibility into where review queues or technical debt slow delivery.',
    synthesisApproach:
      'Synthesis reads existing GitHub, Linear, and PagerDuty activity passively—surfacing review bottlenecks and maintenance ratios without interrupting developers.',
    deliverables: [
      'Cycle time and review-queue bottleneck diagnostics',
      'Feature vs. maintenance vs. reliability capacity breakdown',
      'Automated cross-squad dependency risk alerts',
    ],
    benchmark: '38% faster resolution on cross-team technical blockers',
  },
  {
    id: 'revops',
    roleTitle: 'Revenue & Customer Operations',
    audience: 'CROs, Solutions Leaders, Enterprise Customer Success',
    headline: 'Give customer teams reliable delivery dates they can stand behind',
    painPoint:
      'Account teams promise product capabilities without knowing whether upstream engineering work is blocked, creating avoidable renewal friction.',
    synthesisApproach:
      'Synthesis exposes scoped, customer-safe release timelines and instant blocker alerts to customer success and solutions leads.',
    deliverables: [
      'Scoped customer commitment tracker without exposing internal code',
      'Automated readiness alerts when enterprise features reach staging',
      'Historical delivery accuracy reporting for QBRs',
    ],
    benchmark: '96% adherence on committed enterprise launch windows',
  },
];

export const ABOUT_PRINCIPLES = [
  {
    index: '01',
    title: 'Evidence Over Activity Theater',
    description:
      'Operational tools should never reward busyness or vanity metrics. Synthesis surfaces concrete delivery signals tied directly to verifiable source records.',
  },
  {
    index: '02',
    title: 'Zero Extra Reporting Burden',
    description:
      'Teams already document their work in code, tickets, and incidents. Our architecture synthesizes existing workflows instead of adding another form for engineers to fill out.',
  },
  {
    index: '03',
    title: 'Built for Long-Term Institutional Trust',
    description:
      'From strict SOC 2 Type II controls to transparent pricing and exportable data schemas, every technical choice prioritizes reliability and customer ownership.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Platform',
    question: 'How does Synthesis differ from standard BI dashboards or Jira reports?',
    answer:
      'Traditional BI tools require dedicated SQL maintenance and lack context around software delivery workflows, while issue trackers only show one team’s slice. Synthesis builds a canonical operational graph connecting issues, code reviews, incidents, and warehouse metrics—automatically generating cross-functional briefings and dependency alerts.',
  },
  {
    id: 'faq-2',
    category: 'Platform',
    question: 'Do engineers need to change how they work in Linear, Jira, or GitHub?',
    answer:
      'No. Synthesis operates passively via read-only and scoped webhook integrations. Your product and engineering teams keep their existing tools and workflows without extra status fields or manual check-ins.',
  },
  {
    id: 'faq-3',
    category: 'Onboarding',
    question: 'How long does a typical deployment take from kickoff to live workspaces?',
    answer:
      'Most Growth teams connect their primary issue tracker, code host, and Slack workspace in under 45 minutes. Full multi-squad rollout including warehouse connectors and custom executive digests typically completes within 14 days with a dedicated onboarding engineer.',
  },
  {
    id: 'faq-4',
    category: 'Security',
    question: 'What security certifications and data residency options are available?',
    answer:
      'Synthesis is SOC 2 Type II certified and GDPR compliant. All customer data is encrypted in transit (TLS 1.3) and at rest (AES-256). Enterprise customers may select US or EU regional data residency, SAML 2.0 SSO, SCIM provisioning, and single-tenant VPC isolation.',
  },
  {
    id: 'faq-5',
    category: 'Security',
    question: 'Does Synthesis train external AI models on our proprietary code or tickets?',
    answer:
      'Never. Your operational records, source metadata, and stakeholder briefs remain strictly isolated to your workspace and are never used to train shared or third-party models.',
  },
  {
    id: 'faq-6',
    category: 'Billing',
    question: 'Who counts as a paid seat in Synthesis?',
    answer:
      'Paid seats apply to active workspace builders, squad leads, and executives who configure views or receive tailored interactive workspaces. Read-only automated Slack and email digest recipients do not require paid seats.',
  },
  {
    id: 'faq-7',
    category: 'Billing',
    question: 'Can we start on a monthly plan and switch to annual billing later?',
    answer:
      'Yes. You can upgrade from monthly to annual billing at any point to apply the 20% annual discount, or adjust seat counts as your organization grows.',
  },
];
