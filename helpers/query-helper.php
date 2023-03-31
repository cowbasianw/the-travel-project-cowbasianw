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
      INNER JOIN countries ON (imagedetails.CountryCodeISO=  countries.ISO)
      INNER JOIN cities ON (imagedetails.CityCode=  cities.CityCode)
      INNER JOIN imagerating ON (imagedetails.ImageID= imagerating.ImageID)
   WHERE 
      imagerating.UserID =:user_id
QUERY;

  return $db_helper->run($query, [":user_id" => $user_id])->fetchAll();
}

function user_checker($db_helper, $username)
{

  $query = <<<QUERY
    SELECT 
       admin.UserName as correctUsername,
       admin.Password as correctPassword
    FROM  
       admin 
    where UserName =:username

  QUERY;
  return $db_helper->run($query, [":username" => $username])->fetch();
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
      countries.CountryName as country,
      imagedetails.Latitude as lat,
      imagedetails.Longitude as ong
    FROM
      imagedetails 
      INNER JOIN countries ON (imagedetails.CountryCodeISO= countries.ISO)
      INNER JOIN cities ON (imagedetails.CityCode= cities.CityCode)
      INNER JOIN imagerating ON (imagedetails.ImageID= imagerating.ImageID)
    WHERE 
      imagerating.Rating  =3
   QUERY;

  return $db_helper->run($query)->fetchAll();
}

function cityRetiver($db_helper)
{
  $query = <<<QUERY
   SELECT 
    
     cities.CountryCodeISO as countryLocation,
     cities.AsciiName as cityName,
     cities.Population as population,
     cities.Elevation as Elevation,
     cities.TimeZone as TimeZone
    FROM
    cities
    
   QUERY;

  return $db_helper->run($query)->fetchAll();
}
function languagesRetiver($db_helper)
{
  $query = <<<QUERY
   SELECT
     languages.name as languagesName,
     languages.iso as languagesCode
   FROM
   languages
    
   QUERY;

  return $db_helper->run($query)->fetchAll();
}
function countryRetiver($db_helper)
{
  $query = <<<QUERY
   SELECT 
    
     countries.ISO as ISO,
     countries.CountryName as CountryName,
     countries.Area as Area,
     countries.Population as Population,
     countries.Capital as Capital,
     countries.Population as Population,
     countries.CurrencyName as CurrencyName,
     countries.TopLevelDomain as TopLevelDomain,
     countries.CountryDescription as CountryDescription,
     countries.Languages as Languages,
     countries.Neighbours as Neighbours
     
    FROM
    countries
    
   QUERY;

  return $db_helper->run($query)->fetchAll();
}

function search_city_id($db_helper, $city_ID)
{
  $query = <<<QUERY
  SELECT 
  imagerating.Rating as active 
   FROM
  imagedetails 
  INNER JOIN countries ON (imagedetails.CountryCodeISO =  countries.ISO)
  INNER JOIN cities ON (imagedetails.CityCode=  cities.CityCode)
  INNER JOIN imagerating ON (imagedetails.ImageID= imagerating.ImageID)
  WHERE 
  cities.CityCode =:city_ID AND
  imagerating.Rating =3
      
  QUERY;
  return $db_helper->run($query, [":city_ID" => $city_ID])->fetchAll();
}
function imageDetails_helper($db_helper)
{
  $query = <<<QUERY
SELECT 
  imagedetails.`Path` as image_path,
  imagedetails.Title as title, 
  imagedetails.Latitude as image_latitude,
  imagedetails.Longitude as image_longitude,
  countries.CountryName as country_name,
  cities.AsciiName as city_name,
  imagedetails.description as description,
  users.FirstName as firstName,
  users.LastName as lastName
      
FROM
  imagedetails 
  INNER JOIN countries ON (imagedetails.CountryCodeISO =  countries.ISO)
  INNER JOIN cities ON (imagedetails.CityCode=  cities.CityCode)
  INNER JOIN imagerating ON (imagedetails.ImageID= imagerating.ImageID)
  INNER JOIN users ON (imagerating.UserID= users.UserID)
WHERE 
    imagerating.Rating  =3
QUERY;
  return $db_helper->run($query)->fetchAll();
}
