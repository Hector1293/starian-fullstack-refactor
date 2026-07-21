<?php

namespace Tests\Feature;

use App\Models\Task;
use Database\Seeders\TaskSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_seed_initial_tasks(): void
    {
        $this->seed(TaskSeeder::class);

        $this->assertDatabaseCount('tasks', 3);
        $this->assertDatabaseHas('tasks', [
            'title' => 'Tarefa 1',
            'completed' => false,
        ]);
        $this->assertDatabaseHas('tasks', [
            'title' => 'Tarefa 2',
            'completed' => true,
        ]);
        $this->assertDatabaseHas('tasks', [
            'title' => 'Tarefa 3',
            'completed' => false,
        ]);
    }

    public function test_seed_can_run_more_than_once_without_duplicates(): void
    {
        $this->seed(TaskSeeder::class);
        $this->seed(TaskSeeder::class);

        $this->assertDatabaseCount('tasks', 3);
        $this->assertSame(1, Task::where('title', 'Tarefa 1')->count());
        $this->assertSame(1, Task::where('title', 'Tarefa 2')->count());
        $this->assertSame(1, Task::where('title', 'Tarefa 3')->count());
    }
}
