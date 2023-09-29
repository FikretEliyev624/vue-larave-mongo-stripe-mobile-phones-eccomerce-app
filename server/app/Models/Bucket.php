<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Bucket extends Model
{
    protected $connection = 'mongodb'; // MongoDB bağlantısı için kullanılacak bağlantı adı
    protected $collection = 'buckets'; // Koleksiyon adı

    protected $fillable = [
        'userId', 
        'product', // 'product' alanı, Product bilgilerini içeren dizi olarak saklanacak
        'quantity',
        // 'subtotal'
    ];
}
