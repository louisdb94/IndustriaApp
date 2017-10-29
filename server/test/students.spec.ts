import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Student from '../models/student';

const should = chai.use(chaiHttp).should();

describe('Students', () => {

  beforeEach(done => {
    Student.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for students', () => {

    it('should get all the students', done => {
      chai.request(app)
        .get('/api/students')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get students count', done => {
      chai.request(app)
        .get('/api/students/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new student', done => {
      const student = { name: 'Louigi', degree: "Internet computing", gradyear: 2018 };
      chai.request(app)
        .post('/api/student')
        .send(student)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('name');
          res.body.should.have.a.property('degree');
          res.body.should.have.a.property('gradyear');
          done();
        });
    });

    it('should get a student by its id', done => {
      const student = new Student({ name: 'Louigi', degree: "Internet computing", gradyear: 2019 });
      student.save((error, newStudent) => {
        chai.request(app)
          .get(`/api/cat/${newStudent.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('degree');
            res.body.should.have.property('gradyear');
            res.body.should.have.property('_id').eql(newStudent.id);
            done();
          });
      });
    });

    it('should update a student by its id', done => {
      const student = new Student({ name: 'Louigi', degree: "Internet computing", gradyear: 2019 });
      student.save((error, newStudent) => {
        chai.request(app)
          .put(`/api/student/${newStudent.id}`)
          .send({ gradyear: 2020 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a student by its id', done => {
      const student = new Student({ name: 'Louigi', degree: "Internet computing", gradyear: 2019 });
      student.save((error, newStudent) => {
        chai.request(app)
          .delete(`/api/student/${newStudent.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});
