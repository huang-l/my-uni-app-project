export default {
	namespace :true,
	state:{
		cart:JSON.parse(uni.getStorageSync('cart') || '[]')
	},
	mutations:{
		addToCart(state,good){
			const findRes = state.cart.find(g=>g.goods_id === good.goods_id);
			if(!findRes){
				state.cart.push(good);
			}else{
				findRes.goods_count++;
			}
			this.commit('saveCartToStorage')
		},
		saveCartToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		updateGoodState(state,good){
			const findRes = state.cart.find(g=>g.goods_id === good.goods_id);
			if(findRes){
				findRes.goods_state = good.goods_state
				this.commit('saveCartToStorage')
			}
		},
		updateGoodCount(state,good){
			const findRes = state.cart.find(g=>g.goods_id === good.goods_id);
			if(findRes){
				findRes.goods_count= good.goods_count
				this.commit('saveCartToStorage')
			}
		},
		removeGoodById(state,id){
			state.cart = state.cart.filter(g=>g.goods_id !== id)
			this.commit('saveCartToStorage')
		},
		updateAllGoodsState(state,newState){
			state.cart.forEach(g=>g.goods_state = newState)
			this.commit('saveCartToStorage')
		}
	},
	getters:{
		total(state){
			return state.cart.reduce((total,g)=>total+=g.goods_count,0);
		},
		checkedCount(state){
			return state.cart.filter(g=>g.goods_state).reduce((total,g)=>total+=g.goods_count,0);
		},
		checkedGoodsAmount(state){
			return state.cart.filter(g=>g.goods_state).reduce((total,g)=>total+=g.goods_count*g.goods_price,0).toFixed(2);
		}
	}
}