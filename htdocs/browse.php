<?php


$scripts = [];
$page_title = "Browser page";
session_start();
if (!isset($_SESSION["username"])) {
    header("location: admin.php");
}
require '../database/DatabaseHelper.php';

$config = require '../database/config.php';

$db_helper = new DatabaseHelper($config);

require '../helpers/query-helper.php';

$user_id = 23;

$image_rated = image_rated($db_helper, $user_id);

foreach ($image_rated as $key => $row) {
    $image_rating[$key]  = $row['image_rating'];
}

$image_rating  = array_column($image_rated, 'image_rating');

array_multisort($image_rating, SORT_DESC, $image_rated);

$db_helper->close_connection();

require 'views/browse.view.php';
