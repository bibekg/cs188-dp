// @flow

import * as React from 'react'
import styled from 'styled-components'

export default () => {
  const styles = {
    margin: '0 auto',
    display: 'block'
  }

  return (
    <div>
      <svg className="sun" style={styles} height="80" width="80">
        <circle r="30" transform="translate(40 40)" fill="#FDB813" />
        <circle
          id="#oray"
          r="30"
          stroke="#FDB813"
          strokeWidth="8"
          transform="translate(40 40)"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="scale"
            additive="sum"
            from="1 1"
            to="1.2 1.2"
            begin="0s"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            id="animation2"
            attributeName="opacity"
            from="1"
            to="0"
            dur="2s"
            begin="0"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="20" transform="translate(40 40)" fill="#ff8800" />
        <circle
          id="#iray"
          r="20"
          stroke="#ff8800"
          strokeWidth="5"
          fill="none"
          transform="translate(40 40)"
        >
          <animateTransform
            attributeName="transform"
            type="scale"
            additive="sum"
            from="1.1 1.1"
            to="1.2 1.2"
            begin="0s"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            id="animation2"
            attributeName="opacity"
            from="1"
            to="0"
            dur="2s"
            begin="0"
            repeatCount="indefinite"
          />
        </circle>

        <line
          fill="none"
          stroke="#FFFF00"
          strokeWidth="2.5"
          strokeMiterlimit="10"
          x1="40"
          y1="15"
          x2="40"
          y2="2.5"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            dur="14s"
            repeatCount="indefinite"
          />
        </line>
        <line
          fill="none"
          stroke="#FFFF00"
          strokeWidth="2.5"
          strokeMiterlimit="10"
          x1="40"
          y1="65"
          x2="40"
          y2="77.2"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            dur="14s"
            repeatCount="indefinite"
          />
        </line>
        <line
          fill="none"
          stroke="#FFFF00"
          strokeWidth="2.5"
          strokeMiterlimit="10"
          x1="2.5"
          y1="40"
          x2="15"
          y2="40"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            dur="14s"
            repeatCount="indefinite"
          />
        </line>
        <line
          fill="none"
          stroke="#FFFF00"
          strokeWidth="2.5"
          strokeMiterlimit="10"
          x1="65"
          y1="40"
          x2="77.5"
          y2="40"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            dur="14s"
            repeatCount="indefinite"
          />
        </line>
        <line
          fill="none"
          stroke="#FFFF00"
          strokeWidth="2.5"
          strokeMiterlimit="10"
          x1="61.2"
          y1="61.2"
          x2="69"
          y2="69"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            dur="14s"
            repeatCount="indefinite"
          />
        </line>
        <line
          fill="none"
          stroke="#FFFF00"
          strokeWidth="2.5"
          strokeMiterlimit="10"
          x1="61.2"
          y1="18.8"
          x2="69"
          y2="11"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            dur="14s"
            repeatCount="indefinite"
          />
        </line>
        <line
          fill="none"
          stroke="#FFFF00"
          strokeWidth="2.5"
          strokeMiterlimit="10"
          x1="11"
          y1="11"
          x2="18.8"
          y2="18.8"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            dur="14s"
            repeatCount="indefinite"
          />
        </line>
        <line
          fill="none"
          stroke="#FFFF00"
          strokeWidth="2.5"
          strokeMiterlimit="10"
          x1="18.8"
          y1="61.2"
          x2="11"
          y2="69"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            dur="14s"
            repeatCount="indefinite"
          />
        </line>
      </svg>
    </div>
  )
}
