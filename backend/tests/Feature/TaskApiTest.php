<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_list_tasks(): void
    {
        Task::create([
            'title' => 'Primeira tarefa',
            'completed' => false,
        ]);

        Task::create([
            'title' => 'Segunda tarefa',
            'completed' => true,
        ]);

        $response = $this->getJson('/tarefas');

        $response
            ->assertOk()
            ->assertJsonCount(2)
            ->assertJsonFragment([
                'title' => 'Primeira tarefa',
                'completed' => false,
            ])
            ->assertJsonFragment([
                'title' => 'Segunda tarefa',
                'completed' => true,
            ])
            ->assertJsonStructure([
                '*' => ['id', 'title', 'completed', 'created_at', 'updated_at'],
            ]);
    }

    public function test_create_valid_task(): void
    {
        $response = $this->postJson('/tarefas', [
            'title' => 'Nova tarefa',
        ]);

        $response
            ->assertCreated()
            ->assertJsonFragment([
                'title' => 'Nova tarefa',
                'completed' => false,
            ])
            ->assertJsonStructure([
                'id',
                'title',
                'completed',
                'created_at',
                'updated_at',
            ]);

        $this->assertDatabaseHas('tasks', [
            'title' => 'Nova tarefa',
            'completed' => false,
        ]);
    }

    public function test_reject_create_without_title(): void
    {
        $response = $this->postJson('/tarefas', []);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['title']);

        $this->assertDatabaseCount('tasks', 0);
    }

    public function test_reject_title_above_allowed_limit(): void
    {
        $response = $this->postJson('/tarefas', [
            'title' => str_repeat('a', 256),
        ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['title']);

        $this->assertDatabaseCount('tasks', 0);
    }

    public function test_remove_existing_task(): void
    {
        $task = Task::create([
            'title' => 'Tarefa para remover',
            'completed' => false,
        ]);

        $response = $this->deleteJson("/tarefas/{$task->id}");

        $response->assertNoContent();

        $this->assertDatabaseMissing('tasks', [
            'id' => $task->id,
            'title' => 'Tarefa para remover',
        ]);
    }

    public function test_return_404_when_removing_missing_task(): void
    {
        $response = $this->deleteJson('/tarefas/999');

        $response
            ->assertNotFound()
            ->assertJson([
                'message' => 'Tarefa nao encontrada.',
            ]);
    }

    public function test_mark_task_as_completed(): void
    {
        $task = Task::create([
            'title' => 'Tarefa para concluir',
            'completed' => false,
        ]);

        $response = $this->patchJson("/tasks/{$task->id}", [
            'completed' => true,
        ]);

        $response
            ->assertOk()
            ->assertJsonFragment([
                'id' => $task->id,
                'title' => 'Tarefa para concluir',
                'completed' => true,
            ]);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'completed' => true,
        ]);
    }

    public function test_mark_task_as_not_completed(): void
    {
        $task = Task::create([
            'title' => 'Tarefa para desmarcar',
            'completed' => true,
        ]);

        $response = $this->patchJson("/tasks/{$task->id}", [
            'completed' => false,
        ]);

        $response
            ->assertOk()
            ->assertJsonFragment([
                'id' => $task->id,
                'title' => 'Tarefa para desmarcar',
                'completed' => false,
            ]);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'completed' => false,
        ]);
    }

    public function test_reject_invalid_completed_payload(): void
    {
        $task = Task::create([
            'title' => 'Tarefa com payload invalido',
            'completed' => false,
        ]);

        $response = $this->patchJson("/tasks/{$task->id}", [
            'completed' => 'invalid',
        ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['completed']);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'completed' => false,
        ]);
    }
}
