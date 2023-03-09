<?php

$title = "An completely normal login page";



require '../database/DatabaseHelper.php';

$config = require '../database/config.php';

$db_helper = new DatabaseHelper($config);

require '../helpers/query-helper.php';

$vaildation_checker = user_checker($db_helper);



$error_message = " ";

if ($_SERVER['REQUEST_METHOD'] === "GET") {

    require 'views/admin.view.php';
} else if ($_SERVER['REQUEST_METHOD'] === "POST") {

    $username = $_POST['username'];
    $password = $_POST['password'];
    $options = [
        'cost' => 12,
    ];

    foreach ($vaildation_checker as $checker) {
        $correct_username = $checker['username'];
        $correct_password = $checker['password'];

        $hash = password_hash($correct_password, PASSWORD_BCRYPT, $options);

        if ($username = $correct_username && password_verify($password, $hash)) {

            session_start();
            $_SESSION["username"] = $username;
            header("Location: browse.php");
        }
    }
}
