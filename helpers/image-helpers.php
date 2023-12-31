<?php

/**
 * Returns the src necessary to show a thumbnail of a project pic with
 * a given image_id at a given square size.
 * 
 * 
 * @param string $image_id 

 */

function cloudinary_src($image_path)
{
    return "https://res.cloudinary.com/dvp4chsmz/image/upload//c_scale,h_230,w_310/v1676498190/3512-2023-01-project-images/$image_path";
}
