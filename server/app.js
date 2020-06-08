const express = require('express');
const graphqlHTTP = require('express-graphql'); 
const schema = require('./schema/schema')
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

// allows cross - site origin requests
app.use(cors())

mongoose.connect('mongodb+srv://rackofski:rackofski@cluster0-kmxc3.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParse: true,
    useUnifiedTopology: true,
})
mongoose.connection.once('open', () => console.log('successfully connected to database'))

// change http.../graphql to redirect to graphqlHTTP
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000,
     () => console.log('now listening for requests on port 4000'));
