<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AttendanceController;


Route::get('/server1', function () {
    return response()->json(['message' => 'AQUI É DO SERVIDOR 1']);
});

Route::get('/server2', function () {
    return response()->json(['message' => 'AQUI É DO SERVIDOR 2']);
});

Route::get('/status', function () {
    return response()->json(['message' => 'Servidor está online', 200]);
});

Route::get('/attendances', [AttendanceController::class, 'index']);

// Rota para criar um novo atendimento
Route::post('/attendances', [AttendanceController::class, 'store']);

// Rota para exibir um atendimento específico
Route::get('/attendances/{id}', [AttendanceController::class, 'show']);

// Rota para atualizar um atendimento específico
Route::put('/attendances/{id}', [AttendanceController::class, 'update']);

// Rota para deletar um atendimento específico
Route::delete('/attendances/{id}', [AttendanceController::class, 'destroy']);
