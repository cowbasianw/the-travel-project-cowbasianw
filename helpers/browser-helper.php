<?php

function type_exchange($changed_variable)
{
    $exchanged_variable = "empty";

    if ($changed_variable === SORT_ASC) {

        $exchanged_variable = "SORT_ASC";
    } else if ($changed_variable === SORT_DESC) {
        $exchanged_variable = "SORT_DESC";
    } else if ($changed_variable === "SORT_ASC") {
        $exchanged_variable === SORT_ASC;
    } else if ($changed_variable === "SORT_DESC") {
        $exchanged_variable === SORT_DESC;
    }
    return $exchanged_variable;
}

function filter($image_rated, $city, $country, $Rating)
{
    if (!(empty($Rating))) {
        $image_rated = array_filter($image_rated, function ($item) use ($Rating) {
            if ((stripos($item['image_rating'], $Rating)) !== false) {
                return true;
            }
            return false;
        });
    }
    if (!(empty($country)) && !(empty($city))) {

        $image_rated = array_filter($image_rated, function ($item) use ($country, $city) {
            if ((stripos($item['country_name'], $country) &&
                (stripos($item['city_name'], $city))) !== false) {
                return true;
            }
            return false;
        });
    } else if (!(empty($country)) && empty($city)) {

        $image_rated = array_filter($image_rated, function ($item) use ($country) {
            if ((stripos($item['country_name'], $country)) !== false) {
                return true;
            }
            return false;
        });
    } else if (empty($country) && !(empty($city))) {

        $image_rated = array_filter($image_rated, function ($item) use ($city) {
            if ((stripos($item['city_name'], $city)) !== false) {
                return true;
            }
            return false;
        });
    }
}
