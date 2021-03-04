import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";

function Feed() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const orders = useSelector((state) => state.orders)
    const applications = useSelector((state) => state.applications)
    const reviews = useSelector((state) => state.reviews)

    const [view, setView] = useState("orders");

    const toggleView = (e) => {
        setView(e.target.value);
    }

    let ords = [];
    if (orders && user) {
        if (user.nonprofit) {
            ords = orders.filter(ord => ord.status == "Unfilled")
        } else {
            ords = orders.filter(ord => ord.status == "Unfilled")
        }
    }

    let apps = [];
    if (applications && user) {
        if (user.nonprofit) {
            apps = applications.filter(app => app.nonprofit_id == user.id);
        } else {
            apps = applications.filter(app => app.node_id == user.id);
        }
    }

    let revs = [];
    if (reviews && user) {
        if (user.nonprofit) {
            revs = reviews.filter(rev => rev.nonprofit_id == user.id);
        } else {
            revs = reviews.filter(rev => rev.node_id == user.id);
        }
    }

    return (<>
        {(view == "orders" && orders) &&
            <div className='homepage'>
                <div className='page-container homepage-container'>
                    <div className='toggle-bar'>
                        <button value="orders" onClick={toggleView}>orders</button>
                        <button value="applications" onClick={toggleView}>applications</button>
                        <button value="reviews" onClick={toggleView}>reviews</button>
                    </div>
                    <div className='homepage-feed'>
                        {orders.map((order) =>
                            <div key={order.id} className='container posts' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                                <div>{order.title}</div>
                                <div>{order.description}</div>
                                <div>starts: {order.start_time}</div>
                                <div>virtual: {order.virtual.toString()}</div>
                                <div>karma: {order.karma}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        }
        {(view == "applications" && apps) &&
            <div className='homepage'>
                <div className='page-container homepage-container'>
                    <div className='toggle-bar'>
                        <button value="orders" onClick={toggleView}>orders</button>
                        <button value="applications" onClick={toggleView}>applications</button>
                        <button value="reviews" onClick={toggleView}>reviews</button>
                    </div>
                    <div className='homepage-feed'>
                        {apps.map((app) =>
                            <div key={app.id} className='container posts' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                                <div>{app.node_id}</div>
                                <div>{app.status}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        }
        {(view == "reviews" && revs) &&
            <div className='homepage'>
                <div className='page-container homepage-container'>
                    <div className='toggle-bar'>
                        <button value="orders" onClick={toggleView}>orders</button>
                        <button value="applications" onClick={toggleView}>applications</button>
                        <button value="reviews" onClick={toggleView}>reviews</button>
                    </div>
                    <div className='homepage-feed'>
                        {revs.map((rev) =>
                            <div key={rev.id} className='container posts' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                                <div>{rev.content}</div>
                                <div>{rev.score}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        }
    </>)
}

export default Feed
