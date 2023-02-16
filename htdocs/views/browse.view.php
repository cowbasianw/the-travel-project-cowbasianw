<<?php
    // for cloudinary_src()
    require '../helpers/image-helpers.php'
    ?> <?php require 'partials/head.php'; ?> <div class="inner-container">
    <h1>Browse</h1>

    <div id="image-table">

        <div id="image">

            <img src='<?= cloudinary_src($image['image_path'], 500) ?>' alt=''>

        </div>>

        <?php require 'partials/image-detail.php' ?>


    </div>
    </nav>

    </div>

    <?php require 'partials/foot.php'; ?>