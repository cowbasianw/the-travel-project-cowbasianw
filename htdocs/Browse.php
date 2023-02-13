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


$thumbnails = [
    "photo rated#1" => [
        "country" => "China",
        "city" => "QingDao",
        "latitude" => 3,
        "longitude" => 4,
        "rating" => 3
    ],
    "photo rated#2" => [
        "country" => "Canada",
        "city" => "Calgary",
        "latitude" => 3,
        "longitude" => 45,
        "rating" => 5
    ]
];
arsort($thumbnails);

require 'views/Browse.view.php';
