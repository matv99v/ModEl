const goodsReducer = (state={}, action) => {
    switch (action.type) {
        case 'SAVE_CATEGORIES_X':
            const newState = action.payload.reduce((acc, cat) => {
                acc[cat.idCategory] = cat;
                return acc;
            }, {});

            state = {...newState};
            break;
        case 'SAVE_GOODS_BY_CATEGORY_X':
            const newState2 = {...state};
            newState2[action.payload.catId]['goods'] = action.payload.data;
            state = newState2;
            debugger;
            break;
        case 'SAVE_GOOD_X': // server returns array of items - check this at server
            const newGood = action.payload[0];
            const newState3 = {...state};
            newState3[newGood.idCategory]['goods'] = [newGood];
            state = newState3;
            break;
    }

    return state;
};

export default goodsReducer;
