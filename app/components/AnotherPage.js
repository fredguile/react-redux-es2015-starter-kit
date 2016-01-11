import React from 'react';
import {Link} from 'react-router';

export default class AnotherPage extends React.Component {
  render() {
    return (
      <section>
        <h1 className="text-center">Homepage</h1>
        <article>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <Link className="btn btn-primary btn-lg" to="/">Back</Link>
        </article>
      </section>
    );
  }
}
