import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@0,500;0,600;1,600&family=Chivo+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100&family=Inter&family=Montserrat:ital,wght@0,200;0,700;1,300&family=Oooh+Baby&family=Roboto:wght@300&family=Rock+Salt&family=Space+Mono&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}