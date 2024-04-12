import React from "react";
import PageHeader from "./_components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	TableHead,
	TableHeader,
	TableRow,
	Table,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import db from "@/db/db";
import { CheckCircle2Icon, MoreVerticalIcon, XCircleIcon } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formaters";

export default function page() {
	return (
		<>
			<div className="flex justify-between items-center gap-4">
				<PageHeader>Product</PageHeader>
				<Button asChild>
					<Link href="/admin/products/new">Add Product</Link>
				</Button>
			</div>
			<ProductTable />
		</>
	);
}

async function ProductTable() {
	const products = await db.product.findMany({
		select: {
			id: true,
			name: true,
			price: true,
			isAvaliableForPurchase: true,
			_count: { select: { orders: true } },
		},
		orderBy: { name: "asc" },
	});

	if (products.length === 0) return <p>No products found</p>;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-0">
						<span className="sr-only">Available for Purchase</span>
					</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Price</TableHead>
					<TableHead>Orders</TableHead>
					<TableHead className="w-0">
						<span className="sr-only">Action</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.map((product) => (
					<TableRow key={product.id}>
						<TableCell>
							{product.isAvaliableForPurchase ? (
								<>
									<CheckCircle2Icon />
									<span className="sr-only">Available</span>
								</>
							) : (
								<>
									<XCircleIcon />
									<span className="sr-only">
										Non Available
									</span>
								</>
							)}
						</TableCell>
						<TableCell>{product.name}</TableCell>
						<TableCell>
							{formatCurrency(product.price / 100)}
						</TableCell>
						<TableCell>
							{formatNumber(product._count.orders)}
						</TableCell>
						<TableCell>
							<MoreVerticalIcon />
							<span className="sr-only">Action</span>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
