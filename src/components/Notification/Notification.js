import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const MyNotification = (props) => {
            const{type,value} = props;
            console.log(type)
            switch ('success') {        
            case 'success':
              NotificationManager.success('Success message', 'Title here');
              break;
            case 'error':
              NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
              });
              break;
          }
        
  
    
      
        return (
          <div>
            {/* <button className='btn btn-info'
              onClick={createNotification('info')}>Info
            </button>
            <hr/>
            <button className='btn btn-success'
              onClick={createNotification('success')}>Success
            </button>
            <hr/>
            <button className='btn btn-warning'
              onClick={createNotification('warning')}>Warning
            </button>
            <hr/>
            <button className='btn btn-danger'
              onClick={createNotification('error')}>Error
            </button> */}
            
            <NotificationContainer/>
          </div>
        );
      
}

export default MyNotification;