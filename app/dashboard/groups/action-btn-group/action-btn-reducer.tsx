
type ActionReducer = {
    type: 'DELETE' | 'ADD_USER';
    data: boolean;
};

type StateReducer = {
    delete: boolean;
    addUser: boolean;
};


export const ActionReducerFunc = (state: StateReducer, action: ActionReducer): StateReducer => {
    switch (action.type) {
        case 'DELETE':
            return { ...state, delete: action.data };
        case 'ADD_USER':
            return { ...state, addUser: action.data };
        default:
            return state;
    }
};

export const initialState: StateReducer = {
    delete: false,
    addUser: false,
};