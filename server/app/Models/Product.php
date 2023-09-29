<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Product extends Model
{


    protected $connection = 'mongodb';
    
    protected $collection = 'products';

    protected $fillable = [
        'model', 
        'category', 
        'price', 
        'newPrice',
        'batteryLife',
        'ram', 
        'storage', 
        'image',
        'stock',
        'active',
        'screenSize',
        'operatingSystem'
    ];
    protected $attributes = [
        'active' => true,  
        'newPrice' => 0,    
    ];

    protected $casts = [
        'price' => 'float',
        'newPrice' => 'float',
        'batteryLife' => 'float',
        'ram' => 'integer',
        'storage' => 'integer',
        'stock' => 'integer',
        'screenSize' => 'float',
        'active' => 'boolean',
       
    ];
    
    
}
