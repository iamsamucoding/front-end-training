import React from 'react';
import { Route, Link } from 'react-router-dom';


// Heavily changed from project01-02

// we are simulating topics related to other topics
const topics = [
  { id: 0, name: 'Topic 1', relatedTopics: [1, 2, 3] },
  { id: 1, name: 'Topic 2', relatedTopics: [0, 3] },
  { id: 2, name: 'Topic 3', relatedTopics: [0, 1, 3] },
  { id: 3, name: 'Topic 4', relatedTopics: [1, 2] },
]

// we’ve created a find function that receives the topic’s id as an argument and returns the item or
// topic that corresponds unequivocally to the id passed into it.
const find = id => topics.find(item => item.id === parseInt(id, 10));


const TopicDetail = ({ match }) => {
  // This will store the result of the function find which grabs the id that comes from the match object (router)
  // when the component is invoked. It then returns the topic object that corresponds to that id.
  const topic = find(match.params.id);
  console.log('match: ', match);
  console.log('topic: ', topic);

  // With that topic object stored, it returns the Details of the topic and creates a dynamic unordered list
  // with the related topics id and name.
  return (
      <div>
        <h3>{topic.name} Details</h3>
        <h4>INFO: This is the info about {topic.name} </h4>
        <h4>Related Topics</h4>
        <ul>
          {
            topic.relatedTopics.map(id => (
                <li key={id}>
                  <Link to={`${match.url}/${id}`}>{find(id).name}</Link>
                </li>
            ))
          }
        </ul>
        <hr />

        {/*
        So, when you click one of the links shown, it routes you to the next topic id:
        The component TopicDetail coupled to a new <Route /> is only called/expanded when a link with the
        pattern defined is passed.

        Note that, when rendering TopicDetail at first, we have the props match with id = 0, corresponding to Topic1,
        and url = /Topics.
        The route defined here is not called yet, because it then expects: /Topics/someId.
        Now, when clicking on a link that builds this url, e.g: /Topics/1, the componenent coupled by this route
        is called recursevely is is inserted in the current TopicDetail.

        Now, for this new component TopicDetail inside a previous TopicDetail, id: 1, url: /Topics/1
        Then, the path defined by the <Route /> is: /Topics/1/someId.
        The same rationale is used here.

        Wow! This route is outside of the routes.js file! This is new.
        Observe that technically you can create routes inside any component.

        Do not forget that isExact is false because the url doesn’t entirely match the path from the
        /Topics/:topicId as previously defined in the routes.js component.
        */}
        <Route path={`${match.url}/:id`} component={TopicDetail} />
      </div>
  );
};


// In the end, we define and export the TopicList component which invokes TopicDetail with the match object above.
// But, as in each instance of TopicDetails when you’re triggering a Route, TopicDetail gets re-rendered with new
// match properties supplied by the Router at each instance.
const TopicList = () => {
  console.log("TopicList");
  return <TopicDetail match={{params: {id: 0}, url: '/Topics'}}/>; // id 0 is from the Topic1
};

export default TopicList;
