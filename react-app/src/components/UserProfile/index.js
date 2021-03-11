import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { updateApplication } from "../../store/applications";
import { updateOrder } from "../../store/orders";

const UserProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [load, setLoad] = useState(false);

  const user = useSelector((state) => state.session.user);
  const params = useParams()
  const reviews = useSelector((state) => state.reviews.list);
  const applications = useSelector((state) => state.applications.list);
  const orders = useSelector((state) => state.orders.list);


  // let apps = [];
  // if (applications) {
  //   if (!user.nonprofit) {
  //     apps = applications.filter(app => app.node_id == user.id);
  //   }
  // }

  // let ords = [];
  // if (orders) {
  //   if (user.nonprofit) {
  //     ords = orders.filter(ord => ord.nonprofit_id == user.id); // and order status == complete
  //   }
  // }
  // const applications = useSelector((state) => state.applications.list).filter(app => app.node_id == user.id && app.status == "Complete");

  // const orders = useSelector((state) => state.applications.list);
  let score = 0;
  let divisor = 0;
  let karma = 0;
  if (reviews) {
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].reviewee_id == user.id) {
        score += reviews[i].score;
        if (reviews[i].score > 1) {
          karma += reviews[i].karma;
        }
        divisor += 1;
      }
    }
    if (divisor > 0) {
      score = Math.round(10 * (score / divisor)) / 10;
    }
  }

  const [view, setView] = useState("orders");

    const toggleView = (e) => {
        setView(e.target.value);
    }

    // let ords = [];
    // if (orders.list && user) {
    //     if (user.nonprofit) {
    //         ords = orders.list.filter(ord => ord.status == "Open")
    //     } else {
    //         ords = orders.list.filter(ord => (ord.status == "Open" && !ord.app_node_ids.includes(user.id)))
    //     }
    // }

    // let apps = [];
    // if (applications.list && user) {
    //     if (user.nonprofit) {
    //         apps = applications.list.filter(app => app.nonprofit_id == user.id);
    //     } else {
    //         apps = applications.list.filter(app => app.node_id == user.id);
    //     }
    // }
    
    // let revs = [];
    // if (reviews.list && user) {
    //     if (user.nonprofit) {
    //         revs = reviews.list.filter(rev => rev.nonprofit_id == user.id);
    //     } else {
    //         revs = reviews.list.filter(rev => rev.node_id == user.id && !rev.response_id && rev.writer_id != user.id && rev.score != 1);
    //     }
    // }

    const viewOrderProfile = (e) => {
        const orderId = parseInt(e.target.id, 10);
        history.push(`/order/${orderId}`);
    }

    const accept = async (e) => {
        const appId = parseInt(e.target.id, 10);
        const app = await dispatch(updateApplication(appId));
        dispatch(updateOrder(app.order_id))
    }

    const addReview = (e) => {
        const appId = parseInt(e.target.id, 10);
        history.push(`/reviews/new/${appId}`);
    }

    const viewApps = (e) => {
        const ordId = parseInt(e.target.id, 10);
        history.push(`/order/${ordId}/apps`);
    }

    const viewAppProfile = (e) => {
        const appId = parseInt(e.target.id, 10);
        history.push(`/application/${appId}`);
    }

  return (<div>
     {(user && reviews) &&
      <div>
        <div className='profile-page-container'>
          <div className='header-container'>
            <div className='user-profile-name'>
              {user.username}
            </div>
            <div className='user-profile-score'>
              score: {score}
            </div>
            <div className='user-profile-karma'>
              karma: {karma}
            </div>
          </div>
          <div className='user-profile-body'>
  {/* //           {(view == "orders" && ords && user) &&
  //             <div className='homepage'>
  //               <div className='toggle-bar'>
  //                 <button className="toggle-button" value="orders" onClick={toggleView}>orders</button>
  //                 <button className="toggle-button" value="applications" onClick={toggleView}>applications</button>
  //                 <button className="toggle-button" value="reviews" onClick={toggleView}>reviews</button>
  //               </div>
  //               <div className='page-container homepage-container'>
  //                 <div className='homepage-feed'>
  //                   {ords.length > 0 ? ords.map((ord) =>
  //                     <div key={ord.id} className='container ords'>
  //                       <div className="order-title">{ord.title}</div>
  //                       <div className="order-start">{ord.start_time}</div>
  //                       <div className="order-karma">karma: {ord.karma}</div>
  //                       {ord.virtual &&
  //                         <div className="order-virtual">(virtual)</div>
  //                       }
  //                       {!user.nonprofit &&
  //                         <button className="blue-button" id={ord.id} onClick={viewOrderProfile} >view details</button>
  //                       }
  //                       {(user.nonprofit && ord.app_node_ids.length == 1) &&
  //                         <button className='blue-button' id={ord.id} onClick={viewApps}>view {ord.app_node_ids.length} open app</button>
  //                       }
  //                       {(user.nonprofit && ord.app_node_ids.length > 1) &&
  //                         <button className='blue-button' id={ord.id} onClick={viewApps}>view {ord.app_node_ids.length} open apps</button>
  //                       }
  //                     </div>
  //                   ) : <div style={{ marginTop: '100px' }}>no open orders at this time</div>}
  //                 </div>
  //               </div>
  //             </div>
  //           }
  //           {(view == "applications" && apps) &&
  //             <div className='homepage'>
  //               <div className='toggle-bar'>
  //                 <button className="toggle-button" value="orders" onClick={toggleView}>orders</button>
  //                 <button className="toggle-button" value="applications" onClick={toggleView}>applications</button>
  //                 <button className="toggle-button" value="reviews" onClick={toggleView}>reviews</button>
  //               </div>
  //               <div className='page-container homepage-container'>
  //                 <div className='homepage-feed'>
  //                   {apps.length > 0 ? apps.map((app) =>
  //                     <div key={app.id} className='container apps' style={{ paddingTop: '0', marginBottom: '5vh' }}>
  //                       <div className="app-order-title">{app.order_title}</div>
  //                       <div className="app-order-start">{app.order_start_time}</div>
  //                       <div className="app-status">status: {app.status.toLowerCase()}</div>
  //                       {!user.nonprofit &&
  //                         <button className="blue-button" id={app.id} onClick={viewAppProfile}>view details</button>
  //                       }
  //                       {(user.nonprofit && app.status == 'Pending') &&
  //                         <button className='blue-button' id={app.id} onClick={accept}>accept</button>
  //                       }
  //                       {(user.nonprofit && app.status == 'Confirmed') &&
  //                         <button className='blue-button' id={app.id} onClick={addReview}>review</button>
  //                       }
  //                     </div>
  //                   ) : <div style={{ marginTop: '100px' }}>no apps need attention atm</div>}
  //                 </div>
  //               </div>
  //             </div>
  //           }
  //           {(view == "reviews" && revs) &&
  //             <div className='homepage'>
  //               <div className='toggle-bar'>
  //                 <button className="toggle-button" value="orders" onClick={toggleView}>orders</button>
  //                 <button className="toggle-button" value="applications" onClick={toggleView}>applications</button>
  //                 <button className="toggle-button" value="reviews" onClick={toggleView}>reviews</button>
  //               </div>
  //               <div className='page-container homepage-container'>
  //                 <div className='homepage-feed'>
  //                   {revs.length > 0 ? revs.map((rev) =>
  //                     <div key={rev.id} className='container revs' style={{ paddingTop: '0', marginBottom: '5vh' }}>
  //                       <div style={{ marginTop: '7px' }} className='order-title'>{rev.order_title}</div>
  //                       <div style={{ marginTop: '2px', fontSize: '18px' }} className='order-start'>{rev.order_start_time}</div>
  //                       <div>__________</div>
  //                       <div className='rev-data'>
  //                         <div style={{ marginBottom: '4px' }} className='rev-content'>"{rev.content}"</div>
  //                         <div className='rev-writer'>– {rev.writer.username}</div>
  //                         <div className='rev-score'>score: {rev.score}</div>
  //                       </div>
  //                       {(!rev.response_id && rev.writer_id != user.id) &&
  //                         <button className='blue-button' id={rev.application_id} onClick={addReview}>respond with review</button>
  //                       }
  //                     </div>
  //                   ) : <div style={{ marginTop: '100px' }}>no reviews need attention atm</div>}
  //                 </div>
  //               </div>
  //             </div>
  //           } */}
          </div>
        </div>
      </div>
    }
  </div>

  );
};

export default UserProfile;
