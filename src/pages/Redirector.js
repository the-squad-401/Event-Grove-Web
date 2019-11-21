import React from 'react';
import { Redirect } from 'react-router-dom';

export default function(props) {
  console.log(props.match.params);
  return (
    <Redirect to={`/${props.match.params.path}/${props.match.params.options}`} />
  );
}