var fetch = require("isomorphic-unfetch");

exports.handler = async () => {
  var response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  var json = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(json),
  };
};
