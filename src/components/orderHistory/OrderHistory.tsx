import React, { useEffect, useState } from 'react';
import './orderHistory.css'
const OrderHistory: React.FC = () => {

    return (
        <>
            <div className="card-acct container center-items column">
                <div>
                    <h3>Order History</h3>
                </div>
                <div className="full-width">
                    <ul className="list-style-none border">
                        <li className="container space-between column">
                            <div className='container space-between'>
                                <p>DATE</p>
                                <p>Order Number</p>
                                <p>Status</p>
                                <p>TOTAL</p>
                            </div>
                            <div>
                                <hr />
                            </div>
                            <div className='container space-between'>
                                <p>12/12/2025</p>
                                <p>ASFEF221</p>
                                <p>COMPLETED</p>
                                <p>$0.00</p>
                            </div>
                            <hr />
                        </li>
                        <li>
                        <div className='container space-between'>
                                <p>03/19/2025</p>
                                <p>DSJEO281</p>
                                <p>PENDING</p>
                                <p>$0.00</p>
                            </div>
                            <hr />
                        </li>
                        <li>
                        <div className='container space-between'>
                                <p>03/19/2025</p>
                                <p>DSJEO281</p>
                                <p>COMPLETED</p>
                                <p>$0.00</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default OrderHistory