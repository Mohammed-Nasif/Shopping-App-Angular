import { createAction, props } from '@ngrx/store';
import { Product } from './../../interfaces/product';

export const addToWishlist = createAction('[Wishlist] Add item to wishlist', props<{ item: Product }>());
export const removefromWishlist = createAction('[Wishlist] Remove item from wishlist', props<{ item: Product }>());
