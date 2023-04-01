import {mapGetters} from 'vuex'

export default {
	computed:{
		...mapGetters(['total'])
	},
	watch:{
		total(){
			this.setBadge()
		}
	},
	onShow() {
		this.setBadge()
	},
	methods:{
		setBadge(){
			uni.setTabBarBadge({
				index:2,
				text:this.total+''
			})
		}
	}
}