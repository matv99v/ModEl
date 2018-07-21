const goodsReducer = (state=[], action) => {
    switch (action.type) {
        case 'SAVE_GOODS':
            state = [...action.payload];
            break;
    }
    switch (action.type) {
        case 'SAVE_GOOD_DETAILS':
            const ind = state.findIndex(good => good.idProduct === action.payload.idProduct);
            const newState = [...state];
            const newGood = {...newState[ind], ...action.payload};
            newState[ind] = newGood;
            state = newState;

            break;
    }

    return state;
};

export default goodsReducer;
