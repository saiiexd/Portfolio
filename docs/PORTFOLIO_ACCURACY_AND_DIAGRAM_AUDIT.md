# Portfolio Technical Accuracy & Architecture Diagram Audit Report

**Auditor:** Senior Software Architect, Technical Documentation Auditor, QA & Frontend Engineer  
**Scope:** Portfolio Website (`/`, `/projects`, `/projects/[slug]`), 12 Showcased Projects, Interactive Architecture Diagrams  
**Primary Source of Truth:** Authoritative GitHub Repositories at `https://github.com/saiiexd/`  
**Execution Date:** 2026-10-19

---

## Executive Summary

A comprehensive architectural and factual audit was performed across Sai Venkat's engineering portfolio. Every technical claim, data store, framework, execution path, failure-handling mechanism, and interactive visual component was audited directly against the source code of its respective repository.

All decorative placeholders, phantom dependencies (e.g. `dbt`, `RAGAS`, `1D-CNN`, `Celery`), fabricated metrics (e.g. "+28.7% baseline delta", "sub-45ms p95", "98.6% confirmed", "100% tested"), and non-monochrome visual artifacts (gold `#c8a96e`, cyan `#38e1d2`, blue `#0052FF`) were systematically excised. In their place, 12 project-specific, technically faithful architectural diagrams were implemented or verified in the approved monochrome editorial aesthetic, featuring genuine state inspection and responsive integrity.

---

## Central Project Audit & Verification Matrix

