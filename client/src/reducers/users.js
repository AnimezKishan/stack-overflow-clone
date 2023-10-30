const usersReducer = (state = [], action) => {
    switch(action.type) {
        case 'FETCH_ALL_USERS': 
            return action.payload;
        
        case 'UPDATE_CURRENT_USER':
            return state.map((st) => st._id === action.payload._id ? action.payload : st);
        
        default:
            return state;
    }
}

export default usersReducer;