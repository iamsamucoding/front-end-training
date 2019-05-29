import React from 'react';
import { Link } from 'react-router-dom';


// So TopicList View has this detail of handling different routes.
// Remember that /Topic/:topicId route that <Route /> told <Switch /> to let TopicDetail handle?
// Here we are with that.
//
// TopicList receives { match } as a prop. We could simply receive props and call props.match.
// We receive a match from the Route we’ve chosen when we’ve clicked Topics and we are rendering
// an unordered list with 3 options: Topic1, Topic2 and Topic3.
//
// Basically if the User chooses Topic1 Link in the screen, the <Link /> will push the browser URL to that
// path /Topics/Topic1.
// What happens next?
// <Router /> and <Switch /> detect that the URL changed and take a look into their info to check what route
// needs to be fired. So they discover that now the route triggered is the one for /Topics/:topicId and
// triggers TopicDetail rendering.
// TopicDetail will render Topic1 details (see now the file ./components/TopicDetail/TopicDetail.js).
//
// TopicDetail receives match from the Router and renders the topicId located at match.params.topicId.

const TopicList = ({ match }) => {
  console.log(match.url);

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
    </div>
  );
};

export default TopicList;
