export const initialState = {
    basket: [],
}

export const getBasketTotal = (basket) =>  
                basket.reduce(( amount, item  ) => amount + item.price, 0)


function reducer(state, action) {
    console.log(action);
    switch (action.type){
        case 'ADD_TO_BASKET':
            return{
                ...state, 
                basket: [...state.basket, action.item]
            }
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (e) => e.id === action.id
            )
            let newBasket = [...state.basket]
            if(index >=0 ) newBasket.splice(index, 1)
            else console.log(`can't remove ${action.id} from basket`)
            return{
                ...state, 
                basket: newBasket,
            }
        default:
            return{
                ...state
            }
    }
}

export default reducer
