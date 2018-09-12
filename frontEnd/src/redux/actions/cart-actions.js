export function addToCartAction(obj) {
    return {
        type: 'ADD_TO_CART',
        payload: obj
    };
}

export function removeFromCartAction(id) {
    return {
        type: 'REMOVE_FROM_CART',
        payload: id
    };
}

export function updateGoodQuantityAction(obj) {
    return {
        type: 'UPDATE_GOOD_QUANTITY',
        payload: obj
    };
}
