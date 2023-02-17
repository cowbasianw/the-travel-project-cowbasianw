<<?php
    require 'partials/head.php';
    // for cloudinary_src()
    require '../helpers/image-helpers.php' ?> <div class="inner-container">

    <div class="inner-container">
        <h1>Browse</h1>


        <div id="photos">
            <?php
            foreach (array_slice($image_rated, 0, 5) as $image_details) : ?>


            <?php endforeach ?>

        </div>
        <?php require 'partials/image-detail.php' ?>

    </div>