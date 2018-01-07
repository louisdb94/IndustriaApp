let contact_company = `CREATE TABLE IF NOT EXISTS contact_company (
    id int(11) NOT NULL AUTO_INCREMENT,
    email varchar(50) NOT NULL,
    phone varchar(20) NOT NULL,
    address varchar(80) NOT NULL,
    latitude double NOT NULL DEFAULT '50.8769471',
    longitude double NOT NULL DEFAULT '4.7070334',
    company_fk int(11) NOT NULL,
    PRIMARY KEY (id),
    KEY company_fk (company_fk),
    CONSTRAINT contact_company_ibfk_1 FOREIGN KEY (company_fk) REFERENCES companies (id) ON UPDATE CASCADE
  )`
  
  export default contact_company;