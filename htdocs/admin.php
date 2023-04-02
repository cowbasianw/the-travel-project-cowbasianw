<?php

$title = "An completely normal login page";

require '../database/DatabaseHelper.php';

$config = require '../database/config.php';

$db_helper = new DatabaseHelper($config);

require '../helpers/query-helper.php';

$error_message = "";

if ($_SERVER['REQUEST_METHOD'] === "GET") {

    require 'views/admin.view.php';
} else if ($_SERVER['REQUEST_METHOD'] === "POST") {

    $username = $_POST['username'];
    $password = $_POST['password'];
    $options = [
        'cost' => 12,
    ];
    //password checker.
    $vaildation_checker = user_checker($db_helper, $username);

    if ($vaildation_checker) {

        $correct_password = $vaildation_checker['correctPassword'];

        if (password_verify($password, $correct_password)) {
            //create session for login.
            session_start();
            $_SESSION["username"] = $username;
            header("Location: browse.php");
        } else {
            $error_message = "Incorrect password.";
            require 'views/admin.view.php';
        }
    } else {
        $error_message = "Incorrect username or password.";
        require 'views/admin.view.php';
    }
}
