new Vue({
	el:"#app",
	data:{
		login_ready_display:true,//登录准备窗口
		login_page_display:true,//登录窗口
		register_page_display:true,//注册窗口
		findMusic_display:false,//发现音乐页面
		myMusic_display:true,//我的音乐页面
		searchMusic_display:true,//搜索音乐页面
		play_display:false,//播放按键
		pause_display:true,//暂停按钮
		lyric_display:true,//歌词界面
		music_currentTime:"00:00",
		music_duration:"00:00",
		scale:0,//音乐当前时间/音乐总时间
		allwidth:0,//进度条总宽度-bar宽度
		left:0,//右移宽度
		x:0,
		index:0,
		songList:[
			 {songname: '所以我不能等到那一天',
			  songUrl: 'http://music.kanjian.com/2018_01/248110_88804e4c3f876992a0c2c13991b80da31515222911.mp3',
			  songImg: 'https://img.kanjian.com/crop_120x120_90/group3/M00/1A/92/wKhkGVkTQRuAIzZIAAAXVNq0sOM826.jpg'
			 },
			 {songname: '奇MEOW公寓',
                 songUrl: 'http://music.kanjian.com/2018_01/248232_11d16ca82a5637d2dc9b0402bc97edb81515492568.mp3',
                 songImg: 'https://img.kanjian.com/crop_120x120_90/group3/M00/1E/26/wKhkCVpUlPmAfeKDAAAkMIJwNEs728.jpg'
			 },
             {songname: '塑料袋 (电影《缝纫机乐队》推广曲)',
                 songUrl: 'http://music.kanjian.com/2017_09/240090_7c8ea5bea6bf5969176b8fbf918e83ff1504591868.mp3',
                 songImg: 'https://img.kanjian.com/crop_120x120_90/group3/M00/1B/BC/wKhkGVmuQIyAf4vvAABAtvzJ_7s588.jpg'
             }
		 ]
	},
	filters:{
		
	},//过滤器
	mounted:function(){
		this.$nextTick(function(){
            document.getElementById("myMusic").addEventListener("timeupdate",this.theprogress);
			document.getElementById("bar").addEventListener("mousedown",this.thebar);
		})
	},//Vue生命周期
	methods:{
		login_ready:function(){
			if (this.login_ready_display==false) {
				this.login_ready_display=true;
			} else{
				this.login_ready_display=false;
			}
			console.log(this.login_ready_display);
			return false;
		},
		login_page:function(){
			if (this.login_page_display==true) {
				this.login_page_display=false;
				this.register_page_display=true;
				this.login_ready_display=true;
			} else{
				this.login_page_display=true;
			}
			return false;
		},
		register_page:function(){
			if (this.register_page_display==true) {
				this.register_page_display=false;
				this.login_page_display=true;
				this.login_ready_display=true;
			} else{
				this.register_page_display=true;
			}
			return false;
		},
		findMusic:function(){
			this.findMusic_display=false;
			this.myMusic_display=true;
			this.searchMusic_display=true;
			return false;
		},
		myMusic:function(){
			this.findMusic_display=true;
			this.myMusic_display=false;
			this.searchMusic_display=true;
			return false;
		},
		searchMusic:function(){
			this.findMusic_display=true;
			this.myMusic_display=true;
			this.searchMusic_display=false;
			return false;
		},
		music_play:function(){
            document.getElementById("myMusic").play();
			this.play_display=true;
			this.pause_display=false;
		},
		music_pause:function(){
            document.getElementById("myMusic").pause();
			this.play_display=false;
			this.pause_display=true;
		},
		next_song:function () {
			this.index++;
			this.left=0;
			setTimeout(this.music_play,100);
        },
		last_song:function () {
            this.index--;
            this.left=0;
            setTimeout(this.music_play,100);
        },
		music_lyric:function(){
			if (this.lyric_display==true) {
				this.lyric_display=false;
			} else{
				this.lyric_display=true;
			}
			return false;
		},
		theprogress:function(){
			if (isNaN(document.getElementById("myMusic").duration )){
                this.music_duration="00:00";
			}else {
                this.music_duration=parseInt(parseInt(document.getElementById("myMusic").duration)/60)+":"+parseInt(document.getElementById("myMusic").duration)%60;
			}
			this.music_currentTime=parseInt(parseInt(document.getElementById("myMusic").currentTime)/60)+":"+parseInt(document.getElementById("myMusic").currentTime)%60;
			this.scale=document.getElementById("myMusic").currentTime/document.getElementById("myMusic").duration;
			console.log(this.scale);
			this.allwidth=document.getElementsByClassName("bar")[0].offsetWidth;
			console.log(this.allwidth);
			if(this.scale == 1){
				this.music.currentTime=0;
				this.left=0;
				console.log(this.music.currentTime);
				console.log(this.left);
				this.music_pause();	
			}else{
				this.left=this.scale*this.allwidth;
			console.log(this.left);
			}
			document.getElementById("bar").style.transform="translateX("+this.left+"px"+")";
			document.getElementsByClassName("progress")[0].style.width=this.left+"px";
		},
		thebar:function(e){
			this.x = e.screenX-document.getElementById("bar").offsetLeft;
			document.getElementById("bar").addEventListener("mousemove",this.bardistance)	
		},
		bardistance:function(e){
			var l=e.screenX;
			var _left=l-document.getElementsByClassName("bar")[0].offsetLeft;
			if(_left <　0){
				_left=0;
			}
			if(_left > document.getElementsByClassName("bar")[0].offsetWidth){
				_left=document.getElementsByClassName("bar")[0].offsetWidth;
			}
			document.getElementById("bar").style.transform="translateX("+_left+"px"+")";
			document.getElementsByClassName("progress")[0].style.width=_left+"px";
			document.getElementById("bar").addEventListener("mouseup",this.thebarMove);
			document.getElementById("myMusic").removeEventListener("timeupdate",this.theprogress);
		},
		thebarMove:function(e){		
			document.getElementById("bar").removeEventListener("mousemove",this.bardistance);
			var _left=e.screenX-document.getElementById("bar").offsetLeft-7;
			console.log(_left);
			if(_left <　0){
				_left=0;
			}
			if(_left > document.getElementsByClassName("bar")[0].offsetWidth){
				_left=document.getElementsByClassName("bar")[0].offsetWidth;
			}
			document.getElementById("bar").style.transform="translateX("+_left+"px"+")";
			document.getElementsByClassName("progress")[0].style.width=_left+"px";
			this.scale=_left/document.getElementsByClassName("bar")[0].offsetWidth;
			console.log("宽度比例"+this.scale);
            document.getElementById("myMusic").currentTime=document.getElementById("myMusic").duration*this.scale;
            document.getElementById("myMusic").addEventListener("timeupdate",this.theprogress);
			console.log(document.getElementById("myMusic").duration*this.scale);
			console.log("当前音乐时间"+this.music.currentTime);
		}
	}//方法
});
