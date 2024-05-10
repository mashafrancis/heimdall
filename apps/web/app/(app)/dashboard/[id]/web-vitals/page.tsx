import Traces from '@/components/dashboard/traces'
import SectionContainer from '@/components/layout/section-container'
import { PageHeader } from '@/components/page-header'

export default function WebVitalsPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <SectionContainer>
      <div>{`Web vitals for ${params.id}`}</div>
      <PageHeader
        title="Runtime logs"
        description="A view of your application's runtime logs."
      />
      <Traces id={params.id} />
    </SectionContainer>
  )
}
