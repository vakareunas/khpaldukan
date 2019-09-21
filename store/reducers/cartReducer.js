

const update = (state, mutations) =>
Object.assign({}, state, mutations)

const cartReducer = (state = [], action)=>{
    
    switch(action.type) {
        case  'ADD_TO_CART':
            let existed_item= state.find(item=> action.payload.id === item.id)
            if(existed_item) {
                return state.map((item) => {
                    // Find the item with the matching id
                    if(item.id === action.payload.id) {
                      // Return a new object
                      return {
                        ...item,  // copy the existing item
                        qty: existed_item.qty + 1  // replace the email addr
                      }
                    }
                    
                    // Leave every other item unchanged
                    return item;
                  });
            } else {
                return [...state, action.payload]
            }
        //    return [...state, action.payload]
                // state.map((item, index) => {
                    
                //     // Find the item with the matching id
                //     if(item.id === action.payload.id) {
                //       // Return a new object
                //       return {
                //         ...item,  // copy the existing item
                //         qty: item.qty += 1  // replace the email addr
                //       }
                //     }
                
                //     // Leave every other item unchanged
                //     return [...state, action.payload]
                //   });
            // state.map( item => {
            //     alert(item)
            //     if ( item.id === action.payload.id ) {
            //         state = update(state, { qty: state.qty + 1 })
            //     } else {
            //         return [...state, action.payload]
            //     }
            // })

            //let addedItem = state.find(item => item.id === action.payload.id)
            //check if the action id exists in the addedItems
            // let existed_item = state.find(item => action.payload.id === item.id)

            // if(existed_item)
            // {
            //     //return addedItem.qty += 1 
            //     //return [...state, addedItem]
            //     return {
            //         ...existed_item,  // copy the existing item
            //         qty: existed_item.qty += 1  // replace the email addr
            //     }
            // }
            // else{
                
            //     return [...state, action.payload]
                
            // }
            // return [
            //     ...state,
            //     state.map(item => 
            //         item.id === action.payload.id ? { qty: item.qty += 1 } : item
            //     ) 
            //     ];

        case 'REMOVE_FROM_CART':
            return state.filter(cartItem => cartItem.id !== action.payload)
        
        case 'UPDATE_QTY':
            return state.map((item) => {
                // Find the item with the matching id
                if(item.id === action.payload.id) {
                  // Return a new object
                  return {
                    ...item,  // copy the existing item
                    qty: action.payload.val  // replace the email addr
                  }
                }
            
                // Leave every other item unchanged
                return item;
         });
        case 'EMPTY_CART':
          return []
    }

    return state;

}
export default cartReducer;