'use client';

import { useEffect, useState } from 'react';

import { Button, ButtonProps } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { WebsiteForm } from '@/components/websites/website-create-form';
import { userWebsitesAtom } from '@/jotai/store';
import { useAtom } from 'jotai';
import { Drawer } from 'vaul';

import { Icons } from '../icons';

export function WebsiteCreateButton({ variant, ...props }: ButtonProps) {
	const [websites] = useAtom(userWebsitesAtom);
	const [show, setShow] = useState(false);
	// const [, setCreateWebsite] = useAtom(websiteFormAtom);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [keyboardHeight, setKeyboardHeight] = useState(0);

	useEffect(() => {
		const handleResize = () => {
			const visualViewportHeight = window?.visualViewport?.height as number;
			const windowHeight = window.innerHeight;
			const keyboardHeight = windowHeight - visualViewportHeight;
			setKeyboardHeight(keyboardHeight);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	async function onDialogOpenChange(state: boolean) {
		if (websites.length > 9) {
			return toast({
				title: 'Limit of 10 websites reached.',
				description: 'We currently only support 10 websites per account.',
				variant: 'destructive',
			});
		}
		setIsDialogOpen(state);
		// setCreateWebsite(true);
	}

	return window.innerWidth <= 768 ? (
		<Drawer.Root shouldScaleBackground>
			<Drawer.Trigger asChild>
				<Button
					onClick={() => {
						setShow(!show);
					}}
					{...props}
				>
					<Icons.add className='h-4 w-4 ' />
					<span className='hidden md:block'>New Website</span>
				</Button>
			</Drawer.Trigger>
			<Drawer.Overlay className='fixed inset-0 bg-black/40' />
			<Drawer.Portal>
				<Drawer.Content
					style={{
						bottom: keyboardHeight ? `${keyboardHeight}px` : '0',
					}}
					className={`bg-background flex flex-col rounded-t-[10px] z-40 mt-24 fixed left-0 right-0`}
				>
					<div className='p-4 bg-white rounded-t-[10px] flex-1'>
						<div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8' />
						<WebsiteForm toggleDialog={setIsDialogOpen} />
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	) : (
		<Dialog onOpenChange={onDialogOpenChange} open={isDialogOpen}>
			<DialogTrigger asChild>
				<Button {...props}>
					<Icons.add className='h-4 w-4 ' />
					<span className='hidden md:block'>New Website</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<WebsiteForm toggleDialog={setIsDialogOpen} />
			</DialogContent>
		</Dialog>
	);
}
