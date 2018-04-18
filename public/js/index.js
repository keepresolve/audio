$(function () {
  var currentIndex = 0
  // 减少上一曲下一曲的bug
  var ado = document.getElementsByTagName('audio')[0]
  function currentPlay(index,arg) {
    if(index==$(".showList li").length&&arg!=0)index=0
    if(index==-1)index=$(".showList li").length-1
    $(".showList li div").css("display","none")
    $(".showList li").eq(index).find("div").css("display", "block")
    $("audio").attr("src", $(".showList li").eq(index).attr("src"))
    $("audio").attr("index", $(".showList li").eq(index).attr("index"))
    $("audio").get(0).play()
  }
  $("ul").on("click", "li", function () {
    // 动态小图
    $("ul li div").css("display", "none")
    $(this).find("div").css("display", "block")
    // 点击歌曲换歌
    $("audio").attr("src", $(this).attr("src"))
    $("audio").attr("index", $(this).attr("index"))
    $("audio").get(0).play()
  })
  // 双击播放
  // $("h3").dblclick(function () {
  //   $("audio").get(0).load()
  //   $("audio").get(0).play()
  // })
  // 播放
  $(".big button").eq(0).click(function () {
    $("audio").get(0).play()
  })
  // 暂停
  $(".big button").eq(1).click(function () {
    $("audio").get(0).pause()
  })
  // 快进
  $(".big button").eq(2).mousedown(function () {
    $("audio").get(0).currentTime += 5;
  })
  // 快退
  $(".big button").eq(3).mousedown(function () {
    $("audio").get(0).currentTime -= 5;
  })
  // 音量加
  $(".big button").eq(4).mousedown(function () {
    $("audio").get(0).volume += .1;
  })
  // 音量减
  $(".big button").eq(5).mousedown(function () {
    $("audio").get(0).volume -= .1;
  })
  //静音
  $(".big button").eq(6).mousedown(function () {
    $("audio").get(0).muted = !$("audio").get(0).muted;
  })
  //全屏
  $(".big button").eq(7).mousedown(function () {
    if ($(".big").width() - 0 > 400) {
      $(".big").animate({
        marginTop: "1rem",
        width: "4rem",
        height: "60%"
      }, function () {
        $(".big button").eq(7).html("全屏")
      })
    } else {
      $(".big").animate({
        marginTop: "0px",
        width: "80%",
        height: "80%"
      }, function () {
        $("button").eq(7).html("缩小")
      })
    }

  })
  // 下一曲
  $("button").eq(9).mousedown(function () {
    var currentIndex=$("audio").attr("index")-0+1
    currentPlay(currentIndex)
  })

  // 上一曲
  $("button").eq(8).mousedown(function () {
    var currentIndex=$("audio").attr("index")-1
    currentPlay(currentIndex)
    $("audio").get(0).play()
  })
  // 单曲
  $("button").eq(10).mousedown(function () {
    $("audio").attr("loop", "loop")
  })
  // 顺序
  $("button").eq(11).mousedown(function () {
    $("audio").removeAttr("loop")
    $("audio").get(0).onended = function () {
      var currentIndex=$("audio").attr("index")-0+1
      currentPlay(currentIndex,0)
    }
  })
  // 随机
  $("button").eq(12).mousedown(function () {
    $("audio").get(0).onended = function () {
      var currentIndex = Math.ceil(Math.random() * $(".showList li").length-1)
      currentPlay(currentIndex)
    }
  })
  // 循环
  $("button").eq(13).mousedown(function () {
    $("audio").removeAttr("loop")
    $("audio").get(0).onended = function () {
      var currentIndex=$("audio").attr("index")-0+1
      currentPlay(currentIndex)
    }

  })
  //滚动条
  $("audio").get(0).ontimeupdate = function () {
    var num = $("audio").get(0).currentTime / $("audio").get(0).duration
    $(".progress").get(0).style.width = 3 * num + "rem"
    $(".font div").get(0).style.top = -3 * num + "rem"
    // 显示时间
    var minute = parseInt($("audio").get(0).currentTime / 60)
    var ss = parseInt($("audio").get(0).currentTime % 60)
    $(".timer span").eq(1).html(minute)
    $(".timer span").eq(2).html(ss)
  }
  $(".pro").click(function (e) {
    $("audio").get(0).currentTime = e.offsetX / $(".pro").width() * $("audio").get(0).duration
  })

  //上传文件mp3
  var timer=null
  $("#upfile").change(function (e) {
    if ($('#upfile')[0].files.length == 0) return
    var formData = new FormData();
    console.log($('#upfile'))
    formData.append('file/upload', $('#upfile')[0].files[0]);
    $.ajax({
      url: '/file/upload',
      type: 'POST',
      cache: false,
      xhr: function () { //这是关键 获取原生的xhr对象 做以前做的所有事情 
        var xhr = jQuery.ajaxSettings.xhr();
        xhr.upload.onload = function () {
          clearTimeout(timer)
          timer=setTimeout(function(){
            $(".upfileProgress").css("display","none")  
            alert("上传成功")
          },500)
        }
        xhr.upload.onprogress = function (ev) {
          if (ev.lengthComputable) {
            var percent = ev.loaded / ev.total;
            $(".upfileProgress").css("display","block")
            $(".upfileProgress").css("width",4*percent+"rem")
            $(".upfileProgress>div").text(parseInt(percent*100))
          }
        }
        return xhr;
      },
      data: formData,
      processData: false,
      contentType: false
    }).done(function (res) {
      if (res.code == 200) {
        console.log({ res })
        $("pre").html(res.files)
        getInitSrc()
      }
    }).fail(function (err) {
      console.log({ err })
    });
  })
  //删除
  $("#removefielSrc").click(function () {
    removeFile()

  })
  // 刷新列表
  $("#getfileSrc").click(function () {
    getInitSrc()
  })
 
  
  var init=function(){
    $.get("/file/getfileSrc", function (res) {
      var html = ''
      for (var i = 0; i <res.length; i++) {
        if (res[i].slice(-3) !== "mp3") continue
        html += '<li  index="' + i + '" isplay="false" data-src="' + res[i] + '" src="' + res[i].slice(6) + '">' + res[i].slice(11, -4) + '<div><img src="play.gif" alt=""></div><input type="checkbox"></li>'
      };
      $(".showList").html(html)
      $("audio").attr("src",res[i].slice(6))
    })
  }
  init()
  function getInitSrc() {
    $.get("/file/getfileSrc", function (res) {
      var html = ''
      for (var i = res.length - 1; i >= 0; i--) {
        if (res[i].slice(-3) !== "mp3") continue
        html += '<li  index="' + i + '" isplay="false" data-src="' + res[i] + '" src="' + res[i].slice(6) + '">' + res[i].slice(11, -4) + '<div><img src="play.gif" alt=""></div><input type="checkbox"></li>'
      };
      $(".showList").html(html)
    })
  }
  function removeFile() {
    var removeList = []
    $("input:checked").parent().each(function (i, el) {
      removeList.push($(el).attr("data-src"))
    })
    console.log(removeList)
    $.get("/file/removeFile", { removeList }, function (res) {
      if (res.code == 200) {
        alert(res.info)
        getInitSrc()
      }
    })
  }
}) 