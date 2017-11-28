let companies = `CREATE TABLE IF NOT EXISTS companies (
    id int(10) NOT NULL AUTO_INCREMENT,
    name varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'Company Name',
    whoami longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
    user_fk int(11) NOT NULL,
    PRIMARY KEY (id),
    KEY user_fk (user_fk),
    CONSTRAINT companies_ibfk_1 FOREIGN KEY (user_fk) REFERENCES user (id)
  )`

  export default companies