import {ADDCOUNTER,ADDTOCART} from './mutations-types'
export default {
    addCart(context,payload) {
        //查找数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        if(oldProduct){
          //oldProduct.count += 1 
          context.commit(ADDCOUNTER,oldProduct)
        }else{
          payload.count = 1
          //context.state.cartList.push(payload)
          context.commit(ADDTOCART,payload)
        }
      }
}