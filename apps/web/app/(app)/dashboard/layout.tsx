import { redirect } from 'next/navigation';

import { ReactNode } from 'react';

import BottomNavigation from '@/components/bottom-navigation';
import { MobileDashboardHeader } from '@/components/header';
import { SideNav } from '@/components/side-nav';
import { StoreSetter } from '@/components/store-setter';
import { dashboardConfig } from '@/config/dashboard';
import { getCurrentUser } from '@/lib/session';
import { getTeams } from '@/server/query';
import { getWebsite } from '@/server/query/website';

export const dynamic = 'force-dynamic';

interface DashboardLayoutProps {
	children: ReactNode;
}

export default async function DashboardWebsiteLayout({
	children,
}: DashboardLayoutProps) {
	const user = await getCurrentUser();
	if (!user) {
		return redirect('/login');
	}

	const [{ userWebsites, teamWebsites }, teams] = await Promise.all([
		getWebsite(),
		getTeams(),
	]);

	const websites = userWebsites.concat(teamWebsites);

	return (
		<>
			<StoreSetter store='website' data={websites} />
			<StoreSetter store='user' data={user} />
			<StoreSetter store='teamWebsites' data={teamWebsites} />
			<StoreSetter store='userWebsites' data={userWebsites} />
			<StoreSetter store='teams' data={teams} />
			<main className='flex min-h-screen w-full flex-col items-center justify-center space-y-6 bg-muted p-4 md:p-0'>
				<MobileDashboardHeader user={user} items={dashboardConfig.projectNav} />
				<SideNav items={dashboardConfig.sideNav} user={user} />
				<div className='flex w-full max-w-[calc(95ch+8rem)] flex-1 flex-row justify-center'>
					{children}
				</div>
				<BottomNavigation items={dashboardConfig.sideNav} />
			</main>
		</>
	);
}
