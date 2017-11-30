let sql_professional = `CREATE TABLE IF NOT EXISTS professional (
    id int(11) NOT NULL AUTO_INCREMENT,
    student_fk int(11) NOT NULL,
    skill varchar(10) NOT NULL,
    value int(11) NOT NULL DEFAULT '50',
    value_type varchar(20) NOT NULL DEFAULT 'Intermediate',
    PRIMARY KEY (id),
    KEY student_fk (student_fk),
    CONSTRAINT professional_ibfk_1 FOREIGN KEY (student_fk) REFERENCES students (id) ON UPDATE CASCADE
  )`

  export default sql_professional