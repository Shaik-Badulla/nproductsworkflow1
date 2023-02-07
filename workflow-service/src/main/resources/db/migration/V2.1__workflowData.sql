INSERT INTO `modules_params_types` (`type`) VALUES ('string'), ('integer'), ('float'), ('boolean');

INSERT INTO `modules` (`text_id`, `version`, `name`, `description`, `config_id`, `is_system`, `icon_id`)
VALUES 
('module1', '1.0.0', 'Module 1', 'This is a sample description of module 1', 'config1', 1, 'icon1'),
('module2', '2.0.0', 'Module 2', 'This is a sample description of module 2', 'config2', 0, 'icon2');

INSERT INTO `modules_params` (`module_id`, `type_id`, `text_id`, `name`, `value`, `required`, `default_value`, `depends_id`, `depends_value`)
VALUES
(1, 1, 'param1', 'Param 1', 'Sample value', 1, 'Default value', 'depends1', 'depends value'),
(1, 2, 'param2', 'Param 2', '123', 1, '0', 'depends2', 'depends value'),
(2, 3, 'param3', 'Param 3', '12.34', 0, '0.0', 'depends3', 'depends value'),
(2, 4, 'param4', 'Param 4', '1', 1, '0', 'depends4', 'depends value');
