<ul>

    <?php


    foreach ($image_rated as $image_details) :
    ?>

        <div id="image-table">

            <img src='<?= cloudinary_src($image_details['image_path']) ?>' alt=''>

            <span class='country-name'>
                <h4>Country Name: <?= $image_details['country_name'] ?>
            </span>

            <span class='city-name'>
                <h4>City Name: <?= $image_details['city_name'] ?>
            </span>

            <span class='latitude'>
                <h4>Latitude: <?= $image_details['image_latitude'] ?> </h4>
            </span>

            <span class='longitude'>
                <h4>Longitude: <?= $image_details['image_longitude'] ?> </h4>
            </span>

            <span class='rating'>
                <h4>Rating: <?= $image_details['image_rating'] ?> </h4>
            </span>
            <span class='change'>
                <form method="POST" action="<?= $_SERVER["SCRIPT_NAME"] ?>">
                    <label for="Change_Rating">Change Rating (between 1 and 5):</label>
                    <input type="number" id="Change_Rating" name="Change_Rating" min="1" max="5" />
                    <input type="hidden" name="rating_id" value=<?= $image_details['Rating_ID'] ?> />

                    <br />
                    <br />
                    <input type="submit" name="Change" value="Change" />


                </form>
            </span>

        </div>

    <?php endforeach ?>
</ul>