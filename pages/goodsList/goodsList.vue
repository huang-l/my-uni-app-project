<template>
	<view>
		<view class="good-list">
			<block v-for="(good,i) in goodsList" :key="i">
				<my-good :good="good"></my-good>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				query:'',
				id:'',
				pageIndex:1,
				pageSize:10,
				goodsList:[],
				total:0,
				isloading:false
			};
		},
		watch:{
			isloading(newVal){
				if(newVal){
					uni.showLoading({
						title:'加载中...'
					})
				}else{
					uni.hideLoading()
				}
			}
		},
		onLoad(options) {
			this.id = options.id || '';
			this.query = options.query || '';
			this.getGoodsList();
		},
		methods:{
			getGoodsList(cb){
				const data = {
					id:this.id,
					query:this.query,
					pagenum:this.pageIndex,
					pagesize:this.pageSize
				}
				this.isloading = true
				uni.request({
					url: 'https://api-ugo-web.itheima.net/api/public/v1/goods/search',
					data,
					success: (res) => {
						cb && cb()
						this.isloading = false
						if (res.data.message.goods?.length) {
							this.goodsList = [...this.goodsList,...res.data.message.goods];
							this.total = res.data.message.total;
						}
					}
				})
			}
		},
		onReachBottom() {
			if(this.pageIndex * this.pageSize >= this.total) return
			if(this.isloading) return;
			this.pageIndex++;
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.pageIndex = 1;
			this.total = 0;
			this.goodsList = [];
			this.isloading = false;
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		}
	}
</script>

