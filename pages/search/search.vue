<template>
	<view>
		<view class="search-box">
			<uni-search-bar :value="value" @input="input" placeholder="搜索" :radius="100" cancelButton="none" focus="true" />
		</view>
		<view class="search-list" v-if="searchList.length>0">
			<view class="search-item" v-for="(item,i) in searchList" :key="i" @click="toDetail(item)">
				<view class="item-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" v-if="historyList.length>0" @click="clearHis"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag @click="tagClick(item)" :text="item" v-for="(item,i) in historyList" :key="i" customStyle="margin-right:10rpx;background-color:#fff;color:#000"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				value:'',
				searchList:[],
				historyList:[],
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('history') || '[]')
		},
		methods:{
			input(val){
				if(this.timer){
					clearTimeout(this.timer);
					this.timer = null;
				}
				this.timer = setTimeout(()=>{
					this.value = val;
					this.getSearchList();
				},500)
			},
			getSearchList(){
				if(!this.value.length){
					this.searchList = [];
					return;
				}
				uni.request({
					url: 'https://api-ugo-web.itheima.net/api/public/v1/goods/qsearch',
					data:{
						query:this.value
					},
					success: (res) => {
						if (res.data.message?.length) {
							this.searchList = res.data.message
							this.saveHistory()
						}
					}
				})
			},
			toDetail(item){
				uni.navigateTo({
					url:'/pages/goodDetail/goodDetail?id='+item.goods_id
				})
			},
			saveHistory(){
				if(this.historyList.includes(this.value)){
					this.historyList.splice(this.historyList.indexOf(this.value),1)
				}
				this.historyList.unshift(this.value)
				uni.setStorageSync('history',JSON.stringify(this.historyList))
			},
			clearHis(){
				this.historyList = []
				uni.setStorageSync('history','[]')
			},
			tagClick(item){
				this.value = item;
				this.getSearchList()
			}
		}
	}
</script>

<style lang="less" scoped>
/deep/.uni-searchbar{
	background-color: #f00;
}
.search-box{
	position: sticky;
	top: 0;
	z-index: 999;
}
.search-list{
	padding: 0 10rpx;
	.search-item{
		display:flex;
		align-items: center;
		justify-content: space-between;
		font-size: 30rpx;
		padding: 20rpx 0;
		.item-name{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
.history-box{
	padding: 0 10rpx;
	.history-title{
		display: flex;
		justify-content: space-between;
		height: 80rpx;
		align-items: center;
		font-size: 30rpx;
	}
}
</style>
