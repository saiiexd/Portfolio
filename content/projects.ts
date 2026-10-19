// =============================================================================
// PROJECTS — Curated Catalog of Verified Engineering Repositories
// All repositories are verified against authentic source code at https://github.com/saiiexd
// =============================================================================
import type { ProjectData } from '@/types'

export const PROJECTS: ProjectData[] = [
  {
    slug: 'llm-eval-platform',
    title: 'LLM Reliability & Evaluation Platform',
    shortDescription:
      'Research and engineering platform systematically evaluating, comparing, and diagnosing LLM application outputs against deterministic datasets and modular criteria.',
    category: 'llm-genai',
    year: '2024',
    status: 'complete',
    techStack: ['Python 3.13', 'Pytest', 'BERTScore', 'Ruff'],
    featured: true,
    pipelineSteps: [
      'Deterministic Test Cases',
      'Model Adapters (Mock/Provider)',
      'Modular Evaluator Suite',
      'Diagnostic Analysis & RunResult',
    ],
    problem:
      'LLM-based applications frequently produce inconsistent outputs or subtle hallucinations that single-metric benchmarks fail to isolate. Evaluating reliability requires modular scoring across exact match, semantic similarity, and model-based criteria alongside structured failure diagnostics.',
    contribution:
      'Sole architect and author. Implemented the core evaluation runner, model adapter interface (including deterministic MockAdapter for zero-network testing), pluggable criteria evaluators (ExactMatch, NormalizedSimilarity, BERTScore backend, and LLM judge), failure taxonomy classification, and JSON run result serialization.',
    architectureDescription:
      'Execution flows from deterministic Datasets and TestCases through a provider-agnostic ModelAdapter into one or more Evaluator instances. Results are aggregated by the EvaluationRunner, analyzed by failure diagnostic modules (evidence extraction and perturbation robustness), and serialized into structured RunResult records.',
    keyDecisions: [
      {
        decision:
          'Structured separation of evaluation criteria (ExactMatch, NormalizedSimilarity, BERTScore, LLM Judge)',
        rationale:
          'Decouples metric computation from test execution, allowing semantic fidelity and exact conformance to be evaluated independently on the same model response.',
      },
      {
        decision:
          'Deterministic MockAdapter for test isolation and regression verification',
        rationale:
          'Enables unit and integration test suites to execute deterministically without external API dependencies, network latency, or recurring token costs.',
      },
    ],
    results:
      'Built a fully reproducible evaluation framework with automated test suites verifying runner ordering, failure isolation per test case, and structured JSON report generation.',
    limitations:
      'Currently focused on evaluation and diagnostics rather than real-time production inference serving; external LLM-as-a-judge scoring requires active model provider credentials.',
    repoUrl: 'https://github.com/saiiexd/llm-reliability-and-evaluation-platform',
    demoUrl: undefined,
    diagramComponent: 'EvalPipelineDiagram',
  },
  {
    slug: 'distributed-task-queue',
    title: 'Distributed Asynchronous Task Queue',
    shortDescription:
      'Hybrid asynchronous task processing platform featuring a FastAPI control plane, Redis Streams message broker, concurrent Go worker pool, and dead-letter recovery.',
    category: 'backend-systems',
    year: '2024',
    status: 'complete',
    techStack: ['FastAPI', 'Redis Streams', 'Go', 'PostgreSQL', 'Docker'],
    featured: true,
    pipelineSteps: [
      'FastAPI Ingestion & Validation',
      'Redis Streams (Consumer Groups)',
      'Go Worker Pool Execution',
      'State ACK & Dead-Letter Queue',
    ],
    problem:
      'Heavy background computation and batch workloads block HTTP request-response cycles. Reliable asynchronous execution requires consumer group coordination, heartbeat monitoring, and deterministic retry handling to prevent message loss during worker crashes.',
    contribution:
      'Designed and implemented the hybrid architecture: a Python FastAPI REST control plane managing job submissions and database schemas, paired with a concurrent Go worker daemon utilizing go-redis/v9 for consumer group stream consumption and task execution.',
    architectureDescription:
      'Clients submit job payloads to FastAPI, which persists task metadata to PostgreSQL via SQLAlchemy/asyncpg and publishes task IDs to Redis Streams via XADD. Distributed Go workers read from consumer groups via XREADGROUP, process workloads concurrently, acknowledge messages via XACK, and route unrecoverable failures to a dead-letter queue.',
    keyDecisions: [
      {
        decision: 'Adopted Redis Streams consumer groups over simple Redis lists',
        rationale:
          'Provides built-in Pending Entries List (PEL) tracking, consumer failover detection, and at-least-once delivery semantics.',
      },
      {
        decision:
          'Implemented exponential backoff with jitter and automated Dead-Letter Queue (DLQ)',
        rationale:
          'Prevents poison-pill task payloads from starving worker threads while preserving failed task states for inspection and replay.',
      },
    ],
    results:
      'Validated multi-worker consumer group processing with deterministic retry schedules, heartbeat tracking, and zero message loss during simulated worker process termination.',
    limitations:
      'Requires persistent storage configuration (AOF/RDB) on Redis instances to prevent state loss across host power cycles.',
    repoUrl: 'https://github.com/saiiexd/distributed-task-queue',
    diagramComponent: 'TaskQueueDiagram',
  },
  {
    slug: 'workflow-orchestrator',
    title: 'Distributed Workflow Orchestrator',
    shortDescription:
      'DAG execution platform orchestrating multi-stage business pipelines with topological dependency resolution, PostgreSQL checkpointing, and OpenTelemetry instrumentation.',
    category: 'backend-systems',
    year: '2024',
    status: 'complete',
    techStack: [
      'Python 3.12',
      'FastAPI',
      'SQLAlchemy',
      'PostgreSQL',
      'Redis',
      'aiokafka',
      'OpenTelemetry',
    ],
    featured: true,
    pipelineSteps: [
      'Workflow DAG Definition',
      'Kahn Topological Scheduler',
      'Async Worker Dispatch',
      'PostgreSQL Checkpoint & Telemetry',
    ],
    problem:
      'Complex multi-stage workflows require directed acyclic graph (DAG) execution where downstream stages execute only after upstream dependencies succeed, with persistent state to resume interrupted pipelines.',
    contribution:
      'Engineered the hexagonal architecture (domain, application, infrastructure, interfaces) featuring Kahn topological scheduling in dependency_resolver.py, async worker coordination, transactional PostgreSQL checkpointing, and OpenTelemetry tracing.',
    architectureDescription:
      'Workflow graphs are validated and topologically sorted using Kahn algorithm. Independent parent stages are dispatched concurrently; task lease management and stage completion signals trigger downstream nodes, while state checkpoints are persisted to PostgreSQL to allow resuming failed runs.',
    keyDecisions: [
      {
        decision: 'Kahn topological sort algorithm for dynamic task scheduling',
        rationale:
          'Guarantees parent stage completion before downstream dependents execute, enabling parallel branch execution of independent graph branches.',
      },
      {
        decision: 'Transactional stage checkpointing in PostgreSQL via asyncpg',
        rationale:
          'Allows interrupted or failed workflows to resume execution from the last successful stage rather than restarting the entire DAG.',
      },
    ],
    results:
      'Verified multi-branch DAG execution with automatic branch parallelism, cycle detection, state machine transitions, and OpenTelemetry trace emission.',
    limitations:
      'Scheduling runs on a centralized master coordinator; future architectural iterations include distributed Raft leader election across schedulers.',
    repoUrl: 'https://github.com/saiiexd/workflow-orchestrator',
    diagramComponent: 'WorkflowOrchestratorDiagram',
  },
  {
    slug: 'real-time-fraud-detection',
    title: 'Real-Time Streaming Fraud Detection',
    shortDescription:
      'Financial transaction screening pipeline combining Kafka event streaming, PySpark structured streaming feature aggregation, Scikit-learn inference, and MLflow tracking.',
    category: 'ml-data',
    year: '2024',
    status: 'complete',
    techStack: ['Kafka', 'PySpark', 'FastAPI', 'Scikit-learn', 'PostgreSQL', 'MLflow'],
    featured: true,
    pipelineSteps: [
      'Kafka Event Stream Ingestion',
      'PySpark Streaming Feature Windows',
      'Scikit-learn Model Scoring',
      'Tri-State Routing & Dead-Letter Sink',
    ],
    problem:
      'Financial payment processing requires automated screening to flag anomalous transaction velocity and location discrepancies before settlement, routing suspicious events for review without blocking legitimate purchases.',
    contribution:
      'Built the streaming consumer architecture: Kafka transaction ingestion, PySpark structured streaming feature windowing (aggregating transaction velocity and amount deviations), Scikit-learn model scoring, and Dead-Letter Queue handling.',
    architectureDescription:
      'Transaction events are published to Kafka topics and consumed by a PySpark streaming pipeline. Rolling-window features are calculated, evaluated by machine learning classifiers against decision boundaries, and routed to Approved, Challenged, or Blocked destinations, with unparseable events sent to a DLQ handler.',
    keyDecisions: [
      {
        decision: 'PySpark Structured Streaming for rolling-window feature extraction',
        rationale:
          'Enables continuous stateful aggregation across streaming event windows with built-in checkpointing and fault recovery.',
      },
      {
        decision: 'Tri-state decision boundary (Approve / Step-up Challenge / Block)',
        rationale:
          'Reduces friction for legitimate edge-case users by triggering multi-factor authentication challenges rather than outright transaction rejection.',
      },
    ],
    results:
      'Demonstrated end-to-end streaming transaction ingestion, feature engineering, and model classification verified by integration test fixtures and MLflow experiment runs.',
    limitations:
      'Model training was evaluated on historical benchmark datasets; production deployment requires continuous online feature drift monitoring.',
    repoUrl: 'https://github.com/saiiexd/real-time-fraud-detection',
    diagramComponent: 'FraudDetectionFlow',
  },
  {
    slug: 'business-analytics',
    title: 'Business Analytics & Decision Intelligence',
    shortDescription:
      'Relational analytics platform transforming transactional data through normalized PostgreSQL schemas, analytical SQL views, cohort retention curves, and an interactive Streamlit dashboard.',
    category: 'analytics',
    year: '2024',
    status: 'complete',
    techStack: ['Python', 'PostgreSQL', 'SQLAlchemy', 'FastAPI', 'Streamlit', 'Plotly'],
    featured: true,
    pipelineSteps: [
      'Raw Transaction Ingestion',
      'PostgreSQL Relational Storage',
      'SQL Analytical Views (Cohort/RFM)',
      'FastAPI & Streamlit Dashboard',
    ],
    problem:
      'Raw e-commerce transaction logs lack normalized relational modeling, leaving operators unable to systematically calculate margin health, customer retention decay, and RFM segmentation tiers.',
    contribution:
      'Authored the relational schema (schema.sql), analytical SQL views (views.sql: view_valid_sales, view_monthly_metrics, view_product_performance, view_customer_rfm_inputs, and view_cohort_analysis), FastAPI REST service, and Streamlit visualization interface.',
    architectureDescription:
      'Transactional records are ingested into PostgreSQL relational tables (customers, products, orders, order_items). Analytical metrics and cohort offsets are computed using native PostgreSQL SQL views, exposed via a FastAPI REST API, and visualized in Streamlit using Plotly.',
    keyDecisions: [
      {
        decision:
          'Pre-computed PostgreSQL analytical SQL views over application-level loops',
        rationale:
          'Leverages database query optimization and indexes for cohort retention and gross margin calculations, ensuring sub-second response times.',
      },
      {
        decision: 'Recency, Frequency, Monetary (RFM) customer segmentation in SQL',
        rationale:
          'Calculates recency days, order frequencies, and monetary totals directly from relational joins to support actionable marketing tiers.',
      },
    ],
    results:
      'Demonstrated monthly business KPI reporting, 6-month customer cohort retention decay analysis, and dynamic RFM segmentation on transactional test data.',
    limitations:
      'Analytical views compute aggregations directly against PostgreSQL; enterprise datasets exceeding tens of millions of rows benefit from dedicated columnar OLAP storage.',
    repoUrl: 'https://github.com/saiiexd/business-analytics-decision-intelligence',
    diagramComponent: 'AnalyticsDashboardPreview',
  },
  {
    slug: 'exointel',
    title: 'ExoIntel: Exoplanet Discovery Platform',
    shortDescription:
      'Astrophysical data analysis platform applying machine learning regression ensembles and SHAP explainability to NASA Kepler transit photometry for exoplanet candidate assessment.',
    category: 'ml-data',
    year: '2024',
    status: 'complete',
    techStack: ['Python', 'Scikit-learn', 'SHAP', 'Pandas', 'Streamlit', 'Plotly'],
    featured: true,
    pipelineSteps: [
      'NASA Kepler KOI Data Ingestion',
      'Feature Engineering & Scaling',
      'Scikit-learn Ensemble Training',
      'SHAP Explainability & Dashboard',
    ],
    problem:
      'Space telescopes like Kepler produce thousands of stellar transit observations. Manual visual validation of candidate light curves is labor-intensive, requiring automated feature extraction and interpretable machine learning to evaluate candidate significance.',
    contribution:
      'Implemented data ingestion from the NASA Exoplanet Archive Kepler Objects of Interest (KOI) table, feature scaling and preprocessing pipelines, model training across Random Forest and Gradient Boosting regressors, and SHAP explainability dashboards.',
    architectureDescription:
      'Photometric candidate transit parameters (period, transit depth, duration, planetary radius, stellar temperature) are cleaned and scaled. Scikit-learn ensemble regressors predict a continuous habitability and confirmation index, with SHAP attribution rendered in a Streamlit web interface.',
    keyDecisions: [
      {
        decision:
          'SHAP (SHapley Additive exPlanations) integration for model interpretability',
        rationale:
          'Provides transparent attribution rankings showing how individual photometric parameters (e.g. transit depth vs stellar radius) drive candidate scores.',
      },
      {
        decision: 'Multi-model ensemble evaluation (Random Forest and Gradient Boosting)',
        rationale:
          'Compares predictive stability across tree-based regression algorithms using cross-validation to prevent overfitting on outlier transit events.',
      },
    ],
    results:
      'Trained and evaluated regression models predicting planetary candidate indices, with verifiable SHAP feature importance plots and interactive Streamlit candidate inspection.',
    limitations:
      'Trained specifically on Kepler KOI catalog parameters; transit photometry with low signal-to-noise ratios requires specialized stellar detrending prior to feature ingestion.',
    repoUrl: 'https://github.com/saiiexd/exo-intel',
    diagramComponent: 'ExoIntelArchitecture',
  },
  {
    slug: 'verdict-ai',
    title: 'Verdict AI: Multi-Agent Financial Research',
    shortDescription:
      'Multi-agent financial research platform where autonomous agents collaborate, debate, and synthesize evidence-backed analyses using LangGraph, FastAPI, and Next.js.',
    category: 'llm-genai',
    year: '2024',
    status: 'complete',
    techStack: ['Next.js', 'FastAPI', 'LangGraph', 'TypeScript', 'OpenAI', 'yfinance'],
    featured: false,
    pipelineSteps: [
      'Financial & News Retrieval',
      'Thesis Formulation & Debate',
      'Critic Challenge & Refinement',
      'Structured Synthesis Dossier',
    ],
    problem:
      'Single-prompt LLM market queries often produce superficial, one-sided summaries with unverified financial figures. High-quality analysis requires specialized roles: factual data retrieval, thesis formulation, adversarial counter-argument, and structured synthesis.',
    contribution:
      'Engineered the LangGraph multi-agent orchestration graph featuring 5 specialized agent nodes (financial_agent, news_agent, critic_agent, refiner_agent, writer_agent), tool integrations for Yahoo Finance and Tavily search, and a Next.js user interface.',
    architectureDescription:
      'A user market query triggers a LangGraph state graph. The Financial Agent retrieves financial statements via yfinance while the News Agent gathers market catalysts. The Critic Agent stress tests assumptions and identifies risks, the Refiner Agent reconciles opposing viewpoints, and the Writer Agent compiles a structured research dossier.',
    keyDecisions: [
      {
        decision: 'LangGraph stateful agent orchestration over linear prompt chains',
        rationale:
          'Enables explicit state management across multi-agent turns with checkpointing and structured message history passing between retrieval, critique, and synthesis.',
      },
      {
        decision: 'Dedicated adversarial Critic Agent node in the state graph',
        rationale:
          'Forces the workflow to challenge optimistic growth projections with balance-sheet risks and valuation multiples before final report generation.',
      },
    ],
    results:
      'Implemented an end-to-end multi-agent research workflow generating structured investment research reports with cited data points and bull/bear balance.',
    limitations:
      'Quality of market insights is bounded by the context window and external API availability (Yahoo Finance and search APIs).',
    repoUrl: 'https://github.com/saiiexd/verdict-ai',
    diagramComponent: 'VerdictAiDiagram',
  },
  {
    slug: 'ai-workspace',
    title: 'AI Personal Workspace',
    shortDescription:
      'Knowledge management and productivity platform integrating rich-text notes, task tracking, document processing, and semantic vector search using pgvector, FastAPI, and Next.js 15.',
    category: 'llm-genai',
    year: '2024',
    status: 'complete',
    techStack: ['Next.js 15', 'FastAPI', 'PostgreSQL', 'pgvector', 'Celery', 'OpenAI'],
    featured: false,
    pipelineSteps: [
      'Document & Note Ingestion',
      'Background Text Embedding',
      'pgvector HNSW Similarity Store',
      'Semantic Search & UI Retrieval',
    ],
    problem:
      'Personal notes and technical documents are typically siloed without semantic search, making it difficult to locate relevant context across unstructured text and structured task boards.',
    contribution:
      'Built the full-stack architecture: Next.js 15 App Router interface, FastAPI backend API, PostgreSQL storage with pgvector cosine similarity indexing, and asynchronous document processing tasks.',
    architectureDescription:
      'Documents and notes are authored in Next.js 15 and saved via FastAPI to PostgreSQL. Background Celery workers generate OpenAI embeddings and index them into pgvector tables. Semantic queries compute cosine vector distance alongside relational filters to return relevant documents.',
    keyDecisions: [
      {
        decision:
          'PostgreSQL with pgvector extension for unified relational and vector storage',
        rationale:
          'Eliminates the operational overhead and synchronization drift of managing a separate external vector database alongside relational user metadata.',
      },
      {
        decision: 'Asynchronous embedding generation via Celery and Redis',
        rationale:
          'Prevents long-running embedding API requests from blocking user document save operations in the web interface.',
      },
    ],
    results:
      'Delivered a unified workspace application featuring document authoring, task management, and sub-second semantic retrieval across vector-indexed document chunks.',
    limitations:
      'Generating vector embeddings requires an active OpenAI API key; document indexing is constrained by upstream embedding API rate limits.',
    repoUrl: 'https://github.com/saiiexd/ai-workspace',
    diagramComponent: 'AiWorkspaceDiagram',
  },
  {
    slug: 'distributed-event-streaming',
    title: 'Distributed Event Streaming Platform',
    shortDescription:
      'Financial event streaming platform with Apache Kafka (KRaft mode), manual offset commits, Redis distributed locking for idempotency, and dead-letter queues.',
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
      'FastAPI Event Producer',
      'Kafka KRaft Partitioned Broker',
      'Two-Gate Redis Deduplication',
      'PostgreSQL State & DLQ Routing',
    ],
    problem:
      'Financial event streaming requires guaranteed at-least-once message processing, distributed deduplication, transaction idempotency, and dead-letter queue isolation without message loss or duplicate execution during network partitions.',
    contribution:
      'Engineered the end-to-end streaming architecture: FastAPI event producer, asynchronous TransactionConsumer utilizing aiokafka with manual offset commits, two-gate Redis distributed locking for deduplication, PostgreSQL transactional auditing, and a DLQ consumer.',
    architectureDescription:
      'Producers publish transaction events to Apache Kafka in KRaft mode. The asynchronous consumer acquires a Redis distributed lock (30s TTL), checks PostgreSQL event log status for duplicate execution, commits transactional state, manually commits the Kafka offset, and routes malformed payloads to a transactions.dlq topic.',
    keyDecisions: [
      {
        decision:
          'At-least-once delivery with manual offset commits (enable_auto_commit=False)',
        rationale:
          'Guarantees Kafka offsets are committed only after transaction records are safely committed to PostgreSQL or forwarded to the Dead-Letter Queue.',
      },
      {
        decision:
          'Two-gate distributed idempotency (Redis mutex lock + PostgreSQL event status)',
        rationale:
          'Prevents duplicate concurrent worker execution using a distributed Redis lock while enforcing relational uniqueness constraints on transaction IDs.',
      },
    ],
    results:
      'Demonstrated reliable streaming event ingestion, idempotent consumer execution, and poison-pill DLQ isolation verified by integration tests and Prometheus metric endpoints.',
    limitations:
      'Configured for local multi-container development; high-availability production deployments require multi-node Kafka clusters with replication factors >= 3.',
    repoUrl: 'https://github.com/saiiexd/Distributed-Event-Streaming-Platform',
    diagramComponent: 'DistributedStreamingDiagram',
  },
  {
    slug: 'rag-from-scratch',
    title: 'RAG From First Principles',
    shortDescription:
      'Transparent Retrieval-Augmented Generation system built from first principles using FastAPI, PyPDF text chunking, Cohere embeddings, and pure NumPy vector cosine similarity.',
    category: 'llm-genai',
    year: '2024',
    status: 'complete',
    techStack: ['Python', 'FastAPI', 'NumPy', 'Cohere API', 'PyPDF'],
    featured: false,
    pipelineSteps: [
      'PDF Text Parsing (PyPDF)',
      'Sliding Window Chunking',
      'Cohere Embeddings & NumPy Dot Product',
      'Grounded Synthesis (Command-R+)',
    ],
    problem:
      'Complex RAG frameworks often obscure how text chunking, embedding representations, and similarity rankings actually work under the hood, making it difficult to debug token limits and retrieval degradation.',
    contribution:
      'Engineered a lightweight, transparent RAG web application: extracted PDF text via PyPDF, implemented character-overlap chunking with RecursiveCharacterTextSplitter, computed vector similarity using pure NumPy matrix dot products, and assembled grounded context for Cohere Command-R+.',
    architectureDescription:
      'Uploaded documents are parsed via PyPDF and split into 500-character chunks with 50-character overlap. Chunks are converted into 1024-dimensional vectors via the Cohere embedding API and stored in memory. Queries are embedded and ranked against document vectors using pure NumPy cosine similarity (np.dot / norms), with top-k chunks passed to Command-R+ with strict grounding rules.',
    keyDecisions: [
      {
        decision: 'Pure NumPy matrix cosine similarity over external vector databases',
        rationale:
          'Demonstrates the mathematical mechanics of vector search directly without introducing external database infrastructure or abstraction layers.',
      },
      {
        decision: 'Strict context grounding prompt rules',
        rationale:
          'Constrains model generation strictly to retrieved context, preventing hallucinated assertions when the uploaded document lacks relevant information.',
      },
    ],
    results:
      'Delivered a fully functional RAG web service with transparent retrieval mechanics, interactive document upload, and verifiable citation extraction.',
    limitations:
      'In-memory NumPy matrix search is designed for single-document analysis; enterprise corpora with millions of vectors require specialized indexing like HNSW or pgvector.',
    repoUrl: 'https://github.com/saiiexd/rag-from-scratch',
    diagramComponent: 'RagFirstPrinciplesDiagram',
  },
  {
    slug: 'offline-ocr',
    title: 'Air-Gapped Offline OCR Engine',
    shortDescription:
      'Privacy-focused optical character recognition desktop application utilizing OpenCV adaptive preprocessing and local Tesseract OCR to extract structured JSON without cloud egress.',
    category: 'ml-data',
    year: '2024',
    status: 'complete',
    techStack: ['Python', 'PyTesseract', 'OpenCV', 'Streamlit', 'NumPy'],
    featured: false,
    pipelineSteps: [
      'Local Document Upload',
      'OpenCV Adaptive Preprocessing',
      'PyTesseract Local OCR Execution',
      'Structured JSON Formatting',
    ],
    problem:
      'Confidential and regulated documents cannot be transmitted to external cloud OCR APIs due to compliance restrictions, data sovereignty laws, and privacy requirements.',
    contribution:
      'Built the end-to-end local OCR pipeline: image preprocessing (grayscale conversion, Gaussian blur noise filtering, and adaptive thresholding using OpenCV), local Tesseract OCR execution, structured JSON formatting, and a Streamlit user interface.',
    architectureDescription:
      'Images are uploaded locally in Streamlit. The OpenCV pipeline converts the image to grayscale, applies a 5x5 Gaussian blur to remove noise, and performs Otsu adaptive thresholding. PyTesseract invokes the local Tesseract binary on CPU, and json_formatter.py parses extracted text into structured JSON format.',
    keyDecisions: [
      {
        decision: 'OpenCV adaptive thresholding and Gaussian noise reduction',
        rationale:
          'Enhances character contrast and eliminates image artifacts prior to OCR recognition, significantly improving extraction accuracy on unevenly lit scans.',
      },
      {
        decision: 'Air-gapped local execution with zero cloud telemetry',
        rationale:
          'Ensures data privacy and regulatory compliance by eliminating external network calls and third-party API dependencies.',
      },
    ],
    results:
      'Achieved reliable local text extraction on scanned documents running completely offline with zero external network connectivity.',
    limitations:
      'Requires the Tesseract-OCR binary to be installed locally on the host system; optimized for printed text rather than unconstrained handwriting.',
    repoUrl: 'https://github.com/saiiexd/offline-ocr',
    diagramComponent: 'OfflineOcrDiagram',
  },
  {
    slug: 'retail-analytics',
    title: 'Retail Intelligence & Customer Insights',
    shortDescription:
      'End-to-end retail analytics platform processing transaction records into PostgreSQL, with time-series demand forecasting via Facebook Prophet, FastAPI endpoints, and Streamlit dashboards.',
    category: 'analytics',
    year: '2024',
    status: 'complete',
    techStack: ['Python', 'PostgreSQL', 'FastAPI', 'Streamlit', 'Prophet', 'Pandas'],
    featured: false,
    pipelineSteps: [
      'Transaction Ingestion & Cleaning',
      'PostgreSQL Relational Storage',
      'FastAPI Analytics Endpoints',
      'Prophet 30-Day Forecast & Streamlit',
    ],
    problem:
      'Retail businesses struggle with disconnected transaction logs, making it difficult to analyze sales trends, forecast short-term inventory demand, and monitor customer purchasing patterns.',
    contribution:
      'Built the data engineering pipeline: transaction data ingestion and cleaning (clean_data.py, load_data.py), PostgreSQL relational storage, FastAPI backend API (/kpi, /monthly-revenue, /top-products), Facebook Prophet time-series forecasting, and interactive Streamlit dashboards.',
    architectureDescription:
      'Raw retail transaction CSVs are cleaned and persisted into PostgreSQL. A FastAPI service exposes analytical aggregations, while a Prophet forecasting module generates 30-day demand predictions with confidence intervals rendered in Streamlit.',
    keyDecisions: [
      {
        decision: 'Facebook Prophet for time-series demand forecasting',
        rationale:
          'Provides robust handling of retail seasonality and trend shifts with configurable confidence intervals for short-term inventory planning.',
      },
      {
        decision: 'Decoupled FastAPI service layer between database and dashboard',
        rationale:
          'Separates analytical data querying from dashboard presentation, enabling potential reuse by external reporting clients.',
      },
    ],
    results:
      'Delivered interactive dashboards displaying monthly revenue trends, customer purchasing frequency, top product rankings, and 30-day demand projections.',
    limitations:
      'Forecasts reflect historical sales patterns; sudden promotional events or macroeconomic supply chain disruptions require manual parameter tuning.',
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
