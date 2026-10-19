'use client'

import { useState } from 'react'
import styles from './ExoIntelArchitecture.module.scss'

interface Props {
  mode?: 'full' | 'preview'
}

export default function ExoIntelArchitecture({ mode = 'full' }: Props) {
  const [selectedTarget, setSelectedTarget] = useState<'kepler-452b' | 'koi-7923'>(
    'kepler-452b',
  )

  const targetData = {
    'kepler-452b': {
      name: 'Kepler-452 b (KOI-7016.01)',
      period: '384.84 days',
      depth: '1,820 ppm (0.182%)',
      radius: '1.63 R⊕ (Super-Earth)',
      equilibriumTemp: '265 K (-8 °C)',
      confidence: '96.4% Candidate',
      classification: 'CONFIRMED PLANETARY CANDIDATE',
      isExoplanet: true,
    },
    'koi-7923': {
      name: 'KOI-7923.01 (TESS Candidate)',
      period: '395.12 days',
      depth: '2,140 ppm (0.214%)',
      radius: '1.97 R⊕ (Sub-Neptune)',
      equilibriumTemp: '243 K (-30 °C)',
      confidence: '91.8% Candidate',
      classification: 'HIGH-PRIORITY CANDIDATE',
      isExoplanet: true,
    },
  }[selectedTarget]

  return (
    <div className={`${styles.wrapper} ${mode === 'preview' ? styles.previewMode : ''}`}>
      {/* ── Scientific Telemetry Header ── */}
      <div className={styles.telemetryBar}>
        <div className={styles.statusPill}>
          <span className={styles.pulseDot} />
          <span className={styles.systemName}>EXOPLANET TRANSIT PHOTOMETRY PIPELINE</span>
          <span className={styles.missionTag}>NASA Kepler / TESS Data</span>
        </div>
        <div className={styles.telemetryStats}>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>DATA ARCHIVE</span>
            <span className={styles.statVal}>NASA Exoplanet Archive</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>SIGNAL EXTRACTION</span>
            <span className={styles.statVal}>BLS Period Fold</span>
          </span>
          <span className={styles.statItem}>
            <span className={styles.statLabel}>CLASSIFIER</span>
            <span className={`${styles.statVal} ${styles.highlight}`}>Tree Ensemble</span>
          </span>
        </div>
      </div>

      {/* ── Visual Scientific Exploration Canvas ── */}
      <div className={styles.scienceGrid}>
        {/* Left: Planetary Transit Geometry Simulation */}
        <div className={styles.transitVisual}>
          <div className={styles.subHeader}>
            <span className={styles.geoLabel}>TRANSIT GEOMETRY &amp; LIMB DARKENING</span>
            <span className={styles.targetPill}>{targetData.name}</span>
          </div>

          <div className={styles.orbitCanvas}>
            <svg
              viewBox="0 0 380 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.orbitSvg}
            >
              {/* Host Star with Monochrome Gradient */}
              <defs>
                <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#bdbdbd" />
                  <stop offset="100%" stopColor="#454545" />
                </radialGradient>
                <filter id="starHalo" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <circle
                cx="190"
                cy="100"
                r="54"
                fill="url(#starGlow)"
                filter="url(#starHalo)"
              />

              {/* Orbital Track */}
              <ellipse
                cx="190"
                cy="100"
                rx="140"
                ry="24"
                stroke="var(--color-border-accent)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* Transiting Planet with Animation */}
              <circle r="7" fill="#111111" stroke="#ffffff" strokeWidth="1.5">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path="M 50 100 Q 190 120 330 100 Q 190 80 50 100"
                />
              </circle>
            </svg>

            <div className={styles.transitAnnotation}>
              <span>$\Delta F / F \propto (R_p / R_*)^2$</span>
              <span className={styles.depthVal}>Dip Depth: {targetData.depth}</span>
            </div>
          </div>
        </div>

        {/* Right: Phase-Folded Light Curve */}
        <div className={styles.lightCurveCard}>
          <div className={styles.subHeader}>
            <span className={styles.geoLabel}>PHASE-FOLDED NORMALIZED FLUX</span>
            <span className={styles.periodPill}>P = {targetData.period}</span>
          </div>

          <div className={styles.graphContainer}>
            <svg
              viewBox="0 0 400 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.curveSvg}
            >
              {/* Grid Lines */}
              <line x1="40" y1="30" x2="380" y2="30" stroke="var(--color-border-muted)" />
              <line x1="40" y1="80" x2="380" y2="80" stroke="var(--color-border-muted)" />
              <line
                x1="40"
                y1="130"
                x2="380"
                y2="130"
                stroke="var(--color-border-muted)"
              />

              {/* Light Curve Dip Path */}
              <path
                d="M 40 40 L 140 40 C 160 40, 175 125, 200 125 C 225 125, 240 40, 260 40 L 380 40"
                stroke="var(--color-ink)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Scattered Photometry Sample Points */}
              {[
                { x: 55, y: 38 },
                { x: 80, y: 43 },
                { x: 105, y: 39 },
                { x: 125, y: 42 },
                { x: 155, y: 65 },
                { x: 170, y: 100 },
                { x: 190, y: 126 },
                { x: 210, y: 124 },
                { x: 230, y: 95 },
                { x: 245, y: 62 },
                { x: 275, y: 41 },
                { x: 300, y: 38 },
                { x: 330, y: 43 },
                { x: 360, y: 39 },
              ].map((pt, i) => (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r="2"
                  fill="var(--color-graphite)"
                  opacity="0.75"
                />
              ))}

              {/* Annotation labels */}
              <text
                x="35"
                y="44"
                fill="var(--color-text-tertiary)"
                fontSize="8"
                fontFamily="var(--font-mono)"
                textAnchor="end"
              >
                1.000
              </text>
              <text
                x="35"
                y="128"
                fill="var(--color-text-tertiary)"
                fontSize="8"
                fontFamily="var(--font-mono)"
                textAnchor="end"
              >
                0.998
              </text>
              <text
                x="200"
                y="152"
                fill="var(--color-ink)"
                fontSize="8"
                fontFamily="var(--font-mono)"
                textAnchor="middle"
              >
                Transit Midpoint (t₀ = 0.0)
              </text>
            </svg>
          </div>

          <div className={styles.verdictBar}>
            <div className={styles.verdictLeft}>
              <span className={styles.modelTag}>XGBOOST + 1D-CNN ENSEMBLE:</span>
              <span className={styles.verdictText}>{targetData.classification}</span>
            </div>
            <span className={styles.confBadge}>{targetData.confidence}</span>
          </div>
        </div>
      </div>

      {/* ── Interactive Target Selector (Full View) ── */}
      {mode === 'full' && (
        <div className={styles.selectorBar}>
          <span className={styles.selLabel}>INSPECT TARGET TRANSIT PHOTOMETRY:</span>
          <div className={styles.btnRow}>
            <button
              type="button"
              className={`${styles.selBtn} ${selectedTarget === 'kepler-452b' ? styles.selActive : ''}`}
              onClick={() => setSelectedTarget('kepler-452b')}
            >
              Kepler-452 b (Super-Earth habitable-zone candidate)
            </button>
            <button
              type="button"
              className={`${styles.selBtn} ${selectedTarget === 'koi-7923' ? styles.selActive : ''}`}
              onClick={() => setSelectedTarget('koi-7923')}
            >
              KOI-7923.01 (Cold terrestrial analog candidate)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
