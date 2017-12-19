// // 模块Controller管理着下面的控制器
angular.module("Controller", []).controller("leftController", ["$scope", "$filter", "$http", "$rootScope", function($scope, $filter, $http, $rootScope) {

        // 左侧菜单列表部分
        $rootScope.lists = [
            { link: "#/today", ico: "icon-home", title: "今日一刻" },
            { link: "#/older", ico: "icon-file-empty", title: "往期内容" },
            { link: "#/hotauthor", ico: "icon-pencil", title: "热门作者" },
            { link: "#/preview", ico: "icon-menu", title: "栏目浏览" },
            { link: "#/favourite", ico: "icon-heart", title: "我的收藏" },
            { link: "#/setting", ico: "icon-cog", title: "设置" }
        ]
    }])

    // 今日一刻控制器部分
    .controller("todayController", ["$scope", "$filter", "$http", "$rootScope", "$location", function($scope, $filter, $http, $rootScope, $location) {
        console.log(888);

        // 获取当前时间
        // 因为获取的数据的url中时间的格式式2017-12-13这样的格式
        var today = $filter('date')(new Date(), 'yyyy-MM-dd');

        // 从后台获取数据。

        $rootScope.title = "今日一刻";
        $rootScope.index = 0;
        $rootScope.actived = false;

        // 在请求发送以及接受到服务器返回的数据之前，是没有加载出来内容，就默认显示转动的小圈圈
        $rootScope.uploaded = false;
        $http({
            method: 'get',
            url: './api/today.php',
            params: {
                today: today
            }
        }).then(function successCallback(info) {
            // 请求成功执行代码
            // console.log("成功")
            // console.log(info.data.date);
            // console.log(info.data.posts);
            // console.log(info);

            $scope.date = info.data.date;
            $scope.posts = info.data.posts;
            $rootScope.uploaded = true;


            $scope.content = function(url, data, i) {
                console.log(this);
                //$location.url=url;
                // console.log(url);
                self.location.href = url;
                //$rootScope.actived=true;
                // console.log(i);
                // console.log(data);

                eval("$scope.myObjtoday" + i + "={'color' : '#999'}");
            }

        }, function errorCallback(err) {
            // 请求失败执行代码
            alert("失败");
        });
    }])


    // 往期内容部分
    .controller("olderController", ["$http", "$scope", "$rootScope", function($http, $scope, $rootScope) {
        // 当点击往期内容的时候，标题变成往期内容
        $rootScope.title = "往期内容"
        $rootScope.index = 1;
        // 在没加载完之前，把uploaded改成false，显示小圈圈
        $rootScope.uploaded = false;

        $http({
            method: "get",
            url: "./api/older.php"
        }).then(function successCallback(info) {

            // console.log(info);
            $scope.date = info.data.date;
            $scope.posts = info.data.posts;
            // 加载完成后小圈消失
            $rootScope.uploaded = true;

            // 点击内容加载
            $scope.content = function(url, i) {
                // 跳转到url页面
                self.location.href = url;
                eval("$scope.myObjolder" + i + "={'color':'#999'}");
            }

        }, function errorCallback(err) {
            alert("请求失败");
        })
    }])


    // 热门作者部分
    .controller("authorController", ["$http", "$scope", "$rootScope", function($http, $scope, $rootScope) {

        $rootScope.index = 2;
        $rootScope.title = "热门作者";
        $rootScope.uploaded = false;

        $scope.clicked = false;
        $scope.complete = false;

        // 请求本周推荐和全部作者
        $http({
            url: "./api/author.php",
            method: "get",
            params: {
                'loadmore': "no"
            }
        }).then(function successCallback(info) {
            $rootScope.uploaded = true;
            // console.log(info);
            // console.log(info.data.week);
            // console.log(info.data.all);
            $scope.week = info.data.week;
            $scope.all = info.data.all;

        }, function errorCallback(err) {
            console.log("请求失败");

        })


        // 点击加载更多作者
        $scope.more = function() {
            // 点击加载更多的时候，把clicked改成true
            $scope.clicked = true;
            $http({
                url: "./api/author.php",
                method: "GET",
                params: {
                    'loadmore': 'more'
                }
            }).then(function successCallback(info) {
                // console.log(info);
                // 更多加载在加载完后，把complete改成true
                $scope.complete = true;
                $scope.more = info.data.more;
            }, function errorCallback(err) {
                console.log(err);
            })
        }
    }])


    // 栏目预览部分
    .controller("previewController", ["$http", "$scope", "$rootScope", "$location", function($http, $scope, $rootScope, $location) {

        $rootScope.index = 3;
        $rootScope.title = "栏目预览";
        $rootScope.uploaded = false;
        $http({
            url: "./api/preview.php",
            method: "GET"
        }).then(function successCallback(info) {
            $rootScope.uploaded = true;
            // console.log(info);
            $scope.data = info.data;
        }, function errorCallback(err) {
            console.log(err);
        })
    }])

    // 当前栏目部分
    .controller("selectController", ["$rootScope", "$scope", "$location", "$http", function($rootScope, $scope, $location, $http) {

        // console.log($location.search().id);

        $rootScope.title = $location.search().name;
        $rootScope.uploaded = false;
        $http({
            url: "./api/preview/select.php",
            method: "GET",
            params: {
                id: $location.search().id
            }
        }).then(function successCallback(info) {
            $rootScope.uploaded = true;
            $scope.data = info.data;
            // console.log(info);

            $scope.content = function(url, i) {
                // 跳转到url界面上
                self.location.href = url;
                eval("$scope.myObjselect" + i + "={'color':'#999'}");
            }
        }, function errorCallback(err) {
            console.log(err);
        })
    }])

    // 我的喜欢部分
    .controller("favouriteController", ["$rootScope", function($rootScope) {
        $rootScope.title = "我的喜欢";
        $rootScope.index = 4;
    }])

    // 设置部分
    .controller("settingController", ["$rootScope", "$scope", function($rootScope, $scope) {
        $rootScope.title = "设置";
        $rootScope.index = 5;

        $scope.items = [
            { title: "正文字号", instruction: "18号", open: 0 },
            { title: "启用推送", instruction: "接受推送", open: 1 },
            { title: "自动离线", instruction: "已启用WIFI网络下自动离线下载", open: 1 },
            { title: "检查更新", instruction: "检查是否有新版本", open: 0 },
            { title: "意见反馈", instruction: "给我们发送意见和建议", open: 0 },
            { title: "绑定分享账号", instruction: "绑定微博", ico: "icon-sina-weibo", open: 2 },
            { title: "开源许可", instruction: "开放源代码软件的许可详情", open: 0 },
            { title: "关于", instruction: "1.7.10", open: 0 }
        ]

        for (var i = 0; i < $scope.items.length; i++) {
            // $scope.hasSelect=true;
            $scope.open = true;

            $scope.change = function(index) {

                if ($scope.open === true) {
                    eval('$scope.bool' + index + "=1");
                }
                if ($scope.open === false || $scope.open === undefined) {
                    eval('$scope.bool' + index + "=0");
                }
                $scope.open = !$scope.open;
            }
        }

    }])


    // 作者作品部分
    .controller("authorWorkController", ["$http", "$rootScope", "$scope", "$location", function($http, $rootScope, $scope, $location) {
        $rootScope.uploaded = false;
        $scope.clicked = false;

        // 获取url参数
        var id = $location.search().id;
        console.log(id);
        $http({
            url: "./api/author/authorWork.php",
            method: "GET",
            params: {
                id: id
            }
        }).then(function successCallback(info) {
            console.log(info);
            $rootScope.uploaded = true;
            $scope.data = info.data;
            $rootScope.title = info.data.author.name + "的主页";

            // 点击查看内容
            $scope.content = function(url, i) {
                // 跳转到url页面
                self.location.href = url;
                eval("$scope.myObjwork" + i + "={'color':'#999'}");
            }
            // 点击豆瓣主页，页面跳转到豆瓣主页上去
            $scope.main = function(url) {
                self.location.href = url;
            }

            // 点击查看更多内容
            $scope.morework = function() {
                // 获取当前作者的id
                var moreid = info.data.author.id;
                console.log(moreid);
                $http({
                    url: "./api/author/workMore.php",
                    method: "get",
                    params: {
                        id: moreid
                    }
                }).then(function successCallback(info) {
                    // console.log(info);
                    $scope.datawork = info.data;
                    $scope.clicked = true;
                }, function errorCallback(err) {
                    console.log(err);
                })
            }

        }, function errorCallback(err) {
            console.log(err);
        })

    }])

    // 作者主页部分
    .controller("centerController", ["$http", "$rootScope", "$scope", function($http, $rootScope, $scope) {
        $rootScope.title = "豆瓣主页";

    }])