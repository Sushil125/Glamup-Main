import React from "react";
import KhaltiCheckout from "khalti-checkout-web";
import myKey from "./KhaltiKey";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function Khalti({
    cart,
    address
}) {
   
    const navigate = useNavigate();
    let config = {
        publicKey: myKey.publicTestKey,
        productIdentity: "12355321",
        productName: "Kalij-Food",
        productUrl: "http://localhost:3000/cart",
        eventHandler: {
            onSuccess() {
                console.log("Success")
                navigate("/")
                Swal.fire({
      
                    icon: 'success',
                    title: 'Payment Successful',
                    showConfirmButton: false,
                    timer: 1500
                  })
            },
            onError(error) {
                // handle errors
                console.log(error.message);
            },
            onClose() {
                console.log("widget is closing");
            },
        },
        paymentPreference: [
            "KHALTI",
        ],
    };
    let checkout = new KhaltiCheckout(config);
    let buttonStyles = {
        // backgroundColor: '#ED9F64',
        // padding: '13px 10px',
        border: '0px solid white',
        // borderRadius: '12px',
        color: 'white',
        fontSize: '16px',
        letterSpacing: '2px',
        fontWeight: 'bold',
        width: '100%',
        display: 'block',
        '&:hover': {
            backgroundColor: '#ED9F64',
        },
    }
    return (
        <div>
            <button
                onClick={() => { checkout.show({ amount: 100000 }); }}
                style={buttonStyles}
            >
                Khalti Pay
            </button>
        </div>
    );
}