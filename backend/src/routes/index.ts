import { Router } from 'express';

import appointmentsRouter from './appointments.router';
import usersRouter from './users.router';
import sessionsRouter from './sessions.router';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
