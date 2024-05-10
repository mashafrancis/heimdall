import Traces from '@/components/dashboard/traces'
import SectionContainer from '@/components/layout/section-container'
import { PageHeader } from '@/components/page-header'

export default function InsightsPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <SectionContainer>
      <PageHeader
        title="Runtime logs"
        description="A view of your application's runtime logs."
      />
      <Traces id={params.id} />
    </SectionContainer>
  )
}
