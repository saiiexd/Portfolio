// =============================================================================
// PROJECTS — Curated Catalog of Verified Engineering Repositories
// All repositories are verified against https://github.com/saiiexd
// =============================================================================
import type { ProjectData } from '@/types'

export const PROJECTS: ProjectData[] = [
  {
    slug: 'llm-eval-platform',
    title: 'LLM Reliability & Evaluation Platform',
    shortDescription:
      'Research and testing platform systematically evaluating, comparing, and diagnosing LLM application reliability, hallucination rates, and semantic consistency.',
    category: 'llm-genai',
    year: '2024',
    status: 'complete',
    techStack: ['Python 3.13', 'Pytest', 'BERTScore', 'Ruff'],
    featured: true,
    pipelineSteps: [
      'Evaluation Benchmark Datasets',
      'LLM Judge & Criteria Runners',
      'Diagnostics & Reliability Metrics',
    ],
    problem:
      'LLM-based applications frequently suffer from silent hallucinations and unmeasured quality regressions. Off-the-shelf single-metric benchmarks fail to isolate whether degradation stems from prompt sensitivity, context drift, or model variance.',
    contribution:
      'Sole architect and author. Implemented the evaluation runner, criteria scoring protocols (including BERTScore and LLM judge backends), failure diagnostics, and experimental harnesses.',
    architectureDescription:
      'Python evaluation framework with pluggable datasets, criteria evaluators (exact match, normalized similarity, BERTScore, and LLM judge), and diagnostic analyzers tracking reliability distributions.',
    keyDecisions: [
      {
        decision:
          'Structured separation of evaluation criteria (exact match, normalized similarity, LLM judge)',
        rationale:
          'Enables modular evaluation of semantic fidelity versus exact text conformance across diverse tasks.',
      },
      {
        decision: 'Deterministic regression and failure diagnostic tooling',
        rationale:
          'Isolates specific failure points in model responses and traces failure patterns across controlled prompt variations.',
      },
    ],
    results:
      'Built a reproducible evaluation suite with standardized test fixtures, automated regression testing, and modular criteria evaluators.',
    limitations:
      'Requires API rate limit management when running multi-model evaluation benchmarks against external model providers.',
    repoUrl: 'https://github.com/saiiexd/llm-reliability-and-evaluation-platform',
    demoUrl: undefined,
    diagramComponent: 'EvalPipelineDiagram',
  },
  {
    slug: 'distributed-task-queue',
    title: 'Distributed Asynchronous Task Queue',
    shortDescription:
      'Asynchronous job execution platform featuring FastAPI job submission, Redis Streams coordination, high-performance Go worker pools, and dead-letter queue recovery.',
    category: 'backend-systems',
    year: '2024',
    status: 'complete',
    techStack: ['FastAPI', 'Redis Streams', 'Go', 'PostgreSQL', 'Docker'],
    featured: true,
    pipelineSteps: [
      'FastAPI Ingestion',
      'Redis Streams',
      'Go Consumer Group',
      'State Machine & DLQ',
    ],
    problem:
      'Heavy AI inference and data transformation tasks block HTTP request-response cycles, causing gateway timeouts, resource contention, and cascading service outages during traffic spikes.',
    contribution:
      'Designed and built the hybrid architecture: a FastAPI Python control plane for REST job dispatch and status tracking, paired with a concurrent Go worker daemon utilizing go-redis/v9 for consumer group processing.',
    architectureDescription:
      'Clients submit job payloads to a FastAPI ingestion gateway which writes directly to Redis Streams. Distributed Go worker processes read from consumer groups via XREADGROUP, manage state transitions through an explicit FSM, and report health via periodic heartbeats.',
    keyDecisions: [
      {
        decision: 'Adopted Redis Streams consumer groups over simple Redis lists',
        rationale:
          'Provides built-in Pending Entries List (PEL) tracking, consumer failover detection, and at-least-once delivery guarantees.',
      },
      {
        decision:
          'Implemented exponential backoff with jitter and automated Dead-Letter Queue (DLQ)',
        rationale:
          'Prevents worker starvation from poison-pill payloads while ensuring failed jobs are preserved for forensic replay.',
      },
    ],
    results:
      'Demonstrated linear horizontal scaling across multiple worker instances with deterministic retry behavior and zero job loss during simulated worker kills.',
    limitations:
      'Requires Redis persistence (AOF/RDB) configuration to survive catastrophic host hardware crashes.',
    repoUrl: 'https://github.com/saiiexd/distributed-task-queue',
    diagramComponent: 'TaskQueueDiagram',
  },
  {
    slug: 'workflow-orchestrator',
    title: 'Distributed Workflow Orchestrator',
    shortDescription:
      'DAG execution platform orchestrating multi-stage business pipelines across worker clusters with topological sorting, checkpointing, and OpenTelemetry instrumentation.',
    category: 'backend-systems',
    year: '2024',
    status: 'complete',
    techStack: [
      'Python 3.12',
      'FastAPI',
      'SQLAlchemy',
      'Redis',
      'aiokafka',
      'OpenTelemetry',
    ],
    featured: true,
    pipelineSteps: [
      'Workflow DAG Definition',
      'Topological Dependency Engine',
      'Async Worker Dispatch',
      'PostgreSQL Checkpoint & Telemetry',
    ],
    problem:
      'Complex multi-stage data pipelines require directed acyclic graph (DAG) execution with upstream dependency resolution, checkpointed state, and idempotent retries across distributed compute nodes.',
    contribution:
      'Engineered the hexagonal architecture (application, domain, infrastructure, interfaces) featuring Kahn topological scheduling, asyncio concurrency, and distributed state persistence.',
    architectureDescription:
      'Workflows are parsed into dependency graphs. Nodes are scheduled topologically as dependencies resolve, with state saved to PostgreSQL and tasks executed asynchronously across containerized worker nodes.',
    keyDecisions: [
      {
        decision: 'Kahn topological sort algorithm for dynamic task scheduling',
        rationale:
          'Guarantees parent stage completion before downstream dependents execute, enabling parallel branch execution.',
      },
      {
        decision: 'Transactional stage checkpointing in PostgreSQL',
        rationale:
          'Allows interrupted workflows to resume from the last successful stage rather than restarting the entire DAG.',
      },
    ],
    results:
      'Successfully executed multi-branch ETL workflows with automatic branch parallelism and transparent stage logging.',
    limitations:
      'Current scheduling runs on a centralized master coordinator; future work includes distributed Raft leader election.',
    repoUrl: 'https://github.com/saiiexd/workflow-orchestrator',
    diagramComponent: 'WorkflowOrchestratorDiagram',
  },
  {
    slug: 'real-time-fraud-detection',
    title: 'Real-Time Streaming Fraud Detection',
    shortDescription:
      'Financial transaction screening pipeline combining Kafka event streaming, streaming feature processing, Scikit-learn inference, and MLflow experiment tracking.',
    category: 'ml-data',
    year: '2024',
    status: 'complete',
    techStack: ['Kafka', 'PySpark', 'FastAPI', 'Scikit-learn', 'PostgreSQL', 'MLflow'],
    featured: true,
    pipelineSteps: [
      'Kafka Event Stream',
      'Streaming Feature Aggregation',
      'Scikit-learn Model Inference',
      'Tri-State Decision Routing',
    ],
    problem:
      'Financial institutions face massive losses from payment fraud. Static rule-based systems generate excessive false positives and fail to detect novel velocity-based anomaly patterns.',
    contribution:
      'Built the end-to-end event consumer, rolling-window velocity feature aggregation, and online model inference service.',
    architectureDescription:
      'Transactions are consumed from a Kafka topic. The inference service retrieves user velocity features from a Redis sliding window, runs model classification, and routes outcomes to Approved, Challenged, or Blocked topics in under 50 milliseconds.',
    keyDecisions: [
      {
        decision: 'Redis sliding-window sorted sets for rolling velocity calculation',
        rationale:
          'Calculates transaction frequency in the past 10 minutes, 1 hour, and 24 hours in O(log N) time.',
      },
      {
        decision: 'Tri-state decision boundary (Approve / Step-up Challenge / Block)',
        rationale:
          'Reduces friction for legitimate edge-case users by triggering MFA rather than outright transaction rejection.',
      },
    ],
    results:
      'Achieved sub-45ms p95 classification latency on simulated streaming transaction loads with high anomaly precision.',
    limitations:
      'Model training was evaluated on historical benchmarks; production deployment requires continuous online feature drift monitoring.',
    repoUrl: 'https://github.com/saiiexd/real-time-fraud-detection',
    diagramComponent: 'FraudDetectionFlow',
  },
  {
    slug: 'business-analytics',
    title: 'Business Analytics & Decision Intelligence',
    shortDescription:
      'End-to-end analytics platform transforming raw transactions into relational tables, analytical SQL views, cohort retention curves, RFM segmentation, and an interactive Streamlit dashboard.',
    category: 'analytics',
    year: '2024',
    status: 'complete',
    techStack: ['Python', 'PostgreSQL', 'SQLAlchemy', 'FastAPI', 'Streamlit', 'Plotly'],
    featured: true,
    pipelineSteps: [
      'Raw Transaction Ingestion',
      'PostgreSQL Relational Storage',
      'Analytical SQL Views (Cohort/RFM)',
      'FastAPI & Streamlit Dashboard',
    ],
    problem:
      'Raw transactional logs lack structured relational modeling, leaving business operators unable to systematically calculate margin health, customer retention decay, and RFM tiers.',
    contribution:
      'Authored the relational schema (schema.sql), analytical views (views.sql for monthly net revenue, product margins, and cohort retention), FastAPI REST endpoints, and Streamlit visualization dashboard.',
    architectureDescription:
      'Transactional CSV data is loaded into PostgreSQL via SQLAlchemy, aggregated into analytical views, exposed through a FastAPI backend, and visualized via Plotly in Streamlit.',
    keyDecisions: [
      {
        decision: 'Pre-computed SQL analytical views for cohort retention and margins',
        rationale:
          'Moves heavy aggregation into PostgreSQL view definitions, ensuring rapid sub-second dashboard rendering.',
      },
      {
        decision:
          'Quintile-based RFM (Recency, Frequency, Monetary) customer segmentation',
        rationale:
          'Provides actionable customer tiers (Champions, Loyalists, At-Risk, Hibernating) directly from SQL aggregates.',
      },
    ],
    results:
      'Demonstrated 6-month cohort retention modeling and dynamic RFM clustering on transactional datasets.',
    limitations:
      'Analytical computations operate on batch schedules; streaming real-time metric aggregation requires OLAP warehousing like ClickHouse.',
    repoUrl: 'https://github.com/saiiexd/business-analytics-decision-intelligence',
    diagramComponent: 'AnalyticsDashboardPreview',
  },
  {
    slug: 'exointel',
    title: 'ExoIntel: Exoplanet Discovery Platform',
    shortDescription:
      'Astrophysical data platform applying machine learning classifiers and SHAP explainability to NASA Kepler transit photometry for exoplanet candidate validation.',
    category: 'ml-data',
    year: '2024',
    status: 'complete',
    techStack: ['Python', 'Scikit-learn', 'SHAP', 'Pandas', 'Streamlit', 'Plotly'],
    featured: true,
    pipelineSteps: [
      'NASA Kepler KOI Data',
      'Feature Engineering & Scaling',
      'Scikit-learn Classifier',
      'SHAP Explainability & Dashboard',
    ],
    problem:
      'Space telescopes like Kepler capture thousands of stellar light curves. Manual visual inspection of periodic brightness dips is impossible at scale, and instrumental noise causes thousands of false-positive detections.',
    contribution:
      'Implemented data preprocessing, Kepler Objects of Interest (KOI) feature extraction, machine learning classification, and SHAP explainability visualizations.',
    architectureDescription:
      'Photometric candidate data is cleaned and scaled. Transit features are classified using Scikit-learn models with SHAP feature contribution analysis rendered in an interactive Streamlit dashboard.',
    keyDecisions: [
      {
        decision: 'SHAP (SHapley Additive exPlanations) integration',
        rationale:
          'Provides astrophysicists with transparent feature importance rankings for each individual planetary candidate prediction.',
      },
      {
        decision:
          'Feature extraction combining transit depth, duration, and planetary radius estimates',
        rationale:
          'Differentiates genuine planetary transits from stellar eclipsing binary signals.',
      },
    ],
    results:
      'Classified verified Kepler planetary candidates with high precision against astronomical threshold benchmarks.',
    limitations:
      'Ultra-shallow transits of Earth-sized planets around bright stars remain sensitive to systematic stellar variability.',
    repoUrl: 'https://github.com/saiiexd/exo-intel',
    diagramComponent: 'ExoIntelArchitecture',
  },
  {
    slug: 'verdict-ai',
    title: 'Verdict AI: Multi-Agent Financial Research',
    shortDescription:
      'Multi-agent research platform where autonomous agents collaborate, debate, and synthesize evidence-backed investment analyses using LangGraph, FastAPI, and Next.js.',
    category: 'llm-genai',
    year: '2024',
    status: 'complete',
    techStack: ['Next.js', 'FastAPI', 'LangGraph', 'TypeScript', 'OpenAI', 'yfinance'],
    featured: false,
    pipelineSteps: [
      'Market Query & Ticker',
      'LangGraph Multi-Agent Research',
      'Bull vs Bear Debate',
      'Synthesis Dossier & Next.js',
    ],
    problem:
      'Single-agent LLM prompts frequently produce biased, one-sided, or hallucinated market summaries. Real analytical rigor requires thesis formulation, adversarial counter-argument, and evidentiary validation.',
    contribution:
      'Engineered the LangGraph multi-agent workflow, FastAPI backend service, market data retrieval integrations (yfinance/Tavily), and the Next.js frontend interface.',
    architectureDescription:
      'A primary research coordinator spawns specialized agent personas that interrogate market filings, construct bull/bear theses, challenge opposing assumptions in iterative rounds, and output a structured consensus dossier.',
    keyDecisions: [
      {
        decision: 'LangGraph stateful agent orchestration',
        rationale:
          'Maintains explicit multi-turn state transitions between researcher, critic, and synthesizer agents.',
      },
    ],
    results:
      'Generated structured, multi-perspective research dossiers with cited evidentiary points.',
    limitations:
      'Context window constraints limit ingestion of multiple 100+ page annual 10-K filings simultaneously.',
    repoUrl: 'https://github.com/saiiexd/verdict-ai',
    diagramComponent: 'VerdictAiDiagram',
  },
  {
    slug: 'ai-workspace',
    title: 'AI Personal Workspace',
    shortDescription:
      'Knowledge management and productivity platform integrating rich-text notes, task management, document intelligence, and semantic search powered by pgvector and OpenAI.',
    category: 'llm-genai',
    year: '2024',
    status: 'complete',
    techStack: ['Next.js 15', 'FastAPI', 'PostgreSQL', 'pgvector', 'Celery', 'OpenAI'],
    featured: false,
    pipelineSteps: [
      'Notes & Documents Ingestion',
      'pgvector Embeddings Storage',
      'Semantic Vector Search',
      'Next.js 15 Workspace',
    ],
    problem:
      'Personal notes and technical documents are scattered across disparate tools without unified semantic search or grounded contextual question answering.',
    contribution:
      'Built the polyglot monorepo: Next.js 15 App Router frontend, FastAPI REST API, PostgreSQL storage with pgvector similarity indexing, and asynchronous Celery/Redis workers.',
    architectureDescription:
      'User notes and documents are ingested via FastAPI, embedded via OpenAI, and indexed in PostgreSQL using pgvector. Background processing runs through Celery, exposed to a modern Next.js 15 interface.',
    keyDecisions: [
      {
        decision:
          'PostgreSQL with pgvector extension for unified relational and vector data',
        rationale:
          'Eliminates the complexity and dual-write inconsistency of running a separate vector database alongside relational metadata.',
      },
    ],
    results:
      'Achieved responsive semantic document retrieval across notes and tasks within a unified web workspace.',
    limitations:
      'Embedding generation requires an active OpenAI API key for indexing new documents.',
    repoUrl: 'https://github.com/saiiexd/ai-workspace',
    diagramComponent: 'AiWorkspaceDiagram',
  },
  {
    slug: 'distributed-event-streaming',
    title: 'Distributed Event Streaming Platform',
    shortDescription:
      'High-throughput financial transaction streaming platform with Apache Kafka (KRaft mode), manual offset commits, Redis distributed locks for idempotency, and dead-letter queues.',
    category: 'backend-systems',
    year: '2024',
    status: 'complete',
    techStack: [
      'Python',
      'FastAPI',
      'Apache Kafka (KRaft)',
      'Redis',
      'PostgreSQL',
      'Prometheus',
    ],
    featured: false,
    pipelineSteps: [
      'FastAPI Event Ingestion',
      'Kafka KRaft Partitioning',
      'Redis Lock Deduplication',
      'PostgreSQL State & DLQ',
    ],
    problem:
      'Financial event streaming microservices require guaranteed at-least-once delivery, distributed deduplication, transaction idempotency, and automated dead-letter queue routing without data loss or duplicate execution.',
    contribution:
      'Engineered the FastAPI producer service, transaction consumer worker group with manual offset commits, Redis distributed locking for deduplication, and dead-letter queue routing to transactions.dlq.',
    architectureDescription:
      'Producers submit transaction events to FastAPI, which publishes partitioned events to Kafka topics in KRaft mode. Asynchronous consumers acquire Redis distributed locks, verify PostgreSQL processing status, persist state, manually commit offsets, and route unrecoverable poison-pill messages to a dead-letter queue topic (transactions.dlq).',
    keyDecisions: [
      {
        decision:
          'At-least-once delivery with manual offset commits (enable_auto_commit=False)',
        rationale:
          'Ensures offsets are committed only after transaction records are safely written to PostgreSQL or forwarded to the DLQ.',
      },
      {
        decision:
          'Two-gate distributed idempotency (Redis lock + PostgreSQL event status)',
        rationale:
          'Prevents duplicate concurrent worker execution using a 30s TTL Redis lock while enforcing relational unique constraints on event logs.',
      },
    ],
    results:
      'Demonstrated reliable streaming event ingestion, idempotent consumer execution, and DLQ poison-pill isolation verified by integration tests and Prometheus telemetry.',
    limitations:
      'Simulated multi-broker cluster requires Docker Compose deployment; production workloads necessitate multi-node cloud Kafka deployments.',
    repoUrl: 'https://github.com/saiiexd/Distributed-Event-Streaming-Platform',
    diagramComponent: 'DistributedStreamingDiagram',
  },
  {
    slug: 'rag-from-scratch',
    title: 'RAG From First Principles',
    shortDescription:
      'Streamlined Retrieval-Augmented Generation application built from first principles with FastAPI, NumPy vector similarity, Cohere embeddings, and PyPDF document processing.',
    category: 'llm-genai',
    year: '2024',
    status: 'complete',
    techStack: ['Python', 'FastAPI', 'NumPy', 'Cohere API', 'PyPDF'],
    featured: false,
    pipelineSteps: [
      'PDF Document Upload',
      'Text Chunking & Cohere Embeddings',
      'NumPy Cosine Similarity',
      'Cohere Command-R+ Generation',
    ],
    problem:
      'Heavy RAG frameworks obscure the fundamental mechanics of document chunking, embedding representations, and vector similarity ranking, making debugging token limits and similarity degradation difficult.',
    contribution:
      'Engineered a transparent, framework-minimal RAG web application using FastAPI, PyPDF text extraction, Cohere embedding and generation APIs, and pure NumPy cosine similarity ranking.',
    architectureDescription:
      'Uploaded PDF documents are parsed via PyPDF, split into overlapping chunks, embedded via Cohere (embed-english-v3.0), ranked using pure NumPy vector cosine similarity, and passed to Cohere Command-R+ for grounded question answering.',
    keyDecisions: [
      {
        decision: 'Pure NumPy cosine similarity matrix operations',
        rationale:
          'Demonstrates the core mathematical operations underpinning vector search without relying on heavy external vector database abstractions.',
      },
    ],
    results:
      'Delivered a lightweight, fully functional RAG web application with transparent retrieval mechanics and grounded responses.',
    limitations:
      'In-memory NumPy matrix search is tailored for single-document analysis rather than enterprise corpora exceeding 100,000 document vectors.',
    repoUrl: 'https://github.com/saiiexd/rag-from-scratch',
    diagramComponent: 'RagFirstPrinciplesDiagram',
  },
  {
    slug: 'offline-ocr',
    title: 'Air-Gapped Offline OCR Engine',
    shortDescription:
      'Air-gapped, privacy-focused optical character recognition tool utilizing OpenCV preprocessing and Tesseract OCR to extract text from images into structured JSON.',
    category: 'ml-data',
    year: '2024',
    status: 'complete',
    techStack: ['Python', 'PyTesseract', 'OpenCV', 'Streamlit', 'NumPy'],
    featured: false,
    pipelineSteps: [
      'Document Image Upload',
      'OpenCV Adaptive Preprocessing',
      'PyTesseract Local OCR',
      'Structured JSON Output',
    ],
    problem:
      'Confidential and regulated documents cannot be transmitted to external cloud OCR APIs due to compliance restrictions and privacy concerns.',
    contribution:
      'Built the image preprocessing pipeline (grayscale conversion, adaptive thresholding, and noise reduction using OpenCV) and the Streamlit interface for structured text extraction.',
    architectureDescription:
      'Images are uploaded locally, processed through OpenCV adaptive thresholding algorithms, analyzed by the local Tesseract OCR engine, and parsed into structured JSON format.',
    keyDecisions: [
      {
        decision: 'Adaptive thresholding and OpenCV noise filtering',
        rationale:
          'Enhances text contrast and cleans image artifacts prior to OCR recognition for higher character accuracy.',
      },
    ],
    results:
      'Reliable local text extraction on documents running 100% offline with zero external network connectivity.',
    limitations:
      'Optimized for printed text and standard document scans; complex handwritten text requires specialized handwriting recognition models.',
    repoUrl: 'https://github.com/saiiexd/offline-ocr',
    diagramComponent: 'OfflineOcrDiagram',
  },
  {
    slug: 'retail-analytics',
    title: 'Retail Intelligence & Customer Insights',
    shortDescription:
      'End-to-end retail analytics platform processing raw transaction data into PostgreSQL, with time-series demand forecasting via Prophet, FastAPI endpoints, and Streamlit dashboards.',
    category: 'analytics',
    year: '2024',
    status: 'complete',
    techStack: ['Python', 'PostgreSQL', 'FastAPI', 'Streamlit', 'Prophet', 'Pandas'],
    featured: false,
    pipelineSteps: [
      'Raw Transaction Records',
      'PostgreSQL Cleaned Storage',
      'FastAPI & Prophet Forecasting',
      'Streamlit Interactive Visuals',
    ],
    problem:
      'Retail businesses struggle with disconnected transactional records, making it difficult to analyze sales trends, forecast inventory demand, and monitor customer purchasing patterns.',
    contribution:
      'Built the end-to-end data pipeline: transactional data ingestion, PostgreSQL relational storage, FastAPI backend API, Prophet time-series forecasting, and interactive Streamlit dashboards.',
    architectureDescription:
      'Raw retail transaction CSVs are cleaned and persisted in PostgreSQL. A FastAPI service serves analytical aggregations, while a Prophet forecasting module generates demand predictions rendered in a Streamlit dashboard.',
    keyDecisions: [
      {
        decision: 'Prophet time-series forecasting model integration',
        rationale:
          'Provides robust handling of retail seasonality and trend shifts for product reorder forecasting.',
      },
    ],
    results:
      'Delivered interactive dashboards displaying revenue trends, customer purchasing frequency, and demand forecasts.',
    limitations:
      'Forecasts reflect historical sales patterns; sudden promotional events or supply chain disruptions require manual parameter adjustments.',
    repoUrl: 'https://github.com/saiiexd/retail-analytics-platform',
    diagramComponent: 'RetailAnalyticsDiagram',
  },
]

// ── Helpers ────────────────────────────────────────────────────────────────────

export function getAllProjects(): ProjectData[] {
  return PROJECTS
}

export function getFeaturedProjects(): ProjectData[] {
  return PROJECTS.filter((p) => p.featured)
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getProjectsByCategory(category: string): ProjectData[] {
  if (category === 'all') return PROJECTS
  return PROJECTS.filter((p) => p.category === category)
}

export function getAllSlugs(): string[] {
  return PROJECTS.map((p) => p.slug)
}
