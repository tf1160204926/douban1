// 建立模块

// 依赖的模块有路由和大的控制器，指令
angular.module("yike", ["ngRoute", "Controller"])

    // 配置路由
    .config(["$routeProvider", function($routeProvider) {
        $routeProvider.when("/today", {
                templateUrl: "./views/today.html",
                controller: "todayController"
            })

            .when("/older", {
                templateUrl: "./views/older.html",
                controller: "olderController"
            })
            .when("/favourite", {
                templateUrl: "./views/favourite.html",
                controller: "favouriteController"
            })
            .when("/setting", {
                templateUrl: "./views/setting.html",
                controller: "settingController"
            })
            .when("/preview", {
                templateUrl: "./views/preview.html",
                controller: "previewController"
            })
            .when("/preview/:id", {
                templateUrl: "./views/preview/select.html",
                controller: "selectController"
            })
            .when("/hotauthor", {
                templateUrl: "./views/author.html",
                controller: "authorController"
            })
            .when("/hotauthor/authorWork/:id", {
                templateUrl: "./views/authorWork.html",
                controller: "authorWorkController"
            })
            .when("/center", {
                templateUrl: "./views/center.html",
                controller: "centerController"
            })
            .otherwise({
                redirectTo: "/today"
            })

    }])
    // angular默认给hash路由添加了感叹号导致出错，需要配置，把感叹号去掉
    .config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix("");
    }])

    // 点击菜单，实现侧边栏和主页的切换

    .run(["$rootScope", function($rootScope) {
        // 获取侧边栏和主页栏的元素
        var nav = document.getElementsByClassName("nav")[0];
        var container = document.getElementsByClassName("container")[0];
        var top = container.children[0];
        // 获取dd数组，让逐个出现或退出
        // var listArr=document.querySelectorAll('.nav>dl>dd');
        // 这里不能使用document.querySelectorAll的方法获取元素，因为这样获取的是静态的
        var listArr = nav.children[0].getElementsByTagName("dd");


        // 首先让侧边栏默认关闭
        var open = false;
        $rootScope.toggle = function(ele) {
            console.log();
            // 首先判断侧边栏是否开启，如果开启的，就关闭，如果是关闭的，就开启
            // 如果是关闭的，就开启，并让open为true
            if (open === false) {
                nav.style.left = 0;
                // 让主页面的top和bottom都
                // 向移动
                container.style.marginLeft = 410 / 32 + "rem";
                top.style.left = 410 / 32 + "rem";

                // 遍历listArr,让侧边栏的列表依次向右滑动
                for (var i = 0; i < listArr.length; i++) {
                    listArr[i].style.transform = "translateX(0)";
                    listArr[i].style.transitionDelay = '0.2s';
                    listArr[i].style.transitionDuration = (i + 1) * 0.15 + 's';
                }
                // 让侧边栏向右平移410/32rem的距离
                open = true;
            }
            // 如果是打开的，就关闭,并让open为false
            else {
                // 让侧边栏向右平移410/32rem的距离
                nav.style.left = -410 / 32 + "rem";
                // 让主页面的top和bottom都向移动
                container.style.marginLeft = 0;
                top.style.left = 0;
                var len = listArr.length;

                for (var j = len - 1; j >= 0; j--) {

                    listArr[j].style.transform = "translateX(-100%)";
                    listArr[j].style.transitionDelay = '';
                    listArr[j].style.transitionDuration = (len - j) * 0.15 + 's';
                }
                open = false;
            }
        }
    }])