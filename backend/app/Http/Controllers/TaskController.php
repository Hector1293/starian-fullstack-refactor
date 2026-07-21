<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Models\Task;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Task::all());
    }

    public function store(StoreTaskRequest $request): JsonResponse
    {
        $task = Task::create($request->validated());
        $task->refresh();

        return response()->json($task, 201);
    }

    public function destroy(int $id): JsonResponse
    {
        $task = Task::find($id);

        if (! $task) {
            return response()->json(['message' => 'Tarefa nao encontrada.'], 404);
        }

        $task->delete();

        return response()->json(null, 204);
    }
}
