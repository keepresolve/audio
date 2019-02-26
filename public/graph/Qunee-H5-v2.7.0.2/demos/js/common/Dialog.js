/**
* This file is part of Qunee for HTML5.
* Copyright (c) 2016 by qunee.com
**/
if(!window.getI18NString){getI18NString = function(s){return s;}}
;(function(Q, $){
    function getFirstChild(parent, childClass) {
        var child = parent.find(childClass);
        if (child.length) {
            return child[0];
        }
    }
    var DIALOG_HTML = '<div class="modal-dialog">\
    <div class="modal-content">\
    <div class="modal-header">\
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;<\/button>\
    <h4 class="modal-title">Title<\/h4>\
    <\/div>\
    <div class="modal-body"><\/div>\
    <\/div>\
    <\/div>';

    function Dialog(title, parent){
        var html = this.html = document.createElement('div');
        if(parent){
            parent.appendChild(html);
        }
        html = $(html);
        html.addClass('modal');
        html.html(DIALOG_HTML);
        this.body = getFirstChild(html, '.modal-body');
        this._title = getFirstChild(html, '.modal-title');
        this.setTitle(title);
    }
    Dialog.prototype = {
        html: null,
        body: null,
        _title: null,
        setTitle: function(title, byInnerHTML){
            if(byInnerHTML){
                this._title.innerHTML = title;
                return;
            }
            this._title.textContent = title;
        },
        show: function(){
            $(this.html).modal("show");
        },
        hide: function(){
            $(this.html).modal("hide");
        }
    }

    var dialog;
    function showDialog(title, innerHTML){
        if(!dialog){
            dialog = new Dialog(title, document.body);
        }
        dialog.body.innerHTML = innerHTML || '';
        dialog.show();
        return dialog;
    }
    Q.Dialog = Dialog;
    Q.showDialog = showDialog;
}(Q, jQuery));