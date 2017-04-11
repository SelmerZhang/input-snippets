function addMenuOnClick(info, tab) {
  var c = prompt('请输入触发补全字符串');
  if (c != null && c != "") {
    c = c.replace(/\s/g, '');
    var new_snippet = {};
    new_snippet['sp_'+c] = info.selectionText;
    chrome.storage.sync.set(new_snippet, function(){
      chrome.tabs.sendRequest(tab.id, {state: "success", msg: "success"});
    });
  }
}
// function findMenuOnClick(info, tab) {
//   var tt = info.selectionText.replace(/\s/g, '');
//   chrome.storage.sync.get('sp_'+tt, function(content) {
//       content = content['sp_'+tt];
//       if (typeof(content) == "undefined") {
//         chrome.tabs.sendRequest(tab.id, {state: "fail", msg: "notfound"});
//       } else {
//         chrome.tabs.sendRequest(tab.id, {state: "success", msg: content});
//       }
//   });
// }
var add_menu = chrome.contextMenus.create({
    "title": '添加文本到Snippet',
    "contexts":['selection'],
    "onclick": addMenuOnClick
});
// var find_menu = chrome.contextMenus.create({
//     "title": '查找Snippet完整文本',
//     "contexts":['selection'],
//     "onclick": findMenuOnClick
// });