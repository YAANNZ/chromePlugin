// getGold 

Bmob.initialize("61d4e059342a9d4648c6cae439c96dc2", "f6b6d5ee72d3c95c724636c7fa30f98f");

function showHUD() {

	var gold = document.getElementById('Gold');
	var tip = document.getElementById('tip');
	if (tip) {
		tip.innerHTML = 'Loading...';
		return tip;
	} else {
		var tip = document.createElement('div');
		tip.id = 'tip';
		tip.innerHTML = 'Loading...';
		gold.appendChild(tip);
		return tip;
	}
}

document.getElementById('addBtn').onclick = function() {

	var tip = showHUD();
	var url = document.getElementById('urlText');
	var username = document.getElementById('usernameText');
	if (!(url.value && username.value)) {
		tip.innerHTML = '请输入完整信息';
		return;
	}

	if (url.value.indexOf('http://share.jl.ztgame.com')<0) {
		tip.innerHTML = '请输入正确链接';
		return;
	}

	var JlUser = Bmob.Object.extend("JL_URLS");
	var jlUser = new JlUser();
	jlUser.set("userUrl", url.value);
	jlUser.set("username", username.value);
	jlUser.save(null, {
      success: function(object) {
        tip.innerHTML = 'SUCCESS!';
      },
      error: function(model, error) {
        tip.innerHTML = 'FAILURE';
      }
    });
}

document.getElementById('goldBtn').onclick = function() {

	var tip = showHUD();
	var JlUsers = Bmob.Object.extend("JL_URLS");
	var query = new Bmob.Query(JlUsers);
	// 查询所有数据
	query.find({
  		success: function(results) {
    		// 循环处理查询到的数据
    		for (var i = 0; i < results.length; i++) {
      			var object = results[i];
      			// alert(results.length+'--'+i);
      			var xhrItem = new XMLHttpRequest();
            	xhrItem.open("GET", object.get('userUrl'), true);
            	xhrItem.onreadystatechange = function() {
        			if (xhrItem.readyState == 4) {
        				if (xhrItem.status != 200) {
        					tip.innerHTML = 'FAILURE';
        				} else {
        					// alert(xhrItem.status+'--'+i);
        					if (i >= results.length-1) {
        						tip.innerHTML = 'SUCCESS!';
        					}
        				}
        			}
        		}
            	xhrItem.send();
    		}
  		},
  		error: function(error) {
  			tip.innerHTML = 'FAILURE';
    		// alert("查询失败: " + error.code + " " + error.message);
  		}
	});

	

	// var xhr = new XMLHttpRequest();
	// xhr.open("GET", "main.txt", true);
	// xhr.onreadystatechange = function() {

 //        if (xhr.readyState == 4) {
 //            var urlArr = xhr.responseText.split(',');
 //            var count = 0;
 //            urlArr.forEach(function(urlItem){
 //            	var xhrItem = new XMLHttpRequest();
 //            	xhrItem.open("GET", urlItem, true);
 //            	xhrItem.onreadystatechange = function() {
 //        			if (xhrItem.readyState == 4) {
 //        				var tip = document.getElementById('tip');
 //        				if (xhrItem.status != 200) {
 //        					tip.innerHTML = 'FAILURE';
 //        				} else {
 //        					count++;
 //        					if (count == urlArr.length) {
 //        						tip.innerHTML = 'SUCCESS!';
 //        					}
 //        				}
 //        			}
 //        		}
 //            	xhrItem.send();
 //            })
 //        }
 //    }
 //    xhr.send();
}
