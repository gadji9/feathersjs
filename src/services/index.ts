import { Application } from '../declarations';
import users from './users/users.service';
import team from './team/team.service';
import coach from './coach/coach.service';
import footballer from './footballer/footballer.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(team);
  app.configure(coach);
  app.configure(footballer);
}
