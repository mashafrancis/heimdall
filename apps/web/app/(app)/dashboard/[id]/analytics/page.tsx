import Traces from '@/components/dashboard/traces'
import SectionContainer from '@/components/layout/section-container'
import { PageHeader } from '@/components/page-header'

export default function AnalyticsPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <SectionContainer>
      <PageHeader
        title="Web analytics"
        description="Track and analyze your website traffic and user behavior."
      />
      <Traces id={params.id} />
    </SectionContainer>
  )
}
