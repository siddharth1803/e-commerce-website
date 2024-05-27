const mongoose = require("mongoose")
const Schema = mongoose.Schema

function formatTime() {
    const date = new Date();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const meridian = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const currentDate = new Date().toJSON().slice(0, 10);
    const formattedDate = `${formattedHours}:${formattedMinutes} ${meridian}, ${currentDate}`;
    return formattedDate

}

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    orderData: {
        type: Array,
        required: true
    },
    totalPrice: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        default: Date.now()

    },
    date: {
        type: String,
        default: formatTime()
    }
})

module.exports = mongoose.model("ProductOrders", OrderSchema)