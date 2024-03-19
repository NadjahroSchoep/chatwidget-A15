import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ChatComponent } from '@chatwidget/chat';

@NgModule({
  imports: [
    CommonModule,
    ChatComponent // Add ChatComponent to the imports array
  ],
  exports: [ChatComponent],
})
export class ChatModule { }