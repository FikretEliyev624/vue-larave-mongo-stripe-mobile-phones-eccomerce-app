<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;
use App\Models\Bucket;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;


class ProductController extends Controller
{
    public function createNewProduct(Request $request){
        $validator = Validator::make($request->all(), [
            'model' => 'required|string',
            'category' => 'required|string',
            'price' => 'required|numeric',
            'batteryLife' => 'required|numeric',
            'ram' => 'required|integer',
            'storage' => 'required|integer',
            'stock' => 'required|integer',
            'screenSize' => 'required|numeric',
            'image' => 'required|file|mimes:jpeg,png,jpg,gif',
            'operatingSystem' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['message' => $validator->messages()->first()], JsonResponse::HTTP_BAD_REQUEST);
        }
    
        $image = $request->file('image');
    
        // Ensure the uploaded file is valid
        if (!$image->isValid()) {
            return response()->json(['message' => 'Invalid file uploaded'], JsonResponse::HTTP_BAD_REQUEST);
        }
    
        // Define the directory where the file will be stored
        $directory = 'images';
    
        // Store the uploaded file using Storage
        $imageName = time() . '.' . $image->extension();
        Storage::disk('public')->putFileAs($directory, $image, $imageName);
    
        $productData = $request->all();
        $productData['image'] = $imageName;
    
        $product = Product::create($productData);
    
        return response()->json(['message' => 'Product created successfully', 'product' => $product], JsonResponse::HTTP_CREATED);
    }
    public function updateProduct(Request $request, $id)
    {
        $userId = auth()->user()->id;
        $validator = Validator::make($request->all(), [
            'model' => 'string',
            'category' => 'string',
            'price' => 'numeric',
            'batteryLife' => 'numeric',
            'ram' => 'integer',
            'storage' => 'integer',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif',
            'stock' => 'integer',
            'screenSize' => 'numeric',
            'operatingSystem' => 'string',
            'active'=>'boolean'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['message' => $validator->messages()->first()], JsonResponse::HTTP_BAD_REQUEST);
        }
    
        try {
            $product = Product::find($id);
    
            if (!$product) {
                return response()->json(['message' => 'Product not found'], JsonResponse::HTTP_NOT_FOUND);
            }
    
            $data = $request->except('image');
    
            if ($request->hasFile('image')) {
                $image = $request->file('image');
    
                if (!$image->isValid()) {
                    return response()->json(['message' => 'Invalid file uploaded'], JsonResponse::HTTP_BAD_REQUEST);
                }
    
                if (!empty($product->image)) {
                    Storage::disk('public')->delete('images/' . $product->image);
                }
    
                $imageName = time() . '.' . $image->extension();
                Storage::disk('public')->putFileAs('images', $image, $imageName);
    
                $product->image = $imageName;
            }
    
            $product->fill($data)->save();
           
            if (!$product->active) {
                $bucket = Bucket::where('products.id', $id)->first();
    
                if ($bucket) {
                    $bucket->products = array_filter($bucket->products, function($product) use ($id) {
                        return $product['id'] !== $id;
                    });
                    $bucket->products = array_values($bucket->products);
                    $bucket->save();
                }       
            }
    
            return response()->json(['message' => 'Product updated successfully', 'data' => $product], JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
    
            return response()->json(['message' => $e->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    

    public function deleteProduct($id)
{
    try {
        $product = Product::findOrFail($id);

        if (!empty($product->image)) {
            File::delete('images/' . $product->image);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], JsonResponse::HTTP_OK);
    } catch (\Exception $e) {
        report($e);
        return response()->json(['message' => $e->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
    }
}

    
public function getProducts(Request $request) {
    $query = Product::query();

    
    
    if ($request->has('category')) {
        $query->where('category', 'like', '%' . $request->input('category') . '%');
    }

   
    if ($request->has('model')) {
        $query->where('model', 'like', '%' . $request->input('model') . '%');
    }

    $page = $request->query('page', 1);
    $limit = $request->query('limit', 6);    
    
    $products = $query->paginate($limit);
    if ($products->isEmpty()) {
        return response()->json(['error' => 'Product not found','data'=>[]], 404);
    }

    return response()->json(['data' => $products], JsonResponse::HTTP_OK);
}

}
