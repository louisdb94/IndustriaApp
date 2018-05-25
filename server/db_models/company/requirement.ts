let requirement = `CREATE TABLE IF NOT EXISTS requirements (
    id int(10) NOT NULL AUTO_INCREMENT,
    name varchar(400) NOT NULL,
    vacatures_fk int(11) NOT NULL,
    PRIMARY KEY (id),
    KEY vacatures_fk (vacatures_fk),
    CONSTRAINT vacatures_requirements_ibfk_1 FOREIGN KEY (vacatures_fk) REFERENCES vacatures (id)
  )`

  export default requirement