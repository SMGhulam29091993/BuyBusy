import React, { useEffect, useState } from 'react';
import style from './myorder.module.css';
import { onSnapshot, collection, setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseInit';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const [totalPurchase, setTotalPurchase] = useState(0);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'MyOrder'), (snapShot) => {
            const orderData = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOrders(orderData);
        });
        return () => unsub();
    }, []);

    useEffect(() => {
        let totalPrice = 0;
        orders.forEach((order) => {
            totalPrice += order.qty * order.price;
        });
        setTotalPurchase(totalPrice);
    }, [orders]);

    useEffect(() => {
        if (totalPurchase !== 0) {
            const purchaseAmountRef = doc(db, 'PurchaseAmount', 'ozA99YAui235Kdersk6a');
            setDoc(purchaseAmountRef, { amount: totalPurchase });
        }
    }, [totalPurchase]);

    return (
        <div className={style.myOrders}>
            <h1>My Orders</h1>

            <div className={style.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Date & Time</th>
                            <th>Name</th>
                            <th>Details</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.dateTime && new Date(order.dateTime?.seconds * 1000).toLocaleString()}</td>
                                <td>{order.name}</td>
                                <td>{order.details}</td>
                                <td>{order.qty}</td>
                                <td>${order.price}</td>
                                <td>${order.qty * order.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={style.totalContainer}>
                <h2>Total Purchase Till Date</h2>
                <h2>₹: {totalPurchase}</h2>
            </div>
        </div>
    );
};

export default MyOrder;
