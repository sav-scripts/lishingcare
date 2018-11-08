<?php
include ('../config.php');
include ('db_start.php');
?>
<?php
$city = 'tc';
$site_name = '';
$meta_title = '';
$meta_description = '';
$meta_keyword = '';
$meta_url = '';
$service_email = '';
$ga_id = '';
$copyright = '';
try{
    $data = $db->rawQueryOne ("select * from config_". $city);

    if ($data != null) {
        $site_name = $data['site_name'];
        $meta_title = $data['meta_title'];
        $meta_description = $data['meta_description'];
        $meta_keyword = $data['meta_keyword'];
        $meta_url = $data['meta_url'];
        $service_email = $data['service_email'];
        $ga_id = $data['ga_id'];
        $copyright = $data['copyright'];
    }
}catch(Exception $e) {}
?>
<?php
include ('db_end.php');
?>