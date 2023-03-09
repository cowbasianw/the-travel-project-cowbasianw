<ul>

    <?php

    $image_rating_ID;


    foreach ($image_rated as $image_details) :

    ?>

        <div id="image-table">

            <div id="image">

                <img src='<?= cloudinary_src($image_details['image_path']) ?>' alt=''>

            </div>

            <div id="info">

                <span class='country-name'>
                    <h3>Country Name: <?= $image_details['country_name'] ?>
                </span>

                <span class='city-name'>
                    <h3>City Name: <?= $image_details['city_name'] ?>
                </span>

                <span class='latitude'>
                    <h3>Latitude: <?= $image_details['image_latitude'] ?> </h3>
                </span>

                <span class='longitude'>
                    <h3>Longitude: <?= $image_details['image_longitude'] ?> </h3>
                </span>

                <span class='rating'>
                    <h3>Rating: <?= $image_details['image_rating'] ?> </h3>
                    <form method="POST" action="<?= $_SERVER["SCRIPT_NAME"] ?>">
                        <label for="Change_Rating">Change Rating (between 1 and 5):</label>
                        <input type="number" id="Change_Rating" name="Change_Rating" min="1" max="5" />
                        <?php $image_rating_ID = $image_details['Rating_ID'] ?>
                        <input type="submit" name="Change" value="Change" />
                    </form>
                </span>

            </div>


        <?php endforeach ?>
        </div>

</ul>