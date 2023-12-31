const postReducer = (state= {data: null}, action) => {
    switch(action.type) {
        case 'MAKE_POST':
            return {...state}

        case 'FETCH_ALL_POSTS': 
            return {...state, data: action.payload}
        
        default:
            return state;
    }
}

export default postReducer;