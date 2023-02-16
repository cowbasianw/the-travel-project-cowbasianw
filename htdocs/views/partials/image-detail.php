<ul>
    <?php foreach ($image_rated as $image_details) : ?>
        <li>
            <span class='image-name'>
                <?= $image_details['ImageID'] ?></span>
            <span class='rating'>
                <?= $image_details['Rating'] ?>
            </span>
        </li>
    <?php endforeach ?>
</ul>