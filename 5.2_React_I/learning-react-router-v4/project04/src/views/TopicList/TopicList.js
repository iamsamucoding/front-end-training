import React from 'react';
import { Link } from 'react-router-dom';
import { MakeRouteWithSubRoutes } from '../../makeRouteWithSubRoutes';

const TopicList = ({ routes, match }) => {
  return (
      <div>
        <h3>Topic List View</h3>
        <ul>
          <li>
            <Link to={`${match.url}/Topic1`}>Topic 1</Link>
          </li>
          <li>
            <Link to={`${match.url}/Topic2`}>Topic 2</Link>
          </li>
          <li>
            <Link to={`${match.url}/Topic3`}>Topic 3</Link>
          </li>
        </ul>
        {
          routes.map((route, index) => <MakeRouteWithSubRoutes key={index} {...route} />)
        }
      </div>
  );
};

export default TopicList;
