let sql_skills = `CREATE TABLE skills (
    id int(11) NOT NULL AUTO_INCREMENT,
    student_fk int(11) NOT NULL,
    skill varchar(10) NOT NULL,
    value int(11) NOT NULL,
    value_type varchar(20) NOT NULL,
    PRIMARY KEY (id),
    KEY user_fk (student_fk),
    CONSTRAINT skills_ibfk_1 FOREIGN KEY (student_fk) REFERENCES students (id) ON UPDATE CASCADE
  )`

  export default sql_skills
