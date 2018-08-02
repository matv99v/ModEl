const categoriesReducer = (state=[], action) => {
    switch (action.type) {
        case 'FETCH_CATEGORIES':
            state = [...action.payload];
            break;
    }

    return state;
};

export default categoriesReducer;
