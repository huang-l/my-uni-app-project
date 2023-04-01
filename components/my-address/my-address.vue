<template>
	<view>
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
		</view>
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row">
				<view class="name">收货人: {{address.userName}}</view>
				<view class="phone">
					<text>电话: {{address.telNumber}}</text>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="address">
				<text class="address-name">收货地址:</text>
				<text>{{addressFilter}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		name:"my-address",
		computed:{
			...mapState({
				address:state=>state.user.address
			}),
			...mapGetters(['addressFilter'])
		},
		methods:{
			...mapMutations(['updateAddress']),
			chooseAddress(){
				const _this = this;
				uni.chooseAddress({
					success(res) {
						if(res.errMsg === "chooseAddress:ok"){
							_this.updateAddress(res)
						}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.address-choose-box{
	height: 180rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 3rpx solid #ccc;
}
.address-info-box{
	font-size: 30rpx;
	padding: 0 10rpx;
	line-height: 60rpx;
	.row{
		display: flex;
		justify-content: space-between;
		.phone{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
	.address{
		display: flex;
		align-items: center;
		.address-name{
			white-space: nowrap;
		}
	}
}
</style>