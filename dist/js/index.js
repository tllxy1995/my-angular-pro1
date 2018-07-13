"use strict";angular.module("app",["ui.router","ngCookies","validation","ngAnimate"]),angular.module("app").value("dict",{}).run(["dict","$http",function(t,e){e({method:"GET",url:"/data/city.json"}).then(function(e){t.city=e.data}),e({method:"GET",url:"/data/salary.json"}).then(function(e){t.salary=e.data}),e({method:"GET",url:"/data/scale.json"}).then(function(e){t.scale=e.data})}]),angular.module("app").config(["$provide",function(t){t.decorator("$http",["$delegate","$q",function(t,e){return t.post=function(n,a,i){var o=e.defer();return t.get(n).then(function(t){o.resolve(t)},function(t){o.reject(t)}),{success:function(t){o.promise.then(t)},error:function(t){o.promise.then(t)}}},t}])}]),angular.module("app").config(["$stateProvider","$urlRouterProvider","$locationProvider",function(t,e,n){n.hashPrefix(""),t.state("main",{url:"/main",templateUrl:"view/main.html",controller:"mainCtrl"}).state("position",{url:"/position/:id",templateUrl:"view/position.html",controller:"positionCtrl"}).state("company",{url:"/company/:id",templateUrl:"view/company.html",controller:"companyCtrl"}).state("search",{url:"/search",templateUrl:"view/search.html",controller:"searchCtrl"}).state("login",{url:"/login",templateUrl:"view/login.html",controller:"loginCtrl"}).state("register",{url:"/register",templateUrl:"view/register.html",controller:"registerCtrl"}).state("my",{url:"/my",templateUrl:"view/my.html",controller:"myCtrl"}).state("favorite",{url:"/favorite",templateUrl:"view/favorite.html",controller:"favoriteCtrl"}).state("post",{url:"/post",templateUrl:"view/post.html",controller:"postCtrl"}),e.otherwise("main")}]),angular.module("app").config(["$validationProvider",function(t){var e={phone:/^1[\d]{10}$/,password:function(t){return(t+"").length>5},required:function(t){return!!t}},n={phone:{success:"",error:"必须是11位手机号"},password:{success:"",error:"长度至少6位"},required:{success:"",error:"不能为空！"}};t.setExpression(e).setDefaultMsg(n)}]),angular.module("app").controller("companyCtrl",["$http","$state","$scope",function(t,e,n){t({method:"GET",url:"/data/company.json?id="+e.params.id}).then(function(t){n.company=t.data})}]),angular.module("app").controller("favoriteCtrl",["$scope","$http",function(t,e){e({method:"GET",url:"/data/myFavorite.json"}).then(function(e){t.list=e.data})}]),angular.module("app").controller("loginCtrl",["cache","$scope","$state","$http",function(t,e,n,a){e.submit=function(){a.post("/data/login.json",e.user).success(function(e){t.put("id",e.data.id),t.put("name",e.data.name),t.put("image",e.data.image),n.go("main")})}}]),angular.module("app").controller("mainCtrl",["$scope","$http",function(t,e){e({method:"GET",url:"/data/positionList.json"}).then(function(e){t.list=e.data})}]),angular.module("app").controller("myCtrl",["$state","cache","$scope","$http",function(t,e,n,a){e.get("name")&&(n.name=e.get("name"),n.image=e.get("image")),n.signout=function(){e.remove("id"),e.remove("name"),e.remove("image"),t.go("main")}}]),angular.module("app").controller("positionCtrl",["$log","cache","$q","$http","$state","$scope",function(t,e,n,a,i,o){function r(t){a({method:"GET",url:"/data/company.json?id="+t}).then(function(t){o.company=t.data})}o.isLogin=!!e.get("name"),function(){var t=n.defer();return a({method:"GET",url:"/data/position.json?id="+i.params.id}).then(function(e){o.position=e.data,t.resolve(e)}).catch(function(e){t.reject(e)}),t.promise}().then(function(t){r(t.data.companyId)}),o.go=function(){o.isLogin?a.post("/data/handle.json",{id:o.position.id}).success(function(e){t.info(e.data)}):i.go("login")}}]),angular.module("app").controller("postCtrl",["$scope","$http",function(t,e){t.tabList=[{id:"all",name:"全部"},{id:"pass",name:"面试通知"},{id:"fail",name:"不合适"}],e({method:"GET",url:"/data/myPost.json"}).then(function(e){t.positionList=e.data}),t.filterObj={},t.tClick=function(e,n){switch(e){case"all":delete t.filterObj.state;break;case"pass":t.filterObj.state="1";break;case"fail":t.filterObj.state="-1"}}}]),angular.module("app").controller("registerCtrl",["$interval","$scope","$http","$state",function(t,e,n,a){e.submit=function(){n.post("/data/regist.json",e.user).success(function(t){a.go("login")})};var i=60;e.send=function(){n({method:"GET",url:"/data/code.json"}).then(function(n){if(1===n.data.state){i=60,e.time="60s";var a=t(function(){if(i<=0)return t.cancel(a),void(e.time="");i--,e.time=i+"s"},1e3)}})}}]),angular.module("app").controller("searchCtrl",["dict","$http","$scope",function(t,e,n){n.name="",n.search=function(){e({method:"GET",url:"/data/positionList.json?name="+n.name}).then(function(t){n.positionList=t.data})},n.search(),n.sheet={},n.tabList=[{id:"city",name:"城市"},{id:"salary",name:"薪资"},{id:"scale",name:"公司规模"}],n.filterObj={};var a="";n.tClick=function(e,i){a=e,n.sheet.list=t[e],n.sheet.visible=!0},n.sClick=function(t,e){t?(angular.forEach(n.tabList,function(t){t.id===a&&(t.name=e)}),n.filterObj[a+"Id"]=t):(delete n.filterObj[a+"Id"],angular.forEach(n.tabList,function(t){if(t.id===a)switch(t.id){case"city":t.name="城市";break;case"salary":t.name="薪资";break;case"scale":t.name="公司规模"}}))}}]),angular.module("app").directive("appCompany",[function(){return{restrict:"A",replace:!0,scope:{company:"="},templateUrl:"view/template/company.html"}}]),angular.module("app").directive("appFoot",[function(){return{restrcit:"A",replace:!0,templateUrl:"view/template/foot.html"}}]),angular.module("app").directive("appHead",["cache",function(t){return{restrict:"A",replace:!0,templateUrl:"view/template/head.html",link:function(e){e.name=t.get("name")||""}}}]),angular.module("app").directive("appHeadBar",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/headBar.html",scope:{text:"@"},link:function(t){t.back=function(){window.history.back()}}}}]),angular.module("app").directive("appPositionClass",[function(){return{restrcit:"A",replace:!0,scope:{company:"="},templateUrl:"view/template/positionClass.html",link:function(t){t.showPositionList=function(e){t.positionList=t.company.positionClass[e].positionList,t.isActive=e},t.$watch("company",function(e){e&&t.showPositionList(0)})}}}]),angular.module("app").directive("appPositionInfo",["$http",function(t){return{restrcit:"A",replace:!0,templateUrl:"view/template/positionInfo.html",scope:{isActive:"=",isLogin:"=",position:"="},link:function(e){e.$watch("position",function(t){t&&(e.position.select=e.position.select||!1,e.imagePath=e.position.select?"image/star-active.png":"image/star.png")}),e.favorite=function(){t.post("/data/favorite.json",{id:e.position.id,select:e.position.select}).success(function(t){e.position.select=!e.position.select,e.imagePath=e.position.select?"image/star-active.png":"image/star.png"})}}}}]),angular.module("app").directive("appPositionList",["$http",function(t){return{restrict:"A",replace:!0,templateUrl:"view/template/positionList.html",scope:{data:"=",filterObj:"=",isFavorite:"="},link:function(e){e.select=function(e){t.post("/data/favorite.json",{id:e.id,select:!e.select}).success(function(t){e.select=!e.select})}}}}]),angular.module("app").directive("appSheet",[function(){return{restrcit:"A",replace:!0,scope:{list:"=",visible:"=",select:"&"},templateUrl:"view/template/sheet.html"}}]),angular.module("app").directive("appTab",[function(){return{restrict:"A",replace:!0,scope:{list:"=",tabClick:"&"},templateUrl:"view/template/tab.html",link:function(t){t.selectId=t.list[0].id,t.click=function(e){t.selectId=e.id,t.tabClick(e)}}}}]),angular.module("app").filter("filterByObj",[function(){return function(t,e){var n=[];return angular.forEach(t,function(t){var a=!0;for(var i in e)t[i]!==e[i]&&(a=!1);a&&n.push(t)}),n}}]),angular.module("app").service("cache",["$cookies",function(t){this.put=function(e,n){t.put(e,n)},this.get=function(e){return t.get(e)},this.remove=function(e){t.remove(e)}}]);