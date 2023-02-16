<?php

/**
 * Returns the src necessary to show a thumbnail of a project pic with
 * a given image_id at a given square size.
 * 
 * 
 * @param string $image_id 
 * @param string $size 
 * @return string The src to the desired image on Cloudinary.
 */

function cloudinary_src($image_path, $size)
{
    return "https://res.cloudinary.com/blunxy/image/upload/c_thumb,g_auto,h_{$size},w_{$size} 
    v1638743067/3512.202104.final.exam/$image_path.jpg";
}
