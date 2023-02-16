<?php

$stylesheets = [
    "Browse.css"
];

$scripts = [];
$page_title = "Browser page";
session_start();
if (!isset($_SESSION["username"])) {
    header("location: admin.php");
}
require '../database/DatabaseHelper.php';

$config = require '../database/config.php';

$db_helper = new DatabaseHelper($config);

require '../helpers/query-helpers.php';

$user_id = 23;

$image_rated = image_rated($db_helper, $user_id);

$image = image($db_helper, $_GET["ImageID"]);

$db_helper->close_connection();

require 'views/browse.view.php';
