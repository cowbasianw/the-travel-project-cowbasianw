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
      imagerating.Rating as image_rating,
      imagerating.ImageRatingID as Rating_ID
      
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
       admin.UserName as username,
       admin.Password as password
    FROM  
       admin 

  QUERY;
  return $db_helper->run($query)->fetchAll();
}
function rating_changer($db_helper, $newRating, $Rating_ID)
{

  $query = <<<QUERY
    UPDATE
       imagerating
    SET 
      Rating =:new_Rating
    WHERE
      ImageRatingID =:Rating_ID

  QUERY;

  return $db_helper->run($query, [":new_Rating" => $newRating, ":Rating_ID" => $Rating_ID])->execute();
}

function active_ddrop($db_helper)
{

  $query = <<<QUERY
   SELECT 
      cities.AsciiName as city,
      countries.CountryName as country
      imagedetails.Latitude as lat,
      imagedetails.Longitude as ong,
      
 
    FROM
      imagedetails 
      INNER JOIN countries ON (imagedetails.CountryCodeISO =  countries.ISO)
      INNER JOIN cities ON (imagedetails.CityCode=  cities.CityCode)
      INNER JOIN imagerating ON (imagedetails.ImageID= imagerating.ImageID)
    WHERE 
      imagerating.Rating  =3
   QUERY;

  return $db_helper->run($query)->fetchAll();
}

function search_city_id($db_helper, $city_ID)
{
  $query = <<<QUERY
  SELECT 
    cities.AsciiName as city
  FROM
    imagedetails 
      INNER JOIN countries ON (imagedetails.CountryCodeISO =  countries.ISO)
      INNER JOIN cities ON (imagedetails.CityCode=  cities.CityCode)
      INNER JOIN imagerating ON (imagedetails.ImageID= imagerating.ImageID)
    WHERE 
      imagerating.Rating  =3
      cities.CityCode =:city_ID
  QUERY;
  return $db_helper->run($query, [":city_ID" => $city_ID])->fetch();
}
