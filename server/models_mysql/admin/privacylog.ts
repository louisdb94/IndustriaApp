let privacylog = `CREATE TABLE IF NOT EXISTS privacylog (
    id int(11) NOT NULL AUTO_INCREMENT,
    student_fk int(11) NOT NULL,
    cvCheck tinyint(1) NOT NULL DEFAULT '0',
    contactCheck tinyint(1) NOT NULL DEFAULT '0',
    timestamp_cv varchar(40) NOT NULL ,
    timestamp_contact varchar(40) NOT NULL ,
    PRIMARY KEY (id),
    KEY student_fk (student_fk),
    CONSTRAINT privacylog_ibfk_1 FOREIGN KEY (student_fk) REFERENCES students (id) ON UPDATE CASCADE
  )`
  
  export default privacylog;