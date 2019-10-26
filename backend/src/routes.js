//importação de bibliotecas
const express = require('express');
const multer = require('multer');
const UploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');
//instanciando variáveis da aplicação
const routes = express.Router();
const upload = multer(UploadConfig);

//## definição de rotas ##//
routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals',ApprovalController.store);
routes.post('/bookings/:booking_id/rejections',RejectionController.store);

//exportando rotas para serem acessadas de outros arquivos
module.exports = routes;