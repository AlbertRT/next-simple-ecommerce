import { Nav, NavLink } from "@/components/Nav";
import React from "react";

export const dynamic = "force-dynamic";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Nav>
				<NavLink href={"/admin"}>Dashboard</NavLink>
				<NavLink href={"/admin/products"}>Products</NavLink>
				<NavLink href={"/admin/users"}>Customers</NavLink>
				<NavLink href={"/admin/oders"}>Sales</NavLink>
			</Nav>
			<div className="container my-6">{children}</div>
		</>
	);
}
