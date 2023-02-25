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


if ($_SERVER['REQUEST_METHOD'] === "GET") {
    require 'views/browse.view.php';
} else if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $sort_order = trim($_POST['Filtered_Order']);
    $city = trim($_POST['Filtered_city']);
    $Rating = trim($_POST['Filtered_Rating']);
    $country = trim($_POST['Filtered_country']);

    if (!(empty($Rating))) {

        $image_rated = array_filter($image_rated, function ($item) use ($Rating) {
            if ((stripos($item['image_rating'], $Rating)) !== false) {
                return true;
            }
            return false;
        });
    }

    if (!(empty($country)) && !(empty($city))) {

        $image_rated = array_filter($image_rated, function ($item) use ($country, $city) {
            if ((stripos($item['country_name'], $country) &&
                (stripos($item['city_name'], $city))) !== false) {
                return true;
            }
            return false;
        });
    } else if (!(empty($country)) && empty($city)) {

        $image_rated = array_filter($image_rated, function ($item) use ($country) {
            if ((stripos($item['country_name'], $country)) !== false) {
                return true;
            }
            return false;
        });
    } else if (empty($country) && !(empty($city))) {

        $image_rated = array_filter($image_rated, function ($item) use ($city) {
            if ((stripos($item['city_name'], $city)) !== false) {
                return true;
            }
            return false;
        });
    }

    require 'views/browse.view.php';
}
$db_helper->close_connection();
