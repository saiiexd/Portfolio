'use client'

import { useState } from 'react'
import { Eye, Sliders, Shield, Code2, CheckCircle2 } from 'lucide-react'
import styles from './OfflineOcrDiagram.module.scss'

interface Props {
  mode?: 'full' | 'preview'
}

export default function OfflineOcrDiagram({ mode = 'full' }: Props) {
  const [filterMode, setFilterMode] = useState<'raw' | 'processed'>('processed')

  return (
    <div className={`${styles.wrapper} ${mode === 'preview' ? styles.previewMode : ''}`}>
      {/* ── System Header & Telemetry ── */}
      <div className={styles.telemetryBar}>
        <div className={styles.statusPill}>
          <span className={styles.pulseDot} />
          <span className={styles.systemName}>AIR-GAPPED OFFLINE OCR ENGINE</span>
          <span className={styles.versionTag}>OpenCV · PyTesseract · Streamlit</span>
        </div>
        <div className={styles.telemetryStats}>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>SECURITY POSTURE</span>
            <span className={`${styles.statVal} ${styles.highlight}`}>
              100% Air-Gapped (Zero Telemetry)
            </span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>PREPROCESSING</span>
            <span className={styles.statVal}>Otsu Adaptive Binarization</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>OCR ENGINE</span>
            <span className={styles.statVal}>Tesseract 5 Local</span>
          </span>
        </div>
      </div>

      {/* ── Architecture Nodes ── */}
      <div className={styles.pipelineCanvas}>
        <div className={styles.stageGrid}>
          {/* Node 1: Ingestion */}
          <div className={styles.nodeCard}>
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>01</span>
              <Eye size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>Document Scan</div>
            <p className={styles.nodeDesc}>
              Raw scanned invoice / confidential PDF upload
            </p>
            <div className={styles.nodeMeta}>Zero Cloud Egress</div>
          </div>

          <div className={styles.connectorLine} />

          {/* Node 2: OpenCV Pipeline */}
          <div className={`${styles.nodeCard} ${styles.activeCard}`}>
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>02</span>
              <Sliders size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>OpenCV Clean</div>
            <p className={styles.nodeDesc}>
              Grayscale, Gaussian blur, Otsu adaptive threshold
            </p>
            <div className={styles.nodeMeta}>Morphological Denoising</div>
          </div>

          <div className={styles.connectorLine} />

          {/* Node 3: Tesseract 5 */}
          <div className={styles.nodeCard}>
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>03</span>
              <Shield size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>Local Tesseract</div>
            <p className={styles.nodeDesc}>
              LSTM character recognition & bounding box extraction
            </p>
            <div className={styles.nodeMeta}>Local CPU Execution</div>
          </div>

          <div className={styles.connectorLine} />

          {/* Node 4: Structured Output */}
          <div className={styles.nodeCard}>
            <div className={styles.nodeHeader}>
              <span className={styles.nodeNum}>04</span>
              <Code2 size={14} className={styles.nodeIcon} />
            </div>
            <div className={styles.nodeTitle}>Structured JSON</div>
            <p className={styles.nodeDesc}>
              Key-value field parsing with character confidence
            </p>
            <div className={styles.nodeMeta}>Exportable Schema</div>
          </div>
        </div>
      </div>

      {/* ── Interactive Computer Vision Inspection Pane ── */}
      {mode === 'full' && (
        <div className={styles.inspectionPane}>
          <div className={styles.paneHeader}>
            <span className={styles.paneTitle}>
              OPENCV ADAPTIVE THRESHOLDING COMPARISON
            </span>
            <div className={styles.modeTabs}>
              <button
                type="button"
                className={`${styles.modeBtn} ${filterMode === 'raw' ? styles.activeTab : ''}`}
                onClick={() => setFilterMode('raw')}
              >
                Pass 1: Raw Scanned Image (Noisy)
              </button>
              <button
                type="button"
                className={`${styles.modeBtn} ${filterMode === 'processed' ? styles.activeTab : ''}`}
                onClick={() => setFilterMode('processed')}
              >
                Pass 2: OpenCV Binarized & Filtered ★
              </button>
            </div>
          </div>

          <div className={styles.cvDisplay}>
            <div className={styles.filterMetrics}>
              <div className={styles.metricItem}>
                <span className={styles.metricKey}>BACKGROUND NOISE</span>
                <span className={styles.metricVal}>
                  {filterMode === 'raw' ? 'High Artifacts (38.4%)' : 'Suppressed (<1.2%)'}
                </span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricKey}>CHARACTER CONTRAST</span>
                <span className={styles.metricVal}>
                  {filterMode === 'raw'
                    ? 'Low Contrast (0.42)'
                    : 'High Binary Edge (0.98)'}
                </span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricKey}>OCR WORD ACCURACY</span>
                <span className={styles.metricVal}>
                  {filterMode === 'raw' ? '74.2% (Errors on noise)' : '98.6% Confirmed'}
                </span>
              </div>
            </div>

            <div className={styles.jsonSample}>
              <div className={styles.jsonTitle}>
                <CheckCircle2 size={12} className={styles.jsonIcon} />
                <span>PARSED CONFIDENCE SCHEMA</span>
              </div>
              <pre className={styles.jsonCode}>
                {`{
  "document_type": "Purchase_Order",
  "air_gap_verified": true,
  "confidence_mean": ${filterMode === 'raw' ? '0.742' : '0.986'},
  "extracted_fields": {
    "po_number": "PO-2024-8842",
    "vendor": "Acme Industrial Supplies",
    "amount_total": "$14,850.00"
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
