<?php 
header("content-type:text/html;charset=utf-8");

// 获取前一天的时间

// 服务器获取当前时间
// $time=time();

// 获取前两天的时间
$time=strtotime('-1day',time());
// 转换成2017-12-13的格式，要传入到url中访问
$older=date("Y-m-d",$time);

// 访问豆瓣数据，前两天的数据
$url='https://moment.douban.com/api/stream/date/'.$older.'?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

echo file_get_contents($url);

?>