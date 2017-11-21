let education = `CREATE TABLE education (
  id int(11) NOT NULL AUTO_INCREMENT,
  student_fk int(11) NOT NULL,
  type varchar(30) NOT NULL DEFAULT 'Master Industrial Engineering',
  institution varchar(20) NOT NULL DEFAULT 'KU Leuven',
  date_from int(4) NOT NULL,
  date_until int(4) NOT NULL,
  PRIMARY KEY (id),
  KEY student_fk (student_fk),
  CONSTRAINT education_ibfk_1 FOREIGN KEY (student_fk) REFERENCES students (id)
)`

export default education;
