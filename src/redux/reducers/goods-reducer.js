const goodsReducer = (state=[], action) => {
    switch (action.type) {
        case 'FETCH_GOODS':
            state = [...action.payload];
            break;
    }

    return state;
};

export default goodsReducer;
