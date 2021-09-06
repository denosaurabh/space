import React, { Component, ErrorInfo, ReactNode } from 'react';

import { styled } from '@styled';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    console.log(error);

    return { hasError: true, error, errorInfo: null };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Heading>Sorry.. there was an error</Heading>
          <Text>
            Please reload the page. If it keep happening Please share this in
            our email at <b>denosaurabh@gmail.com</b> with this a screenshot of
            the error given below!
          </Text>
          <code>
            {this.state.error}
            {this.state.errorInfo}
          </code>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  height: '100%',
  minHeight: '100vh',
});

const Heading = styled('h2', {
  fontFamily: '$indie',
  fontSize: '6rem',
  color: '$grey-700',

  marginBottom: '3rem',
});

const Text = styled('span', {
  fontSize: '1.6rem',
  color: '$grey-600',
  lineHeight: '3rem',
  textAlign: 'center',

  minWidth: '40rem',
  maxWidth: '40%',

  '& a': {
    fontWeight: 'bold',
    color: '$grey-700',
    textDecoration: 'underline',

    margin: '0 0.5rem',
  },
});
