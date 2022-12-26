const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })



  const roleRoutes = require('./routes/role.routes')
  const adminRoutes = require('./routes/admin.routes')
  const departmentRoutes =require('./routes/department.routes')
  const usersRoutes=require('./routes/users.routes')
  app.use('/role', roleRoutes)
  app.use('/admin', adminRoutes)
  app.use('/department',departmentRoutes)
  app.use('/user', usersRoutes)


  
  

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })