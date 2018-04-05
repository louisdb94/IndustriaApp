let priorities_company = `CREATE TABLE IF NOT EXISTS priorities_company (
    id int(11) NOT NULL AUTO_INCREMENT,
    profile_page tinyint(1) DEFAULT NULL,
    student_profile tinyint(1) DEFAULT NULL,
    job_openings tinyint(1) DEFAULT NULL,
    size ENUM('Large','Medium','Small') NOT NULL DEFAULT 'Small',
    company_fk int(11) NOT NULL,
    PRIMARY KEY (id),
    KEY company_fk (company_fk),
    CONSTRAINT priorities_company_ibfk_1 FOREIGN KEY (company_fk) REFERENCES companies (id) ON UPDATE CASCADE
  )`

  export default priorities_company;
