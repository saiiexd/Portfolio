// =============================================================================
// CONSTANTS — Site configuration, navigation items, social links
// =============================================================================
import type { NavItem, SiteConfig, TechFocusArea } from '@/types'

export const SITE_CONFIG: SiteConfig = {
  name: 'Sai Venkat',
  title: 'Sai Venkat — AI/ML & Data Platform Engineer',
  description:
    'B.Tech CSE student specialising in AI and Data Engineering at Lovely Professional University. I design, build, and benchmark LLM evaluation harnesses, distributed task queues, and streaming data infrastructure.',
  url: 'https://saivenkat.dev',
  author: 'Sai Venkat',
  email: 'saivenkat262005@gmail.com',
  github: 'https://github.com/saiiexd',
  linkedin: 'https://www.linkedin.com/in/sai-venkat-a14436284',
  twitter: undefined,
  ogImage: '/images/og-image.jpg',
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Work', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const TECH_FOCUS_AREAS: TechFocusArea[] = [
  {
    id: 'llm-evaluation',
    label: 'LLM Evaluation & Reliability',
    description:
      'Deterministic evaluation harnesses measuring exact match, normalized semantic similarity, and model-based arbitration across deterministic datasets.',
    tools: ['Python 3.13', 'Pytest', 'BERTScore', 'LLM Judge', 'JSON Schema'],
  },
  {
    id: 'distributed-systems',
    label: 'Distributed Systems & Backend',
    description:
      'Fault-tolerant asynchronous execution systems, Redis Streams message brokers, concurrent Go worker pools, topological DAG schedulers, and dead-letter queues.',
    tools: ['Go 1.22', 'Redis Streams', 'FastAPI', 'PostgreSQL 16', 'Docker'],
  },
  {
    id: 'ml-data-engineering',
    label: 'ML Pipelines & Streaming',
    description:
      'Real-time event streaming pipelines with Kafka ingestion, PySpark Structured Streaming window aggregations, Scikit-learn inference, and Prophet demand forecasts.',
    tools: ['Apache Kafka', 'PySpark', 'Scikit-learn', 'Prophet', 'PostgreSQL'],
  },
  {
    id: 'applied-ai',
    label: 'Applied AI & Multi-Agent Systems',
    description:
      'Multi-agent collaborative state graph debate platforms, pgvector HNSW similarity search, air-gapped OpenCV OCR, and first-principles NumPy RAG.',
    tools: ['LangGraph', 'pgvector', 'OpenCV', 'Tesseract 5', 'Cohere API'],
  },
]

// Project filter categories
export const PROJECT_CATEGORIES = [
  { value: 'all', label: 'All Projects' },
  { value: 'llm-genai', label: 'Applied AI & GenAI' },
  { value: 'backend-systems', label: 'Distributed Systems' },
  { value: 'ml-data', label: 'ML & Streaming' },
  { value: 'analytics', label: 'Data & Analytics' },
] as const

// Resume PDF path
export const RESUME_PATH = '/resume.pdf'
