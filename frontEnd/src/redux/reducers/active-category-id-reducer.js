const categoriesReducer = (state=null, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_CATEGORY':
            state = action.payload;
            break;
    }

    return state;
};

export default categoriesReducer;
