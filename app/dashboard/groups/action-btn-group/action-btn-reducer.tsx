
type ActionReducer = {
    type: 'DELETE_GROUP' | 'ADD_USER_TO_GROUP' | 'Edit_GROUP';
    data: boolean;
};

type StateReducer = {
    delete: boolean;
    addUser: boolean;
    editUser: boolean;
};


export const ActionReducerFunc = (state: StateReducer, action: ActionReducer): StateReducer => {
    switch (action.type) {
        case 'DELETE_GROUP':
            return { ...state, delete: action.data };
        case 'ADD_USER_TO_GROUP':
            return { ...state, addUser: action.data };
        case 'Edit_GROUP':
            return { ...state, editUser: action.data };
        default:
            return state;
    }
};

export const initialState: StateReducer = {
    delete: false,
    addUser: false,
    editUser: false,
};