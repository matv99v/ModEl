const barnReducer = (state=[], action) => {

    switch (action.type) {
        case 'SAVE_BARN':
            state = [...action.payload];
            break;

        case 'ADD_TO_BARN':
            state = [state, ...action.payload];
            break;
    }

    return state;
};

export default barnReducer;
