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

function filter($image_rated)
{
}
