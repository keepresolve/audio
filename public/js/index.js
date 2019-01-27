$(function() {
  let state = {
    list: [],
    currentIndex: 0,
    palyType: "once"
  };
  let watch = new Observer(state, {
    watch: {
      palyType: function(n, o) {},
      currentIndex: function(n, o) {
        $(".showList li div").css("display", "none");
        $(".showList li").eq(n).find("div").css("display", "inline-block");
        $("audio").attr( "src", $(".showList li") .eq(n).attr("src"));
        $("audio").attr("index",
          $(".showList li")
            .eq(n)
            .attr("index")
        );
      }
    }
  });

  // 减少上一曲下一曲的bug
  // var ado = document.getElementsByTagName('audio')[0]
  function currentPlay(index) {
    if (index == state.list.length) index = 0;
    if (index == -1) index = state.list.length - 1;
    state.currentIndex = index;
    $("audio")
      .get(0)
      .play();
  }
  $(".warpper").on("click", "li", function() {
    state.palyType = "once";
    state.currentIndex = $(this).attr("index");
    $("audio")
      .get(0)
      .play();
  });
  $(".warpper").on("click", "input", function(e) {
    e.stopPropagation();
  });
  // 双击播放
  $("h3").dblclick(function() {
    $("audio")
      .get(0)
      .load();
    $("audio")
      .get(0)
      .play();
  });
  // 播放
  $(".big button")
    .eq(0)
    .click(function() {
      state.currentIndex= state.currentIndex
      $("audio")
        .get(0)
        .play();
    });
  // 暂停
  $(".big button")
    .eq(1)
    .click(function() {
      $("audio")
        .get(0)
        .pause();
    });
  // 快进
  $(".big button")
    .eq(2)
    .mousedown(function() {
      $("audio").get(0).currentTime += 5;
    });
  // 快退
  $(".big button")
    .eq(3)
    .mousedown(function() {
      $("audio").get(0).currentTime -= 5;
    });
  // 音量加
  $(".big button")
    .eq(4)
    .mousedown(function() {
      $("audio").get(0).volume += 0.1;
    });
  // 音量减
  $(".big button")
    .eq(5)
    .mousedown(function() {
      $("audio").get(0).volume -= 0.1;
    });
  //静音
  $(".big button")
    .eq(6)
    .mousedown(function() {
      $("audio").get(0).muted = !$("audio").get(0).muted;
    });
  //全屏
  $(".big button")
    .eq(7)
    .mousedown(function() {
      if ($(".big").width() - 0 > 400) {
        $(".big").animate(
          {
            marginTop: "1rem",
            width: "4rem",
            height: "60%"
          },
          function() {
            $(".big button")
              .eq(7)
              .html("全屏");
          }
        );
      } else {
        $(".big").animate(
          {
            marginTop: "0px",
            width: "80%",
            height: "80%"
          },
          function() {
            $("button")
              .eq(7)
              .html("缩小");
          }
        );
      }
    });
  // 下一曲
  $("button")
    .eq(9)
    .mousedown(function() {
      var currentIndex = $("audio").attr("index") - 0 + 1;
      currentPlay(currentIndex);
    });

  // 上一曲
  $("button")
    .eq(8)
    .mousedown(function() {
      var currentIndex = $("audio").attr("index") - 1;
      currentPlay(currentIndex);
      $("audio")
        .get(0)
        .play();
    });
  // 单曲
  $("button")
    .eq(10)
    .mousedown(function() {
      $("audio").attr("loop", "loop");
    });
  // 顺序
  $("button")
    .eq(11)
    .mousedown(function() {
      $("audio").removeAttr("loop");
      state.palyType = "normal";
      $("audio").get(0).onended = function() {
        if (state.palyType == "normal") {
          var currentIndex = state.currentIndex+1
          if(currentIndex==state.list.length) return
          currentPlay(currentIndex, 0);
        }
      };
    });
  // 随机
  $("button")
    .eq(12)
    .mousedown(function() {
      state.palyType = "math";
       $("audio").get(0).onended = ()=>{if (state.palyType == "math") currentPlay(Math.ceil(Math.random() * state.list.length - 1));}
    });
  // 循环
  $("button")
    .eq(13)
    .mousedown(function() {
      $("audio").removeAttr("loop");
      $("audio").get(0).onended = function() {
        currentPlay(state.currentIndex+1);
      };
    });
  //滚动条
  $("audio").get(0).ontimeupdate = function() {
    var num = $("audio").get(0).currentTime / $("audio").get(0).duration;
    $(".progress").get(0).style.width = 3 * num + "rem";
    $(".font div").get(0).style.top = -3 * num + "rem";
    // 显示时间
    var minute = parseInt($("audio").get(0).currentTime / 60);
    var ss = parseInt($("audio").get(0).currentTime % 60);
    $(".timer span")
      .eq(1)
      .html(minute);
    $(".timer span")
      .eq(2)
      .html(ss);
  };
  $(".pro").click(function(e) {
    $("audio").get(0).currentTime =
      (e.offsetX / $(".pro").width()) * $("audio").get(0).duration;
  });

  //上传文件mp3
  var timer = null;
  $("#upfile").change(function(e) {
    if ($("#upfile")[0].files.length == 0) return;
    var formData = new FormData();
    console.log($("#upfile"));
    formData.append("fileName", $("#upfile")[0].files[0]);
    $.ajax({
      url: "/file/upload",
      type: "POST",
      cache: false,
      xhr: function() {
        //这是关键 获取原生的xhr对象 做以前做的所有事情
        var xhr = jQuery.ajaxSettings.xhr();
        xhr.upload.onload = function() {
          clearTimeout(timer);
          timer = setTimeout(function() {
            $(".upfileProgress").css("display", "none");
            alert("上传成功");
          }, 500);
        };
        xhr.upload.onprogress = function(ev) {
          if (ev.lengthComputable) {
            var percent = ev.loaded / ev.total;
            $(".upfileProgress").css("display", "block");
            $(".upfileProgress").css("width", 4 * percent + "rem");
            $(".upfileProgress>div").text(parseInt(percent * 100));
          }
        };
        return xhr;
      },
      data: formData,
      processData: false,
      contentType: false
    })
      .done(function(res) {
        $("#upfile").value = "";

        if (res.code == 200) {
          console.log({ res });
          $("pre").html(res.files);
          getInitSrc();
        }
      })
      .fail(function(err) {
        $("#upfile").value = "";
        console.log({ err });
      });
  });
  //删除
  $("#removefielSrc").click(function() {
    removeFile();
  });
  // 刷新列表
  $("#getfileSrc").click(function() {
    getInitSrc();
  });

  var init = function() {
    getInitSrc("init");
  };
  init();
  function getInitSrc(type) {
    $.get("/file/getfileSrc", function(res) {
      state.list = res;
      if (type == "init") {
        $("audio").attr("src", res[state.currentIndex].remotePath);
      } else {
        // state.currentIndex = state.currentIndex
      }
    });
  }
  function removeFile() {
    var removeList = [];
    $("input:checked")
      .parent()
      .each(function(i, el) {
        console.log(i, el);
        removeList.push({ id: $(el).attr("id"), path: $(el).attr("data-src") });
      });
    console.log(removeList);
    $.get("/file/removeFile", { removeList }, function(res) {
      if (res.code == 200) {
        alert(res.info);
        getInitSrc();
      }
    });
  }
});
