<?php
error_reporting(-1);
ini_set('display_errors', 'On');

include dirname(__FILE__)."/api/information_tp.php";
//include "./api/information_test.php";

echo "output<br/>";
echo 'site_name: '.@$site_name."<br/>";
echo 'meta_url: '.@$meta_url."<br/>";