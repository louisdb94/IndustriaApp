let sql_students = `CREATE TABLE IF NOT EXISTS students (
    id int(10) NOT NULL AUTO_INCREMENT,
    name varchar(80) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'Elon Musk',
    rnumber varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
    whoami longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
    gradYear int(20) NOT NULL,
    degree varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'Electronics',
    cvChecked tinyint(1) NOT NULL DEFAULT '0',
    contactChecked tinyint(1) NOT NULL DEFAULT '0',
    countSkills int(11) NOT NULL DEFAULT '0',
    countProfessional int(11) NOT NULL DEFAULT '0',
    countLanguage int(11) NOT NULL DEFAULT '0',
    countEducation int(11) NOT NULL DEFAULT '0',
    numberCv int(11) NOT NULL DEFAULT '0',
    image tinyint(1) NOT NULL DEFAULT '0',
    alumni tinyint(1) NOT NULL DEFAULT '0',    
    user_fk int(11) NOT NULL,
    PRIMARY KEY (id),
    KEY user_fk (user_fk),
    CONSTRAINT students_ibfk_1 FOREIGN KEY (user_fk) REFERENCES user (id) ON UPDATE CASCADE
  )`

  export default sql_students
