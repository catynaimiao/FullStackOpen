const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.izluygk.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  console.log(name, number);

  mongoose
    .connect(url)
    .then(() => {
      const person = new Person({
        name,
        number,
      });

      return person.save();
    })
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`);
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}

if (process.argv.length === 3) {
  mongoose.connect(url).then(() => {
    console.log("phonebook:");

    return Person.find({})
      .then((result) => {
        result.forEach((person) => {
          console.log(person);
        });
        mongoose.connection.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
