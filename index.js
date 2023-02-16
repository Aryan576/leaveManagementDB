const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })


  const sequelize = require('./util/DB');
  const roleRoutes = require('./routes/role.routes')
  
/*   const departmentRoutes =require('./routes/department.routes')
  const usersRoutes=require('./routes/users.routes')
  const studentRoutes=require('./routes/students.routes') */
  app.use('/role', roleRoutes)
 
  /* app.use('/department',departmentRoutes)
  app.use('/user', usersRoutes)
  app.use('/students',studentRoutes)
 */

  
  
  sequelize.sync()
  .then(res => {
      // console.log(res);
      app.listen(port, () => {
          console.log(`App running on port http://localhost:${port}`)
      })
  })
  .catch(err => {
      console.log(err);
  })