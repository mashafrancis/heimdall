import Search from '@/components/search';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WebsiteCreateButton } from '@/components/website-create-button';
import WebsitesCards from '@/components/websites-list';
import { getWebsite } from '@/server/query/website';
import { LayoutGrid, List } from 'lucide-react';

export default async function DashboardPage() {
	const { userWebsites, teamWebsites } = await getWebsite();
	const websites = userWebsites.concat(teamWebsites);

	return (
		<>
			<Tabs defaultValue='card' className='w-full'>
				<div className='flex items-center justify-items-stretch gap-2 px-0'>
					<Search />
					<TabsList className='grid h-10 grid-cols-2'>
						<TabsTrigger value='card'>
							<LayoutGrid size={18} />
						</TabsTrigger>
						<TabsTrigger value='list'>
							<List size={18} />
						</TabsTrigger>
					</TabsList>
					{websites?.length ? <WebsiteCreateButton /> : null}
				</div>
				<TabsContent value='card'>
					<WebsitesCards websites={websites} />
				</TabsContent>
				<TabsContent value='list'>
					<WebsitesCards websites={websites} />
				</TabsContent>
			</Tabs>
		</>
	);
}
