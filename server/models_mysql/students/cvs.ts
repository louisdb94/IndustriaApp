let cvs = `CREATE TABLE IF NOT EXISTS cvs (
  id int(11) NOT NULL AUTO_INCREMENT,
  student_fk int(11) NOT NULL,
  name varchar(30) NOT NULL,
  mimetype varchar(8) NOT NULL,
  size int(11) NOT NULL,
  number int(11) NOT NULL DEFAULT '1',
  customName varchar(40) NOT NULL DEFAULT 'Curriculum vitae',
  PRIMARY KEY (id),
  KEY student_fk (student_fk),
  CONSTRAINT cvs_ibfk_1 FOREIGN KEY (student_fk) REFERENCES students (id) ON UPDATE CASCADE
)`

export default cvs;
