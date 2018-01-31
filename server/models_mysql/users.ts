

let sql_users = `CREATE TABLE IF NOT EXISTS user (
    id int(11) NOT NULL AUTO_INCREMENT,
    rnumber varchar(70) NOT NULL,
    email varchar(70) NOT NULL,
    password varchar(70) NOT NULL,
    role varchar(70) NOT NULL,
    admin tinyint(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
  )`


export default {sql_users};
