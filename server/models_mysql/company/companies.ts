let companies = `CREATE TABLE IF NOT EXISTS companies (
    id int(10) NOT NULL AUTO_INCREMENT,
    name varchar(80) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'Company Name',
    url varchar(80) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
    email varchar(70) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
    feature1 varchar(70) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
    feature2 varchar(70) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
    feature3 varchar(70) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
    whoami longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
    image tinyint(1) NOT NULL DEFAULT '0',
    priority ENUM('HIGH','MIDDLE','LOW', 'ONDERNEMERSDAG', 'FREE') NOT NULL DEFAULT 'LOW',
    user_fk int(11) NOT NULL,
    PRIMARY KEY (id),
    KEY user_fk (user_fk),
    CONSTRAINT companies_ibfk_1 FOREIGN KEY (user_fk) REFERENCES user (id)
  )`

  export default companies
