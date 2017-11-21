let contacts = `CREATE TABLE contact (
  contact_id int(11) NOT NULL AUTO_INCREMENT,
  email varchar(20) NOT NULL,
  phone varchar(10) NOT NULL,
  county varchar(20) NOT NULL,
  city varchar(20) NOT NULL,
  student_fk int(11) NOT NULL,
  PRIMARY KEY (contact_id),
  KEY student_fk (student_fk),
  CONSTRAINT contact_ibfk_1 FOREIGN KEY (student_fk) REFERENCES students (student_id) ON UPDATE CASCADE
)`

export default contacts;
