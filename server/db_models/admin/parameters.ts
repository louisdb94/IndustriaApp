let parameters = `CREATE TABLE IF NOT EXISTS parameters (
    id INT(11) NOT NULL AUTO_INCREMENT ,
    parameter VARCHAR(100) NOT NULL ,
    value varchar(100) NOT NULL ,
    role varchar (100) NOT NULL ,
    user_fk int(11) NOT NULL,
    PRIMARY KEY (id),
    KEY user_fk (user_fk),
    CONSTRAINT parameters_ibfk_1 FOREIGN KEY (user_fk) REFERENCES user (id)
)`

//CREATE VIEW admin_parameters AS
//SELECT * FROM `parameters` WHERE `role` = 'admin'

//CREATE VIEW company_parameters AS
//SELECT * FROM `parameters` WHERE `role` = ''

  export default parameters;
