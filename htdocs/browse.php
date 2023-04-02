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
//generating items image rating anf city name for later use.
foreach ($image_rated as $key => $row) {
    $image_rating[$key]  = $row['image_rating'];
    $city_name[$key] = $row['city_name'];
}
$city_name  = array_column($image_rated, 'city_name');
$image_rating  = array_column($image_rated, 'image_rating');

if ($_SERVER['REQUEST_METHOD'] === "GET") {
    //cookies to remeber user actions
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
        //using array multi sort to sort the desired item. 
        array_multisort($sort_item, $sort_order,  $image_rated);
    }
    require 'views/browse.view.php';
} else if ($_SERVER['REQUEST_METHOD'] === "POST") {
    //logout function
    if (isset($_POST['Logout'])) {

        unset($_SESSION["username"]);
        session_unset();
        //redirect to login page
        header("location: admin.php");
    }
    //sort function
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
    //changing rate function
    if (isset($_POST['Change'])) {
        $image_rating_ID = $_POST['rating_id'];
        $new_Rating = $_POST['Change_Rating'];

        rating_changer($db_helper, $new_Rating, $image_rating_ID);
        require 'views/browse.view.php';
    }
    /* 
The filter method is coded with the aid of www.php.net on the maunal of array_filter. 
https://www.php.net/manual/en/function.array-filter.php
*/
    if (isset($_POST['Filter'])) {
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

        if (empty($image_rated)) {
            echo "No results found.";
        } else {
            require 'views/browse.view.php';
        }
    }
}
$db_helper->close_connection();
