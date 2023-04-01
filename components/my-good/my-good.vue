<template>
	<view class="good-item" @click="toDetail">
		<view class="good-item-left">
			<radio :checked="good.goods_state" color="#f00" v-if="showRadio" @click.stop="radioClick"></radio>
			<image :src="good.goods_small_logo"></image>
		</view>
		<view class="good-item-right">
			<view class="good-name">{{good.goods_name}}</view>
			<view class="good-info-box">
				<view class="good-price">￥{{good.goods_price | toFixed}}</view>
				<uni-number-box :min="1" :value="good.goods_count" @change="numChange" v-if="showNum"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-good",
		props:{
			good:{
				type:Object,
				default:()=>{}
			},
			showRadio:{
				type:Boolean,
				default:false,
			},
			showNum:{
				type:Boolean,
				default:false,
			}
		},
		filters:{
			toFixed(num){
				return Number(num).toFixed(2)
			}
		},
		methods:{
			toDetail(){
				uni.navigateTo({
					url:'/pages/goodDetail/goodDetail?id='+this.good.goods_id
				})
			},
			radioClick(){
				this.$emit('radio-change',{
					goods_id:this.good.goods_id,
					goods_state:!this.good.goods_state,
				})
			},
			numChange(val){
				this.$emit('num-change',{
					goods_id:this.good.goods_id,
					goods_count:+val
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.good-item{
	width: 750rpx;
	box-sizing: border-box;
	display: flex;
	padding: 20rpx 10rpx;
	border-bottom: 2rpx solid #f0f0f0;
	.good-item-left{
		margin-right: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		image{
			width: 200rpx;
			height: 200rpx;
		}
	}
	.good-item-right{
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		.good-name{
			font-size: 30rpx;
		}
		.good-info-box{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.good-price{
				color: #f00;
			}
		}
	}
}
</style>