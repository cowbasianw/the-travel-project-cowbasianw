<?php

session_start();
if (!isset($_SESSION["username"])) {
    header("location: admin.php");
}


$page_title = "Browser page";

require '../database/DatabaseHelper.php';

$config = require '../database/config.php';

$db_helper = new DatabaseHelper($config);

require '../helpers/query-helper.php';
require '../helpers/browser-helper.php';

$user_id = 23;
$image_rated = image_rated($db_helper, $user_id);

foreach ($image_rated as $key => $row) {
    $image_rating[$key]  = $row['image_rating'];
    $city_name[$key] = $row['city_name'];
}
$city_name  = array_column($image_rated, 'city_name');
$image_rating  = array_column($image_rated, 'image_rating');

if ($_SERVER['REQUEST_METHOD'] === "GET") {

    if (isset($_COOKIE['order'])) {
        $changed_variable = $_COOKIE['order'];

        if ($changed_variable === 'SORT_DESC_RATING') {
            $sort_order = SORT_DESC;
            $sort_item = $image_rating;
        } else if ($changed_variable === 'SORT_ASC_RATING') {
            $sort_order = SORT_ASC;
            $sort_item = $image_rating;
        } else if ($changed_variable === 'SORT_DESC_CITY') {
            $sort_order = SORT_DESC;
            $sort_item = $city_name;
        } else if ($changed_variable === 'SORT_ASC_CITY') {
            $sort_order = SORT_ASC;
            $sort_item = $city_name;
        }
        array_multisort($sort_item, $sort_order,  $image_rated);
    }
    require 'views/browse.view.php';
} else if ($_SERVER['REQUEST_METHOD'] === "POST") {

    if (isset($_POST['Logout'])) {

        unset($_SESSION["username"]);
        session_unset();
        //redirect to login page
        header("location: admin.php");
    }

    if (isset($_POST['Sort'])) {
        if (!empty($_POST['Sort_option'])) {
            if ($_POST['Sort_option'] === 'SORT_DESC_RATING') {
                $sort_order = SORT_DESC;
                $sort_item = $image_rating;
            } else if ($_POST['Sort_option'] === 'SORT_ASC_RATING') {
                $sort_order = SORT_ASC;
                $sort_item = $image_rating;
            } else if ($_POST['Sort_option'] === 'SORT_DESC_CITY') {
                $sort_order = SORT_DESC;
                $sort_item = $city_name;
            } else if ($_POST['Sort_option'] === 'SORT_ASC_CITY') {
                $sort_order = SORT_ASC;
                $sort_item = $city_name;
            }
        }
        $save_item = $_POST['Sort_option'];

        array_multisort($sort_item, $sort_order,  $image_rated);
        setcookie("order", $save_item, time() + 86400);
        require 'views/browse.view.php';
    }

    if (isset($_POST['Change'])) {
        $image_rating_ID = $_POST['rating_id'];
        $new_Rating = $_POST['Change_Rating'];

        rating_changer($db_helper, $new_Rating, $image_rating_ID);
        require 'views/browse.view.php';
    }

    if (isset($_POST['Filter'])) {
        $city = trim($_POST['Filtered_city']);
        $Rating = trim($_POST['Filtered_Rating']);
        $country = trim($_POST['Filtered_country']);

        filter($image_rated, $city, $country, $Rating);
        require 'views/browse.view.php';
    }
}
$db_helper->close_connection();
