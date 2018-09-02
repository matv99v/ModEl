// import 'regenerator-runtime/runtime';


export function setActiveCategoryId(id) {
    return {
        type: 'SET_ACTIVE_CATEGORY',
        payload: id
    };
};

export function unsetActiveCategoryId() {
    return {
        type: 'UNSET_ACTIVE_CATEGORY'
    };
};
