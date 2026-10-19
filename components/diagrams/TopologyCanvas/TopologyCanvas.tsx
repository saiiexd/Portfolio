'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import styles from './TopologyCanvas.module.scss'

export default function TopologyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 180

    let renderer: THREE.WebGLRenderer | null = null
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
    } catch {
      // WebGL not supported, gracefully exit
      return
    }

    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Build neural / distributed node geometry
    const particleCount = 120
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const originalPositions = new Float32Array(particleCount * 3)

    // Distribute on sphere surface with subtle noise
    const radius = 55
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount)
      const theta = Math.sqrt(particleCount * Math.PI) * phi

      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(phi)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // Monochromatic particles
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x111111,
      size: 3.5,
      transparent: true,
      opacity: 0.85,
    })

    const pointCloud = new THREE.Points(geometry, particleMaterial)
    scene.add(pointCloud)

    // Connecting lines between nearby nodes
    const maxDistance = 24
    const lineIndices: number[] = []

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < maxDistance) {
          lineIndices.push(i, j)
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    lineGeometry.setIndex(lineIndices)

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x454545,
      transparent: true,
      opacity: 0.28,
      linewidth: 1,
    })

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lineMesh)

    // Inner wireframe core (representing distributed cluster consensus core)
    const coreGeo = new THREE.IcosahedronGeometry(22, 1)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x111111,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    scene.add(coreMesh)

    // Pointer interactivity
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      targetX = (x / rect.width) * 0.9
      targetY = (y / rect.height) * 0.9
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true })

    // Pause rendering when out of viewport for peak performance
    let isVisible = true
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting
      },
      { threshold: 0.05 },
    )
    observer.observe(container)

    // Animation Loop
    let clock = new THREE.Clock()
    let animId: number

    const animate = () => {
      animId = requestAnimationFrame(animate)
      if (!isVisible) return

      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      // Smooth mouse damping
      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05

      // Rotations
      pointCloud.rotation.y += 0.003
      pointCloud.rotation.x = mouseY * 0.6
      pointCloud.rotation.y += mouseX * 0.02

      lineMesh.rotation.y = pointCloud.rotation.y
      lineMesh.rotation.x = pointCloud.rotation.x

      coreMesh.rotation.y -= 0.005
      coreMesh.rotation.x += 0.002

      // Subtle breathing harmonic wave on positions
      const posAttr = geometry.attributes.position as THREE.BufferAttribute
      const array = posAttr.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        const ox = originalPositions[i * 3]
        const oy = originalPositions[i * 3 + 1]
        const oz = originalPositions[i * 3 + 2]

        const wave = Math.sin(time * 1.5 + i * 0.1) * 1.8
        const scale = 1 + wave / 55

        array[i * 3] = ox * scale
        array[i * 3 + 1] = oy * scale
        array[i * 3 + 2] = oz * scale
      }

      posAttr.needsUpdate = true
      lineGeometry.attributes.position.needsUpdate = true

      renderer?.render(scene, camera)
    }

    animate()

    // Handle Resize
    const onResize = () => {
      if (!container || !renderer) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('resize', onResize)
      observer.disconnect()

      if (renderer && renderer.domElement && container) {
        container.removeChild(renderer.domElement)
        renderer.dispose()
      }
      geometry.dispose()
      particleMaterial.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      coreGeo.dispose()
      coreMat.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={styles.canvasContainer}
      aria-label="Interactive 3D Distributed Neural Lattice Simulation"
    />
  )
}
