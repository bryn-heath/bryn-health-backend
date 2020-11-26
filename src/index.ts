import app from './application';
// console.log('TESTTTTTTTTTTTTTTTTTTT', process.env.PORT);
const port = 8000;

app.listen(port, () => {
  console.log(``);
  console.log(`*************************************************`);
  console.log(`** Care API at http://localhost:${port} **`);
});
