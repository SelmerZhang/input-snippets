var msg_box = document.createElement('div');
msg_box.id = 'sp_msg_box_haha';
msg_box.innerHTML = '<div id="sp_msg_close">×</div><div id="sp_msg_haha"></div><div id="sp_text_haha"></div>';
document.getElementsByTagName('body')[0].appendChild(msg_box);
var sp_close = document.getElementById('sp_msg_close');
var sp_msg = document.getElementById('sp_msg_haha');
//var sp_text = document.getElementById('sp_text_haha');
sp_close.addEventListener("click", function(event) {
  msg_box.style.display = 'none';
  sp_msg.innerText = '';
  //sp_text.innerText = '';
});

document.addEventListener("keydown", function(event){
  var key_code = event.keyCode;
  if (key_code == 9) {
    var current_el = event.target,
      current_val = current_el.value,
      caret_pos = current_el.selectionStart,
      piece1 = current_val.substring(0, caret_pos),
      piece2 = current_val.substring(caret_pos),
      piece1_obj = piece1.split(' ');
      current_tt = (piece1_obj.length > 0) ? piece1_obj.pop() : piece1;
    chrome.storage.sync.get('sp_'+current_tt, function(content) {
      content = content['sp_'+current_tt];
      if (typeof(content) == "undefined") {
        return false;
      }
      piece1 = piece1_obj.length > 0 ? piece1_obj.join(' ')  + ' ': '';
      current_el.value = piece1 + content + piece2;
      var pos = caret_pos + content.length - current_tt.length;
      current_el.setSelectionRange(pos,pos);
    });
  } 
});
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.state == "success") {
    if (request.msg == "success") {
      msg_box.style.display = 'block';
      sp_msg.innerText = '添加成功';
      setTimeout(function() {
        sp_close.click();
      }, 1000);
    }
    //  else {
    //   msg_box.style.display = 'block';
    //   sp_text.innerText = request.msg;
    // }
  } else if (request.state == "fail") {
    msg_box.style.display = 'block';
    sp_msg.innerText = '未找到对应Snippet';
    setTimeout(function() {
      sp_close.click();
    }, 1000);
  }
});