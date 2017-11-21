let experiences = `CREATE TABLE experiences (
  experiences_id int(10) NOT NULL AUTO_INCREMENT,
  function varchar(30) NOT NULL DEFAULT 'Engineer',
  description varchar(50) NOT NULL DEFAULT 'Good Engineer',
  date_from int(4) NOT NULL DEFAULT '2017',
  student_fk int(10) NOT NULL,
  date_until int(4) NOT NULL DEFAULT '2018',
  PRIMARY KEY (experiences_id),
  KEY student_fk (student_fk),
  CONSTRAINT experiences_ibfk_1 FOREIGN KEY (student_fk) REFERENCES students (student_id) ON UPDATE CASCADE
)`

export default experiences; 
