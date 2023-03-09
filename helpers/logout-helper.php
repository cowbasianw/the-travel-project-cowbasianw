<?php

session_start();

unset($_SESSION["username"]);
session_unset();
//redirect to login page
header("location: admin.php");
