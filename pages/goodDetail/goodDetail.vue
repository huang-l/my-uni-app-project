<template>
	<view class="good-detail" v-if="goodInfo.goods_name">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in goodInfo.pics" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<view class="good-info-box">
			<view class="good-price">{{goodInfo.goods_price}}</view>
			<view class="good-info-body">
				<view class="good-name">{{goodInfo.goods_name}}</view>
				<view class="good-favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yunfei">快递: 免运费 -- {{total}}</view>
		</view>
		<rich-text :nodes="goodInfo.goods_introduce"></rich-text>
		<view class="good-nav">
			<uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="click"
				@buttonClick="btnClick" />
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex';
	export default {
		computed:{
			...mapGetters(['total'])
		},
		watch:{
			total:{
				handler(newVal){
					const findRes = this.options.find(g=>g.text === '购物车');
					if(findRes){
						findRes.info = newVal
					}
				},
				immediate:true
			},
		},
		data() {
			return {
				id: '',
				goodInfo: {},
				options: [{
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]

			};
		},
		onLoad(options) {
			this.id = options.id;
			this.getGoodInfo(this.id);
		},
		methods: {
			...mapMutations(['addToCart']),
			getGoodInfo(id) {
				if (!id) return;
				uni.request({
					url: 'https://api-ugo-web.itheima.net/api/public/v1/goods/detail',
					data: {
						goods_id: id
					},
					success: (res) => {
						if (res.data.message?.goods_id) {
							this.goodInfo = res.data.message
						}
					}
				})
			},
			preview(i) {
				uni.previewImage({
					current: i,
					urls: this.goodInfo.pics.map(x => x.pics_big)
				})
			},
			click (e) {
				if(e.content.text === "购物车"){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			btnClick (e) {
				if(e.content.text === "加入购物车"){
					const {goods_id,goods_name,goods_price,goods_small_logo} = this.goodInfo
					const good = {
						goods_id,goods_name,goods_price,goods_small_logo,
						goods_count:1,
						goods_state:true
					}
					this.addToCart(good)
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.good-detail{
		padding-bottom: 100rpx;
	}
	swiper {
		height: 600rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.good-info-box {
		padding: 20rpx;
		padding-right: 0;

		.good-price {
			color: #f00;
			font-size: 36rpx;
			margin: 20rpx 0;
		}

		.good-info-body {
			display: flex;
			justify-content: space-between;

			.good-name {
				font-size: 30rpx;
				margin-right: 20rpx;
			}

			.good-favi {
				font-size: 30rpx;
				width: 240rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: gray;
			}
		}
	
	.yunfei {
			font-size: 24rpx;
			color: gray;
			margin: 10 rpx 0;
		}
	}
	.good-nav{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
