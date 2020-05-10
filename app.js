const express = require('express');
const cors = require("cors");
const indexRouter = require('./routes/rt_index');
const userRouter = require('./routes/rt_user');
const InvoiceRouter = require('./routes/invoice_router');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// routers
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/invoices', InvoiceRouter);
app.use('/*', indexRouter);

module.exports = app;
