"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formaters";
import React, { useState } from "react";
import { addProduct } from "../../_action/products";
import { useFormState, useFormStatus } from "react-dom";

export default function ProductForm() {
	const [error, action] = useFormState(addProduct, {});
	const [priceInCents, setPriceInCents] = useState<number | undefined>(0);

	return (
		<form action={action} className="space-y-8">
			<div className="space-y-2">
				<Label htmlFor="name">Name</Label>
				<Input
					type="text"
					id="name"
					name="name"
					required
					autoComplete={"off"}
				/>
				{error.name && (
					<div className="text-destructive">{error.name}</div>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="priceInCents">Price in Cents</Label>
				<Input
					type="number"
					id="priceInCents"
					name="priceInCents"
					required
					value={priceInCents}
					onChange={(e) =>
						setPriceInCents(Number(e.target.value) || undefined)
					}
					autoComplete={"off"}
				/>

				<div className="text-muted-foreground">
					{formatCurrency(priceInCents || 0 / 100)}
				</div>
				{error.priceInCents && (
					<div className="text-destructive">{error.priceInCents}</div>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="description">Description</Label>
				<Textarea
					id="description"
					name="description"
					required
					autoComplete={"off"}
				/>
				{error.description && (
					<div className="text-destructive">{error.description}</div>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="file">FIle</Label>
				<Input
					type="file"
					id="file"
					name="file"
					required
					autoComplete={"off"}
				/>
				{error.file && (
					<div className="text-destructive">{error.file}</div>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="image">Image</Label>
				<Input
					type="file"
					id="image"
					name="image"
					required
					autoComplete={"off"}
				/>
				{error.image && (
					<div className="text-destructive">{error.image}</div>
				)}
			</div>
			<SubmitButton />
		</form>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" disabled={pending}>
			{pending ? "Saving..." : "Save"}
		</Button>
	);
}