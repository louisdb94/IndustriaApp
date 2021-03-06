let language = `CREATE TABLE IF NOT EXISTS language (
  id int(11) NOT NULL AUTO_INCREMENT,
  student_fk int(11) NOT NULL,
  type varchar(30) NOT NULL,
  value int(11) NOT NULL,
  value_type varchar(30) NOT NULL,
  PRIMARY KEY (id),
  KEY student_fk (student_fk),
  CONSTRAINT language_ibfk_1 FOREIGN KEY (student_fk) REFERENCES students (id) ON UPDATE CASCADE
)`


export default language;
