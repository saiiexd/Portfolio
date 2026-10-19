'use client'

import { useState } from 'react'
import styles from './DataFlowHero.module.scss'

export default function DataFlowHero() {
  const [activeNode, setActiveNode] = useState<string | null>('eval')

  const nodes = [
    {
      id: 'source',
      x: 60,
      y: 140,
      label: 'DATA STREAM\nIngestion',
      tag: 'Kafka/Parquet',
      color: 'var(--color-text-secondary)',
    },
    {
      id: 'vector',
      x: 210,
      y: 70,
      label: 'VECTOR EMBED\nIndex Cache',
      tag: 'HNSW / Cosine',
      color: 'var(--color-accent)',
    },
    {
      id: 'model',
      x: 210,
      y: 210,
      label: 'FOUNDATION LLM\nInference',
      tag: 'vLLM / PyTorch',
      color: 'var(--color-accent)',
    },
    {
      id: 'eval',
      x: 380,
      y: 140,
      label: 'RELIABILITY HARNESS\nMulti-Stage Referee',
      tag: 'RAGAS / Guardrail',
      color: 'var(--color-signal)',
    },
    {
      id: 'metrics',
      x: 530,
      y: 80,
      label: 'OBSERVABILITY\nAttribution Signals',
      tag: 'Latency: 14ms',
      color: 'var(--color-accent-light)',
    },
    {
      id: 'feedback',
      x: 530,
      y: 200,
      label: 'ACTIVE LEARNING\nFeedback Pipeline',
      tag: 'Curated DPO',
      color: 'var(--color-signal-light)',
    },
  ]

  return (
    <div
      className={styles.wrapper}
      role="region"
      aria-label="Interactive intelligent systems architecture diagram showing data streaming through vector retrieval, foundation models, evaluation harness and telemetry sinks"
    >
      {/* ── Ambient Radial Glows ── */}
      <div className={styles.ambientGlowPrimary} />
      <div className={styles.ambientGlowSecondary} />

      {/* ── Floating Telemetry Badges ── */}
      <div className={`${styles.telemetryTag} ${styles.tagTop}`}>
        <span className={styles.pulseGreen} />
        <span>STREAM INGESTION: 12.4K EVENTS/S</span>
      </div>

      <div className={`${styles.telemetryTag} ${styles.tagBottomRight}`}>
        <span className={styles.pulseGold} />
        <span>EVAL FIDELITY: 94.6% GROUNDED</span>
      </div>

      <svg
        viewBox="0 0 600 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <defs>
          <linearGradient id="heroEdgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(200, 169, 110, 0.2)" />
            <stop offset="50%" stopColor="#c8a96e" />
            <stop offset="100%" stopColor="#38e1d2" />
          </linearGradient>
          <linearGradient id="heroSignalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38e1d2" />
            <stop offset="100%" stopColor="#74ede3" />
          </linearGradient>
          <filter id="heroNodeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── Curved Interconnect Paths ── */}
        <path
          d="M 60 140 C 130 140, 140 70, 210 70"
          stroke="url(#heroEdgeGrad)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          className={styles.dashLine}
        />
        <path
          d="M 60 140 C 130 140, 140 210, 210 210"
          stroke="url(#heroEdgeGrad)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          className={styles.dashLine}
        />
        <path
          d="M 210 70 C 290 70, 300 140, 380 140"
          stroke="url(#heroEdgeGrad)"
          strokeWidth="1.75"
        />
        <path
          d="M 210 210 C 290 210, 300 140, 380 140"
          stroke="url(#heroEdgeGrad)"
          strokeWidth="1.75"
        />
        <path
          d="M 380 140 C 450 140, 460 80, 530 80"
          stroke="url(#heroSignalGrad)"
          strokeWidth="1.5"
        />
        <path
          d="M 380 140 C 450 140, 460 200, 530 200"
          stroke="url(#heroSignalGrad)"
          strokeWidth="1.5"
        />
        {/* Closed-loop feedback cycle */}
        <path
          d="M 530 200 C 480 260, 260 260, 210 210"
          stroke="rgba(200, 169, 110, 0.35)"
          strokeWidth="1.25"
          strokeDasharray="4 4"
          className={styles.dashLine}
        />

        {/* ── Animated Particle Packets ── */}
        <circle r="3" fill="#c8a96e" filter="url(#heroNodeGlow)">
          <animateMotion
            dur="2.8s"
            repeatCount="indefinite"
            path="M 60 140 C 130 140, 140 70, 210 70 C 290 70, 300 140, 380 140"
          />
        </circle>
        <circle r="3" fill="#38e1d2" filter="url(#heroNodeGlow)">
          <animateMotion
            dur="3.2s"
            repeatCount="indefinite"
            path="M 60 140 C 130 140, 140 210, 210 210 C 290 210, 300 140, 380 140 C 450 140, 460 80, 530 80"
          />
        </circle>
        <circle r="2.5" fill="#e2cf9f" filter="url(#heroNodeGlow)">
          <animateMotion
            dur="4.2s"
            repeatCount="indefinite"
            path="M 530 200 C 480 260, 260 260, 210 210"
          />
        </circle>

        {/* ── Interactive Architecture Nodes ── */}
        {nodes.map((node) => {
          const isSelected = activeNode === node.id
          return (
            <g
              key={node.id}
              className={`${styles.nodeGroup} ${isSelected ? styles.selectedNode : ''}`}
              onClick={() => setActiveNode(node.id)}
              onMouseEnter={() => setActiveNode(node.id)}
            >
              {/* Pulsing outer aura ring on selected/signal nodes */}
              {(isSelected || node.id === 'eval') && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={32}
                  fill="none"
                  stroke={node.color}
                  strokeWidth="1"
                  opacity={0.35}
                  className={styles.sonarRing}
                />
              )}

              {/* Base Node Disc */}
              <circle
                cx={node.x}
                cy={node.y}
                r={22}
                fill="#121216"
                stroke={node.color}
                strokeWidth={isSelected ? 2 : 1.25}
                filter="url(#heroNodeGlow)"
              />

              {/* Inner core */}
              <circle cx={node.x} cy={node.y} r={7} fill={node.color} opacity={0.85} />

              {/* Node Labels */}
              {node.label.split('\n').map((line, idx) => (
                <text
                  key={idx}
                  x={node.x}
                  y={node.y + 34 + idx * 11}
                  textAnchor="middle"
                  fill="var(--color-text-primary)"
                  fontSize="8.5"
                  fontWeight="600"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.04em"
                >
                  {line}
                </text>
              ))}

              {/* Mini Tag Pill */}
              <text
                x={node.x}
                y={node.y - 28}
                textAnchor="middle"
                fill="var(--color-text-tertiary)"
                fontSize="7.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.06em"
              >
                [{node.tag}]
              </text>
            </g>
          )
        })}

        {/* Technical baseline watermark */}
        <text
          x="300"
          y="272"
          textAnchor="middle"
          fill="var(--color-text-muted)"
          fontSize="7"
          fontFamily="var(--font-mono)"
          letterSpacing="0.1em"
        >
          AUTONOMOUS DATA &amp; EVALUATION PIPELINE · REALTIME TRACE ACTIVE
        </text>
      </svg>
    </div>
  )
}
