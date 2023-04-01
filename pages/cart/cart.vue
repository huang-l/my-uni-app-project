<template>
	<view class="cart-container">
		<my-address></my-address>
		<view class="cart-content" v-if="cart.length>0">
			<view class="cart-title">
				<uni-icons type="shop" size="18"></uni-icons>
				<text class="cart-title-text">购物车</text>
			</view>
			<uni-swipe-action>
				<block v-for="(good,i) in cart" :key="i">
					<uni-swipe-action-item :right-options="options" @click="handleClick(good)">
						<my-good :good="good" :showRadio="true" :showNum="true" @radio-change="radioChange"
							@num-change="numChange"></my-good>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
		</view>
		<text v-else>无</text>
		<my-settle></my-settle>
	</view>
</template>

<script>
	import badgeMixin from '../../mixins/tabbar-badge.js';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		mixins: [badgeMixin],
		computed: {
			...mapState({
				cart: state => state.cart.cart
			})
		},
		data() {
			return {
				options: [{
					text: "删除",
					style: {
						backgroundColor: '#f00'
					}
				}]
			}
		},
		methods: {
			...mapMutations(['updateGoodState', 'updateGoodCount', 'removeGoodById']),
			radioChange(e) {
				this.updateGoodState(e)
			},
			numChange(e) {
				this.updateGoodCount(e)
			},
			handleClick(good) {
				this.removeGoodById(good.goods_id)
			}
		}
	}
</script>

<style lang="less" scoped>
	.cart-container {
		padding-bottom: 100rpx;
		.cart-title {
			height: 80rpx;
			display: flex;
			align-items: center;
			padding-left: 10rpx;
			border-bottom: 2rpx solid #efefef;

			.cart-title-text {
				font-size: 30rpx;
				margin-left: 20rpx;
			}
		}
	}
</style>
