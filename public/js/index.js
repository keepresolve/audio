	$(function(){
    var currentIndex=0
		// 减少上一曲下一曲的bug
      var ado=document.getElementsByTagName('audio')[0]
     function currentPlay(index){  
         $(".showList li").eq(index).find("mnm, kmlew").css("display","block")
         $("audio").attr("src",$(".showList li").eq(index).attr("src"))
         // if(ado.src==""||ado.src==".mp3"){
         //       ado.src="千千阙歌.mp3"
         //  }
         $("audio").get(0).play()
     }
     $("ul").on("click","li",function(){
       // 动态小图
         $("ul li div").css("display","none")
         $(this).find("div").css("display","block")
      // 点击歌曲换歌
         $("audio").attr("src",$(this).attr("src"))
         $("audio").get(0).play()
     })
     // 双击播放
     $("h3").dblclick(function(){
     	$("audio").get(0).load()
     	$("audio").get(0).play()
     })
      // 播放
     $(".big button").eq(0).click(function(){
      $("audio").get(0).play()
     })
     // 暂停
        $(".big button").eq(1).click(function(){
     	$("audio").get(0).pause()
     })
        // 快进
       $(".big button").eq(2).mousedown(function(){
     	$("audio").get(0).currentTime+=5;
     })
       // 快退
       $(".big button").eq(3).mousedown(function(){
     	$("audio").get(0).currentTime-=5;
     })
       // 音量加
       $(".big button").eq(4).mousedown(function(){
     	$("audio").get(0).volume+=.1;
     })
       // 音量减
         $(".big button").eq(5).mousedown(function(){
     	$("audio").get(0).volume-=.1;
     })
         //静音
         $(".big button").eq(6).mousedown(function(){
     	$("audio").get(0).muted=!$("audio").get(0).muted;
     })
         //全屏
       $(".big button").eq(7).mousedown(function(){
    if( $(".big").width()-0>400){
          $(".big").animate({
          marginTop:"100px",
           width:"400px",
           height:"60%"
      },function(){
          $(".big button").eq(7).html("全屏")
      })
    }else{
          $(".big").animate({
          marginTop:"0px",
           width:"80%",
           height:"80%"
      },function(){
          $("button").eq(7).html("缩小")
      })
    }
  
     })
     // 下一曲
       $("button").eq(9).mousedown(function(){
       	var str=null;
        currentIndex++
        currentPlay(currentIndex)
            // $(".showList li").each(function(i){
            // 	if($(this).attr("src")==$("audio").attr("src")){
            //      currentPlay($(this).attr("index")-0+1)
            // 	}
            // })
       
     })
          
         // 上一曲
      $("button").eq(8).mousedown(function(){
       	var str=null;
            $("ul li").each(function(){
            	if($(this).text()+".mp3"==$("audio").attr("src")){
            		  str=$(this).prev().text()+".mp3"
            	}
            })
         $("audio").attr("src",str)
         if(ado.src==""||ado.src==".mp3"){
      	  ado.src="雨的印记.mp3"
        }
         $("audio").get(0).play()
     })
         // 单曲
      $("button").eq(10).mousedown(function(){
     	$("audio").attr("loop","loop")
     })
      // 顺序
      $("button").eq(11).mousedown(function(){
     	$("audio").removeAttr("loop")
        $("audio").get(0).onended=function(){
        	var str=null;
        	  $("ul li").each(function(){
        	  	 if($("audio").attr("src")==$(this).text()+".mp3"){
                      str=$(this).next().text()+".mp3"
        	  	 }
        	  })
        	 $("audio").attr("src",str)
        	 $("audio").get(0).play()
        }
     })
         // 随机
        $("button").eq(12).mousedown(function(){
     	  $("audio").get(0).onended=function(){
     	  	 var index=Math.ceil(Math.random()*4)
     	     var str=$("ul li").eq(index).text()+".mp3"
             $("audio").attr("src",str)
     	  $("audio").get(0).play()
     	  }   	   
     })
        // 循环
         $("button").eq(13).mousedown(function(){
             $("audio").removeAttr("loop")
          $("audio").get(0).onended=function(){
        	var str=null;
        	  $("ul li").each(function(){
        	  	 if($("audio").attr("src")==$(this).text()+".mp3"){
                      str=$(this).next().text()+".mp3"
        	  	 }
        	  })
        	  if(str==null||str==".mp3"){
        	  	str="千千阙歌.mp3"
        	  }
        	 $("audio").attr("src",str)
        	 $("audio").get(0).play()
        }

         })
         //滚动条
        $("audio").get(0).ontimeupdate=function(){
        	var num=$("audio").get(0).currentTime/$("audio").get(0).duration
         $(".progress").get(0).style.width=300*num+"px"
         $(".font div").get(0).style.top=-300*num+"px"
          // 显示时间
          var minute=parseInt($("audio").get(0).currentTime/60)
          var ss=parseInt($("audio").get(0).currentTime%60)
            $(".timer span").eq(1).html(minute)
            $(".timer span").eq(2).html(ss)
        }
        $(".pro").click(function(e){
        	 $("audio").get(0).currentTime=e.offsetX/300*$("audio").get(0).duration
        })

      //上传文件mp3
      $("#upfile").change(function(e){
         if($('#upfile')[0].files.length==0) return 
          var formData = new FormData();
          console.log($('#upfile'))
          formData.append('file/upload', $('#upfile')[0].files[0]);
          $.ajax({
              url: '/file/upload',
              type: 'POST',
              cache: false,
              data: formData,
              processData: false,
              contentType: false
          }).done(function(res) {
             if(res.code==200){
              console.log({res})
                $("pre").html(res.files )
                getInitSrc()
             }
          }).fail(function(err) {
            console.log({err})
          });
      })
      //删除
      $("#removefielSrc").click(function(){
          removeFile()

      })
      // 刷新列表
      $("#getfileSrc").click(function(){
            getInitSrc()
      })
      getInitSrc()



      function getInitSrc(){
            $.get("/file/getfileSrc",function(res){
            var html=''
               for (var i = res.length - 1; i >= 0; i--) {
                   if(res[i].slice(-3)!=="mp3") continue
                    html+='<li  index="'+i+'" isplay="false" data-src="'+res[i]+'" src="'+res[i].slice(6)+'">'+res[i].slice(11,-4)+'<div><img src="play.gif" alt=""></div><input type="checkbox"></li>'
               };
            $(".showList").html(html)
        })
      }
      function removeFile(){
             var removeList=[]
             $("input:checked").parent().each(function(i,el){
                  removeList.push($(el).attr("data-src")) 
             })
             console.log(removeList)
            $.get("/file/removeFile",{removeList},function(res){
               if(res.code==200){
                alert(res.info)
                  getInitSrc()
               }
            })
      }
}) 