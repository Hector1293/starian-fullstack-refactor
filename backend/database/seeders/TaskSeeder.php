<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $tasks = [
            ['title' => 'Tarefa 1', 'completed' => false],
            ['title' => 'Tarefa 2', 'completed' => true],
            ['title' => 'Tarefa 3', 'completed' => false],
        ];

        foreach ($tasks as $task) {
            Task::updateOrCreate(
                ['title' => $task['title']],
                ['completed' => $task['completed']]
            );
        }
    }
}
