let contact = `CREATE TABLE IF NOT EXISTS contact_company (
    id int(11) NOT NULL AUTO_INCREMENT,
    email varchar(20) NOT NULL,
    phone varchar(10) NOT NULL,
    address varchar(30) NOT NULL,
    company_fk int(11) NOT NULL,
    PRIMARY KEY (id),
    KEY company_fk (company_fk),
    CONSTRAINT contact_company_ibfk_1 FOREIGN KEY (company_fk) REFERENCES companies (id) ON UPDATE CASCADE
  )`
  
  export default contact;