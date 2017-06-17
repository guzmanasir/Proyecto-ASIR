var chai = require('chai')
var chaiHttp = require('chai-http')

chai.use(chaiHttp)


describe('Tests de sesiones', function() {
    describe('login', function() {
        it('Correcto', function(done){
            chai.request('http://localhost:3000')
                .post('/loginForm')

                .send({usernameServer: "admin", passwordServer: "admin"})
                .end(function (err, res) {
                    chai.expect(res).to.have.status(200);
                    done()
                })
        });

        it('Login incorrecto', function(done){
            chai.request('http://localhost:3000')
                .post('/loginForm')

                .send({usernameServer: "admins", passwordServer: "admins"})
                .end(function (err, res) {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body.codigo).to.equal(500);
                    done()
                })
        });
    });
});
//

