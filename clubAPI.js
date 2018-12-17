const express = require('express');
const apps = express();
const Joi = require('joi');

apps.use( express.json() );

const clubs = [
  { id : 1 , club : "Barcelona",  coach : "Ernesto Valverde", stadium : "Camp Nou"},
  {id : 2, club : "Real Madrid", coach : "Santiago Solari", stadium : "Santiago de Bernabau"},
  {id : 3, club : "Athletco Madrid ", coach : "Diego Simeone", stadium  : "Wanda Metropolitano"},
  {id : 4, club : "Bayern Munich ", coach : "Niko Kovac", stadium : "Allianz Arena"},
  {id : 5, club : "Napoli", coach : "Carlo Ancelotti", stadium : "Stadio San Paolo"},
  {id : 6, club : "Juventus", coach : "Massimilliano Allegri", stadium :"Juventus Stadium"},
  {id : 7, club : "Paris Saint German", coach : "Thomas Tuchel", stadium : "Parc des Princes"} ,
  {id : 8, club : "Manchester United", coach : "Jose Mourinho", stadium :"Old Trafford"},
  {id : 9, club : "Liverpool", coach : "Jurgen Klopp", stadium :"Anfield"},
  {id : 10,club : "Chelsea", coach : "Maurizio Sarri", stadium :"Stamford Bridge"}
];

//GET REQUEST TO
apps.get('/', ( req, res) => {
  res.send(clubs);
} );

//GET REQUEST TO
apps.get('/api/clubs', ( req, res) => {
  res.send(clubs);
});
apps.get('/api/clubs/:id', ( req, res) => {
  const club = clubs.find( c => c.id === parseInt(req.params.id) );
  if (!club ) {
    res.status(404).send('The Resource is not on the server');
 } 

 if (club) res.send(club);
    
});

apps.get('/api/clubs/:club', ( req, res) => {
  const data = clubs.find( c => c.club === parseInt(req.params.club) );
  if (!data ) res.status(404).send('The Resource is not on the server');
  if (data) res.send(data);
    
});

apps.post('/api/clubs', ( req, res ) => {

  const schema = {
    name : Joi.string().min(3).required(),
    club : Joi.string().min(5).required(),
    coach : Joi.string().required()
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send( ` ${result.error.details[0].message} and make sure you input all parameters`); 
    return ;
  }


 const data = {
   id : clubs.length + 1,
   club : req.body.club,
   coach : req.body.coach 
 };
 clubs.push(data);
 res.send(data);

});

apps.put('/api/clubs/:id', ( req, res) => {
  //Check if the course is available
  //If not existing , return 404
  const info = clubs.find( c => c.id === parseInt(req.params.id) );
  if (!info ) {
   res.status(404).send('The Resource is not on the server');
   return ;
}
  //Check if the course is valid
  //If invalid, return 400 -- bad request 
  
  const result = validateCourse(req.body);

  if (result.error) {
    res.status(400).send( ` ${result.error.details[0].message} and make sure you input all parameters`); 
    return ;
  }

  //Update course
  info.club = req.body.club;
  info.coach = req.body.coach;
  //Return updated course 

  

  res.send(info);

});

function validateCourse(info) {
  const schema = {
    club : Joi.string().required(),
    coach : Joi.string().required()
  };

 return Joi.validate(info, schema);

}

apps.delete('/api/clubs/:id', ( req, res) => {
  //Look up the course 
  //Not existing , return 404
  const info = clubs.find( c => c.id === parseInt(req.params.id) );
  if (!info )  { 
    res.status(404).send('The Resource is not on the server');
 }
  //Delete 
  const index = clubs.indexOf(info);
  clubs.splice(index , 1);

  
  //Return the same course 
  res.send(info);

});


///PORT LISTENING 
const port = process.env.PORT || 3000;
apps.listen(port, () => {
  console.log( ` Listening on port ${port}... ` );
} );


