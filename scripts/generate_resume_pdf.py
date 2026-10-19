"""
Script to generate a clean, valid standard PDF 1.4 for Sai Venkat's resume.
Ensures zero external dependency requirements and valid PDF xref tables and stream lengths.
"""
import os

def create_resume_pdf(output_path: str):
    # PDF generation helper
    objects = []
    
    def add_object(content: str) -> int:
        objects.append(content)
        return len(objects)

    # We will build objects and calculate byte offsets
    # Stream content with Helvetica and Helvetica-Bold
    stream_lines = [
        "BT",
        # Header: Name
        "/F2 22 Tf",
        "50 745 Td",
        "(SAI VENKAT) Tj",
        "ET",
        
        "BT",
        "/F1 11 Tf",
        "50 728 Td",
        "(AI/ML & Data Platform Engineer | Lovely Professional University) Tj",
        "ET",

        "BT",
        "/F1 9 Tf",
        "50 712 Td",
        "(Email: saivenkat262005@gmail.com   |   GitHub: https://github.com/saiiexd   |   LinkedIn: linkedin.com/in/sai-venkat-a14436284) Tj",
        "ET",

        # Divider line
        "0.75 w",
        "0.2 0.2 0.2 RG",
        "50 702 m 562 702 l S",

        # EDUCATION
        "BT",
        "/F2 12 Tf",
        "50 684 Td",
        "(EDUCATION) Tj",
        "ET",

        "BT",
        "/F2 10 Tf",
        "50 668 Td",
        "(Lovely Professional University) Tj",
        "/F1 10 Tf",
        "160 0 Td",
        "(- Phagwara, Punjab, India) Tj",
        "/F1 9 Tf",
        "220 0 Td",
        "(2023 - 2027 [Expected]) Tj",
        "ET",

        "BT",
        "/F1 9.5 Tf",
        "50 653 Td",
        "(B.Tech in Computer Science and Engineering \\(Specialization in AI & Data Engineering\\)) Tj",
        "ET",

        "BT",
        "/F1 9 Tf",
        "50 640 Td",
        "(Cumulative GPA: 7.46   |   Focus: Distributed Systems, ML Algorithms, LLM Reliability, Streaming Data) Tj",
        "ET",

        # TECHNICAL COMPETENCIES
        "BT",
        "/F2 12 Tf",
        "50 618 Td",
        "(TECHNICAL COMPETENCIES) Tj",
        "ET",

        "BT",
        "/F2 9.5 Tf",
        "50 602 Td",
        "(AI & LLM Systems:) Tj",
        "/F1 9.5 Tf",
        "105 0 Td",
        "(RAGAS, LangChain, HuggingFace, Local Vector Search, SentenceTransformers, Evaluation Harnesses) Tj",
        "ET",

        "BT",
        "/F2 9.5 Tf",
        "50 588 Td",
        "(Distributed Systems:) Tj",
        "/F1 9.5 Tf",
        "105 0 Td",
        "(Redis Streams, FastAPI, Celery, Docker, PostgreSQL, Prometheus Telemetry, Task Queues) Tj",
        "ET",

        "BT",
        "/F2 9.5 Tf",
        "50 574 Td",
        "(Data Engineering:) Tj",
        "/F1 9.5 Tf",
        "105 0 Td",
        "(Apache Kafka, dbt, Spark basics, Scikit-learn, SQL \\(Star Schema\\), Pandas, NumPy) Tj",
        "ET",

        "BT",
        "/F2 9.5 Tf",
        "50 560 Td",
        "(Core Programming:) Tj",
        "/F1 9.5 Tf",
        "105 0 Td",
        "(Python, SQL, TypeScript / JavaScript, Bash, Git / GitHub Actions) Tj",
        "ET",

        # SELECTED SYSTEMS PROJECTS
        "BT",
        "/F2 12 Tf",
        "50 538 Td",
        "(SELECTED SYSTEMS PROJECTS) Tj",
        "ET",

        # Project 1: LLM Eval
        "BT",
        "/F2 10 Tf",
        "50 522 Td",
        "(LLM Reliability & Evaluation Platform) Tj",
        "/F1 9 Tf",
        "220 0 Td",
        "(Python, RAGAS, LangChain, HuggingFace, FastAPI) Tj",
        "ET",
        "BT",
        "/F1 8.5 Tf",
        "60 510 Td",
        "(- Deterministic evaluation harness benchmarking open-source LLMs under constrained compute using the RAG Triad.) Tj",
        "ET",
        "BT",
        "/F1 8.5 Tf",
        "60 499 Td",
        "(- Formulated 3-stage validation pipeline calculating faithfulness, answer relevance, and context groundedness.) Tj",
        "ET",
        "BT",
        "/F1 8.5 Tf",
        "60 488 Td",
        "(- Identified 28% variance in hallucination rates across zero-shot and few-shot reasoning prompts across 5 open models.) Tj",
        "ET",

        # Project 2: Distributed Task Queue
        "BT",
        "/F2 10 Tf",
        "50 470 Td",
        "(Distributed Asynchronous Task Queue) Tj",
        "/F1 9 Tf",
        "220 0 Td",
        "(Python, FastAPI, Redis Streams, Docker, PostgreSQL) Tj",
        "ET",
        "BT",
        "/F1 8.5 Tf",
        "60 458 Td",
        "(- Asynchronous job execution platform featuring Redis Streams coordination, worker pools, and finite-state machines.) Tj",
        "ET",
        "BT",
        "/F1 8.5 Tf",
        "60 447 Td",
        "(- Implemented exponential backoff with jitter and automated Dead-Letter Queue \\(DLQ\\) for poison-pill recovery.) Tj",
        "ET",
        "BT",
        "/F1 8.5 Tf",
        "60 436 Td",
        "(- Demonstrated linear horizontal scaling across multiple worker instances with zero job loss during worker termination.) Tj",
        "ET",

        # Project 3: Distributed Workflow Orchestrator
        "BT",
        "/F2 10 Tf",
        "50 418 Td",
        "(Distributed Workflow Orchestrator) Tj",
        "/F1 9 Tf",
        "220 0 Td",
        "(Python, FastAPI, AsyncIO, Docker, PostgreSQL) Tj",
        "ET",
        "BT",
        "/F1 8.5 Tf",
        "60 406 Td",
        "(- Scalable DAG execution engine orchestrating multi-stage business pipelines across worker clusters.) Tj",
        "ET",
        "BT",
        "/F1 8.5 Tf",
        "60 395 Td",
        "(- Built Kahn topological sorting algorithm for dynamic dependency resolution and transactional stage checkpointing.) Tj",
        "ET",

        # Project 4: Real-Time Streaming Fraud Detection
        "BT",
        "/F2 10 Tf",
        "50 377 Td",
        "(Real-Time Streaming Fraud Detection) Tj",
        "/F1 9 Tf",
        "220 0 Td",
        "(Python, Kafka, Redis, Scikit-learn, FastAPI) Tj",
        "ET",
        "BT",
        "/F1 8.5 Tf",
        "60 365 Td",
        "(- High-throughput transaction screening pipeline combining Kafka event streaming and Redis sliding-window caching.) Tj",
        "ET",
        "BT",
        "/F1 8.5 Tf",
        "60 354 Td",
        "(- Built tri-state decision boundary \\(Approve / Challenge / Block\\) achieving sub-45ms p95 classification latency.) Tj",
        "ET",

        # Project 5: Business Analytics & Decision Intelligence
        "BT",
        "/F2 10 Tf",
        "50 336 Td",
        "(Business Analytics & Decision Intelligence) Tj",
        "/F1 9 Tf",
        "220 0 Td",
        "(Python, SQL, dbt, Pandas, Streamlit) Tj",
        "ET",
        "BT",
        "/F1 8.5 Tf",
        "60 324 Td",
        "(- Analytical modeling platform with dbt dimensional models \\(star schema\\), SQL cohort aggregations, and RFM scoring.) Tj",
        "ET",

        # Project 6: ExoIntel Exoplanet Discovery Platform
        "BT",
        "/F2 10 Tf",
        "50 306 Td",
        "(ExoIntel: Exoplanet Discovery Platform) Tj",
        "/F1 9 Tf",
        "220 0 Td",
        "(Python, Lightkurve, Scikit-learn, NumPy) Tj",
        "ET",
        "BT",
        "/F1 8.5 Tf",
        "60 294 Td",
        "(- ML pipeline on NASA Kepler/TESS transit photometry data for automated exoplanet candidate classification.) Tj",
        "ET",

        # Footer note
        "BT",
        "/F1 8 Tf",
        "50 60 Td",
        "(Curated portfolio, complete system architecture diagrams, and repositories verified at: https://github.com/saiiexd) Tj",
        "ET",
    ]

    stream_content = "\n".join(stream_lines)
    stream_len = len(stream_content.encode("utf-8"))

    # Object 1: Catalog
    obj1 = "<< /Type /Catalog /Pages 2 0 R >>"
    # Object 2: Pages
    obj2 = "<< /Type /Pages /Kids [3 0 R] /Count 1 >>"
    # Object 3: Page
    obj3 = "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>"
    # Object 4: Font F1 (Helvetica)
    obj4 = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"
    # Object 5: Font F2 (Helvetica-Bold)
    obj5 = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"
    # Object 6: Contents stream
    obj6 = f"<< /Length {stream_len} >>\nstream\n{stream_content}\nendstream"

    raw_objects = [obj1, obj2, obj3, obj4, obj5, obj6]

    # Assemble PDF with byte offsets
    header = "%PDF-1.4\n%\xe2\xe3\xcf\xd3\n"
    pdf_bytes = bytearray(header.encode("latin1"))

    offsets = []
    for i, obj in enumerate(raw_objects, 1):
        offsets.append(len(pdf_bytes))
        obj_str = f"{i} 0 obj\n{obj}\nendobj\n"
        pdf_bytes.extend(obj_str.encode("latin1"))

    xref_offset = len(pdf_bytes)
    xref_str = f"xref\n0 {len(raw_objects) + 1}\n0000000000 65535 f \n"
    for offset in offsets:
        xref_str += f"{offset:010d} 00000 n \n"

    trailer_str = f"trailer\n<< /Size {len(raw_objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n"
    pdf_bytes.extend((xref_str + trailer_str).encode("latin1"))

    with open(output_path, "wb") as f:
        f.write(pdf_bytes)
    print(f"Generated valid PDF at {output_path} ({len(pdf_bytes)} bytes)")

if __name__ == "__main__":
    out_dir = os.path.join(os.path.dirname(__file__), "..", "public")
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, "resume.pdf")
    create_resume_pdf(out_file)
