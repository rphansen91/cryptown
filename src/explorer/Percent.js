import React, { Component } from 'react'
import './Percent.css'

const isPositive = (pos, neg) => value => value >= 0 ? pos() : neg()
const arrow = isPositive(() => '▲', () => '▼')

export default ({ value, pos='green', neg='red' }) => isPositive(
  () => <div className="percent positive" style={{color: pos}}>▲ { value }%</div>,
() => <div className="percent" style={{color: neg}}>▼ { value }%</div>
)(value)
