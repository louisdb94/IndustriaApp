import {db} from '../app';

abstract class BaseSqlCtrl {

    abstract model: any;

    // abstract field: any;


    getsql = (req, res) => {
      db.query(this.model, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts table created...');
      });
    }

    // Insert post 1
    insert =  (req, res) => {

        let sql = `INSERT INTO ${this.model} SET ?`;
        let query = db.query(sql, `${req.body}`, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.send('Post 1 added...');
        });
    };

    // Insert post 2
    insert2 = (req, res) => {

        let sql = `INSERT INTO '${this.model}' SET ?`;
        let query = db.query(sql, `${req.body}`, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.send('Post 2 added...');
        });
    };

    // Select posts
    select = (req, res) => {
        let sql = `SELECT * FROM ${this.model}`;
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            console.log(results);
            res.send('Posts fetched...');
        });
    };

    // Select single post
    getbyId =  (req, res) => {
        let sql = `SELECT * FROM ${this.model} WHERE id = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.send('Post fetched...');
        });
    };

    getbyStudentId =  (req, res) => {
        let sql = `SELECT * FROM ${this.model} WHERE student_fk = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.send('Post fetched...');
        });
    };

    getbyUserId =  (req, res) => {
        let sql = `SELECT * FROM ${this.model} WHERE user_fk = '${req.params.id}'`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.send('Post fetched...');
        });
    };



    // // Update post
    // update =  (req, res) => {
    //     let sql = `UPDATE '${this.model}' SET '${this.field}' = '${req.body}' WHERE id = ${req.params.id}`;
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
