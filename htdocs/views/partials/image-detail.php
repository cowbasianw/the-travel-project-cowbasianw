<ul>

    <?php
    foreach (array_slice($image_rated, 0, 5) as $image_details) :



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
                </span>
            </div>


        <?php endforeach ?>
        </div>

</ul>