| #      | Project Name & Repository URL                                                                                           | Confirmed Tech Stack (Source Truth)                                                                     | Diagram Component             | Factual Claims Checked & Corrected                                                                                                                                                                                                                 | Interactive Controls Verified                                                                                                                             | Responsive Checks                                                                   | Test Evidence & Source Files                                                                                        | Status       |
| ------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------ |
| **1**  | **LLM Reliability & Evaluation Platform**<br>`https://github.com/saiiexd/llm-reliability-and-evaluation-platform`       | Python 3.13, Pytest, BERTScore, Ruff, JSON Schema                                                       | `EvalPipelineDiagram`         | **Corrected:** Excised fabricated "RAGAS harness" and "+28.7% baseline delta" claims. Grounded in Sai's actual custom evaluation platform (`Dataset -> TestCase -> ModelAdapter -> Evaluator Suite -> Diagnostics -> RunResult`).                  | **4-tab criteria inspector:** ExactMatch, NormalizedSim, BERTScore, LLM Judge. Updates active evaluation metrics dynamically.                             | 1440px, 1024px, 768px, 390px. Zero horizontal overflow.                             | `tests/test_runner.py`, `src/eval_platform/evaluators/`, `src/eval_platform/adapters/mock.py`                       | **VERIFIED** |
| **2**  | **Distributed Asynchronous Task Queue**<br>`https://github.com/saiiexd/distributed-task-queue`                          | Python FastAPI, Go 1.22 (`go-redis/v9`), Redis Streams, PostgreSQL 16, Prometheus, Docker               | `TaskQueueDiagram`            | **Verified:** Confirmed hybrid FastAPI control plane + Go worker execution plane using Redis Streams consumer groups (`XREADGROUP`, `XACK`), PEL tracking, exponential backoff, and dead-letter queue. Zero Celery.                                | **Scenario Toggle:** Normal Execution (ACK) vs Failure & DLQ Circuit. Interactive worker selection (`#1`, `#2`, `#3`).                                    | 1440px, 1024px, 768px, 390px. SVG viewBox adapts cleanly.                           | `worker/main.go`, `api/main.py`, `docker-compose.yml`, `prometheus.yml`                                             | **VERIFIED** |
| **3**  | **Distributed Workflow Orchestrator**<br>`https://github.com/saiiexd/workflow-orchestrator`                             | Python 3.11, NetworkX, AsyncIO, PostgreSQL 16, OpenTelemetry, Pytest                                    | `WorkflowOrchestratorDiagram` | **Corrected:** Converted cyan `#38E1D2` and blue `#0052FF` strokes to pure monochrome `#ffffff` / `#bdbdbd`. Represented real Kahn topological scheduler and PostgreSQL state checkpointing.                                                       | **DAG Replay Execution:** Sequenced dispatch through Stages 1–4 with active topological state inspection.                                                 | 1440px, 1024px, 768px, 390px. Card grid scales cleanly.                             | `src/orchestrator/dag.py`, `src/orchestrator/scheduler.py`, `tests/test_dag.py`                                     | **VERIFIED** |
| **4**  | **Real-Time Streaming Fraud Detection**<br>`https://github.com/saiiexd/real-time-fraud-detection`                       | Apache Kafka, PySpark Structured Streaming, Scikit-learn, PostgreSQL, FastAPI, Streamlit                | `FraudDetectionFlow`          | **Corrected:** Removed fabricated "sub-45ms p95" latency and "Redis feature store" claims. Grounded in Kafka ingestion -> PySpark Structured Streaming window aggregation -> Scikit-learn inference -> PostgreSQL audit + `dlq_handler.py`.        | **Transaction Simulator:** Verified Transaction ($34.50) vs High-Velocity Outlier ($2,850) with dynamic risk gauge.                                       | 1440px, 1024px, 768px, 390px. Gauge adapts responsively.                            | `pyspark/main_streaming.py`, `streaming/producer.py`, `streaming/dlq_handler.py`, `docker/Dockerfile.spark`         | **VERIFIED** |
| **5**  | **Business Analytics & Decision Intelligence**<br>`https://github.com/saiiexd/business-analytics-decision-intelligence` | PostgreSQL 16, Python FastAPI, Streamlit, Plotly, Pandas, SQLAlchemy                                    | `AnalyticsDashboardPreview`   | **Corrected:** Completely removed phantom `dbt` and `fct_orders` claims. Grounded in native PostgreSQL relational schema (`customers`, `products`, `orders`, `order_items`) and verified SQL analytical views.                                     | **Interactive SQL View Inspector:** Tabs for `view_monthly_metrics`, `view_customer_rfm_inputs`, and `view_cohort_analysis` with live schema/sample rows. | 1440px, 1024px, 768px, 390px. Table wraps with horizontal scroll.                   | `sql/schema.sql`, `sql/views.sql`, `api/main.py`, `dashboard/app.py`                                                | **VERIFIED** |
| **6**  | **ExoIntel: Exoplanet Discovery Platform**<br>`https://github.com/saiiexd/exo-intel`                                    | Python, Scikit-learn (Random Forest, Gradient Boosting, HistGradientBoosting), SHAP, Astropy, Streamlit | `ExoIntelArchitecture`        | **Corrected:** Removed "1D-CNN" tag. Grounded in NASA Kepler/TESS transit photometry, Box Least Squares (BLS) period folding, and tree-ensemble regression with SHAP explainability.                                                               | **Target Selector:** Kepler-452 b (habitable-zone candidate) vs KOI-7923.01 (cold terrestrial analog) with animated orbital transit & flux curve.         | 1440px, 1024px, 768px, 390px. Two-column grid wraps to single-column on mobile.     | `src/models/train.py`, `src/preprocessing/transit.py`, `notebooks/exploration.ipynb`                                | **VERIFIED** |
| **7**  | **Verdict AI: Multi-Agent Financial Research**<br>`https://github.com/saiiexd/verdict-ai`                               | Python FastAPI, LangGraph, yfinance, Tavily Search, Pydantic, Streamlit                                 | `VerdictAiDiagram`            | **Corrected:** Excised generic Bull/Bear mock and fabricated "Confidence: 89.4%" metric. Replaced with the 5 verified LangGraph agent nodes: `financial_agent`, `news_agent`, `critic_agent`, `refiner_agent`, `writer_agent`.                     | **Interactive Agent Inspector:** Tabs inspect each agent's source file, tools, inputs, outputs, and adversarial reasoning role.                           | 1440px, 1024px, 768px, 390px. SVG flow and card view wrap smoothly.                 | `backend/app/agents/financial_agent.py`, `news_agent.py`, `critic_agent.py`, `refiner_agent.py`, `writer_agent.py`  | **VERIFIED** |
| **8**  | **AI Personal Workspace**<br>`https://github.com/saiiexd/ai-workspace`                                                  | Next.js, FastAPI, PostgreSQL 16 (`ankane/pgvector`), OpenAI Embeddings, SQLAlchemy, Alembic             | `AiWorkspaceDiagram`          | **Corrected:** Removed Celery claims (identified in code as deferred comments: `In a true prod app, we use Celery/arq. Here we'll fire an async task.`). Grounded in FastAPI background tasks and native pgvector HNSW cosine similarity search.   | **Interactive Vector Query Harness:** Consensus Query vs Redis Latency Query with cosine similarity ranking.                                              | 1440px, 1024px, 768px, 390px. Stage grid adapts cleanly.                            | `backend/app/services/document.py`, `backend/alembic/versions/0001_initial_schema.py`, `backend/app/services/ai.py` | **VERIFIED** |
| **9**  | **Distributed Event Streaming Platform**<br>`https://github.com/saiiexd/Distributed-Event-Streaming-Platform`           | Apache Kafka (KRaft Mode), Python FastAPI, Redis 7 (Two-Gate Lock), PostgreSQL 16, Prometheus           | `DistributedStreamingDiagram` | **Corrected & Reconciled:** Explicitly confirmed repository is NOT Go/Raft. It implements Kafka KRaft, FastAPI producer, async Python consumer with manual offset commits, two-gate Redis deduplication, and `transactions.dlq` Dead-Letter Queue. | **Scenario Toggle & Partition Inspector:** Scenario A (Settled) vs Scenario B (Poison Pill -> DLQ) with interactive partition selector (P0, P1, P2).      | 1440px, 1024px, 768px, 390px. Partition buttons and metrics scale cleanly.          | `consumer/main.py`, `producer/main.py`, `docker-compose.yml`, `prometheus/`                                         | **VERIFIED** |
| **10** | **RAG From First Principles**<br>`https://github.com/saiiexd/rag-from-scratch`                                          | Python 3.11, NumPy, Cohere API (`embed-english-v3.0`, `command-r-plus`), PyPDF, Streamlit               | `RagFirstPrinciplesDiagram`   | **Verified:** Confirmed zero vector database abstraction. Pure NumPy dot product and Euclidean norm calculation over in-memory dense vector arrays with PyPDF chunking.                                                                            | **Top-K Chunks Controller:** Toggle between $k=2$ and $k=3$ retrieved chunks with live cosine similarity inspection.                                      | 1440px, 1024px, 768px, 390px. Pipeline nodes and chunk list adapt without overflow. | `src/vector_store.py`, `src/embeddings.py`, `src/generator.py`, `app.py`                                            | **VERIFIED** |
| **11** | **Air-Gapped Offline OCR Engine**<br>`https://github.com/saiiexd/offline-ocr`                                           | Python, OpenCV (`cv2.adaptiveThreshold` Gaussian C), PyTesseract, Tesseract 5 Executable, Streamlit     | `OfflineOcrDiagram`           | **Corrected:** Excised fabricated "98.6% confirmed word accuracy" and "Otsu binarization" claims. Grounded in actual Gaussian adaptive thresholding (`cv2.ADAPTIVE_THRESH_GAUSSIAN_C`), 5x5 blur, and local CPU-only Tesseract execution.          | **Binarization Mode Toggle:** Pass 1 (Raw Scanned Image) vs Pass 2 (OpenCV Gaussian Binarized) with parsed JSON schema inspection.                        | 1440px, 1024px, 768px, 390px. Code block and metric cards adapt responsively.       | `core/preprocess.py`, `core/ocr_engine.py`, `core/ocr_processor.py`, `ui/`                                          | **VERIFIED** |
| **12** | **Retail Intelligence & Customer Insights**<br>`https://github.com/saiiexd/retail-analytics-platform`                   | Python, PostgreSQL 16 (`retail_transactions`), Prophet, FastAPI, Streamlit, Pandas                      | `RetailAnalyticsDiagram`      | **Corrected:** Excised "PostgreSQL Star Schema" claim (repository uses clean normalized `retail_transactions` table with SQL aggregations). Grounded in 30-day operational demand forecasting with Prophet weekly Fourier terms.                   | **Forecast Inspector:** 30-day operational window with SKU unit projections, seasonal uplift, and reorder trigger date.                                   | 1440px, 1024px, 768px, 390px. Metric grid wraps to single column on mobile.         | `src/api/app.py`, `dashboard/app.py`, `notebooks/retail_pipeline.ipynb`, `requirements.txt`                         | **VERIFIED** |

