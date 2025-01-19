<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function index()
    {
        $attendances = Attendance::all();
        return response()->json($attendances);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'scheduling_time' => 'required|date',
        ]);

        $attendance = Attendance::create($validated);
        return response()->json($attendance, 201);
    }

    public function show($id)
    {
        $attendance = Attendance::find($id);

        if (!$attendance) {
            return response()->json(['message' => 'Atendimento não encontrado'], 404);
        }

        return response()->json($attendance);
    }
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'scheduling_time' => 'required|date',
        ]);

        $attendance = Attendance::find($id);

        if (!$attendance) {
            return response()->json(['message' => 'Atendimento não encontrado'], 404);
        }

        $attendance->update($validated);
        return response()->json($attendance);
    }

    // Deletar um atendimento específico
    public function destroy($id)
    {
        $attendance = Attendance::find($id);

        if (!$attendance) {
            return response()->json(['message' => 'Atendimento não encontrado'], 404);
        }

        $attendance->delete();
        return response()->json(['message' => 'Atendimento deletado com sucesso']);
    }
}
