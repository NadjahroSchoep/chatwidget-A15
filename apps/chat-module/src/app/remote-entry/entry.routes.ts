import { Route } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AuthComponent, CallbackComponent } from '@chatwidget/auth';
import { ChatComponent, AddChannelComponent } from '@chatwidget/chat';
import { ConsultComponent } from '@chatwidget/consult';

export const remoteRoutes: Route[] = [
  { path: '', component: AuthComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'add-channel', component: AddChannelComponent, canActivate: [AuthGuard]},
  { path: 'consult', component: ConsultComponent, canActivate: [AuthGuard] },
];
