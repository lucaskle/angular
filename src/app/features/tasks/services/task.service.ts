import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sign } from 'crypto';
import { Task } from '../models/task.model';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly httpClient = inject(HttpClient);

  public tasks = signal<Task[]>([]);

  public numberOfTasks = computed(() => this.tasks().length);

  public readonly apiUrl = environment.apiUrl;

  public getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasks`).pipe(
      tap(tasks => {
        const sortedTasks = this.getSortedTasks(tasks);
        this.tasks.set(sortedTasks);
      })
    );
  }

  public createTask(task: Partial<Task>): Observable<Task> {
    return this.httpClient.post<Task>(`${this.apiUrl}/tasks`, task);
  }

  public insertTaskInTheTasksList(newTask: Task): void {
    const updatedTasks = [...this.tasks(), newTask];
    const sortedTasks = this.getSortedTasks(updatedTasks);
    this.tasks.set(sortedTasks);
  }

  public updateTask(task: Task): Observable<Task> {
    // trocar variável task por updatedTask
    return this.httpClient.put<Task>(`${this.apiUrl}/tasks/${task.id}`, task);
  }

  public updateIsCompleted(
    taskId: string,
    isCompleted: boolean
  ): Observable<Task> {
    return this.httpClient.patch<Task>(`${this.apiUrl}/tasks/${taskId}`, {
      isCompleted,
    });
  }

  public updateTaskInTheTasksList(updatedTask: Task): void {
    this.tasks.update(tasks => {
      const allTasksWithUpdatedTaskRemoved = tasks.filter(
        tasks => tasks.id !== updatedTask.id
      );

      const updatedTasksList = [...allTasksWithUpdatedTaskRemoved, updatedTask];
      return this.getSortedTasks(updatedTasksList);
    });

    // const updatedTasks = this.tasks().map(task =>
    //   task.id === updatedTask.id ? updatedTask : task
    // );
    // const sortedTasks = this.getSortedTasks(updatedTasks);
    // this.tasks.set(sortedTasks);
  }

  public deleteTask(taskId: string): Observable<Task> {
    return this.httpClient.delete<Task>(`${this.apiUrl}/tasks/${taskId}`);
  }

  public deleteTaskInTheTasksList(taskId: string): void {
    this.tasks.update(tasks => tasks.filter(task => task.id !== taskId));
  }
  public getSortedTasks(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => a.title.localeCompare(b.title));
  }
}
