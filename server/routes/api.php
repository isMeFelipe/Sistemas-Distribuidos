<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/server1', function () {
    return response()->json(['message' => 'AQUI É DO SERVIDOR 1 BUCETA']);
});

Route::get('/server2', function () {
    return response()->json(['message' => 'AQUI É DO SERVIDOR 2 PRIQUITO']);
});
