import Events from '@/components/dashboard/events'
import SectionContainer from '@/components/layout/section-container'
import { PageHeader } from '@/components/page-header'

export default function InsightsPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <SectionContainer className="sm:py-12 py-14 md:py-12 lg:py-16">
      <PageHeader
        title="Runtime logs"
        description="A view of your application's runtime logs."
      />
      <Events websiteId={params.id} />
    </SectionContainer>
  )
}
