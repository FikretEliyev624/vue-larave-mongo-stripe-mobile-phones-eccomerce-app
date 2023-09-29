<?php

namespace App\Http\Controllers;

use App\Models\Bucket;
use App\Models\Product;
use Illuminate\Http\Request;

class BucketController extends Controller
{
    public function addToCart(Request $request, $productId) {
        $userId = auth()->user()->id;
    
        $product = Product::find($productId);
    
        if(!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        
        //$newPrice = $product->newPrice != 0 ? $product->newPrice : $product->price;
    
        $bucketItem = Bucket::updateOrCreate(
            ['userId' => $userId]
        );
    
        $products = $bucketItem->products ?? [];
    
        
        $isProductAdded = false;
        foreach($products as &$item) {
            if ($item['id'] == $productId) {
                $item['quantity'] += 1;
                $isProductAdded = true;
                if ($item['quantity'] > $product->stock) {
                    return response()->json(['message' => 'There are not enough products in stock'], 400);
                }
                break;
            }
        }
       
        
        if (!$isProductAdded) {
            
           
            
            $products[] = [
                'id' => $product->id,
                'model' => $product->model,
                'category' => $product->category,
                'price' => $product->price,
                'newPrice' => $product->newPrice,
                'batteryLife' => $product->batteryLife,
                'ram' => $product->ram,
                'storage' => $product->storage,
                'image' => $product->image,
                'stock' => $product->stock,
                'active' => $product->active,
                'screenSize' => $product->screenSize,
                'operatingSystem' => $product->operatingSystem,
                'quantity' => 1
            ];
         
        }
        
        $bucketItem->products = $products;
        $bucketItem->save();
    
        
        $bucketItem->save();
    
        return response()->json(['message' => 'Product added to cart']);
    }
    public function removeFromCart(Request $request, $productId) {
        $userId = auth()->user()->id;
    
        $bucketItem = Bucket::where('userId', $userId)->first();
    
        if(!$bucketItem) {
            return response()->json(['message' => 'User`s cart not found'], 404);
        }
    
        $products = $bucketItem->products ?? [];
    
        $index = null;
        foreach($products as $key => $item) {
            if ($item['id'] == $productId) {
                $index = $key;
                break;
            }
        }
    
        if ($index !== null) {
            
            unset($products[$index]);
    
    
            $bucketItem->products = array_values($products);
            $bucketItem->save();
    
            return response()->json(['message' => 'Product removed from cart']);
        }
    
        return response()->json(['message' => 'The product was not found in your cart'], 404);
    }
    public function updateQuantity(Request $request, $productId) {
        $userId = auth()->user()->id;
    
        $newQuantity = $request->input('newQuantity');
    
        if ($newQuantity <= 0) {
            return response()->json(['message' => 'Quantity cannot be 0 or less'], 400);
        }
    
        $bucketItem = Bucket::where('userId', $userId)->first();
    
        if(!$bucketItem) {
            return response()->json(['message' => 'User`s cart not found'], 404);
        }
    
        $products = $bucketItem->products ?? [];
    
        $index = null;
        foreach($products as $key => &$item) {
            if ($item['id'] == $productId) {
                $index = $key;
                break;
            }
        }
    
        if ($index !== null) {
            if ($newQuantity >  $products[$index]['stock']) {
                return response()->json(['message' => 'There are not enough products in stock'], 400);
            }
            $products[$index]['quantity'] = $newQuantity;
            
            
            $bucketItem->products = $products;
            $bucketItem->save();
            
            return response()->json(['message' => 'Product quantity updated']);
        }
    
        return response()->json(['message' => 'The product was not found in your cart'], 404);
    }
    public function emptyCart(Request $request) {
        $userId = auth()->user()->id;
    
        $bucketItem = Bucket::where('userId', $userId)->first();
    
        if(!$bucketItem) {
            return response()->json(['message' => 'User`s cart not found'], 404);
        }
    
       
        $bucketItem->products = [];
        $bucketItem->save();
    
        return response()->json(['message' => 'Cart emptied successfully']);
    }
    
    public function getBucket(Request $request) {
        $userId = auth()->user()->id;
    
        $bucketItem = Bucket::where('userId', $userId)->first();
    
        if(!$bucketItem) {
            return response()->json(['message' => 'User`s cart not found'], 404);
        }
    
        $products = $bucketItem->products ?? [];
    
        return response()->json(['products' => $products]);
    }
    

    public function createPaymentCheckout()
{
    $userId = auth()->user()->id;
    $bucket =  Bucket::where('userId', $userId)->first(); 
    $products = $bucket->products;
    \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

    try {
        $line_items = [];

        foreach ($products as $item) {
            $unit_amount = $item['newPrice'] != 0 ? $item['newPrice'] * 100 : $item['price'] * 100;
            $line_items[] = [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $item['model'], 
                        'images' => ["http://localhost:8000/api/public/images/{$item['image']}"],
                        'metadata' => [
                            'id' => $item['id']
                        ]
                    ],
                    'unit_amount' => $unit_amount, 
                ],
                'quantity' => $item['quantity'] 
            ];
        }
        

        $session = \Stripe\Checkout\Session::create([
            'payment_method_types' => ['card'],
            'shipping_address_collection' => ['allowed_countries' => ['US', 'CA', 'AZ']],
            'shipping_options' => [
                [
                    'shipping_rate_data' => [
                        'type' => 'fixed_amount',
                        'fixed_amount' => ['amount' => 0, 'currency' => 'usd'],
                        'display_name' => 'Free shipping',
                        'delivery_estimate' => [
                            'minimum' => ['unit' => 'business_day', 'value' => 5],
                            'maximum' => ['unit' => 'business_day', 'value' => 7],
                        ],
                    ],
                ],
            ],
            'line_items' => $line_items,
            'mode' => 'payment',
            'success_url' => 'http://localhost:3006/success',
            'cancel_url' => 'http://localhost:3006/cancel',
        ]);

        return response()->json(['url' => $session->url]);
    } catch (\Exception $error) {
        print($error);
        \Log::error('error ' . $error);
        return response()->json(['message' => 'Internal Server Error'], 500);
    }
}

    
    
    
    
    
    
}
