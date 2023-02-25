<?php
require 'partials/head.php';
// for cloudinary_src()
require '../helpers/image-helpers.php'
?>
<div class="container">

    <div class="inner-container">
        <h1>Browse</h1>
        <?php require 'partials/image-detail.php' ?>

    </div>
    <div class="filter-container">
        <form method="POST" action="<?= $_SERVER["SCRIPT_NAME"] ?>">

            <fieldset>
                <legend>Filter </legend>

                <input type="radio" id="SORT_DESC" name="Filtered_Order" value="SORT_DESC" checked />
                <label for="SORT_DESC">Descending order</label><br />

                <input type="radio" id="SORT_ASC" name="Filtered_Order" value="SORT_ASC" />
                <label for="SORT_ASC">Ascending order</label>
                <br />
                <br />

                <label for="Filtered_Rating">Filter by Rating (between 1 and 5):</label>
                <input type="number" id="Filtered_Rating" name="Filtered_Rating" min="1" max="5" />
                <br />
                <br />

                <label for="Filtered_city">Filter by city:</label>
                <input type="text" name="Filtered_city" id="Filtered_city" />
                <br />
                <br />

                <label for="Filtered_country">Filter by country:</label>
                <input type="text" name="Filtered_country" id="Filtered_country" />
                <br />
                <br />
            </fieldset>

            <input type="submit" value="Filter" />

        </form>


    </div>
</div>