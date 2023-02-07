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

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role`
(
    `id`               	char(36)    NOT NULL,
    `name`             varchar(50) NOT NULL DEFAULT 'ROLE_USER',
    `created_date_time` timestamp   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `last_updated_date_time` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `role_name_unique` (`name`)
    ) ENGINE = InnoDB
    DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user`
(
    `id`                 char(36)    NOT NULL,
    `first_name`         varchar(20) NOT NULL,
    `last_name`          varchar(20) NOT NULL,
    `email`              varchar(32) NOT NULL,
    `role_name`          varchar(20) NOT NULL DEFAULT 'ROLE_USER',
    `disabled`            boolean     NOT NULL default false,
    `created_date_time`  timestamp   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `last_updated_date_time` timestamp NULL DEFAULT NULL,
    `organization_id`    char(36) not null references organization(`id`),
    `role_id`		     char(36) not null references role(`id`),
    PRIMARY KEY (`id`),
    UNIQUE KEY `user_email_unique` (`email`)
    ) ENGINE = InnoDB
    DEFAULT CHARSET = utf8;

