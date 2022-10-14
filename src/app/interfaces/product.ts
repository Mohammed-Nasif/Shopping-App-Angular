export interface Product {
	id: number;
	createdAt: string;
	name: string;
	count: number;
	price: 0;
	image: string;
	purchaseValue: number;
	description?: string;
	rate?: number;
}
