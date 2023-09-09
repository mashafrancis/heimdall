import { useState } from 'react';

import { NextLink } from '@/components/arrow-button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Website as WebsiteType } from '@heimdall-logs/types/models';
import { MoreVertical, User2 } from 'lucide-react';

interface WebsiteProps {
	site: WebsiteType;
	visitors: number;
	setSelected: (id: string) => void;
	setIsOpen: (state: boolean) => void;
}

export function Website({
	site,
	visitors,
	setSelected,
	setIsOpen,
}: WebsiteProps) {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<Card className='rounded-xl shadow-none @container/card'>
			<CardHeader className='p-4 md:p-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-base md:text-lg'>{site.title}</h3>
					<MoreVertical
						className='cursor-pointer'
						size={18}
						onClick={() => {
							setIsOpen(true);
							setSelected(site.id);
						}}
					/>
				</div>
				<p className='text-xs md:text-sm text-muted-foreground truncate'>
					{site.url}
				</p>
			</CardHeader>
			<CardContent className='flex justify-between gap-2 p-4 pt-0 md:p-6'>
				<div className='flex items-center gap-2 text-lime-500'>
					<User2 size={20} />
					<p className='text-sm'>
						{visitors} <span className='hidden md:inline-block'>Visitors</span>
					</p>
				</div>
				<NextLink
					className='text-muted-foreground'
					to={`/s/${site.id}`}
				></NextLink>
			</CardContent>
		</Card>
	);
}

Website.Skeleton = function WebsiteSkeleton() {
	return (
		<div className='p-4'>
			<div className='space-y-3'>
				<Skeleton className='h-5 w-2/5' />
				<Skeleton className='h-4 w-4/5' />
			</div>
		</div>
	);
};
