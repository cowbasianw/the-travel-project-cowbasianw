<?php
require 'partials/head.php';
// for cloudinary_src()
require_once '../helpers/image-helpers.php';

?>


<div class="browse-container">
    <h1>Browse</h1>
    <div class="sorting-container">
        <form method="POST" action="/browse.php">
            <fieldset>
                <legend>Sorting </legend>
                <input type="radio" id="SORT_DESC_RATING" name="Sort_option" value="SORT_DESC_RATING" />
                <label for="SORT_DESC_RATING">Descending by Rating</label>

                <input type="radio" id="SORT_ASC_RATING" name="Sort_option" value="SORT_ASC_RATING" />
                <label for="SORT_ASC_RATING">Ascending by Rating</label>
                <br />
                <br />

                <input type="radio" id="SORT_DESC_CITY" name="Sort_option" value="SORT_DESC_CITY" />
                <label for="SORT_DESC_CITY">Reverse Alphabetical by City Name</label>

                <input type="radio" id="SORT_ASC_CITY" name="Sort_option" value="SORT_ASC_CITY" />
                <label for="SORT_ASC_CITY">Alphabetical by City Name</label>

                <input type="submit" name="Sort" value="Sort" />
            </fieldset>
        </form>
    </div>
    <h1>Image Table</h1>
    <div class="inner-container">
        <?php require 'partials/image-detail.php' ?>
    </div>
    <div class="filter-container">
        <form method="POST" action="<?= $_SERVER["SCRIPT_NAME"] ?>">

            <fieldset>
                <legend>Filter </legend>

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
                <input type="submit" name="Filter" value="Filter" />

            </fieldset>
        </form>

    </div>
    <div class="Logout-container">
        <form method="POST" action="<?= $_SERVER["SCRIPT_NAME"] ?>">
            <input type="submit" name="Logout" value="Logout" />
        </form>
    </div>
</div>