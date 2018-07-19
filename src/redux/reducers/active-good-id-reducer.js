const activeGoodIdReducer = (state=null, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_GOOD':
            state = action.payload;
            break;
    }

    return state;
};

export default activeGoodIdReducer;
