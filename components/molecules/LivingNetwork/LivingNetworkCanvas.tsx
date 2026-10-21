'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { PROJECTS } from '@/content/projects'
import type { ProjectData } from '@/types'
import styles from './LivingNetworkCanvas.module.scss'

export interface NetworkNode {
  id: string
  label: string
  category: 'llm-genai' | 'backend-systems' | 'ml-data' | 'analytics'
  type: 'domain' | 'project'
  projectData?: ProjectData
  x: number
  y: number
  vx: number
  vy: number
  baseX: number
  baseY: number
  radius: number
  active: boolean
}

export interface NetworkEdge {
  source: string
  target: string
  strength: number
}

interface Props {
  onSelectProject?: (project: ProjectData | null) => void
  onSelectDomain?: (domain: string | null) => void
  selectedProjectId?: string | null
  selectedDomainId?: string | null
  mode?: 'hero' | 'standalone'
}

const DOMAIN_NODES = [
  {
    id: 'domain-ai',
    label: 'Applied AI & GenAI',
    code: 'AI_01',
    category: 'llm-genai' as const,
    relX: 0.22,
    relY: 0.32,
    radius: 20,
  },
  {
    id: 'domain-dist',
    label: 'Distributed Systems',
    code: 'DIST_02',
    category: 'backend-systems' as const,
    relX: 0.78,
    relY: 0.28,
    radius: 20,
  },
  {
    id: 'domain-stream',
    label: 'ML & Streaming',
    code: 'STREAM_03',
    category: 'ml-data' as const,
    relX: 0.3,
    relY: 0.72,
    radius: 18,
  },
  {
    id: 'domain-analytics',
    label: 'Data & Computer Vision',
    code: 'DATA_04',
    category: 'analytics' as const,
    relX: 0.74,
    relY: 0.74,
    radius: 18,
  },
]

