import {db} from '../app';

abstract class BaseSqlCtrl {

    abstract model: any;
    abstract dummy : any;

    // abstract field: any;


    getsql = (req, res) => {
      db.query(this.dummy, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts table created...');
      });
    }

    // Insert post 1
    insert =  (req, res) => {

        let sql = `INSERT INTO ${this.model} SET ?`;
        let query = db.query(sql, req.body, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.json(result);
        });
    };

    insertStudentFK =  (req, res) => {

          let sql = `INSERT INTO ${this.model} SET student_fk = '${req.params.id}'`;
          let query = db.query(sql, (err, result) => {
              if(err) throw err;
              console.log(result);
              res.json(result);
          });
      };

    insertCompanyFK =  (req, res) => {

        let sql = `INSERT INTO ${this.model} SET company_fk = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.json(result);
        });
    };

    insertVacatureFK =  (req, res) => {
        
        let sql = `INSERT INTO ${this.model} SET vacature_fk = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.json(result);
        });
    };

    insertUser =  (req, res) => {

        let sql = `INSERT INTO ${this.model} SET user_fk = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.json(result);
        });
    };


    // Select posts
    select = (req, res) => {
        let sql = `SELECT * FROM ${this.model}`;
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            console.log(results);
            res.json(results);
        });
    };

    // Select posts
    selectIds = (req, res) => {
        let sql = `SELECT id FROM ${this.model}`;
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            console.log(results);
            res.json(results);
        });
    };

    // Select single post
    getbyId =  (req, res) => {
        let sql = `SELECT * FROM ${this.model} WHERE id = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            //console.log(result);
            res.json(result);

        });
    };

    // Select single post
    getbyRole =  (req, res) => {
        let sql = `SELECT * FROM ${this.model} WHERE role = 'company'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            //console.log(result);
            res.json(result);

        });
    };

    getbyFk =  (req, res) => {
        let sql = `SELECT * FROM ${this.model} WHERE student_fk = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            //console.log(result);
            res.json(result);

        });
    };

    getbyStudentId =  (req, res) => {
        let sql = `SELECT * FROM ${this.model} WHERE student_fk = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.json(result);

        });
    };

    getbyCompanyId =  (req, res) => {
        let sql = `SELECT * FROM ${this.model} WHERE company_fk = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.json(result);

        });
    };

    getbyUserId =  (req, res) => {
        let sql = `SELECT * FROM ${this.model} WHERE user_fk = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.json(result);
        });
    };

    // // Update post
    // update = (req, res) => {
    //     let sql = `UPDATE ${this.model} SET field = '${req.body}' WHERE id = ${req.params.id}`;
    //     let query = db.query(sql, (err, result) => {
    //         if(err) throw err;
    //         console.log(result);
    //         res.send('Post updated...');
    //     });
    // };

    // Delete post
    delete = (req, res) => {
        let sql = `DELETE FROM ${this.model} WHERE id = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.send('Post deleted...');
        });
    };

}

export default BaseSqlCtrl;
