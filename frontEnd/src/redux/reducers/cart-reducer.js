const cartReducer = (state={}, action) => {
    const newState = {...state};

    switch (action.type) {
    case 'ADD_TO_CART':
        if (!newState.hasOwnProperty(action.payload.goodId)) {
            newState[action.payload.goodId] = 0;
        }
        newState[action.payload.goodId] += action.payload.amount;
        break;
    case 'REMOVE_FROM_CART':
        delete newState[action.payload];
        break;
    case 'UPDATE_GOOD_QUANTITY':
        if (action.payload.isReplace) {
            newState[action.payload.goodId] = action.payload.amount;
        } else {
            if (newState[action.payload.goodId] + action.payload.amount >= 1) {
                newState[action.payload.goodId] += action.payload.amount;
            }
        }
        break;
    }

    return newState;
};

export default cartReducer;
