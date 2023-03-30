<?php
require '../../database/DatabaseHelper.php';
$config = require '../../database/config.php';
$db_helper = new DatabaseHelper($config);
require '../../helpers/query-helper.php';

$ll = countryRetiver($db_helper);

$resp = json_encode($ll);
header("http://127.0.0.1:8080/api/countryData.php");

header("Content-Type: application/json");

echo ($resp);
$db_helper->close_connection();
