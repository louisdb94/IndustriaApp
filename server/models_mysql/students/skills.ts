let sql_skills = `CREATE TABLE IF NOT EXISTS skills (
    id int(11) NOT NULL AUTO_INCREMENT,
    student_fk int(11) NOT NULL,
    skill varchar(100) NOT NULL,
    value int(11) NOT NULL DEFAULT '50',
    value_type varchar(50) NOT NULL DEFAULT 'Intermediate',
    PRIMARY KEY (id),
    KEY student_fk (student_fk),
    CONSTRAINT skills_ibfk_1 FOREIGN KEY (student_fk) REFERENCES students (id) ON UPDATE CASCADE
  )`

  export default sql_skills
