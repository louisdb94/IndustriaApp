let vacatures = `CREATE TABLE IF NOT EXISTS vacatures (
    id int(10) NOT NULL AUTO_INCREMENT,
    companies_fk int(11) NOT NULL,
    type varchar(10) NOT NULL,
    PRIMARY KEY (id),
    KEY companies_fk (companies_fk),
    CONSTRAINT vacatures_ibfk_1 FOREIGN KEY (companies_fk) REFERENCES companies (id)
  )`

  export default vacatures
