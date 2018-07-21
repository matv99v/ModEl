// import 'regenerator-runtime/runtime';


export function setActiveGoodIdAction(id) {
    return {
        type: 'SET_ACTIVE_GOOD',
        payload: id
    };
};

export function unsetActiveGoodIdAction() {
    return {
        type: 'UNSET_ACTIVE_GOOD'
    };
};
