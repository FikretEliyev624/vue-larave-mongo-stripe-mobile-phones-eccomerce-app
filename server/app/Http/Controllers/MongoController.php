<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MongoDB\Client as Mongo;
class MongoController extends Controller
{
    function mongoConnect(){
        $mongo = new Mongo();
        $db = $mongo->selectDatabase('prodata'); // Replace 'prodatadi' with your actual database name
        return $db->getDatabaseName();
    }
}