---

## Detailed Factual Corrections Log

1. **LLM Reliability & Evaluation Platform (`llm-reliability-and-evaluation-platform`):**
   - _Previous Portfolio Copy:_ Claimed integration with "RAGAS Evaluation Harness" and advertised a "+28.7% baseline delta".
   - _Source Truth Inspection:_ Repository contains custom Python modules in `src/eval_platform/` with pluggable `Evaluator` classes (`ExactMatchEvaluator`, `NormalizedSimilarityEvaluator`, `BertScoreBackend`, `LLMJudge`), deterministic `MockAdapter`, and diagnostic analyzers.
   - _Correction:_ Replaced all RAGAS mentions with Sai's custom evaluation platform architecture and removed fabricated percentage claims.

2. **Business Analytics & Decision Intelligence (`business-analytics-decision-intelligence`):**
   - _Previous Portfolio Copy:_ Claimed `dbt core`, staging models (`stg_orders`), and dimensional models (`fct_orders`).
   - _Source Truth Inspection:_ Repository contains zero dbt files or dbt project manifests. It implements native PostgreSQL schemas in `sql/schema.sql` and native views in `sql/views.sql` (`view_valid_sales`, `view_monthly_metrics`, `view_customer_rfm_inputs`, `view_cohort_analysis`).
   - _Correction:_ Replaced all dbt claims with native PostgreSQL views and created an interactive SQL view inspector.

