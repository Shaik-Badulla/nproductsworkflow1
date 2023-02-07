
set @ROLE_ID1 = uuid();
INSERT INTO role
(id, name, created_date_time)
VALUES(@ROLE_ID1, 'ROLE_SUPER_ADMIN', CURRENT_TIMESTAMP);

set @ROLE_ID2 = uuid();
INSERT INTO role
(id, name, created_date_time)
VALUES(@ROLE_ID2, 'ROLE_ADMIN', CURRENT_TIMESTAMP);

set @ROLE_ID3 = uuid();
INSERT INTO role
(id, name, created_date_time)
VALUES(@ROLE_ID3, 'ROLE_USER', CURRENT_TIMESTAMP);


set @USER_ID1 = uuid(); 

INSERT INTO `user`
( id, first_name, last_name, email, role_name, role_id)
VALUES(@USER_ID1, 'Bhakta', 'Reddy','bhakta@ensarsolutions.com', 'ROLE_SUPER_ADMIN', @ROLE_ID1); 
