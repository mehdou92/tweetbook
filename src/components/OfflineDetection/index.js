import React from 'react';
import { Offline, Online } from "react-detect-offline";

export default function OfflineDetection() {
  const divStyle = {
    backgroundColor: 'red',
    textAlign: 'center'
  };

  return (
    <div className="flex mb-12 offline-card" style={divStyle}>
      <Offline>You are no longer connected to the internet, please check your network settings</Offline>
    </div>
  );
    
}