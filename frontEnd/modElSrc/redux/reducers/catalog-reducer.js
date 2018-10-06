const catalogReducer = (state={}, action) => {
    let newState;
    switch (action.type) {
        case 'SAVE_CATEGORIES':
            newState = action.payload.reduce((acc, cat) => {
                cat.goods = [];
                acc[cat.idCategory] = cat;
                return acc;
            }, {});

            state = {...newState};
            break;
        case 'SAVE_GOODS_BY_CATEGORY':
            newState = {...state};
            newState[action.payload.catId]['goods'] = [...newState[action.payload.catId]['goods'], ...action.payload.data];
            state = newState;
            break;
        case 'SAVE_GOOD': // server returns array of items - check this at server
            newState = {...state};
            newState[action.payload[0].idCategory]['goods'] = [action.payload[0]];
            state = newState;
            break;
    }

    return state;
};

export default catalogReducer;
