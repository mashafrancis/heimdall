'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import * as React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SidebarNavItem } from '@/types';
import { ExcludeSquare } from '@phosphor-icons/react';
import { For } from 'million/react';

interface DashboardNavProps {
	items: SidebarNavItem[];
}

export function SideNav({ items }: DashboardNavProps) {
	const pathname = usePathname();

	if (!items?.length) {
		return null;
	}

	return (
		<aside className='fixed inset-0 z-[1] hidden h-screen w-24 flex-col justify-between overflow-y-hidden p-2 md:flex'>
			<ul className='flex flex-col space-y-2'>
				<div className='flex items-center justify-center gap-2 align-middle'>
					<Link
						href='/'
						aria-label='heimdall-home'
						className='mb-8 mt-2 block whitespace-nowrap text-xl font-medium transition focus:outline-none'
					>
						<ExcludeSquare size={32} color='#0074a6' weight='duotone' />
					</Link>
				</div>

				<For each={items}>
					{({ id, href, disabled, title, icon }) => {
						const Icon = Icons[icon || 'arrowRight'];
						return (
							href && (
								<Link
									key={id}
									href={disabled ? '/' : href}
									className={cn(
										'm-4 flex flex-col items-center justify-center text-center font-medium transition-colors hover:text-foreground/80',
										pathname === href
											? 'text-foreground'
											: 'text-foreground/60',
										disabled && 'cursor-not-allowed opacity-80'
									)}
								>
									<Button
										aria-label={title}
										disabled={disabled}
										variant='ghost'
										size='icon'
										className={cn(
											pathname === href
												? 'bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary'
												: 'text-gray-500',
											'h-8 w-14 rounded-full p-0 font-medium ring-primary/40 transition-all hover:bg-primary/10 hover:ring-1 disabled:cursor-not-allowed disabled:text-muted-foreground/50 disabled:opacity-80'
										)}
									>
										<Icon className='h-5 w-5' />
									</Button>
									<span className='mt-1 text-xs'>{title}</span>
								</Link>
							)
						);
					}}
				</For>
			</ul>
		</aside>
	);
}
