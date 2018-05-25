let vacatures_requirements = `CREATE TABLE IF NOT EXISTS vacatures (
    id int(10) NOT NULL AUTO_INCREMENT,
    benefit varchar(400) NOT NULL,
    vacatures_fk int(11) NOT NULL,
    PRIMARY KEY (id),
    KEY vacatures_fk (vacatures_fk),
    CONSTRAINT vacatures_benefits_ibfk_1 FOREIGN KEY (vacatures_fk) REFERENCES vacatures (id)
  )`

  export default vacatures_requirements