let admin_companycontact = `CREATE TABLE IF NOT EXISTS admin_companycontact (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(80) NOT NULL,
    email varchar(70) NOT NULL,
    phone int(30) NOT NULL,
    address varchar(150) NOT NULL,
    company_fk int(11) NOT NULL,
    PRIMARY KEY (id),
    KEY company_fk (company_fk),
    CONSTRAINT admin_companycontact_ibfk_1 FOREIGN KEY (company_fk) REFERENCES companies (id) ON UPDATE CASCADE
  )`

  export default admin_companycontact;