3. **Verdict AI (`verdict-ai`):**
   - _Previous Portfolio Copy:_ Depicted a generic 3-box diagram with Bull/Bear/Risk personas and a hardcoded blue `#0052FF` stroke with "Confidence: 89.4%".
   - _Source Truth Inspection:_ The backend implements a 5-agent LangGraph state graph in `backend/app/agents/`: `financial_agent.py`, `news_agent.py`, `critic_agent.py`, `refiner_agent.py`, and `writer_agent.py`.
   - _Correction:_ Rebuilt `VerdictAiDiagram` to visualize the actual 5-node LangGraph pipeline with an interactive code inspector revealing each agent's file path, tools, inputs, and outputs.

4. **Real-Time Streaming Fraud Detection (`real-time-fraud-detection`):**
   - _Previous Portfolio Copy:_ Claimed a Redis sliding-window feature store and advertised "sub-45ms p95 latency".
   - _Source Truth Inspection:_ Feature aggregation and windowing are executed inside PySpark Structured Streaming (`pyspark/main_streaming.py`). Dead-letter processing is handled by `streaming/dlq_handler.py` sinking to PostgreSQL.
   - _Correction:_ Updated telemetry to `Kafka · PySpark · Scikit-learn · PostgreSQL` and removed unmeasured latency claims.

5. **AI Personal Workspace (`ai-workspace`):**
   - _Previous Portfolio Copy:_ Depicted an active Celery + Redis background worker pipeline.
   - _Source Truth Inspection:_ In `backend/app/services/document.py` line 65 and `note.py` line 159, comments state: `# Note: In a true prod app, we use Celery/arq. Here we'll fire an async task.` The actual task execution utilizes FastAPI async `BackgroundTasks`.
   - _Correction:_ Replaced "Celery + Redis" with "FastAPI Async Tasks" and verified that pgvector HNSW indexing is genuinely implemented in Alembic migrations.

6. **Air-Gapped Offline OCR Engine (`offline-ocr`):**
   - _Previous Portfolio Copy:_ Claimed "Otsu Adaptive Binarization" and "98.6% Confirmed Word Accuracy".
   - _Source Truth Inspection:_ In `core/preprocess.py`, image thresholding uses `cv2.adaptiveThreshold` with `cv2.ADAPTIVE_THRESH_GAUSSIAN_C` (Gaussian adaptive, not Otsu). Accuracy benchmark was fabricated.
   - _Correction:_ Corrected pipeline to Gaussian adaptive thresholding and replaced fabricated percentages with qualitative image state descriptors.

7. **Retail Analytics Platform (`retail-analytics-platform`):**
   - _Previous Portfolio Copy:_ Claimed a "PostgreSQL Star Schema".
   - _Source Truth Inspection:_ The database consists of a single relational table `retail_transactions` with SQL aggregations in `src/api/app.py`.
   - _Correction:_ Replaced "Star Schema" with "PostgreSQL (retail_transactions)" and aligned forecasting to 30-day operational windows.

8. **General Website Copy & Badges:**
   - _Previous Detail Page Copy:_ Rendered badge `100% Tested & Active`.
   - _Correction:_ Replaced with honest engineering label `Source Code Verified`.
   - _Previous Hero/DataFlowHero Copy:_ Contained gold/cyan gradients (`#c8a96e`, `#38e1d2`) and fabricated throughput counters (`12.4K EVENTS/S`).
   - _Correction:_ Converted all gradients and particle nodes to strict monochrome tokens and replaced counters with descriptive engineering labels.

---

## Automated Validation Summary

The following test and build suites were executed directly in the repository shell:

1. **Prettier Formatting Check (`npm run format:check`):**
   - _Command:_ `prettier --check .`
   - _Result:_ **PASSED** (All matched files use Prettier code style).

2. **TypeScript Compilation Check (`npm run type-check`):**
   - _Command:_ `tsc --noEmit`
   - _Result:_ **PASSED** (0 type errors across all routes, components, and diagrams).

3. **ESLint Code Quality Check (`npm run lint`):**
   - _Command:_ `eslint .`
   - _Result:_ **PASSED** (0 warnings, 0 errors).

4. **Production Build (`npm run build`):**
   - _Command:_ `next build`
   - _Result:_ **PASSED** (All static and dynamic routes compiled successfully, including all 12 `/projects/[slug]` detail pages).
