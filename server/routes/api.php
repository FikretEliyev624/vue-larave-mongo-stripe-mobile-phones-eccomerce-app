<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\BucketController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('users/signup', [UserController::class, 'signup']);

Route::post('users/signin', [UserController::class, 'signin']);

Route::post('users/signin-with-admin', [UserController::class, 'signin']);

Route::put('/users/update-role/{id}', [UserController::class, 'updateRole'])
    ->middleware(['jwt.auth', 'isAdmin']);

Route::put('/users/update-status/{id}', [UserController::class, 'updateAccountStatus'])
    ->middleware(['jwt.auth', 'isAdmin']);
    
Route::get('/users/get-user-list', [UserController::class, 'getUserList'])
    ->middleware(['jwt.auth', 'isAdmin']);




Route::post('products/create-product', [ProductController::class, 'createNewProduct'])
    ->middleware(['jwt.auth', 'isAdmin']);

Route::post('products/update-product/{id}', [ProductController::class, 'updateProduct'])
    ->middleware(['jwt.auth', 'isAdmin']);
Route::delete('products/delete-product/{id}', [ProductController::class, 'deleteProduct'])
    ->middleware(['jwt.auth', 'isAdmin']);

Route::get('products/get-products', [ProductController::class, 'getProducts']);
   

Route::post('buckets/add-to-cart/{productId}', [BucketController::class, 'addToCart'])
    ->middleware(['jwt.auth']);
Route::delete('buckets/remove-from-cart/{productId}', [BucketController::class, 'removeFromCart'])
    ->middleware(['jwt.auth']);
Route::put('buckets/update-cart/{productId}', [BucketController::class, 'updateQuantity'])
->middleware(['jwt.auth']);
Route::delete('buckets/empty-cart', [BucketController::class, 'emptyCart'])
->middleware(['jwt.auth']);
Route::get('buckets/get-bucket', [BucketController::class, 'getBucket'])
->middleware(['jwt.auth']);

Route::post('buckets/create-checkout-session', [BucketController::class, 'createPaymentCheckout'])
    ->middleware(['jwt.auth']);