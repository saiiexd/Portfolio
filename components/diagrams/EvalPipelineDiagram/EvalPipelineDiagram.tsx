'use client'

import { useState } from 'react'
import { CheckCircle2, Sliders, Database, Cpu, ShieldCheck } from 'lucide-react'
import styles from './EvalPipelineDiagram.module.scss'

interface Props {
  mode?: 'full' | 'preview'
}

type EvaluatorCriterion = 'exact_match' | 'normalized_sim' | 'bert_score' | 'llm_judge'

export default function EvalPipelineDiagram({ mode = 'full' }: Props) {
  const [activeCriterion, setActiveCriterion] = useState<EvaluatorCriterion>('bert_score')
  const [activeStep, setActiveStep] = useState<number>(3)

  const criterionDetails = {
    exact_match: {
      name: 'ExactMatchEvaluator',
      module: 'llm_reliability.evaluation.evaluators',
      description:
        'Case-insensitive exact string match against reference answer. Baseline conformance check.',
      sampleScore: '1.0 (Pass) or 0.0 (Fail)',
      behavior:
        'Reports "not applicable" if no reference answer is provided rather than failing the test case.',
      testAssertion: 'assert result.score in (0.0, 1.0)',
    },
    normalized_sim: {
      name: 'NormalizedSimilarityEvaluator',
      module: 'llm_reliability.evaluation.normalization',
      description:
        'Whitespace, punctuation, and case normalized string similarity for robust textual comparison.',
      sampleScore: '0.865 (Continuous)',
      behavior:
        'Strips diacritics, normalizes Unicode apostrophes and spaces before computing character overlap.',
      testAssertion: 'assert 0.0 <= result.score <= 1.0',
    },
    bert_score: {
      name: 'BertScoreBackend (Semantic Similarity)',
      module: 'llm_reliability.evaluation.semantic_similarity',
      description:
        'Contextual token embedding cosine similarity using bert-score library with lazy import.',
      sampleScore: '0.912 F1 (Semantic)',
      behavior:
        'Computes precision, recall, and F1 across token embeddings; uses fake backend for deterministic tests.',
      testAssertion: 'assert result.score >= threshold',
    },
    llm_judge: {
      name: 'LLMJudge (Model-as-a-Judge)',
      module: 'llm_reliability.evaluation.llm_judge',
      description:
        'Structured rubric evaluation with reasoning explanation and numerical rating extracted via regex.',
      sampleScore: '4.5 / 5.0 (Rubric)',
      behavior:
        'Executes a referee prompt with scoring criteria, returning a structured judgment and diagnostic trace.',
      testAssertion: 'assert judgment.reasoning and judgment.score > 0',
    },
  }[activeCriterion]

  return (
    <div className={`${styles.wrapper} ${mode === 'preview' ? styles.previewMode : ''}`}>
      {/* ── System Telemetry Header ── */}
      <div className={styles.telemetryBar}>
        <div className={styles.statusPill}>
          <span className={styles.pulseDot} />
          <span className={styles.systemName}>
            LLM RELIABILITY &amp; EVALUATION ENGINE
          </span>
          <span className={styles.versionTag}>Python 3.13 · Pytest · BERTScore</span>
        </div>
        <div className={styles.telemetryStats}>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>INPUT MODEL</span>
            <span className={styles.statVal}>TestCase / Dataset</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>EXECUTION</span>
            <span className={styles.statVal}>EvaluationRunner</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>SERIALIZATION</span>
            <span className={`${styles.statVal} ${styles.highlight}`}>
              Deterministic RunResult
            </span>
          </span>
        </div>
      </div>

      {/* ── 4-Stage Architecture Canvas ── */}
      <div className={styles.pipelineCanvas}>
        <div className={styles.stagesRow}>
          {/* Stage 1: Dataset & TestCase */}
          <div
            className={`${styles.stageCard} ${activeStep === 1 ? styles.cardActive : ''}`}
            onClick={() => setActiveStep(1)}
          >
            <div className={styles.cardTop}>
              <span className={styles.stepNum}>STAGE 01</span>
              <Database size={13} className={styles.cardIcon} />
            </div>
            <div className={styles.cardTitle}>Dataset &amp; TestCases</div>
            <p className={styles.cardDesc}>
              Deterministic test inputs with stable IDs and optional reference answers
            </p>
            <div className={styles.cardFooter}>Dataset.from_json()</div>
          </div>

          <div className={styles.flowConnector} />

          {/* Stage 2: Model Adapter */}
          <div
            className={`${styles.stageCard} ${activeStep === 2 ? styles.cardActive : ''}`}
            onClick={() => setActiveStep(2)}
          >
            <div className={styles.cardTop}>
              <span className={styles.stepNum}>STAGE 02</span>
              <Cpu size={13} className={styles.cardIcon} />
            </div>
            <div className={styles.cardTitle}>ModelAdapter Protocol</div>
            <p className={styles.cardDesc}>
              Provider-agnostic interface with MockAdapter for zero-network testing
            </p>
            <div className={styles.cardFooter}>MockAdapter / Provider</div>
          </div>

          <div className={styles.flowConnector} />

          {/* Stage 3: Evaluator Suite */}
          <div
            className={`${styles.stageCard} ${activeStep === 3 ? styles.cardActive : ''}`}
            onClick={() => setActiveStep(3)}
          >
            <div className={styles.cardTop}>
              <span className={styles.stepNum}>STAGE 03</span>
              <Sliders size={13} className={styles.cardIcon} />
            </div>
            <div className={styles.cardTitle}>Pluggable Evaluators</div>
            <p className={styles.cardDesc}>
              ExactMatch, NormalizedSim, BERTScore, and LLM Judge scoring engines
            </p>
            <div className={styles.cardFooter}>Evaluator.evaluate()</div>
          </div>

          <div className={styles.flowConnector} />

          {/* Stage 4: Diagnostics & RunResult */}
          <div
            className={`${styles.stageCard} ${activeStep === 4 ? styles.cardActive : ''}`}
            onClick={() => setActiveStep(4)}
          >
            <div className={styles.cardTop}>
              <span className={styles.stepNum}>STAGE 04</span>
              <ShieldCheck size={13} className={styles.cardIcon} />
            </div>
            <div className={styles.cardTitle}>Diagnostics &amp; Report</div>
            <p className={styles.cardDesc}>
              Failure isolation per test case, evidence extraction, and JSON output
            </p>
            <div className={styles.cardFooter}>RunResult.to_json()</div>
          </div>
        </div>
      </div>

      {/* ── Interactive Evaluator Criteria Inspector ── */}
      {mode === 'full' && (
        <div className={styles.inspectorSection}>
          <div className={styles.inspectorHeader}>
            <span className={styles.inspectorTitle}>
              INTERACTIVE EVALUATION CRITERIA INSPECTOR
            </span>
            <div className={styles.criteriaTabs}>
              <button
                type="button"
                className={`${styles.tabBtn} ${activeCriterion === 'exact_match' ? styles.tabActive : ''}`}
                onClick={() => setActiveCriterion('exact_match')}
              >
                ExactMatch
              </button>
              <button
                type="button"
                className={`${styles.tabBtn} ${activeCriterion === 'normalized_sim' ? styles.tabActive : ''}`}
                onClick={() => setActiveCriterion('normalized_sim')}
              >
                NormalizedSim
              </button>
              <button
                type="button"
                className={`${styles.tabBtn} ${activeCriterion === 'bert_score' ? styles.tabActive : ''}`}
                onClick={() => setActiveCriterion('bert_score')}
              >
                BERTScore (Semantic)
              </button>
              <button
                type="button"
                className={`${styles.tabBtn} ${activeCriterion === 'llm_judge' ? styles.tabActive : ''}`}
                onClick={() => setActiveCriterion('llm_judge')}
              >
                LLM Judge
              </button>
            </div>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailBox}>
              <span className={styles.detailKey}>EVALUATOR CLASS</span>
              <span className={styles.detailValMono}>{criterionDetails.name}</span>
            </div>
            <div className={styles.detailBox}>
              <span className={styles.detailKey}>SOURCE MODULE</span>
              <span className={styles.detailValMono}>{criterionDetails.module}</span>
            </div>
            <div className={styles.detailBox}>
              <span className={styles.detailKey}>SCORE FORMAT</span>
              <span className={styles.detailValHighlight}>
                {criterionDetails.sampleScore}
              </span>
            </div>
            <div className={styles.detailBox}>
              <span className={styles.detailKey}>TEST SPECIFICATION</span>
              <span className={styles.detailValMono}>
                {criterionDetails.testAssertion}
              </span>
            </div>
            <div className={`${styles.detailBox} ${styles.fullWidthDetail}`}>
              <span className={styles.detailKey}>
                OPERATIONAL BEHAVIOR &amp; FAILURE ISOLATION
              </span>
              <p className={styles.detailParagraph}>{criterionDetails.description}</p>
              <p className={styles.detailSub}>{criterionDetails.behavior}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
