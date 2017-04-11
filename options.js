var add_form = document.getElementById('add-form'),
    tab_trigger = document.getElementById('tab-trigger'),
    content = document.getElementById('content'),
    list_table = document.getElementById('list-table');
    del_all = document.getElementById('del-all');

chrome.storage.sync.get(null, function(snippets) {
    showSnippet(snippets);
});

function delSnippet (key) {
    var target_el = this;
    chrome.storage.sync.remove(key, function(){
        var del_tr = target_el.parentNode.parentNode;
        del_tr.parentNode.removeChild(del_tr);
    });
}

function showSnippet(obj) {
    for (key in obj) {
        var tt = key.substring(3);
        var tr = document.createElement('tr'),
            td1 = document.createElement('td'),
            td2 = document.createElement('td'),
            td3 = document.createElement('td'),
            span = document.createElement('span');
        span.appendChild(document.createTextNode('删除'));
        span.onclick = function() {
            var ds = delSnippet.bind(this);
            ds(key)
        }
        td1.appendChild(document.createTextNode(tt));
        td2.innerHTML = obj[key];
        td3.appendChild(span);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        list_table.appendChild(tr);
    }
}
function addSnippet(tt, c) {
    var new_snippet = {};
    new_snippet['sp_'+tt] = c;
    chrome.storage.sync.set(new_snippet, function(){
        showSnippet(new_snippet);
    });
}


add_form.addEventListener("submit", function(event){
    event.preventDefault();
    var tt = tab_trigger.value.replace(/\s/g, ''),
        c = content.value.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>');
    addSnippet(tt, c);
    tab_trigger.value = '';
    content.value = '';
});
del_all.addEventListener("click", function(event){
    chrome.storage.sync.clear();
    list_table.innerHTML = '';
});