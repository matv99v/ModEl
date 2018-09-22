const errorReducer = (state=null, action) => {
    switch (action.type) {
        case 'SPAWN_NEW_ERROR':
            state = action.payload;
            break;
    }


    return state;
};

export default errorReducer;
