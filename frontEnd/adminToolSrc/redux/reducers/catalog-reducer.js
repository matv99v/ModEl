const catalogReducer = (state={}, action) => {
    switch (action.type) {
        case 'SAVE_CATEGORIES':
            return state;

        //     state = {...newState};
        //     break;
        // case 'SAVE_GOODS_BY_CATEGORY':
        //     newState = {...state};
        //     newState[action.payload.catId]['goods'] = [...newState[action.payload.catId]['goods'], ...action.payload.data];
        //     state = newState;
        //     break;
        // case 'SAVE_GOOD': // server returns array of items - check this at server
        //     newState = {...state};
        //     newState[action.payload[0].idCategory]['goods'] = [action.payload[0]];
        //     state = newState;
        //     break;
    }

    return state;
};

export default catalogReducer;
