let education = `CREATE TABLE IF NOT EXISTS education (
  id int(11) NOT NULL AUTO_INCREMENT,
  student_fk int(11) NOT NULL,
  type varchar(100) NOT NULL DEFAULT 'Master Industrial Engineering',
  institution varchar(100) NOT NULL DEFAULT 'KU Leuven',
  date_from int(100) NOT NULL,
  date_until int(100) NOT NULL,
  PRIMARY KEY (id),
  KEY student_fk (student_fk),
  CONSTRAINT education_ibfk_1 FOREIGN KEY (student_fk) REFERENCES students (id)
)`

export default education;
