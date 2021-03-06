let careers = `CREATE TABLE IF NOT EXISTS careers (
    id int(11) NOT NULL AUTO_INCREMENT,
    type varchar(30) NOT NULL,
    title varchar(30) NOT NULL,
    employment varchar(50) NOT NULL,
    department varchar(50) NOT NULL,
    location varchar(50) NOT NULL,
    company_fk int(11) NOT NULL,
    PRIMARY KEY (id),
    KEY company_fk (company_fk),
    CONSTRAINT careers_ibfk_1 FOREIGN KEY (company_fk) REFERENCES companies (id) ON UPDATE CASCADE
  )`
  
  export default careers;