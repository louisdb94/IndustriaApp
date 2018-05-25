let vacatures = `CREATE TABLE IF NOT EXISTS vacatures (
    id int(10) NOT NULL AUTO_INCREMENT,
    name varchar (100) NOT NULL,
    type varchar(100) NOT NULL,
    about varchar (1000) NOT NULL,
    company_fk int(11) NOT NULL,
    PRIMARY KEY (id),
    KEY company_fk (company_fk),
    CONSTRAINT vacatures_ibfk_1 FOREIGN KEY (company_fk) REFERENCES companies (id)
  )`

  export default vacatures
