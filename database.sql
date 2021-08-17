create table CUSTOMER (
	ID INT primary key auto_increment,
	IMAGE VARCHAR (1024),
	NAME VARCHAR(64),
	BIRTHDAY VARCHAR(64),
	GENDER VARCHAR(64),
	JOB VARCHAR(64)
);
alter table CUSTOMER add CREATEDATE DATETIME;
alter table CUSTOMER add ISDELETED INT;
alter table CUSTOMER modify column ISDELETED INT default 0;
alter table CUSTOMER modify column CREATEDATE DATETIME default CURRENT_TIMESTAMP;

desc CUSTOMER;