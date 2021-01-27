var faker = require('faker');


 var database = { 
    person: [],
    facility: [],
    exposure: []
  };
 for (let i=1; i<1000; i++) {
   database.person.push({
     id: i,
     val1: Math.floor(Math.random() * Math.floor(100)),
     val2: Math.floor(Math.random() * Math.floor(100))
   });
 }

 for (let i=1; i<=100; i++) {
    database.facility.push({
      id: i,
      val3: faker.random.number(),
      val4: faker.random.number()
    });

    database.exposure.push({
        id: i,
        val5: faker.random.number()
      });
  }
console.log(JSON.stringify(database));


