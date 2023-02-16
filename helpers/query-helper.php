<?php

/**
 * Returns the country, city, latitude, longitude,  of a picture.
 *
 * @param mixed $db_helper
 * @param mixed $image_path
 * @return mixed An array containing the target image information.
 */

function image_detail($db_helper, $image_path)
{

    $query = <<<QUERY
        SELECT 
        imagedetails.latitude,
        imagedetails.longitude,
        CountryName,
       
        AcsiiName

        FROM  imagedetails

        QUERY;
}

function image_rated($db_helper, $user_id)
{

    $query = <<<QUERY
    SELECT  
      imagerating.Rating,
      imagerating.UserID,
      ImageID
    FROM  imagerating
      INNER JOIN users ON ( imagerating.UserID= users.UserID )
    WHERE user_id =:user_id
     
QUERY;

    return $db_helper->run($query, [":user_id" => $user_id])->fetchAll();
}

/**
 * Returns the path a image with a given id.
 * 
 * @param mixed $db_helper 

 * @return mixed An array containing the target image information.
 */
function image($db_helper, $image_id)
{
    $query = <<<QUERY
    SELECT
       imagedetails.path as image_path

    FROM  
       imagedetails
    WHERE
       imagedetails.ImageID =:image_id
        
   
        
QUERY;

    return $db_helper->run($query, [":image_id" => $image_id])->fetch();
}
