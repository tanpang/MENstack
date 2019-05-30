import { Router } from 'express';

import user from '../user/route';

export default Router()
    .use('/user', user)