export default function LivingNetworkCanvas({
  onSelectProject,
  onSelectDomain,
  selectedProjectId,
  selectedDomainId,
  mode = 'hero',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null)
  const [internalSelection, setInternalSelection] = useState<NetworkNode | null>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  // Track cursor position
  const mouseRef = useRef<{ x: number; y: number; isDown: boolean; isInside: boolean }>({
    x: -9999,
    y: -9999,
    isDown: false,
    isInside: false,
  })

  // Synchronize selection via pure useMemo to prevent cascading re-renders
  const activeSelection = useMemo<NetworkNode | null>(() => {
    if (selectedProjectId) {
      const proj = PROJECTS.find((p) => p.slug === selectedProjectId)
      if (proj) {
        return {
          id: proj.slug,
          label: proj.title,
          category: proj.category as any,
          type: 'project',
          projectData: proj,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          baseX: 0,
          baseY: 0,
          radius: 10,
          active: true,
        }
      }
    }
    if (selectedDomainId) {
      const d = DOMAIN_NODES.find(
        (item) => item.category === selectedDomainId || item.id === selectedDomainId,
      )
      if (d) {
        return {
          id: d.id,
          label: d.label,
          category: d.category,
          type: 'domain',
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          baseX: 0,
          baseY: 0,
          radius: d.radius,
          active: true,
        }
      }
    }
    return internalSelection
  }, [selectedProjectId, selectedDomainId, internalSelection])

  // Build initial graph nodes and edges
  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: NetworkNode[] = []
    const edges: NetworkEdge[] = []

    // 1. Add Domain Hubs
    DOMAIN_NODES.forEach((d) => {
      nodes.push({
        id: d.id,
        label: d.label,
        category: d.category,
        type: 'domain',
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        baseX: d.relX,
        baseY: d.relY,
        radius: d.radius,
        active: false,
      })
    })

    // 2. Add Project Nodes clustered around their domain
    const categoryCounts: Record<string, number> = {}

    PROJECTS.forEach((proj) => {
      const cat = proj.category
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
      const count = categoryCounts[cat]
      const domainNode = DOMAIN_NODES.find((d) => d.category === cat) || DOMAIN_NODES[0]

      // Radial distribution around the domain hub
      const angle = count * 1.57 + (cat === 'backend-systems' ? 0.8 : 0.3)
      const dist = 0.16 + (count % 2 === 0 ? 0.05 : -0.03)

      const baseX = Math.max(
        0.08,
        Math.min(0.92, domainNode.relX + Math.cos(angle) * dist),
      )
      const baseY = Math.max(
        0.12,
        Math.min(0.88, domainNode.relY + Math.sin(angle) * dist),
      )

      nodes.push({
        id: proj.slug,
        label: proj.title,
        category: proj.category as any,
        type: 'project',
        projectData: proj,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        baseX,
        baseY,
        radius: 9,
        active: false,
      })

      // Primary connection: Project -> Domain Hub
      edges.push({
        source: domainNode.id,
        target: proj.slug,
        strength: 0.85,
      })
    })

    // 3. Cross-domain engineering architectural ties
    edges.push(
      // Distributed Streaming <-> Real-Time Fraud Detection (Kafka stream shared pattern)
      {
        source: 'distributed-event-streaming',
        target: 'real-time-fraud-detection',
        strength: 0.6,
      },
      // Distributed Task Queue <-> AI Workspace (Asynchronous batch processing)
      { source: 'distributed-task-queue', target: 'ai-workspace', strength: 0.5 },
      // LLM Evaluation Platform <-> Verdict AI (Model output assessment & verification)
      { source: 'llm-eval-platform', target: 'verdict-ai', strength: 0.65 },
      // Workflow Orchestrator <-> Business Analytics (Topological pipeline execution)
      { source: 'workflow-orchestrator', target: 'business-analytics', strength: 0.45 },
      // Domain-to-Domain core architecture bridge
      { source: 'domain-ai', target: 'domain-dist', strength: 0.4 },
      { source: 'domain-ai', target: 'domain-stream', strength: 0.4 },
      { source: 'domain-dist', target: 'domain-analytics', strength: 0.35 },
    )

    return { initialNodes: nodes, initialEdges: edges }
  }, [])

  // Canvas render and physics simulation
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Reduced motion check
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleMotionChange)

    let width = (canvas.width = container.clientWidth)
    let height = (canvas.height = container.clientHeight)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      if (!container || !canvas) return
      width = container.clientWidth
      height = container.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)

      // Reposition nodes to absolute canvas coords
      initialNodes.forEach((node) => {
        node.x = node.baseX * width
        node.y = node.baseY * height
      })
    }

    resize()
    window.addEventListener('resize', resize)

    // Animated signal particles traversing edges
    const signals: Array<{
      edgeIndex: number
      progress: number
      speed: number
    }> = []

    for (let i = 0; i < 18; i++) {
      signals.push({
        edgeIndex: Math.floor(Math.random() * initialEdges.length),
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
      })
    }

    let time = 0

    // Render loop
    const render = () => {
      time += 0.02
      ctx.clearRect(0, 0, width, height)

      // ── 1. Subtle Coordinate Grid Overlay ──
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
      ctx.lineWidth = 1
      const gridSize = 48
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Physics: gentle harmonic drift + mouse repulsion/spring
      initialNodes.forEach((node, i) => {
        const targetX =
          node.baseX * width + (isReducedMotion ? 0 : Math.sin(time + i) * 6)
        const targetY =
          node.baseY * height + (isReducedMotion ? 0 : Math.cos(time * 0.8 + i * 1.5) * 6)

        // Spring toward base position
        const ax = (targetX - node.x) * 0.05
        const ay = (targetY - node.y) * 0.05
        node.vx = (node.vx + ax) * 0.82
        node.vy = (node.vy + ay) * 0.82

        // Mouse interaction
        if (mouseRef.current.isInside) {
          const dx = node.x - mouseRef.current.x
          const dy = node.y - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120
            node.vx += (dx / dist) * force * 1.8
            node.vy += (dy / dist) * force * 1.8
          }
        }

        node.x += node.vx
        node.y += node.vy
      })

      // ── 2. Render Topological Edges ──
      initialEdges.forEach((edge) => {
        const sourceNode = initialNodes.find((n) => n.id === edge.source)
        const targetNode = initialNodes.find((n) => n.id === edge.target)
        if (!sourceNode || !targetNode) return

        const isSourceSelected = activeSelection?.id === sourceNode.id
        const isTargetSelected = activeSelection?.id === targetNode.id
        const isDomainActive =
          activeSelection?.type === 'domain' &&
          (sourceNode.category === activeSelection.category ||
            targetNode.category === activeSelection.category)

        const isHighlighted = isSourceSelected || isTargetSelected || isDomainActive

        ctx.beginPath()
        ctx.moveTo(sourceNode.x, sourceNode.y)
        ctx.lineTo(targetNode.x, targetNode.y)

        if (isHighlighted) {
          ctx.strokeStyle = '#ffffff'
          ctx.lineWidth = 1.75
          ctx.setLineDash([])
        } else if (activeSelection) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)'
          ctx.lineWidth = 1
          ctx.setLineDash([3, 4])
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)'
          ctx.lineWidth = 1.1
          ctx.setLineDash([4, 4])
        }
        ctx.stroke()
        ctx.setLineDash([])
      })

      // ── 3. Render Animated Data Packets ──
      if (!isReducedMotion) {
        signals.forEach((sig) => {
          sig.progress += sig.speed
          if (sig.progress >= 1) {
            sig.progress = 0
            sig.edgeIndex = Math.floor(Math.random() * initialEdges.length)
          }

          const edge = initialEdges[sig.edgeIndex]
          if (!edge) return
          const sourceNode = initialNodes.find((n) => n.id === edge.source)
          const targetNode = initialNodes.find((n) => n.id === edge.target)
          if (!sourceNode || !targetNode) return

          const px = sourceNode.x + (targetNode.x - sourceNode.x) * sig.progress
          const py = sourceNode.y + (targetNode.y - sourceNode.y) * sig.progress

          ctx.beginPath()
          ctx.arc(px, py, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = '#ffffff'
          ctx.shadowColor = '#ffffff'
          ctx.shadowBlur = 6
          ctx.fill()
          ctx.shadowBlur = 0
        })
      }

      // ── 4. Render Nodes ──
      initialNodes.forEach((node) => {
        const isHovered = hoveredNode?.id === node.id
        const isSelected = activeSelection?.id === node.id
        const isDomainActive =
          activeSelection?.type === 'domain' && node.category === activeSelection.category
        const isDimmed =
          activeSelection &&
          !isSelected &&
          !isDomainActive &&
          node.id !== activeSelection.id

        ctx.save()
        ctx.translate(node.x, node.y)

        // Dimmed opacity for non-selected nodes
        if (isDimmed) {
          ctx.globalAlpha = 0.28
        }

        if (node.type === 'domain') {
          // Domain Hub Node: Concentric Rings + Solid Core
          ctx.beginPath()
          ctx.arc(0, 0, node.radius + (isSelected ? 8 : 4), 0, Math.PI * 2)
          ctx.strokeStyle =
            isSelected || isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.35)'
          ctx.lineWidth = isSelected ? 2 : 1
          ctx.stroke()

          // Pulsing aura ring
          if (!isReducedMotion && (isSelected || isHovered)) {
            const auraR = node.radius + 12 + Math.sin(time * 3) * 3
            ctx.beginPath()
            ctx.arc(0, 0, auraR, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
            ctx.stroke()
          }

          // Node body
          ctx.beginPath()
          ctx.arc(0, 0, node.radius, 0, Math.PI * 2)
          ctx.fillStyle = isSelected ? '#ffffff' : '#111111'
          ctx.strokeStyle = '#ffffff'
          ctx.lineWidth = 1.5
          ctx.fill()
          ctx.stroke()

          // Inner center dot
          ctx.beginPath()
          ctx.arc(0, 0, 4, 0, Math.PI * 2)
          ctx.fillStyle = isSelected ? '#111111' : '#ffffff'
          ctx.fill()

          // Text Label
          ctx.font = '600 10px monospace'
          ctx.fillStyle = '#ffffff'
          ctx.textAlign = 'center'
          ctx.fillText(node.label.toUpperCase(), 0, node.radius + 16)
        } else {
          // Project Node
          const r = node.radius + (isSelected ? 3 : 0)

          // Selection Halo
          if (isSelected || isHovered) {
            ctx.beginPath()
            ctx.arc(0, 0, r + 6, 0, Math.PI * 2)
            ctx.strokeStyle = '#ffffff'
            ctx.lineWidth = 1
            ctx.stroke()
          }

          // Project Body
          ctx.beginPath()
          ctx.arc(0, 0, r, 0, Math.PI * 2)
          ctx.fillStyle = isSelected ? '#ffffff' : '#161616'
          ctx.strokeStyle =
            isHovered || isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.4)'
          ctx.lineWidth = 1.25
          ctx.fill()
          ctx.stroke()

          // Inner Core
          ctx.beginPath()
          ctx.arc(0, 0, 3, 0, Math.PI * 2)
          ctx.fillStyle = isSelected ? '#111111' : '#bdbdbd'
          ctx.fill()

          // Text Label (abbreviated or title)
          ctx.font = '500 9px monospace'
          ctx.fillStyle =
            isSelected || isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.65)'
          ctx.textAlign = 'center'
          const displayLabel =
            node.label.length > 20 ? `${node.label.slice(0, 18)}..` : node.label
          ctx.fillText(displayLabel, 0, r + 13)
        }

        ctx.restore()
      })

      animFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      mediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [initialNodes, initialEdges, activeSelection, hoveredNode, isReducedMotion])

  // Mouse & Touch interaction handlers
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      mouseRef.current.x = x
      mouseRef.current.y = y
      mouseRef.current.isInside = true

      // Hit test nodes
      let found: NetworkNode | null = null
      for (const node of initialNodes) {
        const dx = node.x - x
        const dy = node.y - y
        const hitRadius = node.radius + 12
        if (dx * dx + dy * dy <= hitRadius * hitRadius) {
          found = node
          break
        }
      }

      setHoveredNode(found)
    },
    [initialNodes],
  )

  const handlePointerLeave = useCallback(() => {
    mouseRef.current.isInside = false
    setHoveredNode(null)
  }, [])

  const handlePointerClick = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      let clicked: NetworkNode | null = null
      for (const node of initialNodes) {
        const dx = node.x - x
        const dy = node.y - y
        const hitRadius = node.radius + 14
        if (dx * dx + dy * dy <= hitRadius * hitRadius) {
          clicked = node
          break
        }
      }

      if (clicked) {
        setInternalSelection(clicked)
        if (clicked.type === 'project' && clicked.projectData) {
          onSelectProject?.(clicked.projectData)
          onSelectDomain?.(null)
        } else if (clicked.type === 'domain') {
          onSelectDomain?.(clicked.category)
          onSelectProject?.(null)
        }
      } else {
        // Click on background resets
        setInternalSelection(null)
        onSelectProject?.(null)
        onSelectDomain?.(null)
      }
    },
    [initialNodes, onSelectProject, onSelectDomain],
  )

  const resetSelection = useCallback(() => {
    setInternalSelection(null)
    onSelectProject?.(null)
    onSelectDomain?.(null)
  }, [onSelectProject, onSelectDomain])

  return (
    <div
      ref={containerRef}
      className={`${styles.canvasWrapper} ${mode === 'hero' ? styles.heroMode : styles.standaloneMode}`}
      aria-label="Interactive Living Network topology canvas. Tap or click nodes to inspect systems and relationships."
    >
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerClick}
      />

      {/* Network Header HUD */}
      <div className={styles.hudOverlayTop}>
        <div className={styles.statusIndicator}>
          <span className={styles.pulseDot} />
          <span className={styles.hudMono}>
            THE LIVING NETWORK // ARCHITECTURAL TOPOLOGY
          </span>
        </div>
        <div className={styles.hudStats}>
          <span>4 DOMAINS</span>
          <span className={styles.divider}>·</span>
          <span>12 VERIFIED NODES</span>
          <span className={styles.divider}>·</span>
          <span>ACTIVE SIGNALS</span>
        </div>
      </div>

      {/* Floating Controls HUD */}
      <div className={styles.hudOverlayBottom}>
        <div className={styles.domainFilters}>
          <button
            type="button"
            className={`${styles.filterBtn} ${!activeSelection ? styles.filterActive : ''}`}
            onClick={resetSelection}
          >
            All 12 Systems
          </button>
          {DOMAIN_NODES.map((d) => (
            <button
              key={d.id}
              type="button"
              className={`${styles.filterBtn} ${
                activeSelection?.category === d.category ? styles.filterActive : ''
              }`}
              onClick={() => {
                const node = initialNodes.find((n) => n.id === d.id)
                if (node) {
                  setInternalSelection(node)
                  onSelectDomain?.(d.category)
                  onSelectProject?.(null)
                }
              }}
            >
              {d.code} {'//'} {d.label}
            </button>
          ))}
        </div>

        {activeSelection && (
          <button type="button" className={styles.resetBtn} onClick={resetSelection}>
            Reset Matrix ↺
          </button>
        )}
      </div>

      {/* Hover tooltip */}
      {hoveredNode && (
        <div
          className={styles.nodeTooltip}
          style={{ left: hoveredNode.x, top: hoveredNode.y - hoveredNode.radius - 28 }}
        >
          <span className={styles.tooltipType}>
            {hoveredNode.type === 'domain' ? 'DOMAIN HUB' : 'SYSTEM NODE'}
          </span>
          <span className={styles.tooltipLabel}>{hoveredNode.label}</span>
        </div>
      )}
    </div>
  )
}
