
let sql_users = `CREATE TABLE IF NOT EXISTS user (
    id int(11) NOT NULL AUTO_INCREMENT,
    rnumber varchar(20) NOT NULL,
    email varchar(20) NOT NULL,
    password varchar(30) NOT NULL,
    role varchar(20) NOT NULL,
    PRIMARY KEY (id)
  )`

export default sql_users;
