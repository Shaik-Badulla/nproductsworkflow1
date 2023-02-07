SET NAMES utf8;
SET
    time_zone = '+00:00';
SET
    sql_mode = 'NO_AUTO_VALUE_ON_ZERO';


CREATE
    DATABASE IF NOT EXISTS `${schema}` DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;

USE
`${schema}`;

DROP TABLE IF EXISTS `modules_params_types`;

CREATE TABLE IF NOT EXISTS `modules_params_types`
(
    `id`   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` NVARCHAR(50)    NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS `modules`;
CREATE TABLE IF NOT EXISTS `modules`
(
    `module_id`    BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT,
    `text_id`      NVARCHAR(50)     NOT NULL,
    `version`     NVARCHAR(50)     NOT NULL,
    `name`        NVARCHAR(50)     NOT NULL,
    `description` NVARCHAR(300)    NULL,
    `config_id`    NVARCHAR(100)    NULL,
    `is_system`    TINYINT UNSIGNED NULL,
    `icon_id`      NVARCHAR(50)     NULL,
    PRIMARY KEY (`module_id`),
    UNIQUE KEY (`text_id`, `Version`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS `modules_params`;

CREATE TABLE IF NOT EXISTS `modules_params`
(
    `module_param_id` BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT,
    `module_id`      BIGINT UNSIGNED  NOT NULL,
    `type_id`        BIGINT UNSIGNED  NOT NULL,
    `text_id`        NVARCHAR(50)     NOT NULL,
    `name`          NVARCHAR(50)     NOT NULL,
    `value`         MEDIUMTEXT       NULL,
    `required`      TINYINT UNSIGNED NOT NULL,
    `default_value`  NVARCHAR(300)    NULL,
    `depends_id`     NVARCHAR(50)     NULL,
    `depends_value`  NVARCHAR(300)    NULL,
    PRIMARY KEY (`module_param_id`),
    KEY (`module_id`),
    KEY (`type_id`),
    CONSTRAINT FOREIGN KEY (`module_id`) REFERENCES `Modules` (`module_id`),
    CONSTRAINT FOREIGN KEY (`type_id`) REFERENCES `modules_params_types` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;