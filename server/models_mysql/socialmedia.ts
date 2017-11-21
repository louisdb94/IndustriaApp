let sql_socialmedia = `CREATE TABLE socialmedia (
    socialMedia_id int(10) NOT NULL AUTO_INCREMENT,
    type varchar(10) DEFAULT NULL,
    url varchar(50) DEFAULT NULL,
    checked tinyint(1) DEFAULT NULL,
    student_fk int(10) DEFAULT NULL,
    PRIMARY KEY (socialmedia_id),
    KEY user_fk (student_fk),
    CONSTRAINT socialmedia_ibfk_1 FOREIGN KEY (student_fk) REFERENCES students (student_id) ON UPDATE CASCADE
  )`

  export default sql_socialmedia