$("#mail button").click(function () {
    var user = $("#mail #user").val()
    var password = $("#mail #password").val()
    var message = $("#mail #message").val()
    var to = $("#mail #to").val()
    $.post("./mails", { user, password, message, to }, function (res) {
       alert(res.message)
    })
})