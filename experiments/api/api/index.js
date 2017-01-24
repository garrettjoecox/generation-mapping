
require('./db');

app.get('/api', (req, res) => res.send('Hello World'));

app.use('/api/auth', require('./auth/auth.router'));
app.use('/api/users', auth.authenticate, require('./user/user.router'));
app.use('/api/churches', auth.authenticate, require('./church/church.router'));