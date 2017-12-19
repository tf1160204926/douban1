<?php 
header("content-type:text/html;charset=utf-8");
// 获取浏览器请求的数据


$loadMore = $_GET["loadmore"];

// 本周推荐作者
$week = 'https://moment.douban.com/api/auth_authors/rec?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

// 全部作者
$all='https://moment.douban.com/api/auth_authors/all?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

// 热门作者加载更多
$more = 'https://moment.douban.com/api/auth_authors/all?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=20&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

$weekUrl=file_get_contents($week);

$allUrl=file_get_contents($all);

$moreUrl=file_get_contents($more);

// 把他们转换成数组
 
 $weekUrl=json_decode($weekUrl,true);
 $allUrl=json_decode($allUrl,true);
 $moreUrl=json_decode($moreUrl,true);

 // 把这两个数组放到一个新建的数组中。

 $result=array('week'=>$weekUrl,'all'=>$allUrl);

 $moreResult=array('week'=>$weekUrl,'all'=>$allUrl,'more'=>$moreUrl);

 // 在把这个数组装成字符串输出

 // echo json_encode($result);

 // 判断如果提交的数据是more，就把三个都输出，如果不是，就只输出推荐和全部

 if($loadMore=="more"){
 	echo json_encode($moreResult);
 }
 else if($loadMore=="no"){
 	echo json_encode($result);
 }

?>