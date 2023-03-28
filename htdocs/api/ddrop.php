<?php

require '../../database/DatabaseHelper.php';
$config = require '../../database/config.php';
$db_helper = new DatabaseHelper($config);
require '../../helpers/query-helper.php';
$deddrop = html_helper($db_helper);
$ll = cityRetiver($db_helper);

if (isset($_GET['city'])) {

    $city = $_GET['city'];
    $listOfCity = search_city_id($db_helper, $city);
    $refined_array = [

        "drops" => count($listOfCity)
    ];
} else {
    $Active_DDrop = active_ddrop($db_helper);
    $totalCount = count($Active_DDrop);

    $refined_array =
        [
            "total-count" => $totalCount,
            "drops" => $Active_DDrop
        ];
}
$resp = json_encode($ll);
header("http://127.0.0.1:8080/api/ddrop.php");

header("Content-Type: application/json");

echo ($resp);
$db_helper->close_connection();
