import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/interfaces/product';
import { addToWishlist, removefromWishlist } from './wishlist.action';

interface ProductsState {
	itemsList: Array<Product>;
}

const initialState: ProductsState = {
	itemsList: [],
};

export const wishListReducer = createReducer(
	initialState,
	on(addToWishlist, (state, action) => {
		if (!state.itemsList.some((item: Product) => item.id === action.item.id)) {
			return {
				...state,
				itemsList: [...state.itemsList, action.item],
			};
		}
		return {
			...state,
			itemsList: [...state.itemsList],
		};
	}),
	on(removefromWishlist, (state, action) => {
		// console.log(state);
		return {
			...state,
			itemsList: [...state.itemsList.filter((item) => item.id !== action.item.id)],
		};
	}),
);
