let experiences = `CREATE TABLE IF NOT EXISTS experiences (
  id int(10) NOT NULL AUTO_INCREMENT,
  function varchar(40) NOT NULL DEFAULT 'Engineer',
  description varchar(70) NOT NULL DEFAULT 'Good Engineer',
  period varchar(20) NOT NULL DEFAULT '2017',
  student_fk int(10) NOT NULL,
  PRIMARY KEY (id),
  KEY student_fk (student_fk),
  CONSTRAINT experiences_ibfk_1 FOREIGN KEY (student_fk) REFERENCES students (id) ON UPDATE CASCADE
)`

export default experiences;
