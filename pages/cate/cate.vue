<template>
	<view>
		<my-search></my-search>
		<view class="scroll-view-container">
			<scroll-view class="left-scroll-view" scroll-y="true" >
				<view  v-for="(item,i) in cateList" :key="i" :class="['left-scroll-view-item', i === active?'active':'']" @click="activeChange(i)">{{item.cat_name}}</view>
			</scroll-view>
			<scroll-view scroll-y="true" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item,i) in cateLevel2" :key="i">
					<view class="cate-lv2-title">{{item.cat_name}}</view>
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item2,i2) in item.children" :key="i2" @click="toGoodsList(item2)">
							<image :src="item2.cat_icon.replace('dev','web')"></image>
							<text>{{item2.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cateList:[],
				active:0,
				cateLevel2:[],
				scrollTop:0
			};
		},
		onLoad() {
			this.getCateList()
		},
		methods:{
			getCateList(){
				uni.request({
					url: 'https://api-ugo-web.itheima.net/api/public/v1/categories',
					success: (res) => {
						if (res.data.message?.length) {
							this.cateList = res.data.message
							this.cateLevel2 = res.data.message[0].children
							this.active = 0
						}
					}
				})
			},
			activeChange(i){
				this.active = i;
				this.cateLevel2 = this.cateList[i].children;
				this.scrollTop = this.scrollTop ? 0 : 1;
			},
			toGoodsList(item){
				uni.navigateTo({
					url:'/pages/goodsList/goodsList?id='+item.cat_id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.scroll-view-container{
	height: calc(100vh - 100rpx);
	display: flex;
	.left-scroll-view{
		width: 240rpx;
		.left-scroll-view-item{
			background-color: #f7f7f7;
			text-align: center;
			line-height: 120rpx;
			font-size: 30rpx;
			&.active{
				background-color: #fff;
				position: relative;
				&::before{
					display: block;
					content: '';
					width: 6rpx;
					height: 60rpx;
					background-color: #f00;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
	}
	.cate-lv2-title{
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
		padding: 30rpx 0;
	}
	.cate-lv3-list{
		display: flex;
		flex-wrap: wrap;
		.cate-lv3-item{
			width: 33.3%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			margin-bottom: 10rpx;
			font-size: 30rpx;
			image{
				width: 120rpx;
				height: 120rpx;
			}
		}
	}
}
</style>
