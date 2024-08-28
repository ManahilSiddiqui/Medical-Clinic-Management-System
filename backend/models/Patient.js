const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const patientSchema = new mongoose.Schema({
    pID: {
        type: String,
        required: true,
        unique: true
    },
    patientName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    deceaseRecordOne: {
        type: String
    },
    medicineRecordOne: {
        type: String
    },
    deceaseRecordTwo: {
        type: String
    },
    medicineRecordTwo: {
        type: String
    },
    doctorID: [{
        type: String,
        default: 'Kunal',
        required: true
    }]
},
{
    timestamps: true
}
)

patientSchema.plugin(AutoIncrement, {
    inc_field: 'pToken',
    id: 'patient_id',
    start_seq: 1000
})

module.exports = mongoose.model('Patient', patientSchema)