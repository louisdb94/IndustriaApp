let events = `CREATE TABLE IF NOT EXISTS events ( 
    id INT(11) NOT NULL AUTO_INCREMENT , 
    title VARCHAR(100) NOT NULL , 
    start varchar(40) NOT NULL , 
    end varchar(40) NOT NULL ,
    color ENUM ('colors.red') DEFAULT 'colors.red', 
    PRIMARY KEY (id)
)`
  
  export default events;