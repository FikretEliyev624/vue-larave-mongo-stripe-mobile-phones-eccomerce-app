<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use JWTAuth;

class UserController extends Controller
{
    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->messages()->first()], JsonResponse::HTTP_BAD_REQUEST);
        }

        try {
            $password = Hash::make($request->input('password'));
            $user = new User([
                'email' => $request->input('email'),
                'password' => $password,
                'isAdmin' => false,
                'isActive' => true,
            ]);

            $user->save();

            return response()->json(['user' => $user, 'message' => 'User signup successfully'], JsonResponse::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Internal Server Error'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function signin(Request $request)
    {
    $email = $request->input('email');
    $password = $request->input('password');
    $isAdminRoute = strpos($request->path(), 'signin-with-admin') !== false;

    try {
        $existingUser = User::where('email', $email)->first();

        if(!$existingUser){
            return response()->json(['error' => 'User is not found'], 404);
        }
        if(!$existingUser->isActive){
            return response()->json(['error' => 'Your account is blocked'], 403);
        }

        if ($isAdminRoute && !$existingUser->isAdmin) {
            return response()->json(['error' => 'Access denied. Not an admin.'], 403);
        }

        if (!$isAdminRoute && $existingUser->isAdmin) {
            return response()->json(['error' => 'Access denied. Admin cannot sign in here.'], 403);
        }

        if (!Hash::check($password, $existingUser->password)) {
            return response()->json(['error' => 'Password incorrect'], 400);
        }

        $token = JWTAuth::fromUser($existingUser);
        return response()->json([compact('token'),'message' => "Hello there! You've successfully signed in."]);
    } catch (Exception $e) {
        return response()->json(['error' => 'Internal Server Error'], 500);
    }
    }

    public function updateRole(Request $request, $id)
    {
    $user = User::find($id);

    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    $isAdmin = $request->input('isAdmin');
    $user->isAdmin = $isAdmin;
    $user->save();

    return response()->json(['message' => 'User role updated successfully'], 200);
    }
    public function updateAccountStatus(Request $request, $id)
    {
    $user = User::find($id);

    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    $isActive = $request->input('isActive');
    $user->isActive = $isActive;
    $user->save();

    return response()->json(['message' => 'User status updated successfully'], 200);
    }
    public function getUserList(Request $request)
    {
        $query = $request->query('query');
        $page = $request->query('page', 1);
        $limit = $request->query('limit', 6);

        
        $users = User::where('email', 'like', "%$query%")->paginate($limit);
        if ($users->isEmpty()) {
            return response()->json(['error' => 'User not found','users'=>[]], 404);
        }
        return response()->json($users);
    }

}
