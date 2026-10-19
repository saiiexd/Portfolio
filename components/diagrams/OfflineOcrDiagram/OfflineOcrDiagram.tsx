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
              Air-Gapped Local (Zero Cloud Calls)
            </span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>PREPROCESSING</span>
            <span className={styles.statVal}>OpenCV Gaussian Adaptive</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>OCR ENGINE</span>
            <span className={styles.statVal}>Tesseract 5 Local Executable</span>
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
            <p className={styles.nodeDesc}>Local image file upload (PNG, JPG, TIFF)</p>
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
              Grayscale, Gaussian blur (5x5), adaptive thresholding
            </p>
            <div className={styles.nodeMeta}>Gaussian C Binarization</div>
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
              Local tesseract.exe execution via pytesseract wrapper
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
            <div className={styles.nodeTitle}>Text &amp; JSON</div>
            <p className={styles.nodeDesc}>
              Plaintext extraction and structured JSON formatting
            </p>
            <div className={styles.nodeMeta}>Streamlit / File Export</div>
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
                Pass 2: OpenCV Binarized &amp; Filtered ★
              </button>
            </div>
          </div>

          <div className={styles.cvDisplay}>
            <div className={styles.filterMetrics}>
              <div className={styles.metricItem}>
                <span className={styles.metricKey}>BACKGROUND NOISE</span>
                <span className={styles.metricVal}>
                  {filterMode === 'raw'
                    ? 'Unfiltered Scan Artifacts'
                    : 'Suppressed by Gaussian Blur'}
                </span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricKey}>BINARIZATION METHOD</span>
                <span className={styles.metricVal}>
                  {filterMode === 'raw'
                    ? 'None (Multi-channel RGB)'
                    : 'cv2.adaptiveThreshold (Gaussian C)'}
                </span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricKey}>EXTRACTION READINESS</span>
                <span className={styles.metricVal}>
                  {filterMode === 'raw'
                    ? 'Variable (Noise dependent)'
                    : 'Clean High-Contrast Characters'}
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
  "preprocessing": "${filterMode === 'raw' ? 'none' : 'cv2_gaussian_adaptive'}",
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
