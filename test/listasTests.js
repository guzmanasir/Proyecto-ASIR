/**
 * Created by jesus on 1/06/17.
 */
var chai = require('chai')
var chaiHttp = require('chai-http')

chai.use(chaiHttp)
var token = ""

describe('Tests de listas', function() {
    describe('insertar listas', function() {
        it('si no hay token', function(done){
            chai.request('http://localhost:3000')
                .post('/users/addList')
                //.send({usernameServer: "admins", passwordServer: "admins"})
                .end(function (err, res) {
                    chai.expect(res).to.have.status(403);
                    chai.expect(res.body.codigo).to.equal(10002);
                    done()
                })
        });
        it('login para token', function(done){
            chai.request('http://localhost:3000')
                .post('/loginForm')
                .send({usernameServer: "admin", passwordServer: "admin"})
                .end(function (err, res) {
                    chai.expect(res).to.have.status(200);
                    token = "Bearer " + res.body.token

                    done()
                })
        });
        it('obtener listas de usuario', function(done){
            chai.request('http://localhost:3000')
                .get('/users/getLists')
                .set({token: token})
                //.send({usernameServer: "admins", passwordServer: "admins"})
                .end(function (err, res) {
                    chai.expect(res).to.have.status(200);
                    //chai.expect(res.body.codigo).to.equal(10002);
                    done()
                })
        });
    });
});
//

