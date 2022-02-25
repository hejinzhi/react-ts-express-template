insert into users(name, password, tel, role_id) values('张三','Aabcd123!','15812345678','1');

INSERT INTO `role` VALUES (1, '2022-02-16 10:52:25.539413', '2022-02-16 10:52:25.539413', '0', '管理员', '拥有全部权限', 'all,dashboard,permission,/dashboard/auth,/permission/users,/permission/role');

insert into menu(menu) values('[{"path":"/dashboard","name":"dashboard","icon":"dashboard","desc":"首页","routes":[{"name":"auth","icon":"smile","desc":"基础设置","path":"/dashboard/auth","component":"./dashboard/auth","access":"canOpen"}]},{"path":"/permission","name":"permission","icon":"dashboard","desc":"权限管理","routes":[{"name":"users","icon":"smile","desc":"用户管理","path":"/permission/users","component":"./dashboard/users","access":"canOpen"},{"name":"dept","icon":"smile","desc":"部门管理","path":"/permission/dept","component":"./dashboard/dept","access":"canOpen"},{"name":"role","desc":"角色管理","icon":"smile","path":"/permission/role","component":"./dashboard/role","access":"canOpen"}]}]');
