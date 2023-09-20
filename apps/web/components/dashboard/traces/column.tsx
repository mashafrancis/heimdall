'use client';

import dayjs from '@/lib/dayjsTime';
import { HeimdallTraces } from '@heimdall-logs/types';
import { ColumnDef } from '@tanstack/react-table';
import {
	ChevronDown,
	ChevronRight,
	ChevronsUpDown,
	UnfoldVertical,
} from 'lucide-react';

export const columns: ColumnDef<HeimdallTraces>[] = [
	{
		id: 'expander',
		header: () => <UnfoldVertical />,
		cell: ({ row }) => {
			return (
				<span onClick={() => row.toggleExpanded}>
					{!row.getIsExpanded() ? <ChevronRight /> : <ChevronDown />}
				</span>
			);
		},
	},
	{
		id: 'timestamp',
		accessorKey: 'timestamp',
		header: ({ column }) => {
			return (
				<span
					className='group flex items-center gap-2'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Time
					<ChevronsUpDown
						className='mr-2 opacity-0 transition-all ease-in-out group-hover:opacity-100'
						size={15}
					/>
				</span>
			);
		},
		cell: ({ row }) => {
			const relativeTime = dayjs(row.original.Timestamp as unknown as string)
				.local()
				.format('YYYY-MM-DD HH:mm:ss');
			return dayjs(row.original.Timestamp as unknown as string)
				.local()
				.tz('Africa/Nairobi')
				.format('MMM DD HH:mm:ss.SSS');
		},
	},
	{
		id: 'status',
		accessorKey: 'StatusCode',
		header: ({ column }) => {
			return (
				<span
					className='group flex items-center gap-2'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Status
					<ChevronsUpDown
						className='mr-2 opacity-0 transition-all ease-in-out group-hover:opacity-100'
						size={15}
					/>
				</span>
			);
		},
	},
	{
		id: 'request',
		accessorKey: 'SpanName',
		header: ({ column }) => {
			return (
				<span
					className='group flex items-center gap-2'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Request
					<ChevronsUpDown
						className='mr-2 opacity-0 transition-all ease-in-out group-hover:opacity-100'
						size={15}
					/>
				</span>
			);
		},
	},
	{
		id: 'status_message',
		accessorKey: 'StatusMessage',
		header: ({ column }) => {
			return (
				<span
					className='group flex items-center gap-2'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Message
					<ChevronsUpDown
						className='mr-2 opacity-0 transition-all ease-in-out group-hover:opacity-100'
						size={15}
					/>
				</span>
			);
		},
	},
	// {
	// 	id: 'city',
	// 	accessorKey: 'city',
	// 	header: ({ column }) => {
	// 		return (
	// 			<span
	// 				className='group flex items-center gap-2'
	// 				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
	// 			>
	// 				City
	// 				<ChevronsUpDown
	// 					className='mr-2 opacity-0 transition-all ease-in-out group-hover:opacity-100'
	// 					size={15}
	// 				/>
	// 			</span>
	// 		);
	// 	},
	// },
	// {
	// 	id: 'country',
	// 	accessorKey: 'country',
	// 	header: ({ column }) => {
	// 		return (
	// 			<span
	// 				className='group flex items-center gap-2'
	// 				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
	// 			>
	// 				Country
	// 				<ChevronsUpDown
	// 					className='mr-2 opacity-0 transition-all ease-in-out group-hover:opacity-100'
	// 					size={15}
	// 				/>
	// 			</span>
	// 		);
	// 	},
	// 	cell: ({ row }) => {
	// 		return COUNTRIES[row.original.country ?? ''] ?? row.original.country;
	// 	},
	// },
	// {
	// 	id: 'os',
	// 	accessorKey: 'os',
	// 	header: ({ column }) => {
	// 		return (
	// 			<span
	// 				className='group flex items-center gap-2'
	// 				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
	// 			>
	// 				OS
	// 				<ChevronsUpDown
	// 					className='mr-2 opacity-0 transition-all ease-in-out group-hover:opacity-100'
	// 					size={15}
	// 				/>
	// 			</span>
	// 		);
	// 	},
	// },
];
