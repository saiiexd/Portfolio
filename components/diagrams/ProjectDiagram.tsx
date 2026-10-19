'use client'

import dynamic from 'next/dynamic'

const EvalPipelineDiagram = dynamic(
  () => import('./EvalPipelineDiagram/EvalPipelineDiagram'),
  { ssr: true },
)

const TaskQueueDiagram = dynamic(() => import('./TaskQueueDiagram/TaskQueueDiagram'), {
  ssr: true,
})

const WorkflowOrchestratorDiagram = dynamic(
  () => import('./WorkflowOrchestratorDiagram/WorkflowOrchestratorDiagram'),
  { ssr: true },
)

const FraudDetectionFlow = dynamic(
  () => import('./FraudDetectionFlow/FraudDetectionFlow'),
  { ssr: true },
)

const AnalyticsDashboardPreview = dynamic(
  () => import('./AnalyticsDashboardPreview/AnalyticsDashboardPreview'),
  { ssr: true },
)

const ExoIntelArchitecture = dynamic(
  () => import('./ExoIntelArchitecture/ExoIntelArchitecture'),
  { ssr: true },
)

const VerdictAiDiagram = dynamic(() => import('./VerdictAiDiagram/VerdictAiDiagram'), {
  ssr: true,
})

const AiWorkspaceDiagram = dynamic(
  () => import('./AiWorkspaceDiagram/AiWorkspaceDiagram'),
  { ssr: true },
)

const DistributedStreamingDiagram = dynamic(
  () => import('./DistributedStreamingDiagram/DistributedStreamingDiagram'),
  { ssr: true },
)

const RagFirstPrinciplesDiagram = dynamic(
  () => import('./RagFirstPrinciplesDiagram/RagFirstPrinciplesDiagram'),
  { ssr: true },
)

const OfflineOcrDiagram = dynamic(() => import('./OfflineOcrDiagram/OfflineOcrDiagram'), {
  ssr: true,
})

const RetailAnalyticsDiagram = dynamic(
  () => import('./RetailAnalyticsDiagram/RetailAnalyticsDiagram'),
  { ssr: true },
)

interface Props {
  componentName?: string
  slug?: string
  mode?: 'full' | 'preview'
}

export default function ProjectDiagram({ componentName, slug, mode = 'full' }: Props) {
  const target = componentName || slug

  switch (target) {
    case 'EvalPipelineDiagram':
    case 'llm-eval-platform':
      return <EvalPipelineDiagram mode={mode} />

    case 'TaskQueueDiagram':
    case 'distributed-task-queue':
      return <TaskQueueDiagram mode={mode} />

    case 'WorkflowOrchestratorDiagram':
    case 'workflow-orchestrator':
      return <WorkflowOrchestratorDiagram mode={mode} />

    case 'FraudDetectionFlow':
    case 'real-time-fraud-detection':
    case 'fraud-detection':
      return <FraudDetectionFlow mode={mode} />

    case 'AnalyticsDashboardPreview':
    case 'business-analytics':
      return <AnalyticsDashboardPreview mode={mode} />

    case 'ExoIntelArchitecture':
    case 'exointel':
      return <ExoIntelArchitecture mode={mode} />

    case 'VerdictAiDiagram':
    case 'verdict-ai':
      return <VerdictAiDiagram mode={mode} />

    case 'AiWorkspaceDiagram':
    case 'ai-workspace':
      return <AiWorkspaceDiagram mode={mode} />

    case 'DistributedStreamingDiagram':
    case 'distributed-event-streaming':
      return <DistributedStreamingDiagram mode={mode} />

    case 'RagFirstPrinciplesDiagram':
    case 'rag-from-scratch':
      return <RagFirstPrinciplesDiagram mode={mode} />

    case 'OfflineOcrDiagram':
    case 'offline-ocr':
      return <OfflineOcrDiagram mode={mode} />

    case 'RetailAnalyticsDiagram':
    case 'retail-analytics':
      return <RetailAnalyticsDiagram mode={mode} />

    default:
      return null
  }
}
