import React from 'react';
import './index.scss';

export default function Loader() {

    return (
        <div class="overlay">
            <div class="loader-wrapper">
                <div class="loader">
                    <div class="center"></div>
                    <div class="orbiter-wrapper">
                        <div class="orbiter"></div>
                    </div>
                </div>
            </div>
        </div>
    )

}

