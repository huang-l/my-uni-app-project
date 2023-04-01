<template>
	<view class="my-settle-container">
		<label class="radio">
			<radio color="#f00" :checked="checkedCount === total" @click="changeAllState" /><text>全选</text>
		</label>
		<view class="amount-box">
			合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		<view class="btn-settle" @click="settle">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		name:"my-settle",
		computed:{
			...mapGetters(['checkedCount','total','checkedGoodsAmount','addressFilter']),
			...mapState({
				token:state=>state.user.token
			})
		},
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations(['updateAllGoodsState']),
			changeAllState(){
				this.updateAllGoodsState(!(this.total === this.checkedCount))
			},
			settle(){
				if(!this.checkedCount || !this.addressFilter) return;
				if(!this.token){
					
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.my-settle-container{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 100rpx;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:0 10rpx;
	font-size: 30rpx;
	box-sizing: border-box;
	.radio{
		display: flex;
		align-items: center;
	}
	.amount-box{
		.amount{
			color: #f00;
			font-weight: bold;
		}
	}
	.btn-settle{
		background-color: #f00;
		height: 100rpx;
		line-height: 100rpx;
		color: white;
		padding: 0 10rpx;
		min-width: 200rpx;
		text-align: center;
	}
}
</style>