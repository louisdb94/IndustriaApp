import {db} from '../app';

abstract class BaseSqlCtrl {

    abstract model: any;
    abstract dummy : any;

    // abstract field: any;


    getsql = (req, res) => {
      db.query(this.dummy, (err, result) => {
        if (err) throw err;
        res.send('Posts table created...');
      });
    }

    // Insert post 1
    insert =  (req, res) => {

        let sql = `INSERT INTO ${this.model} SET ?`;
        let query = db.query(sql, req.body, (err, result) => {
            if(err) throw err;
            res.json(result);
        });
    };

    insertStudentFK =  (req, res) => {

          let sql = `INSERT INTO ${this.model} SET student_fk = '${req.params.id}'`;
          let query = db.query(sql, (err, result) => {
              if(err) throw err;
              res.json(result);
          });
      };

    insertCompanyFK =  (req, res) => {

        let sql = `INSERT INTO ${this.model} SET company_fk = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            res.json(result);
        });
    };

    insertVacatureFK =  (req, res) => {

        let sql = `INSERT INTO ${this.model} SET vacature_fk = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            res.json(result);
        });
    };

    insertUser =  (req, res) => {

        let sql = `INSERT INTO ${this.model} SET user_fk = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            res.json(result);
        });
    };


    // Select posts
    select = (req, res) => {
        let sql = `SELECT * FROM ${this.model}`;
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            res.json(results);
        });
    };

    // Select posts
    selectIds = (req, res) => {
        let sql = `SELECT id FROM ${this.model}`;
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            res.json(results);
        });
    };

    // Select single post
    getbyId =  (req, res) => {
        let sql = `SELECT * FROM ${this.model} WHERE id = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            res.json(result);

        });
    };

    // Select single post
    getbyRole =  (req, res) => {
        let sql = `SELECT * FROM ${this.model} WHERE role = 'company'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            res.json(result);

        });
    };

    getbyFk =  (req, res) => {
        let sql = `SELECT * FROM ${this.model} WHERE student_fk = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            res.json(result);

        });
    };

    getbyStudentId =  (req, res) => {
        let sql = `SELECT * FROM ${this.model} WHERE student_fk = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            res.json(result);

        });
    };

    getbyCompanyId =  (req, res) => {
        let sql = `SELECT * FROM ${this.model} WHERE company_fk = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            res.json(result);

        });
    };

    getbyUserId =  (req, res) => {
        let sql = `SELECT * FROM ${this.model} WHERE user_fk = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            res.json(result);
        });
    };

    // Delete post
    delete = (req, res) => {
        let sql = `DELETE FROM ${this.model} WHERE id = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            res.send('Post deleted...');
        });
    };

    // Delete post
    deleteStudent = (req, res) => {
        let sql = `DELETE FROM contact WHERE student_fk = '${req.params.student_fk}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
        });
        let sql1 = `DELETE FROM cvs WHERE student_fk = '${req.params.student_fk}'`;
        let query1 = db.query(sql1, (err, result) => {
            if(err) throw err;
        });
        let sql2 = `DELETE FROM education WHERE student_fk = '${req.params.student_fk}'`;
        let query2 = db.query(sql2, (err, result) => {
            if(err) throw err;
        });
        let sql3 = `DELETE FROM experiences WHERE student_fk = '${req.params.student_fk}'`;
        let query3 = db.query(sql3, (err, result) => {
            if(err) throw err;
        });
        let sql4 = `DELETE FROM language WHERE student_fk = '${req.params.student_fk}'`;
        let query4 = db.query(sql4, (err, result) => {
            if(err) throw err;
        });
        let sql5 = `DELETE FROM professional WHERE student_fk = '${req.params.student_fk}'`;
        let query5 = db.query(sql5, (err, result) => {
            if(err) throw err;
        });
        let sql6 = `DELETE FROM skills WHERE student_fk = '${req.params.student_fk}'`;
        let query6 = db.query(sql6, (err, result) => {
            if(err) throw err;
        });
        let sql7 = `DELETE FROM socialmedia WHERE student_fk = '${req.params.student_fk}'`;
        let query7 = db.query(sql7, (err, result) => {
            if(err) throw err;
        });
        let sql8 = `SELECT user_fk FROM students WHERE id = '${req.params.student_fk}'`;
        let query8 = db.query(sql8, (err, result) => {
            if(err) throw err;
            let sql = `DELETE FROM students WHERE id = '${req.params.student_fk}'`;
            let query = db.query(sql, (err, result) => {
                if(err) throw err;
            });
            let sql1 = `DELETE FROM user WHERE id = '${result[0].user_fk}'`;
            let query1 = db.query(sql1, (err, result) => {
                if(err) throw err;
            });

        });
        res.send("user deleted");
    };

}

export default BaseSqlCtrl;
