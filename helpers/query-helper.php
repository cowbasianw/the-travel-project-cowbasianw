<?php

/**
 * Returns the country, city, latitude, longitude, image path, and image rating of a picture.
 *
 * @param mixed $db_helper
 * @param mixed $user_id
 * @return mixed An array containing the target image information.
 */



function image_rated($db_helper, $user_id)
{

  $query = <<<QUERY
    SELECT  
      
      imagedetails.`Path` as image_path,
      countries.CountryName as country_name,
      cities.AsciiName as city_name,
      imagedetails.Latitude as image_latitude,
      imagedetails.Longitude as image_longitude,
      imagerating.Rating as image_rating
      
    FROM  
      imagedetails 
      INNER JOIN countries ON (imagedetails.CountryCodeISO =  countries.ISO)
      INNER JOIN cities ON (imagedetails.CityCode=  cities.CityCode)
      INNER JOIN imagerating ON (imagedetails.ImageID= imagerating.ImageID)
   WHERE 
      imagerating.UserID =:user_id
QUERY;

  return $db_helper->run($query, [":user_id" => $user_id])->fetchAll();
}

function user_checker($db_helper)
{

  $query = <<<QUERY
    SELECT 
   
    userslogin.UserName as user_name,
    userslogin.Password as password
    
    FROM  
      userslogin 
    
    QUERY;
}
