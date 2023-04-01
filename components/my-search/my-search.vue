
<template>
	<view class="my-search-container" :style="{'background-color':bgColor}">
		<view class="my-search-box" :style="{'border-radius':radius+'rpx'}" @click="toSearch">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>


<script>
	export default {
		name:"my-search",
		props:{
			bgColor:{
				type:String,
				default:'#f00'
			},
			radius:{
				type:Number,
				default:36
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			toSearch(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.my-search-container{
	height: 100rpx;
	display: flex;
	align-items: center;
	padding: 0 10rpx;
	.my-search-box{
		height: 72rpx;
		background-color: #fff;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.placeholder{
			font-size: 30rpx;
			margin-left: 10rpx;
		}
	}
}
</style>
