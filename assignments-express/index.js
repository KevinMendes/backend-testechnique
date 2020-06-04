const faker = require('faker');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');


const makeId = () => Math.random().toString(36).substring(7);


db.serialize(function () {
    db.run(`CREATE TABLE users
            (
                user_uid   VARCHAR(255) PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name  VARCHAR(255) NOT NULL,
                role       VARCHAR(255) NOT NULL
            );`);
    db.run(`CREATE TABLE pets
    (
                uid        VARCHAR(255) PRIMARY KEY,
                name       VARCHAR(255) NOT NULL,
                age        TINYINT      NOT NULL,
                user_uid   VARCHAR(255) NOT NULL,
                CONSTRAINT pets_fk_user_uid FOREIGN KEY (user_uid)
                    REFERENCES users(user_uid) ON UPDATE CASCADE ON DELETE CASCADE
    )`);

    db.run(`INSERT INTO pets (name, age, user_uid)
                VALUES('poupy', '2', '1');
    `);
    

    // Seed user
    var stmt = db.prepare("INSERT INTO users VALUES (?,?,?)");
    for (var i = 0; i < 10; i++) {
        stmt.run([makeId(), faker.name.firstName(), faker.name.lastName()]);
    }
    stmt.finalize();


    db.each("SELECT * FROM users", function (err, row) {
        console.log(row);
    })
})


db.close();
