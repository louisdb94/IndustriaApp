let contacts = `CREATE TABLE IF NOT EXISTS contact (
  id int(11) NOT NULL AUTO_INCREMENT,
  email varchar(30) NOT NULL,
  phone varchar(20) NOT NULL,
  county varchar(30) NOT NULL,
  city varchar(20) NOT NULL,
  student_fk int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY student_fk (student_fk),
  CONSTRAINT contact_ibfk_1 FOREIGN KEY (student_fk) REFERENCES students (id) ON UPDATE CASCADE
)`

export default contacts;
