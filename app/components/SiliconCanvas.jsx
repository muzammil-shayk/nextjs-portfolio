'use client';
import { Component } from 'react';
import dynamic from 'next/dynamic';

// three + R3F load in their own chunk, only on the client, only when WebGL works.
const SiliconScene = dynamic(() => import('./SiliconScene'), { ssr: false });

// If the scene throws (context loss, driver bug) the CSS poster stays.
class Boundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function SiliconCanvas(props) {
  return (
    <Boundary>
      <SiliconScene {...props} />
    </Boundary>
  );
}
