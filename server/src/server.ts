process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import MenuRoute from './routes/menu.route';
import RoleRoute from './routes/role.route';
import DeptRoute from './routes/dept.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new MenuRoute(), new RoleRoute(), new DeptRoute()]);

app.listen();
