import { Component } from '@angular/core';
import { CategoryComponent } from '../../../features/categories/view/category/category.component';
import {MatDividerModule} from '@angular/material/divider';
import { TaskComponent } from '../../../features/tasks/task/task.component';

const COMPONENTS = [CategoryComponent, TaskComponent];
const MODULES = [MatDividerModule];
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [...COMPONENTS, ...MODULES],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
