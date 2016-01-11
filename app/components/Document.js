import React from 'react';

export default class Document extends React.Component {
  render() {
    const {publicPath, content, initialState} = this.props;
    const scripts = [], css = [];

    // TODO: solve this using stats
    if(process.env.NODE_ENV === 'development') {
      scripts.push(`${publicPath}main.bundle.dev.js`);
      css.push(`${publicPath}main.bundle.dev.css`);
    }
    else {
      scripts.push(`${publicPath}main.bundle.js`);
      css.push(`${publicPath}main.bundle.css`);
    }

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="apple-touch-icon" sizes="57x57" href="/public/favicons/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/public/favicons/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/public/favicons/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/public/favicons/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/public/favicons/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/public/favicons/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/public/favicons/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/public/favicons/apple-touch-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/public/favicons/apple-touch-icon-180x180.png" />
          <link rel="icon" type="image/png" href="/public/favicons/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/public/favicons/android-chrome-192x192.png" sizes="192x192" />
          <link rel="icon" type="image/png" href="/public/favicons/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/png" href="/public/favicons/favicon-16x16.png" sizes="16x16" />
          <link rel="manifest" href="/public/favicons/manifest.json" />
          <link rel="mask-icon" href="/public/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-TileImage" content="/public/favicons/mstile-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          <title>React-Redux-ES2015-Starter-Kit</title>
          <meta name="description" content="React-Redux-ES2015-Starter-Kit" />
          {css.map((href, k) => <link key={k} rel="stylesheet" type="text/css" href={href} />)}
        </head>
        <body>
          <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">React-redux-es2015-starter-kit</a>
              </div>
            </div>
          </nav>
          <div id="app" className="jumbotron" dangerouslySetInnerHTML={{__html: content}} />
          <div className="container">
            <footer>
              <p>© 2015 Fred Ghilini.</p>
            </footer>
          </div>
          <script dangerouslySetInnerHTML={{__html: initialState}} />
          {scripts.map((src, k) => <script key={k} src={src} />)}
        </body>
      </html>
    );
  }
}

Document.propTypes = {
  publicPath: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  initialState: React.PropTypes.string.isRequired
}
