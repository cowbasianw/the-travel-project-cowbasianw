<?php

$title = "Login";
if ($_SERVER['REQUEST_METHOD'] === "GET") {
    require 'views/admin.view.php';
} else if ($_SERVER['REQUEST_METHOD'] === "POST") {


    $username = $_POST["username"];
    if ($_POST["username"] != "admin" && $_POST["password"] != "admin") {

        require 'views/admin.view.php';
    } else {
        session_start();
        $_SESSION["username"] = $username;
        header("Location: Browse.php");
    }
}
