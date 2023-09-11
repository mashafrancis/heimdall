import * as React from 'react';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

interface EmptyPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode;
}

export function EmptyPlaceholder({
	className,
	children,
	...props
}: EmptyPlaceholderProps) {
	return (
		<div
			className={cn(
				'flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center animate-in fade-in-50',
				className
			)}
			{...props}
		>
			<div className='mx-auto flex max-w-[420px] flex-col items-center justify-center text-center'>
				{children}
			</div>
		</div>
	);
}

interface EmptyPlaceholderIconProps
	extends Partial<React.SVGProps<SVGSVGElement>> {
	name: keyof typeof Icons;
}

EmptyPlaceholder.Icon = function EmptyPlaceHolderIcon({
	name,
	className,
	...props
}: EmptyPlaceholderIconProps) {
	const Icon = Icons[name];

	if (!Icon) {
		return null;
	}
	return (
		<div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary/10'>
			{/* @ts-ignore */}
			<Icon className={cn('h-10 w-10 text-primary', className)} {...props} />
		</div>
	);
};

interface EmptyPlaceholderTitleProps
	extends React.HTMLAttributes<HTMLHeadingElement> {
	children?: React.ReactNode;
}

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({
	className,
	...props
}: EmptyPlaceholderTitleProps) {
	return (
		<h2 className={cn('mt-6 text-xl font-semibold', className)} {...props} />
	);
};

interface EmptyPlaceholderDescriptionProps
	extends React.HTMLAttributes<HTMLParagraphElement> {
	children?: React.ReactNode;
}

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({
	className,
	...props
}: EmptyPlaceholderDescriptionProps) {
	return (
		<p
			className={cn(
				'mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground',
				className
			)}
			{...props}
		/>
	);
};
