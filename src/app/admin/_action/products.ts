"use server";
import db from "@/db/db";
import { z } from "zod";
import fs from "fs/promises";
import { Product } from "@/types/types";
import { redirect } from "next/navigation";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
	(file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	priceInCents: z.coerce.number().int().min(1),
	file: fileSchema.refine((file) => file.size > 0, "Required"),
	image: imageSchema.refine((file) => file.size > 0, "Required"),
});

export async function addProduct(prevState: unknown, formData: FormData) {
	const reformatedFormData: Product = {
		name: formData.get("name") as string,
		priceInCents: Number(formData.get("priceInCents")),
		description: formData.get("description") as string,
		image: formData.get("image") as File,
		file: formData.get("file") as File,
	};

	const result = addSchema.safeParse(reformatedFormData);

	if (result.success === false) {
		console.log(result.error);

		return result.error.formErrors.fieldErrors;
	}

	const data = result.data;

	await fs.mkdir("products", { recursive: true });
	const filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
	await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

	await fs.mkdir("public/products", { recursive: true });
	const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
	await fs.writeFile(
		`public${imagePath}`,
		Buffer.from(await data.image.arrayBuffer())
	);

	await db.product.create({
		data: {
			name: data.name,
			node_id: crypto.randomUUID(),
			description: data.description,
			price: data.priceInCents,
			filePath,
			imagePath,
			isAvaliableForPurchase: false,
		},
	});

	redirect("/admin/products");
}
