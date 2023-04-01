<template>
	<view>
		<view class="search-box">
			<my-search></my-search>
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator class="swiper-item" :url="`../goodDetail/goodDetail?id=${item.goods_id}`">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClick(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<image class="item-title" :src="item.floor_title.image_src"></image>
				<view class="floor-img-box">
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2"
							v-if="i2 !== 0" :url="item2.url">
							<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMixin from '../../mixins/tabbar-badge.js';
	export default {
		mixins:[badgeMixin],
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: [],
			};
		},
		onLoad() {
			this.getSwiperList();
			this.getNavList();
			this.getFloorList();
		},
		methods: {
			getSwiperList() {
				uni.request({
					url: 'https://api-ugo-web.itheima.net/api/public/v1/home/swiperdata',
					success: (res) => {
						if (res.data.message?.length) {
							this.swiperList = res.data.message
						}
					}
				})
			},
			getNavList() {
				uni.request({
					url: 'https://api-ugo-web.itheima.net/api/public/v1/home/catitems',
					success: (res) => {
						if (res.data.message?.length) {
							this.navList = res.data.message
						}
					}
				})
			},
			navClick(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			getFloorList() {
				uni.request({
					url: 'https://api-ugo-web.itheima.net/api/public/v1/home/floordata',
					success: (res) => {
						if (res.data.message?.length) {
							res.data.message.forEach((floor) => {
								floor.product_list.forEach(prod => {
									prod.url = '../goodsList/goodsList?' + prod.navigator_url
										.split('?')[1]
								});
							})
							this.floorList = res.data.message
						}
					}
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	.search-box{
		position: sticky;
		top: 0;
		z-index: 999;
	}
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		padding: 15rpx;

		image {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-item .item-title {
		width: 100%;
		height: 60rpx;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;
	}

	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>
